// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const CLS_EXPANDABLE = "expandable";
const CLS_CLOSED = "closed";
const CLS_TREENODE = "treenode";
const CLS_SELECTED = "selected";
const CLS_LAST_SELECTED = "last_selected";
const CLS_HOVER = "hover";
const CLS_FORCE_NO_BG = "force-no-bg";
const CLS_HIDE_MY_BG = "hide-my-bg";
const CLS_DISABLED = "disabled";
const CLS_WITH_ARROW = "with_arrow";
const CLS_MULTI_TOGGLE = "multi-toggle";
const CLS_COLORWELL = "colorwell";

const URL_LOADING = "_loading_";

const TYPE_ERROR = -1;
const TYPE_ZIP = 0;
const TYPE_OLD = 1;
const TYPE_JDWP = 2;
const TYPE_BUG_REPORT = 3;
const TYPE_BUG_REPORT_V2 = 4;  // Bug report with encoded view hierarchy
const TYPE_TIME_LAPSE_BUG_REPORT = 5;
const TYPE_TIME_LAPSE_BUG_REPORT_DEPRECATED = 6;

const CMD_CONVERT_TO_STRING = 1;
const CMD_PARSE_OLD_DATA = 2;
const CMD_USE_PROPERTY_MAP = 4;
const CMD_DEFLATE_STRING = 8;
const CMD_SKIP_8_BITS = 16;

// Copyright 2018 Google LLC

function deferred(data) {
	let a, r;
	const p = new Promise(function(accept, reject) {
		a = accept;
		r = reject;
    });
    p.accept = a;
    p.reject = r;
    p.data = data;
    return p;
}

class Mutex {
    constructor() {
        this._lock = Promise.resolve();
    }

    lock() {
        const nextLock = deferred();
        const returnAfterCurrentLock = this._lock.then(() => nextLock.accept);
        this._lock = this._lock.then(() => nextLock);
        return returnAfterCurrentLock;
    }
}

// eslint-disable-next-line prefer-const
let ActiveState = [];

function resetActiveState() {
    for (let i = 0; i < ActiveState.length; i++) {
        ActiveState[i]();
    }
    ActiveState = [];
    if (adbDevice) {
        ActiveState.push(function () {
            adbDevice.closeAll();
        });
    }
}

function createWorker(url) {
    const worker = new Worker(url, { type: "module" });
    ActiveState.push(function() {
        worker.terminate();
    });
    return worker;
}

function createUrl(data) {
    const url = URL.createObjectURL(data);
    ActiveState.push(function() {
        URL.revokeObjectURL(url);
    });
    return url;
}

function doXhr$1(url, responseType) {
    const result = deferred();
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                result.accept(this.response);
            } else {
                result.reject();
            }
        }
    };
    xhr.open('GET', url);
    xhr.responseType = responseType;
    xhr.send();
    return result;
}

async function saveFile(fileName, url) {
    const a = $("<a>").attr({href:url, download:fileName}).appendTo(document.body);
    a.get(0).click();
    setTimeout(function() {
        a.remove();
    }, 0);
}

function showContext(menu, callback, e) {
    const elementFactory = function(el, hideMenu) {
        const menuClickHandler = function() {
            if (!$(this).hasClass(CLS_DISABLED)) {
                if (!callback.call($(this).data("info"), $(this))) {
                  hideMenu();
                }
            }
        };

        let addSeparator = false;
        for (let i = 0; i < menu.length; i++) {
            const m = menu[i];
            if (!m) {
                addSeparator = true;
                continue;
            }
            const item = $("<a class=icon_btn>").text(m.text).addClass(m.icon).appendTo(el).data("info", m).click(menuClickHandler);
            if (addSeparator) {
                item.addClass("separator");
            }
            if (m.disabled) {
                item.addClass(CLS_DISABLED);
            }
            addSeparator = false;
        }
    };

    showPopup(e, elementFactory);
}

/**
 * @param {*} e the click event
 * @param {*} elementFactory a function which tasks 2 arguments: <container element>, <hide-menu-method>
 */
function showPopup(e, elementFactory) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    const wrapper = $("<div class='context-wrapper'>").appendTo(document.body);
    const el = $("<div class='contextmenu'>").appendTo(wrapper);

    const documentMouseDown = function(e) {
        if (!el.has(e.toElement).length) {
            hideMenu();
        }
    };

    $(document).mousedown(documentMouseDown);
    const hideMenu = function() {
        wrapper.remove();
        $(document).unbind("mousedown", documentMouseDown);
        wrapper.trigger("popup_closed");
    };

    elementFactory(el, hideMenu);
    el.show().css({
        left: Math.min(e.pageX, $(document).width() - el.width() - 10),
        top: Math.min(e.pageY, $(document).height() - el.height() - 10)});

    return wrapper;
}

function toast(msg) {
    $("<div class=toast>").text(msg).appendTo($("#content")).animate({top: 10, opacity:1}).delay(5000).fadeOut(300, function() { $(this).remove(); });
}

// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

let AdbKey = (function () {
    const ADB_WEB_CRYPTO_ALGORITHM = {
        name: 'RSASSA-PKCS1-v1_5',
        hash: {
            name: 'SHA-1'
        },
    };

    const WORD_SIZE = 4;
    const MODULUS_SIZE_BITS = 2048;
    const MODULUS_SIZE = MODULUS_SIZE_BITS / 8;
    const MODULUS_SIZE_WORDS = MODULUS_SIZE / WORD_SIZE;
    const PUBKEY_ENCODED_SIZE = 3 * WORD_SIZE + 2 * MODULUS_SIZE;

    const PUBLIC_EXPONENT = new Uint8Array([0x01, 0x00, 0x01]);
    const ADB_WEB_CRYPTO_EXPORTABLE = true;
    const ADB_WEB_CRYPTO_OPERATIONS = ['sign'];

    const SIGNING_ASN1_PREFIX = [
        0x00, 0x30, 0x21, 0x30, 0x09, 0x06, 0x05, 0x2B, 0x0E, 0x03, 0x02, 0x1A, 0x05,
        0x00, 0x04, 0x14
    ];

    const R32 = BigInteger.ONE.shiftLeft(32); // 1 << 32

    function bigIntToFixedByteArray(bn, size) {
        // big-endian byte array
        const bytes = bn.toByteArray();

        // Pad zeros if array isn't big enough
        while (bytes.length < size) {
            bytes.unshift(0);
        }

        // Remove extra zeros if array is too big
        while (bytes.length > size) {
            if (bytes[0] !== 0) {
                throw new Error('BigInteger value exceeds available size');
            }
            bytes.shift();
        }

        return bytes;
    }

    function encodeAndroidPublicKeyBytes(key) {
        const n0inv = R32.subtract(key.n.modInverse(R32)).intValue();
        const r = BigInteger.ONE.shiftLeft(1).pow(MODULUS_SIZE_BITS);
        const rr = r.multiply(r).mod(key.n);

        const buffer = new ArrayBuffer(PUBKEY_ENCODED_SIZE);
        let dv = new DataView(buffer);
        dv.setUint32(0, MODULUS_SIZE_WORDS, true);
        dv.setUint32(WORD_SIZE, n0inv, true);
        new Uint8Array(dv.buffer, dv.byteOffset, dv.byteLength / Uint8Array.BYTES_PER_ELEMENT).set(bigIntToFixedByteArray(key.n, MODULUS_SIZE).reverse(), 2 * WORD_SIZE);
        new Uint8Array(dv.buffer, dv.byteOffset, dv.byteLength / Uint8Array.BYTES_PER_ELEMENT).set(bigIntToFixedByteArray(rr, MODULUS_SIZE).reverse(), 2 * WORD_SIZE + MODULUS_SIZE);
        dv.setUint32(2 * WORD_SIZE + 2 * MODULUS_SIZE, key.e, true);
        return new Uint8Array(buffer);
    }

    function padLeft(value, width, char) {
        const str = value.toString();
        return char.repeat(Math.max(0, width - str.length)) + str;
    }

    /**
     * Decode the web safe base64url string to a hex number (assuming the encoded
     * data was a big endian number).
     */
    function decodeWebBase64ToHex(str) {
        const bytes = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
        let hex = '';
        for (let i = 0; i < bytes.length; ++i) {
            hex += padLeft(bytes.charCodeAt(i).toString(16), 2, '0');
        }
        return hex;
    }

    /*
     * Generates a new key and stores it in local storate
     */
    async function generateNewKeyPair() {
        const keypair = await Promise.resolve(crypto.subtle.generateKey({
            ...ADB_WEB_CRYPTO_ALGORITHM,
            modulusLength: MODULUS_SIZE_BITS,
            publicExponent: PUBLIC_EXPONENT,
        },
            ADB_WEB_CRYPTO_EXPORTABLE, ADB_WEB_CRYPTO_OPERATIONS));
        const jwk = await Promise.resolve(crypto.subtle.exportKey('jwk', keypair.publicKey));

        const jsbnKey = new RSAKey();
        jsbnKey.setPublic(decodeWebBase64ToHex(jwk.n), decodeWebBase64ToHex(jwk.e));

        const bytes = encodeAndroidPublicKeyBytes(jsbnKey);
        const userInfo = 'unknown@web-hv';

        const fullKey = await Promise.resolve(crypto.subtle.exportKey("jwk", keypair.privateKey));
        fullKey.publicKey = btoa(String.fromCharCode.apply(null, bytes)) + ' ' + userInfo;

        localStorage.cryptoKey = JSON.stringify(fullKey);
        return localStorage.cryptoKey;
    }

    function AdbKeyInternal() {
        window.dd = this;

        this.fullKey = localStorage.cryptoKey;
        this.keyPromise = this.fullKey ? Promise.resolve(this.fullKey) : generateNewKeyPair();
    }

    AdbKeyInternal.prototype.sign = function (token) {
        const jwk = JSON.parse(this.fullKey);

        const key = new RSAKey();
        key.setPrivateEx(
            decodeWebBase64ToHex(jwk.n), decodeWebBase64ToHex(jwk.e),
            decodeWebBase64ToHex(jwk.d), decodeWebBase64ToHex(jwk.p),
            decodeWebBase64ToHex(jwk.q), decodeWebBase64ToHex(jwk.dp),
            decodeWebBase64ToHex(jwk.dq), decodeWebBase64ToHex(jwk.qi));

        // Message Layout (size equals that of the key modulus):
        // 00 01 FF FF FF FF ... FF [ASN.1 PREFIX] [TOKEN]
        const message = new Uint8Array(MODULUS_SIZE);

        // Initially just fill the buffer with the padding
        message.fill(0xFF);

        // add prefix
        message[0] = 0x00;
        message[1] = 0x01;

        // add the ASN.1 prefix
        message.set(
            SIGNING_ASN1_PREFIX,
            message.length - SIGNING_ASN1_PREFIX.length - token.length);

        // then the actual token at the end
        message.set(token, message.length - token.length);

        const messageInteger = new BigInteger(Array.apply([], message));
        const signature = key.doPrivate(messageInteger);
        return new Uint8Array(bigIntToFixedByteArray(signature, MODULUS_SIZE));
    };

    AdbKeyInternal.prototype.publicKey = async function () {
        const json = await this.keyPromise;
        const fullKey = JSON.parse(json);
        return fullKey.publicKey;
    };

    return AdbKeyInternal;

})();

// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const HEADER_LENGTH = 24;

const SYNC_COMMAND = 0x434e5953;
const CNXN_COMMAND = 0x4e584e43;
const OPEN_COMMAND = 0x4e45504f;
const OKAY_COMMAND = 0x59414b4f;
const CLSE_COMMAND = 0x45534c43;
const WRTE_COMMAND = 0x45545257;
const AUTH_COMMAND = 0x48545541;

const AUTH_TYPE_TOKEN = 1;
const AUTH_TYPE_SIGNATURE = 2;
const AUTH_TYPE_RSAPUBLICKEY = 3;

const commandMap =
    {
        SYNC_COMMAND:"SYNC_COMMAND",
        CNXN_COMMAND:"CNXN_COMMAND",
        OPEN_COMMAND:"OPEN_COMMAND",
        OKAY_COMMAND:"OKAY_COMMAND",
        CLSE_COMMAND:"CLSE_COMMAND",
        WRTE_COMMAND:"WRTE_COMMAND",
        AUTH_COMMAND:"AUTH_COMMAND",

    };

/**
 * ADB protocol version.
 */
const VERSION_SKIP_CHECKSUM = 0x01000001;
const VERSION = VERSION_SKIP_CHECKSUM;

/**
 * Compute the expected header magic value
 * command: number
 */
function computeAdbMessageHeaderMagic(command) {
    // >>> 0 forces to unsigned int
    return (command ^ 0xffffffff) >>> 0;
}

/**
 * data: Uint8Array
 */
function computeAdbMessageDataCrc32(data) {
    return data.reduce((sum, byte) => sum + byte, 0);
}


/**
 * Construct a header from the given properties for the given data.
 * command: number
 * arg0: number
 * arg1: number
 * data?: Uint8Array
 * @return AdbMessageHeader object
 */
function constructAdbHeader(command, arg0, arg1, data, version) {
    let checksum;
    if (version >= VERSION_SKIP_CHECKSUM && command != AUTH_COMMAND && command != CNXN_COMMAND) {
        checksum = 0;
    } else if (data) {
        checksum = computeAdbMessageDataCrc32(data);
    } else {
        checksum = 0;
    }
    return {
        command: command,
        arg0: arg0,
        arg1: arg1,
        data_length: data ? data.byteLength : 0,
        data_crc32: checksum,
        magic: computeAdbMessageHeaderMagic(command),
    };
}

/**
 * Serialize a message header into bytes that should be sent to the device.
 * header: AdbMessageHeader
 * @see #constructAdbHeader
 */
function serializeAdbMessageHeader(header) {
    const buffer = new ArrayBuffer(HEADER_LENGTH);
    const dataView = new DataView(buffer);
    dataView.setUint32(0, header.command, true);
    dataView.setUint32(4, header.arg0, true);
    dataView.setUint32(8, header.arg1, true);
    dataView.setUint32(12, header.data_length, true);
    dataView.setUint32(16, header.data_crc32, true);
    dataView.setUint32(20, header.magic, true);
    return new Uint8Array(buffer);
}

/**
 * Convert an ascii string to a byte array.
 */
function stringToByteArray(str) {
    const data = new Uint8Array(str.length);
    for (let i = 0; i < str.length; ++i) {
        data[i] = str.charCodeAt(i);
    }
    return data;
}

/**
 * Parse a message header from the buffer. Will throw if the header is
 * malformed.
 * data: Uint8Array
 */
function parseAndVerifyAdbMessageHeader(data) {
    if (data.byteLength !== HEADER_LENGTH) {
        throw new Error(`Incorrect header size, ${data.byteLength}`);
    }
    const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
    const header = {
        command: dataView.getUint32(0, true),
        arg0: dataView.getUint32(4, true),
        arg1: dataView.getUint32(8, true),
        data_length: dataView.getUint32(12, true),
        data_crc32: dataView.getUint32(16, true),
        magic: dataView.getUint32(20, true),
    };
    if (header.magic !== computeAdbMessageHeaderMagic(header.command)) {
        throw new Error('Header magic value mismatch');
    }
    return header;
}

/**
 * Verify that the supplied data matches the header crc.
 * header: AdbMessageHeader
 * data: Uint8Array
 */
function verifyAdbMessageData(header, data) {
    if (header.data_crc32 !== computeAdbMessageDataCrc32(data)) {
        throw new Error('Data crc32 does not match header ' + header.data_crc32);
    }
}

/**
 * Appends to array buffers
 */
function appendBuffer(first, last) {
    const result = new Uint8Array(first.byteLength + last.byteLength);
    result.set(first, 0);
    result.set(last, first.byteLength);
    return result;
}


/**
 * Converts array buffer to string
 */
function ab2str(buf) {
    return String.fromCharCode.apply(null, buf);
}

// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const swapAltElements = function(arr) {
    for (let i = 0; i < arr.length; i += 2) {
        const tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
    }
};

function DataInputStream(data) {
    this.data = data;
    this.highFirst = true;
    this.pos = 0;

    this._view = new DataView(data.buffer);
}

DataInputStream.prototype.intMax = Math.pow(2, 32);
DataInputStream.prototype.shortMax = Math.pow(2, 16);
DataInputStream.prototype.intSignedMax = Math.pow(2, 31);

DataInputStream.prototype.read = function() {
    return this.data[this.pos++];
};

DataInputStream.prototype.readInt = function() {
    const pos = this.pos;
    this.pos += 4;
    return this._view.getInt32(pos, !this.highFirst);
};

DataInputStream.prototype.readShort = function() {
    const pos = this.pos;
    this.pos += 2;
    return this._view.getInt16(pos, !this.highFirst);
};

DataInputStream.prototype.readFloat = function() {
    const pos = this.pos;
    this.pos += 4;
    return this._view.getFloat32(pos, !this.highFirst);
};

DataInputStream.prototype.readDouble = function() {
    const pos = this.pos;
    this.pos += 8;
    return this._view.getFloat64(pos, !this.highFirst);
};

DataInputStream.prototype.readLong = function() {
    return this.readDouble(8);
};


DataInputStream.prototype.readStr = function(len) {
    if (len == undefined) {
        len = this.readInt();
    }
    let slice = this.data.subarray(this.pos, this.pos += 2 * len);
    if (this.highFirst) {
        swapAltElements(slice);
    }
    slice = new Uint16Array(slice.buffer, slice.byteOffset, len);
    return String.fromCharCode.apply(null, slice);
};

DataInputStream.prototype.readStrSmall = function() {
    const len = this.readShort();
    let slice = this.data.subarray(this.pos, this.pos += len);
    slice = new Uint8Array(slice.buffer, slice.byteOffset, len);
    return String.fromCharCode.apply(null, slice);
};

// Copyright 2018 Google LLC

function DataOutputStream() {
    this.data = [];
    this.highFirst = true;
}

DataOutputStream.prototype.intMax = Math.pow(2, 32);
DataOutputStream.prototype.shortMax = Math.pow(2, 16);
DataOutputStream.prototype.intSignedMax = Math.pow(2, 31);

/**
 * @param byte byte to write
 * @param pos optional position otherwise, data is written to the end.
 */
DataOutputStream.prototype.writeByte = function(byte, pos) {
    if (pos == undefined) pos = this.data.length;
    this.data[pos] = byte & 0x00FF;
};

DataOutputStream.prototype.writeBytes = function(bytes, pos) {
    if (pos == undefined) pos = this.data.length;
    const length = bytes.length;
    for (let i = 0; i < length; i++, pos++) {
        this.data[pos] = bytes[i];
    }
};

DataOutputStream.prototype.writeInt = function(number, pos) {
    if (this.highFirst) {
        this.writeBytes([((number & 0xFF000000) >> 24), ((number & 0x00FF0000) >> 16), ((number & 0xFF00) >> 8), (number & 0x00FF)], pos);
    } else {
        this.writeBytes([(number & 0x00FF), ((number & 0xFF00) >> 8), ((number & 0x00FF0000) >> 16), ((number & 0xFF000000) >> 24)], pos);
    }
};

DataOutputStream.prototype.writeFloat = function(number, pos) {
    let arr = new Float32Array(1);
    arr[0] = number;
    arr = new Int32Array(arr.buffer, arr.byteOffset);
    this.writeInt(arr[0]);
};

DataOutputStream.prototype.writeStr = function(str, doNotWriteLen) {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    let bufView = new Uint16Array(buf);
    for (let i = 0; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    bufView = new Uint8Array(buf);
    if (this.highFirst) {
        swapAltElements(bufView);
    }
    if (!doNotWriteLen) {
        this.writeInt(str.length);
    }
    this.writeBytes(bufView);
};

// Copyright 2018 Google LLC

const INTERFACE_CLASS = 255;
const INTERFACE_SUB_CLASS = 66;
const INTERFACE_PROTOCOL = 1;

const DEVICE_FILTER = {
    classCode: INTERFACE_CLASS,
    subclassCode: INTERFACE_SUB_CLASS,
    protocolCode: INTERFACE_PROTOCOL
};

const STATE_DISCONNECTED = 0;
const STATE_CONNECTING = 1;
const STATE_UNAUTHORIZED = 3;
const STATE_CONNECTED_DEVICE = 4;

const PROTOCOL_DEBUG = false;

/**
 * Maximum amount of data this client supports writing to a stream in one block.
 */
const MAX_DATA = 256 * 1024;

/**
 * System identity to send to the device.
 */
const SYSTEM_IDENTITY = 'host::web-hv';

const EMPTY_DATA = new Uint8Array(0);

function AdbDevice(device, usbInterface) {
    this.device = device;
    this.state = STATE_DISCONNECTED;
    this.interface = usbInterface;
    this.key = new AdbKey();

    // Maximum amount of data we can send in one transfer. We know its value once
    // we receive a 'CNXN' message from the device.
    this.maxPayload = 0x40000;

    this.inEndPoint = 0;
    this.outEndPoint = 0;
    this.streams = [];
    this.nextLocalId = 5;
    this.readyDeferred = [];
    this.closeDeferred = [];
    this.version = VERSION;
    this._sendMutex = new Mutex();

    const eps = usbInterface.alternates[0].endpoints;
    for (let i = 0; i < eps.length; i++) {
        if (eps[i].direction == "out") {
            this.outEndPoint = eps[i].endpointNumber;
        } else if (eps[i].direction == "in") {
            this.inEndPoint = eps[i].endpointNumber;
        }
    }
}

AdbDevice.prototype._setState = function (state) {
    if (this.state == state) {
        return;
    }
    this.state = state;
    if (this.stateCallback) {
        this.stateCallback(this.state);
    }
};

/*
 * command: number
 * arg0: number
 * arg1: number
 * data: Uint8Array
 */
AdbDevice.prototype._sendSinglePacketMessage = async function (command, arg0, arg1, data) {
    if (data && data.length > this.maxPayload) {
        throw new Error('Message too large for device.');
    }

    const headerData = serializeAdbMessageHeader(constructAdbHeader(command, arg0, arg1, data, this.version));
    await this.device.transferOut(this.outEndPoint, headerData);
    if (data && data.length > 0) {
        await this.device.transferOut(this.outEndPoint, data);
    }
};

/*
 * command: number
 * arg0: number
 * arg1: number
 * data: Uint8Array
 */
AdbDevice.prototype._sendMessage = async function (command, arg0, arg1, data) {
    if (this.readyDeferred.length) {
        await Promise.resolve(this.readyDeferred[this.readyDeferred.length - 1]);
    }
    // Send packets serially, otherwise headers might get mixed up
    const sendLock = await this._sendMutex.lock();
    try {
        if (PROTOCOL_DEBUG) ;
        if (!data) {
            await this._sendSinglePacketMessage(command, arg0, arg1);
        } else {
            let sentByteCount = 0;
            // If `data` is large, send the message as small chunks of at most
            // `this.maxPayload` bytes each. Wait for an `OKAY` from the device before
            // sending the next chunk, and re-send a header with every chunk.
            while (sentByteCount !== data.byteLength) {
                const length = Math.min(this.maxPayload, data.byteLength - sentByteCount);
                const chunk = data.subarray(sentByteCount, sentByteCount + length);
                sentByteCount += length;
                await this._sendSinglePacketMessage(command, arg0, arg1, chunk);
            }
        }
    } finally {
        sendLock();
    }
};

AdbDevice.prototype._readData = async function (length) {
    const result = await this.device.transferIn(this.inEndPoint, length);

    if (result.status === 'ok') {
        const view = result.data;
        return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
    } else {
        throw new Error('Transfer failed: ' + result.status);
    }
};

AdbDevice.prototype._doReadLoop = async function () {
    try {
        const headerData = await this._readData(HEADER_LENGTH);
        const header = parseAndVerifyAdbMessageHeader(headerData);
        if (header.data_length > 0) {
            const data = await this._readData(header.data_length);
            if (this.version != VERSION_SKIP_CHECKSUM) {
                verifyAdbMessageData(header, data);
            }
            this._handleMessage(header, data);
        } else {
            this._handleMessage(header, EMPTY_DATA);
        }
        this._doReadLoop(); // don't await
    } catch (e) {
        console.log("Error reading data", e);
    }
};

AdbDevice.prototype._resolveDeferred = function(localId, remoteId) {
    for (let i = 0; i < this.readyDeferred.length; i++) {
        if (this.readyDeferred[i].data == localId) {
            this.readyDeferred.splice(i, 1)[0].accept(remoteId);
            return true;
        }
    }
    return false;
};

AdbDevice.prototype._handleMessage = function (header, data) {
    switch (header.command) {
        case SYNC_COMMAND:
            throw new Error('sync not implemented');
        case CNXN_COMMAND:
            {
                if (this.state == STATE_CONNECTED_DEVICE) {
                    throw new Error('Received connect message after already connected');
                }
                if (header.arg0 != VERSION && header.arg0 != VERSION_SKIP_CHECKSUM) {
                    throw new Error(`Unexpected ADB version: ${header.arg0}`);
                }
                this.version = header.arg0;
                this.maxPayload = header.arg1;
                this._setState(STATE_CONNECTED_DEVICE);
                break;
            }
        case OPEN_COMMAND:
            throw new Error('open not implemented');
        case OKAY_COMMAND: {
            const localId = header.arg0;
            const remoteId = header.arg1;
            if (this.readyDeferred.length) {
                this._resolveDeferred(remoteId, localId);
            } else if (!this._findStream(remoteId, localId)) {
                this._sendMessage(CLSE_COMMAND, remoteId, localId);
            }
            break;
        }
        case CLSE_COMMAND: {
            // Resolve all pending OKAYs
            while(this._resolveDeferred(header.arg1, header.arg0));

            const localId = header.arg0;
            const remoteId = header.arg1;
            const stream = this._findStream(remoteId, localId);
            if (stream) {
                stream.onReceiveClose();
            }
            break;
        }
        case WRTE_COMMAND: {

            const localId = header.arg0;
            const remoteId = header.arg1;
            const stream = this._findStream(remoteId, localId);
            if (stream) {
                stream.onReceiveWrite(data);
            } else {
                console.log("Not found" , localId, remoteId);
            }
            break;
        }
        case AUTH_COMMAND:
            const authType = header.arg0;
            switch (authType) {
                case AUTH_TYPE_TOKEN:
                    this._onReceiveAuthToken(data);
                    break;
                case AUTH_TYPE_SIGNATURE:
                    throw new Error('auth signature not implemented');
                case AUTH_TYPE_RSAPUBLICKEY:
                    throw new Error('auth rsapublickey not implemented');
                default:
                    throw new Error(`Unknown auth command type: ${authType}`);
            }
            break;
        default:
            throw new Error(`Unknown command: ${header.command}`);
    }
};

AdbDevice.prototype._findStream = function (localId, remoteId) {
    const stream = this.streams[localId];
    if (stream && (stream.remoteId === 0 || remoteId === stream.remoteId || remoteId === 0)) {
        if (remoteId != 0) {
            stream.remoteId = remoteId;
        }
        return stream;
    } else {
        return undefined;
    }
};


/**
 * data: Uint8Array
 */
AdbDevice.prototype._onReceiveAuthToken = async function (data) {
    if (this.state != STATE_CONNECTING && this.state != STATE_UNAUTHORIZED) {
        throw new Error(`Received auth message while in state: ${this.state}`);
    }
    this._setState(STATE_UNAUTHORIZED);
    console.info('received adb auth token');

    if (this.key.fullKey) {
        const signature = await this.key.sign(data);
        // Clear the private key so that next time we generate a new public key
        this.key.fullKey = null;
        this._sendMessage(AUTH_COMMAND, AUTH_TYPE_SIGNATURE, 0, signature);
    } else {
        // Generate and save a new signature
        const pk = await this.key.publicKey();
        this._sendMessage(AUTH_COMMAND, AUTH_TYPE_RSAPUBLICKEY, 0, stringToByteArray(pk + "\0"));
    }
};

AdbDevice.prototype.connect = async function () {
    this._setState(STATE_CONNECTING);
    this._doReadLoop();
    await this._sendMessage(CNXN_COMMAND, VERSION, MAX_DATA, stringToByteArray(SYSTEM_IDENTITY));
};

const STREAM_OPEN = 0;
const STREAM_CLOSING = 1;
const STREAM_CLOSED = 2;

function AdbStream(device, localId) {
    this.device = device;
    this.localId = localId;
    this.remoteId = 0;
    this.pending = [];
    this.remoteIdResolved = deferred(this.localId);
    this.keepOpen = false;
    this.state = STREAM_OPEN;
}

AdbStream.prototype.write = async function (data) {
    if (this.state != STREAM_OPEN) {
        throw "Stream no longer valid";
    }
    this.remoteId = await Promise.resolve(this.remoteIdResolved);
    if (data.constructor == String) {
        data = stringToByteArray(data);
    }
    this.device._sendMessage(WRTE_COMMAND, this.localId, this.remoteId, data);
    const ok = deferred(this.localId);
    this.device.readyDeferred.push(ok);
    return ok;
};

AdbStream.prototype.close = function () {
    this.device._sendMessage(CLSE_COMMAND, this.localId, this.remoteId);
    if (this.state == STREAM_OPEN) {
        this.state = STREAM_CLOSING;
    }
};

AdbStream.prototype.onReceiveClose = function () {
    this.device.streams[this.localId] = undefined;
    this.state = STREAM_CLOSED;
    if (this.onClose) {
        this.onClose();
    }
};

AdbStream.prototype.onReceiveWrite = function (data) {
    if (this.keepOpen) {
        this.sendReady();
    }
    if (data && data.length) {
        this.pending.push(data);
    }
    if (!this.pending.length) return;
    if (this.pendingCallback) {
        const callback = this.pendingCallback;
        this.pendingCallback = null;
        this.read(this.pendingLength, callback);
    }
};

AdbStream.prototype.read = function (length, callback) {
    this.pendingLength = length;
    let result = null;
    let totalRead = 0;
    while (this.pending.length) {
        let entry = this.pending.shift();
        if (!this.pendingLength) {
            result = entry;
            break
        }
        const remaining = this.pendingLength - totalRead;
        if (entry.byteLength > remaining) {
            // Add back extra bytes
            const tmp = entry.subarray(0, remaining);
            const extra = entry.subarray(remaining);
            this.pending.unshift(extra);
            entry = tmp;
        }
        totalRead += entry.byteLength;
        result = result ? appendBuffer(result, entry) : entry;
        if (totalRead == this.pendingLength) break;
    }
    if (result != null && this.pendingLength != 0 && result.byteLength != this.pendingLength && result.byteLength != 0) {
        this.pending.unshift(result);
        result = null;
    }
    if (result) {
        this.pendingCallback = null;
        callback(result);
    } else {
        if (this.pendingCallback) throw new Error("double callback");
        this.pendingCallback = callback;
    }
};

AdbStream.prototype.sendReady = function () {
    this.device._sendMessage(OKAY_COMMAND, this.localId, this.remoteId);
};

AdbStream.prototype.readAll = function (responseMerger) {
    const result = deferred();

    if (!responseMerger) {
        responseMerger = new TextResponseMerger();
    }

    this.onReceiveWrite = function (data) {
        responseMerger.merge(data);
    };
    this.pending.forEach(this.onReceiveWrite);
    this.onClose = function () {
        result.accept(responseMerger.result);
    };
    return result;
};

/**
 * Merger to read all data as text
 */
function TextResponseMerger() {
    this.result = "";
    this.decoder = new TextDecoder();
}
TextResponseMerger.prototype.merge = function (data) {
    this.result += this.decoder.decode(data);
};

AdbDevice.prototype.openStream = function (command) {
    const localId = this.nextLocalId++;
    const stream = new AdbStream(this, localId);
    this.streams[localId] = stream;
    this._sendMessage(OPEN_COMMAND, localId, 0, stringToByteArray(command + "\0"));
    this.readyDeferred.push(stream.remoteIdResolved);
    return stream;
};

AdbDevice.prototype.shellCommand = function (command) {
    return this.openStream("shell:" + command).readAll();
};

AdbDevice.prototype.closeAll = function () {
    console.log("Closing all");
    for (let i = 0; i < this.streams.length; i++) {
        if (this.streams[i]) {
            this.streams[i].onClose = null;
            this.streams[i].close();
        }
    }
};

AdbDevice.prototype.disconnect = function() {
    try {
        this.device.releaseInterface(this.interface.interfaceNumber);
        this.disconnectedDevice = true;
    } catch (e) {
        console.log(e);
    }
};

AdbDevice.prototype.sendFile = async function (targetPath, sourcePath) {
    let data = await doXhr$1(sourcePath, "arraybuffer");
    const stream = this.openStream("sync:");

    // Send request
    let out = new DataOutputStream();
    out.highFirst = false;
    const path = new Uint8Array(stringToByteArray(targetPath + ",0755"));
    out.writeBytes(new Uint8Array(stringToByteArray("SEND")));
    out.writeInt(path.length);
    out.writeBytes(path);
    stream.write(new Uint8Array(out.data));

    // File data
    // TODO: Handle large files in 64k chunks
    data = new Uint8Array(data);
    out = new DataOutputStream();
    out.highFirst = false;
    out.writeBytes(new Uint8Array(stringToByteArray("DATA")));
    out.writeInt(data.length);
    out.writeBytes(data);
    stream.write(new Uint8Array(out.data));

    // End of Data
    out = new DataOutputStream();
    out.highFirst = false;
    out.writeBytes(new Uint8Array(stringToByteArray("DONE")));
    out.writeInt(0);
    stream.write(new Uint8Array(out.data));

    const response = deferred();
    stream.read(4, function (data) {
        response.accept(ab2str(data));
    });

    const okay = await response;
    stream.close();
    if ("OKAY" != okay) {
        throw "Transfer failer";
    }
};

// Copyright 2018 Google LLC

function jdwp(pid, device) {
    this.device = device;
    this.pid = pid;
    this.seq = 1;

    this.callbacks = [];

    this.status = this.STATUS_DISCONNECTED;
    this.pendingCalls = [];
}

jdwp.prototype.STATUS_DISCONNECTED = 0;
jdwp.prototype.STATUS_CONNECTING = 1;
jdwp.prototype.STATUS_CONNECTED = 2;

jdwp.prototype._onDisconnect = function () {
    this.status = this.STATUS_DISCONNECTED;
    for (let i = 0; i < this.callbacks.length; i++) {
        if (this.callbacks[i]) {
            this.callbacks[i].reject();
        }
    }
    this.callbacks = [];
    this.pendingCalls = [];
    this.socket = null;
    if (this.onClose) {
        this.onClose();
    }
};

jdwp.prototype._connect = function () {
    const that = this;
    this.status = this.STATUS_CONNECTING;

    const socket = this.device.openStream("jdwp:" + this.pid);
    socket.onClose = this._onDisconnect.bind(this);
    socket.keepOpen = true;

    const cmd = "JDWP-Handshake";
    socket.read(cmd.length, function (data) {
        data = ab2str(data);
        if (data == cmd) {
            that._onConnect();
        } else {
            socket.close();
        }
    });
    socket.write(cmd);
    this.socket = socket;
};

jdwp.prototype._onConnect = function () {
    this.status = this.STATUS_CONNECTED;
    const calls = this.pendingCalls;
    this.pendingCalls = [];

    for (let i = 0; i < calls.length; i++) {
        this.socket.write(calls[i]);
    }
    this._readNextChunk();
};

jdwp.prototype._readNextChunk = function () {
    const that = this;
    this.socket.read(11, function (data) {
        const header = new DataInputStream(new Uint8Array(data));
        const len = header.readInt();
        const seq = header.readInt();
        const flags = header.read();
        const isCommand = flags != 128;

        that.socket.read(len - 11, function (data) {
            const reader = new DataInputStream(new Uint8Array(data));
            const type = reader.readInt();   // chunk type
            reader.readInt();   // result length;

            if (isCommand) {
                console.log("Command received", type, getChunkType("APNM"));
            } else {
                reader.chunkType = type;
                that.callbacks[seq].accept(reader);
                that.callbacks[seq] = null;
            }
            that._readNextChunk();
        });
    });
};

jdwp.prototype.destroy = function () {
    this.pendingCalls = [];
    if (this.socket) {
        this.socket.close();
    }
};

/**
 * @param type String or int chunk type
 * @param data byte array or DataOutputStream
 * @returns a promise for the result
 */
jdwp.prototype.writeChunk = function (type, data) {
    const result = deferred();
    if (data.constructor == DataOutputStream) {
        data = data.data;
    }

    let packet = new DataOutputStream();
    packet.writeInt(11 + 8 + data.length); // package length

    const seq = this.seq++;
    packet.writeInt(seq);

    packet.writeByte(0);    // flags
    packet.writeByte(0xc7); // 'G' + 128
    packet.writeByte(0x01); // DDMS command

    packet.writeInt(getChunkType(type));
    packet.writeInt(data.length);
    packet.writeBytes(data);
    packet = new Uint8Array(packet.data);

    this.callbacks[seq] = result;

    if (this.status != this.STATUS_CONNECTED) {
        this.pendingCalls.push(packet);
        if (this.status == this.STATUS_DISCONNECTED) {
            this._connect();
        }
    } else {
        this.socket.write(packet);
    }
    return result;
};

const CHUNK_TYPES = {};
const getChunkType = function (type) {
    if (type.constructor == String) {
        if (CHUNK_TYPES[type] == undefined) {
            const buf = new ArrayBuffer(4);
            const arr = new Uint8Array(buf);
            for (let i = 0; i < 4; i++) {
                arr[3 - i] = type.charCodeAt(i);
            }
            CHUNK_TYPES[type] = new Int32Array(buf)[0];
        }
        return CHUNK_TYPES[type];
    } else {
        return type;
    }
};

// Copyright 2018 Google LLC

function DDMClient(device, callbacks) {
    device.closeAll();

    this.callbacks = callbacks;
    this.device = device;
    this.processCache = {};
    this.reloadCount = 0;
    this.workingOnWindowList = true;
    this.processNameErrorCount = 0;
    this.processCount = 0;

    this.iconLoader = device.sendFile("/data/local/tmp/processicon.jar", "commands/processicon.jar");
    this.loadProp("density", "ro.sf.lcd_density");
    this.loadProp("sdk_version", "ro.build.version.sdk");
}

DDMClient.prototype.loadProp = async function (property, command) {
    this[property] = -1;
    const msg = await this.device.shellCommand("getprop " + command);
    if (msg != "") {
        this[property] = parseInt(msg);
    }
};

DDMClient.prototype.loadOldWindows = async function () {
    // Stop window service and start it again
    await this.device.shellCommand("service call window 2");
    await this.device.shellCommand("service call window 1 i32 4939");

    const stream = this.device.openStream("tcp:4939");
    stream.onReceiveWrite = function (result) {
        result = ab2str(result);
        stream.sendReady();
        if (result.indexOf("LIST UPDATE") > -1) {
            this._listOldWindows();
            this.reloadWindows();
        }
    }.bind(this);
    stream.write("AUTOLIST\n");
    this._listOldWindows();
};

DDMClient.prototype._listOldWindows = async function () {
    if (!this.workingOnWindowList) return;

    const stream = this.device.openStream("tcp:4939");
    stream.write("LIST\n");

    let list = await stream.readAll();
    list = list.trim().split("\n");

    const result = [];
    for (let i = 0; i < list.length - 1; i++) {
        const parts = list[i].split(" ");
        result.push({
            type: TYPE_OLD,
            name: parts[1].trim(),
            id: parts[0].trim(),
            density: this.density,
            sdk_version: this.sdk_version,
            device: this.device,
            use_new_api : false
        });
    }
    result.use_new_api = false;
    if (this.workingOnWindowList) {
        this.callbacks.windowsLoaded(result);
    }
};

DDMClient.prototype.readProcessList = function (socket) {
    const that = this;
    socket.read(4, function (data) {
        const len = parseInt(ab2str(data), 16);
        socket.read(len, function (data) {
            const list = ab2str(data).trim();
            that.parseProcessList(list.split("\n"));
            that.readProcessList(socket);
        });
    });
};

DDMClient.prototype.trackProcesses = function () {
    const stream = this.device.openStream("track-jdwp");
    this.readProcessList(stream);
};

DDMClient.prototype.parseProcessList = function (list) {
    const oldCache = this.processCache;
    const newCache = {};
    this.processCache = newCache;
    this.processCount = list.length;
    for (let i = 0; i < list.length; i++) {
        const pid = list[i];
        if (oldCache[pid]) {
            // process already exists
            newCache[pid] = oldCache[pid];
            oldCache[pid] = null;
        } else {
            // Load process name
            this.loadProcessName(pid);
        }
    }

    for (let pid in oldCache) {
        if (oldCache[pid]) {
            if (oldCache[pid].jdwp) {
                oldCache[pid].jdwp.destroy();
            }
        }
    }
    this.reloadWindows();
};

DDMClient.prototype.loadProcessName = async function (pid) {
    const loader = new jdwp(pid, this.device);
    this.processCache[pid] = { jdwp: loader };

    try {
        const data = await loader.writeChunk("HELO", [0, 0, 0, 1]);
        data.readInt(); // server version
        data.readInt(); // process id

        const vmlen = data.readInt();
        const len = data.readInt();
        data.readStr(vmlen);    // VM description len

        const name = data.readStr(len);

        if (this.processCache[pid]) {
            this.processCache[pid].name = name;
        }
    } catch (e) {
        // Unable to load process name
        this.processNameErrorCount++;
        if (this.processNameErrorCount >= this.processCount) {
            this.callbacks.jdwpError();
        }
    }
};

DDMClient.prototype.reloadWindows = async function () {
    this.reloadCount++;
    const myCount = this.reloadCount;

    const windowToIdMap = {};

    for (const pid in this.processCache) {
        this._loadWindowsForPid(pid, myCount, windowToIdMap).catch(e => {});
    }
};

DDMClient.prototype._newWindowLoaded = function (myCount, windowToIdMap) {
    if (myCount != this.reloadCount) {
        // This is called from some old call
        return;
    }
    let windowList = [];
    for (const pid in windowToIdMap) {
        windowList = windowList.concat(windowToIdMap[pid]);
    }
    if (windowList.length == 0) return;
    if (this.workingOnWindowList) {
        this.workingOnWindowList = false;
    }
    windowList.sort(function (a, b) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    });

    windowList.use_new_api = this.sdk_version >= 23;
    this.callbacks.windowsLoaded(windowList);
};

DDMClient.prototype._loadWindowsForPid = async function (pid, myCount, windowToIdMap) {
    const jdwp = this.processCache[pid].jdwp;
    const data = await jdwp.writeChunk("VULW", [0, 0, 0, 1]);
    if (myCount != this.reloadCount) {
        return;
    }
    const count = data.readInt();
    const windowList = [];

    for (let i = 0; i < count; i++) {
        const id = data.readStr();
        let name = id;

        if (this.processCache[pid].icon == undefined) {
            const iconGetter = this._getIconForPid(pid);
            const that = this;
            iconGetter.then(v =>  {
                iconGetter.value = v;
                that.callbacks.iconLoaded(pid, v);
            });
            this.processCache[pid].icon = iconGetter;
        }

        if (count == 1) {
            name = name.split("/")[0];
        } else {
            name = name.substr(0, name.lastIndexOf("/"));
        }
        windowList.push({
            type: TYPE_JDWP,
            pid: pid,
            device: this.device,
            id: id,
            density: this.density,
            sdk_version: this.sdk_version,
            name: name,
            use_new_api: this.sdk_version >= 23,
            pname: this.processCache[pid].name,
            icon: this.processCache[pid].icon
        });
    }

    windowToIdMap[pid] = windowList;
    this._newWindowLoaded(myCount, windowToIdMap);
};

DDMClient.prototype._getIconForPid = async function (pid) {
    await this.iconLoader;
    const response = (await this.device.shellCommand(
        "export CLASSPATH=/data/local/tmp/processicon.jar;exec app_process /system/bin ProcessIcon " + pid)).split("\n", 2);
    if ("OKAY" != response[0]) {
        throw "Unable to fetch icon";
    }
    const r = createBlobFromDataUrl(response[1], "image/png");

    // console.log("Loading icon for " + pid);

    return r;
};

function createViewController(appInfo) {
    resetActiveState();

    if (appInfo.type == TYPE_ZIP) {
        return new OfflineServiceController(appInfo)
    } else if (appInfo.type == TYPE_OLD) {
        return new ViewServiceController(appInfo);
    } else if (appInfo.type == TYPE_BUG_REPORT) {
        return new BugReportServiceControllerLegacy(appInfo);
    } else if (appInfo.type == TYPE_BUG_REPORT_V2) {
        return new BugReportServiceController(appInfo);
    } else {
        return new JdwpController(appInfo);
    }
}

function parseViewData(data, cmd, callback) {
    const w = createWorker("js/ddmlib/worker.js");
    w.onerror = function () {
        callback.reject("Error parsing view data");
    };
    w.onmessage = function (e) {
        callback.accept(e.data.viewHierarchyData);
    };
    w.postMessage({ cmd: cmd, data: data });
}

/**
 * Controller based on offline data
 */
class OfflineServiceController {
    constructor(appInfo) {
        this.zip = appInfo.data;
        this.density = appInfo.config.density ? appInfo.config.density : -1;
        this.sdk_version = appInfo.config.sdk_version ? appInfo.config.sdk_version : -1;
        this.use_new_api = appInfo.config.use_new_api;
    }
    loadViewList() {
        const result = deferred();
        const text = this.zip.file("hierarchy.txt").asText();
        if (!text) {
            result.reject("Unable to load data");
        }
        else {
            let cmd = CMD_PARSE_OLD_DATA;
            if (!this.use_new_api) {
                cmd = cmd | CMD_USE_PROPERTY_MAP;
            }
            parseViewData(text, cmd, result);
        }
        return result;
    }
    async captureView(viewName) {
        const file = this.zip.file("img/" + viewName + ".png");
        if (!file) {
            throw "Image not found";
        }
        return file.asUint8Array();
    }
}

class BugReportServiceController {
    constructor(appInfo) {
        this.data = appInfo.data;
        this.use_new_api = true;
        const display = appInfo.display;
        this.display = null;
        if (display.width != undefined && display.width > 0 && display.height != undefined && display.height > 0) {
            this.display = display;
            if (display.density > 0) {
                this.density = display.density;
            }
        }
        this.hasNoImage = true;
    }

    loadViewList_(result) {
        parseViewData(this.data, 0, result);
    }
    loadViewList() {
        const result = deferred();
        this.loadViewList_(result);

        if (this.display != null) {
            const that = this;
            result.then(node => {
                if (node.windowX != undefined && node.windowY != undefined) {
                    const crop = [node.windowX, node.windowY, node.width, node.height];
                    that.loadScreenshot = function () {
                        return pickPngAndCrop(that.display, crop);
                    };
                }
            });
        }
        return result;
    }

    async captureView(viewName) {
        throw "Image not found";
    }
}

class BugReportServiceControllerLegacy extends BugReportServiceController {
    constructor(appInfo) {
        super(appInfo);
    }

    loadViewList_(result) {
        const bytes = base64ToUint8Array(this.data);
        parseViewData(bytes, CMD_DEFLATE_STRING, result);
    }
}

function pickPngAndCrop(display, crop) {
    const result = deferred();
    const el = $("<input type='file' accept='.png' />");
    el.on("change", function () {
		if (!this.files || this.files.length < 1) {
			return;
		}
        const file = this.files[0];
		const reader = new FileReader();
		reader.onload = function () {
            const img = createImageBitmap(new Blob([new Uint8Array(reader.result)]));
            img.then(d => {
                const canvas = document.createElement('canvas');
                canvas.width = crop[2]; canvas.height = crop[3];
                const ctx = canvas.getContext('2d');
                const sx = d.width / display.width;
                const sy = d.height / display.height;
                ctx.drawImage(d, crop[0] * sx, crop[1] * sy, crop[2] * sx, crop[3] * sy, 0, 0, crop[2], crop[3]);

                const dataurl = canvas.toDataURL();
                const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
                result.accept(createBlobFromDataUrl(arr[1], mime));
            });
		};
		reader.readAsArrayBuffer(file);
    });
    el.click();
    return result;
}

function createBlobFromDataUrl(dataUrl, mime) {
    const bstr = atob(dataUrl);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return createUrl(new Blob([u8arr], {type:mime}));
}

function serializeNode(root) {
    let result = "";

    const printNode = function (node, shift) {
        let line = shift + node.name + " ";
        for (let i = 0; i < node.properties.length; i++) {
            const p = node.properties[i];
            let value = p.value + "";
            if (value == "") value = "null";
            value = value.replace(/(\r|\n)/g, ' ');

            line += p.fullname + "=" + value.length + "," + value + " ";
        }
        result += line + "\n";
        for (let i = 0; i < node.children.length; i++) {
            printNode(node.children[i], shift + " ");
        }
    };
    printNode(root, "");
    result += "DONE.\n";
    return result;
}

/**
 * Controller based on view service
 */
class ViewServiceController {
    constructor(appInfo) {
        this.id = appInfo.id;
        this.port = appInfo.port;
        this.density = appInfo.density;
        this.sdk_version = appInfo.sdk_version;
        this.use_new_api = false;
        this.device = appInfo.device;
    }
    async loadViewList() {
        const stream = this.device.openStream("tcp:4939");
        stream.write("DUMP " + this.id + "\n");
        const text = await stream.readAll();
        const result = deferred();
        parseViewData(text, CMD_PARSE_OLD_DATA | CMD_USE_PROPERTY_MAP, result);
        return await result;
    }
    captureView(viewName) {
        const stream = this.device.openStream("tcp:4939");
        stream.write("CAPTURE " + this.id + " " + viewName + "\n");
        return stream.readAll(new ByteResponseMerger());
    }
    profileView(viewName) {
        const stream = this.device.openStream("tcp:4939");
        stream.write("PROFILE " + this.id + " " + viewName + "\n");
        return stream.readAll();
    }
}

/**
 * Controller based on jdwp protocol
 */
class JdwpController {
    constructor(appInfo) {
        this.windowId = appInfo.id;
        this.pid = appInfo.pid;
        this.device = appInfo.device;
        this.density = appInfo.density;
        this.sdk_version = appInfo.sdk_version;
        this.jdwp = new jdwp(this.pid, this.device);
        this.use_new_api = appInfo.use_new_api;
    }
    async loadViewList() {
        const req = new DataOutputStream();
        req.writeInt(1); // VURT_DUMP_HIERARCHY
        req.writeStr(this.windowId); // root view
        req.writeInt(0); // Do not skip children
        req.writeInt(1); // Include properties
        let cmd = CMD_CONVERT_TO_STRING | CMD_PARSE_OLD_DATA | CMD_USE_PROPERTY_MAP;
        if (this.use_new_api) {
            req.writeInt(1); // Use v2
            cmd = CMD_SKIP_8_BITS;
        }
        const reader = await this.jdwp.writeChunk("VURT", req);
        throwIfFail(reader);
        const result = deferred();
        parseViewData(reader.data, cmd, result);
        return await result;
    }
    async captureView(viewName) {
        const req = new DataOutputStream();
        req.writeInt(1); // VUOP_CAPTURE_VIEW
        req.writeStr(this.windowId); // root view
        req.writeStr(viewName); // target view
        const reader = await this.jdwp.writeChunk("VUOP", req);
        throwIfFail(reader);
        return new Uint8Array(reader.data.buffer, 8);
    }
    async profileView(viewName) {
        const req = new DataOutputStream();
        req.writeInt(3); // VUOP_PROFILE_VIEW
        req.writeStr(this.windowId); // root view
        req.writeStr(viewName); // target view
        const reader = await this.jdwp.writeChunk("VUOP", req);
        throwIfFail(reader);
        return new TextDecoder().decode(new Uint8Array(reader.data.buffer, 8));
    }
    async customCommand(viewName, commandData) {
        const req = new DataOutputStream();
        req.writeInt(4); // VUOP_INVOKE_VIEW_METHOD
        req.writeStr(this.windowId); // root view
        req.writeStr(viewName); // target view
        req.writeBytes(commandData);
        const reader = await this.jdwp.writeChunk("VUOP", req);
        throwIfFail(reader);
    }
}

function throwIfFail(reader) {
    if (reader.chunkType == getChunkType("FAIL")) {
        reader.readInt();   // Error code
        throw reader.readStr();
    }
}

// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Loads the source code for the motion viewer and bootstraps it.
 *
 * This is currently needed as the rest of web-hv does not yet use es6 modules.
 */
async function motionViewerActionTrampoline(activityInfo) {
    $("#main-progress").show();
    $("#device-list-content").empty().hide();
    $("#darkThemeSwitch").remove();

    // TODO(michschn): make both github deployment and local dev work.
    // Was unable to get rollup-replace to work, working around this for now.
    let githubDeploymentPrefix = '';
    if (window.location.pathname.startsWith('/web-hv/')) {
        githubDeploymentPrefix = '/web-hv';
    }

    const {
        motionViewerAction,
    } = await import(`${githubDeploymentPrefix}/motion/motion_action.js`);

    $("#main-progress").hide();
    await motionViewerAction(activityInfo);
}

// Copyright 2021 Google LLC

function createJmuxPlayer(container) {
    console.log("Using jmuxplayer");
    const ret = {
        el: $("<video autoplay>").appendTo(container)
    };

    ret.onFirstFrame = () => { };
    ret.onMetadata = () => { };

    ret.el.on("loadedmetadata", () => {
        ret.onMetadata();
    });

    const jmuxer = new JMuxer({
        node: ret.el.get(0),
        mode: 'video',
        debug: false,
        flushingTime: 1,
        clearBuffer: true,
        fps: 120
    });

    ret.destroy = () => { };
    ret.videoWidth = () => ret.el.get(0).videoWidth;
    ret.videoHeight = () => ret.el.get(0).videoHeight;
    ret.resize = (w, h) => ret.el.css({width: w + "px", height: h + "px"});
    ret.resize(0, 0);

    ret.feed = function(data) {
        const firstFrame = jmuxer.kfCounter <= 0;
        jmuxer.feed({video: data});
        if (firstFrame && jmuxer.kfCounter > 0) {
            ret.onFirstFrame();
        }
    };
    return ret;
}

function createDecoderPlayer(container) {
    console.log("Using video decoder");
    const NDR = 1;
    const IDR = 5;
    const SPS = 7;
    const PPS = 8;

    const ret = {
        el: $("<canvas>").appendTo(container)
    };
    ret.onFirstFrame = () => { };
    ret.onMetadata = () => { };

    const canvas = ret.el.get(0);
    const ctx = canvas.getContext('2d');

    let lastFrame = null;

    async function onFrame(frame) {
        const isFirst = lastFrame == null;
        if (lastFrame != null) {
            lastFrame.close();
        }
        lastFrame = frame;
        if (isFirst) {
            ret.onMetadata();
            ret.onFirstFrame();
        }

        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
    }
    const decoder = new VideoDecoder({
        output: onFrame,
        error: e => console.error(e),
    });

    ret.destroy = () => { };
    ret.videoWidth = () => lastFrame.displayWidth;
    ret.videoHeight = () => lastFrame.displayHeight;
    ret.resize = (w, h) => {
        canvas.width = w;
        canvas.height = h;
        if (lastFrame != null) {
            ctx.drawImage(lastFrame, 0, 0, canvas.width, canvas.height);
        }
    };
    ret.resize(0, 0);

    function naul(data) {
        this.data = data;
        this.type = data[0] & 0x1f;
    }

    let pendingFrames = [];
    let pendingBytes = null;
    let configPending = true;

    function createConfig(header) {
        // Create description:
        const sps = header.sps[0].data;
        const pps = header.pps[0].data;
        return {
            codec: 'avc1.' + new DataView(sps.buffer, sps.byteOffset).getUint32(0).toString(16).substr(-6),
            description: Uint8Array.from(
                [1, sps[1], sps[2], sps[3], 255, 0xE0 | 1, (sps.length >> 8) & 0xFF, sps.length & 0xFF]
                .concat(...sps)
                .concat([1, (pps.length >> 8) & 0xFF, pps.length & 0xFF])
                .concat(...pps)),
        }
    }

    function parseNALu(buffer) {
        if (pendingBytes != null) {
            buffer = appendBuffer(pendingBytes, buffer);
        }

        const dv = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        const len = buffer.byteLength - 4;
        let endPos, lastPos = 0;

        for (let i = 0; i < len; i++) {
            if ((dv.getUint32(i) >> 8) == 1) {
                endPos = i;
                if (i > 0 && buffer[i - 1] == 0) {
                    endPos = i - 1;
                }
                if (endPos > lastPos) {
                    pendingFrames.push(new naul(buffer.subarray(lastPos, endPos)));
                }
                lastPos = i + 3;
            }
        }

        pendingBytes = buffer.subarray(lastPos);
    }

    let frameeNo = 0;

    ret.feed = function(data) {
        parseNALu(data);

        if (configPending) {
            const header = {
                sps: [],
                pps: [],
                ready: false
            };
            for (let i = 0; i < pendingFrames.length; i++) {
                switch (pendingFrames[i].type) {
                    case SPS:
                        header.sps.push(pendingFrames[i]);
                        break;
                    case PPS:
                        header.pps.push(pendingFrames[i]);
                        break;
                    case IDR:
                    case NDR:
                        header.ready = true;
                        break;
                }
            }
            if (header.ready && header.pps.length && header.sps.length) {
                decoder.configure(createConfig(header));
                configPending = false;
            }
        }
        if (configPending) {
            return;
        }

        let pendingPayload = null;
        for (let i = 0; i < pendingFrames.length; i++) {
            let push = false;
            let isKey = false;
            switch (pendingFrames[i].type) {
                case IDR:
                case NDR:
                    push = true;
                case SPS:
                case PPS: {
                    const data = pendingFrames[i].data;
                    const load = new Uint8Array(4 + data.byteLength);
                    new DataView(load.buffer).setUint32(0, data.byteLength);
                    load.set(data, 4);

                    isKey = pendingPayload != null;

                    pendingPayload = pendingPayload == null ? load : appendBuffer(pendingPayload, load);
                }
            }
            if (push) {
                const chunk = new EncodedVideoChunk({
                    type: isKey ? "key" : "delta",
                    timestamp: (frameeNo++) * 16,
                    duration: 16,
                    data: pendingPayload
                  });
                  decoder.decode(chunk);
                  pendingPayload = null;
            }
        }
        pendingFrames = [];
    };
    return ret;
}

const deviceMirrorAction = async function() {
    backStack.add("?mode=mirror");
    $("#main-progress").show();
    $("#device-list-content").empty().hide();
    $("#darkThemeSwitch").remove();
    $("#dmirrorview").removeClass("hide").removeClass("hidden");

    const player = window.VideoDecoder ? createDecoderPlayer("#dmirrorview .frame") : createJmuxPlayer("#dmirrorview .frame");

    resetActiveState();
    let inputChannelRunning = true;
    let videoSizeFactor = 1;

    ActiveState.push(function () {
        inputChannelRunning = false;
        adbDevice.closeAll();
        player.destroy();
    });

    async function startInputChannel() {
        await adbDevice.sendFile("/data/local/tmp/inputserver.jar", "commands/inputserver.jar");
        let stream;
        function loopStream() {
            stream = adbDevice.openStream(`shell:export CLASSPATH=/data/local/tmp/inputserver.jar;exec app_process /system/bin InputServer`);
            stream.onReceiveWrite = r => stream.sendReady();
            stream.onClose = function() {
                if (inputChannelRunning) {
                    loopStream();
                }
            };
        }
        loopStream();

        player.el.mousedown(e => {
            const width = videoSizeFactor * player.videoWidth() / player.el.width();
            const height = videoSizeFactor * player.videoHeight() / player.el.height();

            const offsetX = player.el.offset().left;
            const offsetY = player.el.offset().top;

            const sendEvent = function(code, ev) {
              const x = Math.round((ev.pageX - offsetX) * width);
              const y = Math.round((ev.pageY - offsetY) * height);
              stream.write(`me:${code}:${x}:${y}:${Date.now()}\n`);
            };

            sendEvent("d", e);
            const doc = $(document);
            doc.mousemove(e1 => sendEvent("m", e1));
            doc.mouseup(e1 => {
              doc.unbind("mousemove");
              doc.unbind("mouseup");
              sendEvent("u", e1);
            });
        });

        // Map for javascript keycodes to android key codes
        const keyMap = {};
        const addKeyMap = function(jCode, aCode, length) {
            for (let i = 0; i < length; i++) {
                keyMap[jCode + i] = aCode + i;
            }
        };

        addKeyMap(48, 7, 10); // Num keys
        keyMap[38] = 19;
        keyMap[40] = 20;
        keyMap[37] = 21;
        keyMap[39] = 22;
        addKeyMap(65, 29, 26); // A - Z
        keyMap[188] = 55;  // ,
        keyMap[190] = 56;  // .
        keyMap[18] = [57, 58];  // alt
        keyMap[16] = [59, 60];  // shift
        keyMap[9] = 61;  // tab
        keyMap[32] = 62;  // space
        keyMap[13] = 66;  // enter
        keyMap[8] = 67;  // backspace
        keyMap[192] = 68;  // grave `
        keyMap[189] = 69;  // -
        keyMap[187] = 70;  // =
        keyMap[219] = 71;  // [
        keyMap[221] = 72;  // ]
        keyMap[220] = 73;  // \
        keyMap[186] = 74;  // ;
        keyMap[222] = 75;  // '
        keyMap[191] = 76;  // /
        keyMap[27] = 111;  // Escape
        keyMap[17] = [113, 114];  // Control
        keyMap[20] = 115;  // Caps lock
        keyMap[145] = 116;  // Scroll lock
        keyMap[91] = 117;  // Meta left
        keyMap[93] = 118;  // Meta right
        addKeyMap(112, 131, 12); // Funciton keys

        $(document).bind("keydown keyup", function(e) {
            if (!keyMap[e.which]) return;
            let code = keyMap[e.which];
            if (code.length) {
                if (e.originalEvent) {
                    code = code[e.originalEvent.location - 1];
                }
                if ((typeof(code) != "number")) {
                    code = keyMap[e.which][0];
                }
            }
            const response = `ke:${e.type == 'keydown' ? 'd' : 'u'}:${e.altKey ? 1 : 0}:${e.ctrlKey ? 1 : 0}:${e.metaKey ? 1 : 0}:${e.shiftKey ? 1 : 0}:${code}\n`;
            stream.write(response);
            e.preventDefault();
        });
    }

    player.onMetadata = function() {
        const maxW = $("#dmirrorview").width() - 40;
        const maxH = $("#dmirrorview").height() - 40;
        const s = Math.max(player.videoWidth() / maxW, player.videoHeight() / maxH);
        player.resize(player.videoWidth() / s, player.videoHeight() / s);
    };
    $(window).resize(player.onMetadata);

    player.onFirstFrame = function() {
        $("#main-progress").hide();
        $("#video-message").remove();
        startInputChannel();
    };

    // Get device size
    let sizeArg = "";
    const size = /\b(\d+)x(\d+)\b/.exec(await adbDevice.shellCommand("wm size"));
    if (size) {
        const w = Math.round(parseInt(size[1]) / 2);
        const h = Math.round(parseInt(size[2]) / 2);
        sizeArg = ` --size=${w}x${h}`;
        videoSizeFactor = 2;
    }

    function connectStream() {
        if (!inputChannelRunning) {
            return;
        }
        console.log("Connecting to device stream");
        const stream = adbDevice.openStream(`shell:screenrecord ${sizeArg} --output-format=h264 - `);
        stream.onReceiveWrite = function (result) {
            stream.sendReady();
            player.feed(result);
        };

        stream.onClose = connectStream;
        stream.sendReady();
    }
    connectStream();
};

const backStack = (function () {

    $(function () {

        // Check url hash
        const urlParams = new URLSearchParams(window.location.search);
        let base = window.location.origin + window.location.pathname;
        if (urlParams.get("mode") === "mirror") {
            // Switch to mirror mode
            $("#main-title-wrapper").html("<h2>Mirror android screen</h2>");
            setActivityListAction(deviceMirrorAction);
            base += "?mode=mirror";
        } else if (urlParams.get("mode") === "motion") {
            // Switch to motion workspace mode
            $("#main-title-wrapper").html("<h2>Motion workspace</h2>");
            setActivityListAction(motionViewerActionTrampoline);
            base += "?mode=motion";
        }

        history.replaceState({}, "", base);
    });

    var cbStack = [];

    window.onpopstate = function (event) {
        cbStack.pop();
        if (cbStack.length > 0) {
            let last = cbStack[cbStack.length - 1];
            if (last[0] == event.state.url) {
                console.log("Found");
                last[1]();
                return;
            }
        }
        location.reload();
    };

    return {

        add: function (url, callback) {
            cbStack.push([url, callback]);
            history.pushState({url: url}, "", url);
        }
    };
})();

// Copyright 2018 Google LLC

let hViewAction;
let tlHvAction;

(function() {
    let currentAppInfo;
    const KEY_DIVIDER = "divider";
    const GRID_MODE = 0;
    const IMAGE_MODE = 1;
    const GRID_AND_IMAGE_MODE = 2;
    const APP_MODE = 3;

    let currentRootNode = null;
    let selectedNode;
    let lastSelectedNode;
    let favoriteProperties = [];
    let viewController;
    let showHiddenNodes = false;
    let valueTypeMap = {};

    const closedSections = {};

    /* When showing time lapse view hierarchies, cloning these prototypes to build
       the UX rather than constructing them every time saves ~1.25ms per iteration. */
    const divProtoType = document.createElement("div");
    const xlinewrapProtoType = document.createElement("x-line-wrap");
    const xprofileProtoType = document.createElement("x-profile");
    const labelProtoType = document.createElement("label");
    const spanProtoType = document.createElement("span");
    const newContainerProtoType = divProtoType.cloneNode();
    newContainerProtoType.classList.add(CLS_TREENODE);
    const selectProtoType = document.createElement("select");
    const optionProtoType = document.createElement("option");

    // Load favorite properties
    if (localStorage.favoriteProps) {
        try {
            const tmp = JSON.parse(localStorage.favoriteProps);
            if (tmp && tmp.constructor == Array) {
                favoriteProperties = tmp;
            }
        } catch(e) { }
    }

    // Load favorite properties
    if (localStorage.valueTypeMap) {
        try {
            const tmp = JSON.parse(localStorage.valueTypeMap);
            if (tmp && tmp.constructor == Object) {
                valueTypeMap = tmp;
            }
        } catch(e) { }
    }

    // Create dividers
    const shouldSaveResizeData = function() {
        return !$("#hviewtabs").is(":visible");
    };

    const createDaggerDownControl = function(divider) {
        const invalue1 = parseInt(divider.e1.css(divider.right));
        const invalue2 = parseInt(divider.e2.css(divider.width));
        const invalueDragger = parseInt(divider.dragger.css(divider.right));

        const v1 = divider.e1[divider.width]();
        const v2 = divider.e2[divider.width]();

        if (v1 == 0 || v2 == 0) {
            return function() {};
        }

        return function(delta) {
            if (v1 + delta < divider.l1) {
                delta = divider.l1 - v1;
            } else if (v2 - delta < divider.l2) {
                delta = v2 - divider.l2;
            }

            divider.e1.css(divider.right, invalue1 - delta);
            divider.e2.css(divider.width, invalue2 - delta);
            divider.dragger.css(divider.right, invalueDragger - delta);

            divider.e1.trigger("resizing");
            divider.e2.trigger("resizing");
        }
    };

    const handleMouseDown = function(e) {
        const divider = $(this).data(KEY_DIVIDER);
        const start = e[divider.pageX];
        const control = createDaggerDownControl(divider);

        const handleMouseMove = function(e) {
            control(e[divider.pageX] - start);
        };

        const handleMouseUp = function(e) {
            $(document).unbind();

            // Save settings.
            let data = {};
            $(".divider").each(function () {
                const obj = $(this).data(KEY_DIVIDER);
                data[$(this).attr("id")] = obj.dragger.css(obj.right);
            });
            if (shouldSaveResizeData()) {
                data = JSON.stringify(data);
                localStorage.resizeData = data;
            }
        };

        $(document).mousemove(handleMouseMove).mouseup(handleMouseUp).bind("touchmove", function(e) {
            handleMouseMove.apply(this, e.originalEvent.touches);
        }).bind("touchend", handleMouseUp);
    };

    const handleTouchStart = function(e) {
        e.preventDefault();
        handleMouseDown.apply(this, e.originalEvent.touches);
    };

    $(".divider").each(function () {
        const el = $(this);
        const controls = el.attr("control").split(",");

        const obj = {
            dragger: el,
            pageX: controls[0],
            right: controls[1],
            width: controls[2],
            e1: el.prev(),
            e2: el.next()
        };
        obj.l1 = obj.e1.attr("limit");
        obj.l2 = obj.e2.attr("limit");
        el.data(KEY_DIVIDER, obj);
    }).mousedown(handleMouseDown).bind("touchstart", handleTouchStart);

    // Apply resize data
    const applyResizeData = function() {
        if (localStorage.resizeData && shouldSaveResizeData()) {
            const data = JSON.parse(localStorage.resizeData);
            for (const id in data) {
                const divider = $("#" + id).data(KEY_DIVIDER);
                if (!divider || (typeof data[id]) != "string") {
                    continue;
                }
                const invalueDragger = parseInt(divider.dragger.css(divider.right));
                const val = parseInt(data[id]);
                createDaggerDownControl(divider)(invalueDragger - val);
            }
        }
    };

    // In case of properties box, its width can change with changes to right panel.
    (function () {
        const obj = $("#properties-divider").data(KEY_DIVIDER);
        $("#rcontent").on("resizing", function () {
            const w1 = obj.e1.width();
            if (w1 < obj.l1) {
                const delta = obj.l1 - w1;

                obj.e1.css("right", parseInt(obj.e1.css("right")) - delta);
                obj.e2.css("width", parseInt(obj.e2.css("width")) - delta);
                obj.dragger.css("right", parseInt(obj.dragger.css("right")) - delta);
            }
        });
    })();

    /********************************* Filter properties *********************************/
    const filterProperties = function () {
        const q = $("#pfilter").val().trim().toLocaleLowerCase();
        const sections = $(".pcontainer .expandable");
        let total = 0;

        if (q == "") {
            $(".pcontainer label").show();
            sections.each(function () {
                total++;
                const left = this.lbox.children;
                if (!this.classList.contains(CLS_CLOSED)) {
                    total += left.length;
                }
                for (let i = 0; i < left.length; i++) {
                    // Remove any formatting.
                    const child = $(left[i]).children().eq(1);
                    child.text(child.text());
                }
            });
        } else {
            const re = new RegExp("(" + q.split(' ').join('|') + ")", "gi");
            sections.each(function () {
                let found = 0;
                const left = this.lbox.children;
                const right = this.rbox.children;
                for (let i = 0; i < left.length; i++) {
                    const child = $(left[i]).children().eq(1);
                    const itemText = child.text();
                    if (itemText.toLocaleLowerCase().indexOf(q) > -1) {
                        child.html(itemText.replace(re, "<b>$1</b>"));
                        found++;
                        $(left[i]).show();
                        $(right[i]).show();
                    } else {
                        $(left[i]).hide();
                        $(right[i]).hide();
                    }
                }
                if (found > 0) {
                    this.style.display = "";
                    this.valspace.style.display = "";

                    total++;
                    if (!this.classList.contains(CLS_CLOSED)) {
                        total += found;
                    }
                } else {
                    this.style.display = "none";
                    this.valspace.style.display = "none";
                }
            });
        }

        $("#properties-divider").height(total * 20);
    };
    $("#pfilter").on("input", filterProperties);

    /** Loading image preview ****** */
    const loadImage = function (node) {
        node.imageUrl = URL_LOADING;
        viewController.captureView(node.name).then(imageData => {
            const blob = new Blob([imageData], { type: "image/png" });
            const url = createUrl(blob);
            node.imageUrl = url;
            if (node == currentRootNode) {
                $("#border-box").css('background-image', 'url("' + node.imageUrl + '")');
            }
            if (node.box.classList.contains(CLS_SELECTED)) {
                node.box.style.backgroundImage = 'url("' + node.imageUrl + '")';
                $("#image-preview").empty().css('background-image', 'url("' + node.imageUrl + '")');
            }
        }).catch((e) => {
            node.imageUrl = null;
            if (node.box.classList.contains(CLS_SELECTED)) {
                $("#image-preview").showError("Error loading image");
            }
        });
    };

    const toggleFavorite = function (e) {
        const name = this.pName;
        if ($(this).toggleClass(CLS_SELECTED).hasClass(CLS_SELECTED)) {
            favoriteProperties.push(name);
        } else {
            favoriteProperties = $.grep(favoriteProperties, function (value) {
                return value != name;
            });
        }
        localStorage.favoriteProps = JSON.stringify(favoriteProperties);
    };

    const propertySectionToggle = function (e) {
        this.classList.toggle(CLS_CLOSED);
        if (closedSections[$(this).text()] = this.classList.contains(CLS_CLOSED)) {
            $(this.lbox).slideUp("fast");
            $(this.rbox).slideUp("fast");
        } else {
            $(this.lbox).slideDown("fast");
            $(this.rbox).slideDown("fast");
        }
        filterProperties();
    };

    /********************************* Selecting a node *********************************/
    const toHex = function(i, len) {
        let s = i.toString(16);
        if (s.length < len) {
            s = "0000000000000000".slice(0, len - s.length) + s;
        }
        return s;
    };

    const argb2rgba = function(i) {
        // ensure unsigned 32-bit int
        const ui32 = (0xFFFFFFFF & i) >>> 0;
        // take one down, pass it around
        return (((ui32 & 0xFFFFFF) << 8) | (ui32 >>> 24));
    };

    const selectNode = function () {
        lastSelectedNode = selectedNode;
        selectedNode = this.node;

        if (this.classList.contains(CLS_SELECTED)) return;
        document.querySelectorAll(".last_selected").forEach((it) => {
            it.classList.remove(CLS_LAST_SELECTED);
        });
        document.querySelectorAll(".selected").forEach((it) => {
            it.classList.remove(CLS_SELECTED);
            it.classList.add(CLS_LAST_SELECTED);
        });
        this.classList.add(CLS_SELECTED);
        this.box.classList.add(CLS_SELECTED);

        $("#border-box .selected, #image-preview").css('background-image', 'none');
        renderProperties(this.node);

        // Apply image
        if (this.node.imageUrl == URL_LOADING) ; else if (this.node.imageUrl) {
            this.box.style.backgroundImage = 'url("' + this.node.imageUrl + '")';
            $("#image-preview").empty().css('background-image', 'url("' + this.node.imageUrl + '")');
        } else {
            loadImage(this.node);
        }
    };

    function renderProperties(node /* ViewNode */) {
        const nameContainer = document.getElementById("p_name");
        nameContainer.replaceChildren();

        const valContainer = document.getElementById("p_val");
        valContainer.replaceChildren();

        let lastType = "";
        let nameSubContainer = nameContainer;
        let valSubContainer = valContainer;

        const addProp = function (p, type) {
            if (type != lastType) {
                lastType = type;

                const typeSection = labelProtoType.cloneNode();
                typeSection.classList.add(CLS_EXPANDABLE, CLS_WITH_ARROW);
                typeSection.appendChild(spanProtoType.cloneNode());
                typeSection.appendChild(document.createTextNode(type));
                nameContainer.appendChild(typeSection);

                const valSpace = labelProtoType.cloneNode();
                valSpace.innerHTML = "&nbsp;";
                valContainer.appendChild(valSpace);

                nameSubContainer = divProtoType.cloneNode();
                nameContainer.appendChild(nameSubContainer);
                valSubContainer = divProtoType.cloneNode();
                valContainer.appendChild(valSubContainer);

                typeSection.lbox = nameSubContainer;
                typeSection.rbox = valSubContainer;
                typeSection.valspace = valSpace;
                typeSection.onclick = propertySectionToggle;

                if (closedSections[type]) {
                    nameSubContainer.style.display = "none";
                    valSubContainer.style.display = "none";
                    typeSection.classList.add(CLS_CLOSED);
                }
            }

            const nameLabel = labelProtoType.cloneNode();
            const starSpan = spanProtoType.cloneNode();
            nameLabel.appendChild(starSpan);

            const nameLabelTextNode = spanProtoType.cloneNode();
            nameLabelTextNode.appendChild(document.createTextNode(p.name));
            nameLabel.appendChild(nameLabelTextNode);
            nameSubContainer.appendChild(nameLabel);

            const value = "" + p.value;
            const labelTag = labelProtoType.cloneNode();

            if (value == "") {
                labelTag.innerHTML = "&nbsp;";
            } else {
                const valueF = parseFloat(p.value);
                const valueI = parseInt(p.value);
                let colorWellDiv = undefined;

                if (!isNaN(valueF)) {
                    // Numbers could mean any number (sorry) of things, so let's try to show 
                    // some relevant interpretations, switchable via <option> drop-down.
                    const selectTag = selectProtoType.cloneNode();
                    selectTag.name = p.name;
                    const optionTag = optionProtoType.cloneNode();
                    optionTag.value = 'default';
                    optionTag.innerHTML = value;
                    selectTag.appendChild(optionTag);

                    if (viewController.density > 0) {
                        const dp = Math.round(valueF * 160 * 100 / viewController.density) / 100;
                        if (Math.abs(dp) < 10000) {
                            // probably a reasonable dimension
                            const sizeDpOption = optionProtoType.cloneNode();
                            sizeDpOption.value = 'size-dp';
                            sizeDpOption.innerHTML = dp + " dp";
                            selectTag.appendChild(sizeDpOption);
                        }
                    }
                    if (valueF == valueI) {
                        const valueU = valueI >>> 0;
                        let valueHex = "";
                        let onChangeCallback = () => { };

                        if (p.name.search(/color$/i) >= 0) {
                            valueHex = toHex(valueU, 8);
                            const colorHexOption = optionProtoType.cloneNode();
                            colorHexOption.value = 'color-hex';
                            colorHexOption.innerHTML = "#" + valueHex;
                            selectTag.appendChild(colorHexOption);

                            colorWellDiv = divProtoType.cloneNode();
                            colorWellDiv.classList.add(CLS_COLORWELL);
                            onChangeCallback = () => {
                                if (selectTag.value == 'color-hex') {
                                    const webColor = '#' + toHex(argb2rgba(valueU), 8);
                                    colorWellDiv.style.display = 'inline-block';
                                    colorWellDiv.style.backgroundColor = webColor;
                                } else {
                                    colorWellDiv.style.display = "none";
                                }
                            };
                            selectTag.addEventListener("change", onChangeCallback);

                        } else {
                            valueHex = toHex(valueU);
                            const falgsHexOption = optionProtoType.cloneNode();
                            falgsHexOption.value = 'falgs-hex';
                            falgsHexOption.innerHTML = "0x" + valueHex;
                            selectTag.appendChild(falgsHexOption);
                        }
                        const valuePref = valueTypeMap[p.name];
                        if (valuePref != undefined) {
                            const valueArray = Array.from(selectTag.children, el => el.value);
                            if (valueArray.indexOf(valuePref) >= 0) {
                                selectTag.value = valuePref;
                                onChangeCallback();
                            }
                        }
                        selectTag.onchange = saveValueTypeSelect;
                    }
                    labelTag.classList.add(CLS_MULTI_TOGGLE);
                    labelTag.appendChild(selectTag);
                    if (colorWellDiv) labelTag.appendChild(colorWellDiv);
                } else {
                    labelTag.appendChild(document.createTextNode(value));
                }
            }

            valSubContainer.appendChild(labelTag);

            starSpan.classList.add("star");
            starSpan.pName = p.fullname;
            starSpan.onclick = toggleFavorite;
            return starSpan
        };

        // Selected properties
        for (let i = 0; i < favoriteProperties.length; i++) {
            const prop = node.namedProperties[favoriteProperties[i]];
            if (prop) {
                const starSpan = addProp(prop, "Favorites");
                starSpan.classList.add(CLS_SELECTED);
            }
        }

        for (let i = 0; i < node.properties.length; i++) {
            const p = node.properties[i];
            if (favoriteProperties.indexOf(p.fullname) < 0) {
                addProp(p, p.type);
            }
        }
        filterProperties();
    }

    const saveValueTypeSelect = function() {
        valueTypeMap[$(this).attr("name")] = $(this).val();
        const data = JSON.stringify(valueTypeMap);
        localStorage.valueTypeMap = data;
    };

    const profileInfoBox = $("#profile-info");
    const mouseOverNode = function () {
        this.box.classList.add(CLS_HOVER);

        if (this.node.profiled) {
            profileInfoBox.find("#profile-info-m").text(this.node.measureTime.toFixed(5));
            profileInfoBox.find("#profile-info-l").text(this.node.layoutTime.toFixed(5));
            profileInfoBox.find("#profile-info-d").text(this.node.drawTime.toFixed(5));
            profileInfoBox.show();            
        }
    };
    const mouseOutNode = function () {
        this.box.classList.remove(CLS_HOVER);
        profileInfoBox.hide();
    };

    const showNodeContext = function (e) {
        e.preventDefault();
        selectNode.call(this);

        const menu = [
            {
                text: "Save PNG",
                icon: "ic_save",
                disabled: !(this.node.imageUrl && this.node.imageUrl != URL_LOADING),
                id: 0
            },
            {
                text: "Reload PNG",
                icon: "ic_refresh",
                disabled: this.node.imageUrl == URL_LOADING,
                id: 1
            }
        ];

        if (viewController.profileView) {
            menu.push({
                text: "Profile view",
                icon: "ic_layers",
                id: 2
            });
        }
        menu.push(null);

        if (!this.node.disablePreview) {
            menu.push({
                text: "Disable preview",
                icon: "ic_hide",
                id: 3
            });
        } else {
            menu.push({
                text: "Enable preview",
                icon: "ic_show",
                id: 4
            });
        }
        if ($(this).hasClass(CLS_EXPANDABLE)) {
            menu.push({
                text: "Collapse all",
                icon: "ic_collapse",
                id: 5
            });
        }
        showContext(menu, onNodeContextMenuSelected, e);
    };

    /********************************* Rendering code *********************************/
    const treeToggle = function (e) {
        $(this).next()[$(this).toggleClass(CLS_CLOSED).hasClass(CLS_CLOSED) ? "hide" : "show"]();
    };
    const treeToggleFromArrow = function (e) {
        $(this).parent().dblclick();
    };

    const renderNode = function (node, container, boxContainer) {
        const box = divProtoType.cloneNode();
        box.style.left = node.boxStylePos.left;
        box.style.top = node.boxStylePos.top;
        box.style.width = node.boxStylePos.width;
        box.style.height = node.boxStylePos.height;
        box.node = node;
        boxContainer.appendChild(box);

        const span = spanProtoType.cloneNode();
        span.onclick = treeToggleFromArrow;

        const elWrap = xlinewrapProtoType.cloneNode();
        elWrap.appendChild(span);
        elWrap.appendChild(document.createTextNode(node.treeDisplayName));
        elWrap.appendChild(xprofileProtoType.cloneNode());
    
        const el = labelProtoType.cloneNode();
        container.appendChild(el);
        el.classList.add(CLS_WITH_ARROW);
        el.onclick = selectNode;
        el.onmouseover = mouseOverNode;
        el.onmouseout = mouseOutNode;
        el.oncontextmenu = showNodeContext;
        el.appendChild(elWrap);
        el.node = node;
        el.box = box;

        box.el = el;

        node.box = box;
        node.el = el;

        if (node.children.length) {
            el.classList.add(CLS_EXPANDABLE);
            el.ondblclick = treeToggle;
            const newContainer = newContainerProtoType.cloneNode();
            container.appendChild(newContainer);
            for (let i = 0; i < node.children.length; i++) {
                renderNode(node.children[i], newContainer, boxContainer);
            }
        }
    };

    /********************************* Refresh view *********************************/
    hViewAction = function (appInfo) {
        showViewHierarchyUX();

        viewController = createViewController(appInfo);
        viewController.loadViewList().then(rootNode => {
            currentRootNode = rootNode;

            const vListContent = document.getElementById("vlist_content");
            vListContent.replaceChildren();
            const borderBox = document.getElementById("border-box");
            borderBox.replaceChildren();
            renderNode(rootNode, vListContent, borderBox);

            onFirstViewHierarchyRendered();
            $("#main-progress").hide();
        }).catch(msg => { handleLoadingListError(msg); });

        if (viewController.customCommand) {
            $("#btn-custom-command").show();
            loadSuggestions(viewController.device);
        } else {
            $("#btn-custom-command").hide();
        }

        setupWindowTitle(appInfo);
        currentAppInfo = appInfo;
    };

    function showViewHierarchyUX() {
        $("#vlist_content, #border-box").empty();
        $("#main-progress").show();
        $("#device-list-content").hide();
        $("#darkThemeSwitch").hide();
        $("#hview").removeClass("hide").removeClass("hidden");
        backStack.add("?hview");
    }

    function onFirstViewHierarchyRendered() {
        resizeBoxView();
        showHiddenNodeOptionChanged();    
        applyResizeData();
        $("#vlist_content label").first().click();
    }

    tlHvAction = function(appInfo) {
        currentAppInfo = appInfo;
        viewController = new OtioseServiceController();

        showViewHierarchyUX();
        $("#btn-custom-command").hide();
        setupWindowTitle(currentAppInfo);
        $(".slider-group").removeClass("hidden").addClass("visible");
        $("#vlist, #border-box").addClass("multi-page");
        enableGridMode();

        function addToNodeMap(node /* ViewNode */, rootNodeIndex /* Integer */) {
            let mapValue /* ViewNode[] | null */ = nodeMap.get(node.name);
            if (mapValue == null) {
                mapValue = Array(rootNodes.length);
                nodeMap.set(node.name, mapValue);
            }
            mapValue[rootNodeIndex] = node;
            for (let i = 0; i < node.children.length; i++) {
                addToNodeMap(node.children[i], rootNodeIndex);
            }
        }

        const vListDivs /* <div>[] */  = [];
        const boxDivs /* <div>[] */ = [];
        const rootNodes /* ViewNode[] */ = [];
        const nodeMap /* Map<String, ViewNode[]> | null */ = new Map();

        let frameCount;
        let processedIndex /* Integer */ = 0;

        /* If you are wondering why this work is not completely done in the web worker, its because JQuery/DOM
           manipulation needs a DOM in order to work properly. I tried using a fake DOM, and JQuery's
           append/after/before methods didn't work. Also, functions cannot be passed to and from WebWorkers,
           so the hover / click / etc. methods can't be prepared off the main thread. Aside from WebWorkers,
           browser Javascript doesn't provide any alternative methods of multi-threaded programming. */
        function processRootNode(event) {
            const rootNode = event.data.rootNode;
            const tBox = divProtoType.cloneNode();
            const tVList = divProtoType.cloneNode();

            renderNode(rootNode, tVList, tBox);
            rootNodes.push(rootNode);
            vListDivs.push(tVList);
            boxDivs.push(tBox);
            addToNodeMap(rootNode, processedIndex);

            if (processedIndex == 0) {
                currentRootNode = event.data.rootNode;
                document.getElementById("vlist_content").replaceChildren(...tVList.childNodes);
                document.getElementById("border-box").replaceChildren(...tBox.childNodes);
                onFirstViewHierarchyRendered();
            }
            processedIndex++;

            if (processedIndex < frameCount) {
                w.postMessage({ processedIndex: processedIndex });
            } else {
                $("#main-progress").hide();
            }
        }

        /* It takes > 500ms to format 170 frames of launcher view hierarchy data,
           and then copy that data over from the worker thread to the main thread.
           In order to compensate for that, nodes are being continually formatted
           until completion on the background thread, and then copied over as needed
           1 at a time (copying an already formatted node takes ~1-2ms).

           The natural pauses that come from requesting and receiving nodes from the
           worker thread allow for a responsive and jank free UI while the entire collection
           of view hierarchies are processed. */
        const w = createWorker("js/ddmlib/tl-worker.js");
        w.onerror = function () {
            throw "Error parsing view data"
        };
        // Handle the first message, then delegate the rest of the responses to processRootNode
        w.onmessage = function (e) {
            frameCount = e.data.frameCount;
            document.getElementById("tl-range").max = frameCount;
            w.onmessage = processRootNode;
            w.postMessage({ processedIndex: processedIndex });
        };
        w.postMessage({ tlHvDataAsBinaryArray: appInfo.data, type: appInfo.type });

        function hasDifferentProperties(node /* ViewNode!! */, other /* ViewNode!! */) {
            return node.id != other.id
                || node.left != other.left
                || node.top != other.top
                || node.width != other.width
                || node.height != other.height
                || node.translationX != other.translationX
                || node.translationY != other.translationY
                || node.scaleX != other.scaleX
                || node.scaleY != other.scaleY
                || node.alpha != other.alpha
                || node.willNotDraw != other.willNotDraw
                || node.clipChildren != other.clipChildren
                || node.visibility != other.visibility
                || node.scrollX != other.scrollX
                || node.scrollY != other.scrollY
        }

        function migrateSelectedState(index /* Integer */) {
            function migrateOne(node /* ViewNode? */, clazz /* String */) {
                if (node == null) return

                function toggle() {
                    if (node == null) return
                    ["el", "box"].forEach((it) => node[it].classList.toggle(clazz));
                }

                toggle();
                node = nodeMap.get(node.name)[index];
                toggle();
                return node
            }

            const lastFramesSelectedNode = selectedNode;
            selectedNode = migrateOne(selectedNode, CLS_SELECTED);

            if (selectedNode != null && hasDifferentProperties(lastFramesSelectedNode, selectedNode)) {
                renderProperties(selectedNode);
            }

            lastSelectedNode = migrateOne(lastSelectedNode, CLS_LAST_SELECTED);
        }

        function switchViewHierarchy(newIndex /* Integer */, oldIndex /* Integer */) {
            const vListContent = document.getElementById("vlist_content");
            const borderBox = document.getElementById("border-box");

            vListDivs[oldIndex].replaceChildren(...vListContent.childNodes);
            vListContent.replaceChildren(...vListDivs[newIndex].childNodes);

            boxDivs[oldIndex].replaceChildren(...borderBox.childNodes);
            borderBox.replaceChildren(...boxDivs[newIndex].childNodes);
        }

        let previousIndex = 0;

        $("#tl-range")
            .val("0")
            .unbind("input change")
            .on("input change", (jQueryEvent) => {
                /* vListJQueries.length - 1 represents the number of root nodes that have already been processed
                   and are available to be shown as a view hierarchy to the user. */
                const index = Math.min(jQueryEvent.target.value, vListDivs.length - 1);
                if (previousIndex != index) {
                    // Ordering of methods within 'if statement' matters for correct behavior
                    migrateSelectedState(index);
                    switchViewHierarchy(index, previousIndex);

                    currentRootNode = rootNodes[index];
                    showHiddenNodeOptionChanged();

                    previousIndex = index;
                    $("#tl-range").val(index);
                }
            });
    };

    function setupWindowTitle(appInfo) {
        let title = appInfo.name.split(".");
        title = title[title.length - 1];
        $("#windowTitle").text(document.title = title + " [" + appInfo.name + "]");
    }

    function handleLoadingListError (msg) {
        $("#hview").removeClass("hide").removeClass("hidden");
        $("#vlist_content").showError(msg ? msg : "Error loading view hierarchy");
    }

    /********************************* Preview Grid resize *********************************/
    const resizeBoxView = function () {
        if (!currentRootNode) return;
        const container = $("#box-border-container");
        const cW = container.width();
        const cH = container.height();

        const mW = currentRootNode.width;
        const mH = currentRootNode.height;
        const scale = Math.min(cW / mW, cH / mH);

        const w = scale * mW;
        const h = scale * mH;
        $("#border-box").css({
            width: w,
            height: h,
            left: (cW - w) / 2,
            top: (cH - h) / 2
        });
    };
    $("#rcontent, #sshot").on("resizing", resizeBoxView);

    /** ********************** Box hover handling ***************** */
    const scrollToNode = function (node) {
        // expand nodes recursively
        let parent = node.parent;
        while (parent) {
            if (parent.el.classList.contains(CLS_EXPANDABLE) && parent.el.classList.contains(CLS_CLOSED)) {
                $(parent.el).removeClass(CLS_CLOSED).next().show();
            }
            parent = parent.parent;
        }
        scrollToView($(node.el), $("#vlist_content"));
    };

    /* TODO: When selecting UX element, select the top-most element. Currently, clicking on anything 
       within the border-box usually highlights the ScrimView as opposed to the actual target element. */
    $("#border-box").mouseover(function (e) {
        const offset = $(this).offset();

        const nodesHidden = !showHiddenNodes;
        const widthFactor = currentRootNode.width / $(this).width();
        const heightFactor = currentRootNode.height / $(this).height();

        const updateSelection = function (node, x, y, firstNoDrawChild, clipX1, clipY1, clipX2, clipY2) {
            if (node.disablePreview || !node.nodeDrawn || (nodesHidden && !node.isVisible)) {
                return null;
            }

            const wasFirstNoDrawChildNull = firstNoDrawChild[0] == null;

            const boxRight = node.boxPos.width + node.boxPos.left;
            const boxBottom = node.boxPos.top + node.boxPos.height;
            if (node.clipChildren) {
                clipX1 = Math.max(clipX1, node.boxPos.left);
                clipY1 = Math.max(clipY1, node.boxPos.top);
                clipX2 = Math.min(clipX2, boxRight);
                clipY2 = Math.min(clipY2, boxBottom);
            }
            if (clipX1 < x && clipX2 > x && clipY1 < y && clipY2 > y) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    const child = node.children[i];
                    const ret = updateSelection(child, x, y, firstNoDrawChild, clipX1, clipY1, clipX2, clipY2);
                    if (ret != null) {
                        return ret;
                    }
                }
            }
            if (node.boxPos.left < x && boxRight > x && node.boxPos.top < y && boxBottom > y) {
                if (node.willNotDraw) {
                    if (firstNoDrawChild[0] == null) {
                        firstNoDrawChild[0] = node;
                    }
                    return null;
                } else {
                    if (wasFirstNoDrawChildNull && firstNoDrawChild[0] != null) {
                        return firstNoDrawChild[0];
                    }
                    return node;
                }
            }
            return null;
        };

        let lastMatch = document.querySelector("#border-box div.hover");
        if (lastMatch) {
            lastMatch = lastMatch.node;
        }
        const findBox = function (e) {
            const x = (e.pageX - offset.left) * widthFactor;
            const y = (e.pageY - offset.top) * heightFactor;
            const firstNoDrawChild = [null];
            return updateSelection(currentRootNode, x, y, firstNoDrawChild, 0, 0, currentRootNode.width, currentRootNode.height);
        };
        const onMove = function (e) {
            const found = findBox(e);
            if (found != lastMatch) {
                if (lastMatch) {
                    lastMatch.el.classList.remove(CLS_HOVER);
                    lastMatch.box.classList.remove(CLS_HOVER);
                }

                if (found) {
                    found.el.classList.add(CLS_HOVER);
                    found.box.classList.add(CLS_HOVER);
                }
                lastMatch = found;
            }
        };

        $(this).unbind("mousemove").unbind("click").mousemove(onMove).click(function (e) {
            const found = findBox(e);
            if (found) {
                $(found.el).click();
                scrollToNode(found);
            }
        }).unbind("contextmenu").bind("contextmenu", function (e) {
            const found = findBox(e);
            if (found) {
                showNodeContext.call($(found.el).get(0), e);
            }
        });

        onMove(e);
    }).mouseout(function (e) {
        $("#border-box div.hover, #vlist_content label.hover").removeClass(CLS_HOVER);
    });

    /** ********************** Context menu ********************** */
    const collapseAll = function (node) {
        if (node.el.classList.contains(CLS_EXPANDABLE)) {
            $(node.el).addClass(CLS_CLOSED).next().hide();
            for (let i = 0; i < node.children.length; i++) {
                collapseAll(node.children[i]);
            }
        }
    };

    const onNodeContextMenuSelected = function () {
        switch (this.id) {
            case 0: // save png
                saveFile(selectedNode.name + ".png", selectedNode.imageUrl);
                break;
            case 1: // Reload png
                loadImage(selectedNode);
                break;
            case 2: // Profile view
                profileView(selectedNode);
                break;
            case 3: // Disable preview
                selectedNode.disablePreview = true;
                selectedNode.el.classList.add("preview-disabled");
                break;
            case 4: // Enable preview
                selectedNode.disablePreview = false;
                selectedNode.el.classList.remove("preview-disabled");
                break;
            case 5: // Collapse all
                collapseAll(selectedNode);
                break;
            case 6: // Custom command
                $("#custom-cmd-dialog h1").text(selectedNode.desc);
                $("#custom-cmd-dialog").show();
                $("#custom-cmd-dialog .close_btn div").remove();
                $("#cmd-selection").change();
                $("#cmd-cancel").click();
                break;
        }
    };

    /** ********************** Profile view ********************** */
    const profileView = async function(node) {
        let data = await viewController.profileView(node.name);
        data = data.split("\n");
        let index = 0;

        function loadProp(n) {
            const line = data[index];
            index++;            
            if (!line || line == "-1 -1 -1" || line.toLocaleLowerCase() == "done.") {
                return false;
            }

            const times = line.split(" ");
            n.measureTime = (parseInt(times[0]) / 1000.0) / 1000.0;
            n.layoutTime = (parseInt(times[1]) / 1000.0) / 1000.0;
            n.drawTime = (parseInt(times[2]) / 1000.0) / 1000.0;
            n.profiled = true;
            
            for (let i = 0; i < n.children.length; i++) {
                if (!loadProp(n.children[i])) {
                    return false;
                }
            }
            return true;
        }

        if (!loadProp(node)) {
            console.log("Unable to parse profile data");
            return;
        }

        const RED_THRESHOLD = 0.8;
        const YELLOW_THRESHOLD = 0.5;
        function addIndicator(el, name, value) {
            const e = $("<a>").text(name).appendTo(el);
            if (value >= RED_THRESHOLD) {
                e.addClass("red");
            } else if (value >= YELLOW_THRESHOLD) {
                e.addClass("yellow");
            } else {
                e.addClass("green");
            }
        }

        function setProfileRatings(n) {
            const N = n.children.length;
            if (N > 1) {
                let totalMeasure = 0;
                let totalLayout = 0;
                let totalDraw = 0;
                for (let i = 0; i < N; i++) {
                    const child = n.children[i];
                    totalMeasure += child.measureTime;
                    totalLayout += child.layoutTime;
                    totalDraw += child.drawTime;
                }
                for (let i = 0; i < N; i++) {
                    const child = n.children[i];
                    const el = child.el.find("x-profile").empty().show();

                    addIndicator(el, "M", child.measureTime / totalMeasure);
                    addIndicator(el, "L", child.layoutTime / totalLayout);
                    addIndicator(el, "D", child.drawTime / totalDraw);
                }
            } else if (N == 1) {
                const child = n.children[0];
                // Add default
                child.el.find("x-profile").empty().show()
                    .append($("<a>").text("M"))
                    .append($("<a>").text("L"))
                    .append($("<a>").text("D"));
            }
            for (let i = 0; i < N; i++) {
                setProfileRatings(n.children[i]);
            }
        }
        setProfileRatings(node);
    };


    /** ********************** Node search ********************** */
    let lastNodeSearchText = "";
    $("#btn-search-node").click(function(e) {
        let searchInput;
        const elementFactory = function(el, hideMenu) {
            searchInput = $("<input type=search placeholder='Search node'>").appendTo(el);

            // Use key up for enter, so that the user has time to press shift key
            searchInput.keyup(function (e) {
                if (e.keyCode == 13) {
                    nodeSearch(e.shiftKey ? -1 : 1);
                }
            });
            searchInput.keydown(function (e) {
                if (e.keyCode == 27) {
                    e.preventDefault();
                    hideMenu();
                }
            });
        };
        showPopup(e, elementFactory);
        searchInput.val(lastNodeSearchText).focus().select();

        const nodeSearch = function (dir) {
            let query = searchInput.val();
            if (query == "") return;
            lastNodeSearchText = query;
            query = query.toLocaleLowerCase();

            // Search through boxes, as nodes might be collapsed.
            const boxes = $("#border-box div");
            const elList = boxes.filter((_, element) => element.style.display != "none")
                                .map((_, element) => element.node.el);

            let st = elList.index(selectedNode.el);
            const count = elList.length;

            for (let i = -1; i < count; i++) {
                st += dir;
                if (st < 0) {
                    st = count - 1;
                }
                if (st >= count) {
                    st = 0;
                }
                if ($(elList.get(st)).text().toLocaleLowerCase().indexOf(query) > -1) {
                    // Found element.
                    selectNode.call(elList.get(st));
                    scrollToNode(selectedNode);
                    return;
                }
            }
        };
    });

    /** ********************** Custom command ********************** */
    let ignoreNextKeyUp = false;

    $("#btn-custom-command").click(function (e) {
        let commandInput;
        let errorContainer;
        const elementFactory = function(el) {
            commandInput = $("<input type=search placeholder='Custom command'>").appendTo(el);
            errorContainer = $("<div class='custom-command-error-wrapper'>").appendTo(el);
        };
        const popup = showPopup(e, elementFactory);


        if (viewMethodList != null) {
            // Setup auto complete
            const methodAutoComplete = new autoComplete({
                selector: commandInput.get(0),
                minChars: 1,
                source: autoCompleteSource,
                renderItem: suggestionRenderer,
                onSelect: function () { ignoreNextKeyUp = true; }
            });
            popup.on("popup_closed", function(e) {
                console.log("Popup closed", e);
                methodAutoComplete.destroy();
            });
        }

        commandInput.focus().select();
        commandInput.keyup(function (e) {
            if (ignoreNextKeyUp) {
                ignoreNextKeyUp = false;
                return;
            }
            if (e.keyCode == 13) {
                executeCommand($(this).val(), errorContainer);
            }
        }).on("input", function () {
            errorContainer.empty();
        }).blur(function () {
            errorContainer.empty();
        });
    });

    const executeCommand = function (cmd, errorContainer) {
        cmd = cmd.trim();
        const m = cmd.match(/^([a-zA-Z_0-9]+)\s*\(([^)]*)\);?$/);

        if (!m) {
            errorContainer.showError("Invalid method format: methodName(param1, param2...). eg: setEnabled(false), setVisibility(0), setAlpha(0.9f)");
            return;
        }

        const data = new DataOutputStream();
        data.writeStr(m[1]);

        if (m[2].trim() != "") {
            const params = m[2].split(",");
            data.writeInt(params.length);
            for (let i = 0; i < params.length; i++) {
                try {
                    let p = params[i].trim().toLocaleLowerCase();

                    if (p == "false" || p == "true") {
                        // boolean
                        data.writeStr("Z", true);
                        data.writeByte(p == "false" ? 0 : 1);
                    } else if (p.indexOf(".") > -1 || p.endsWith("f")) {
                        // float
                        p = parseFloat(p);
                        data.writeStr("F", true);
                        data.writeFloat(p);
                    } else if (p.match(/^[+-]?(0x)?[0-9a-fA-F]+$/)) {
                        p = parseInt(p);
                        data.writeStr("I", true);
                        data.writeInt(p);
                    } else {
                        throw "error"
                    }
                } catch (e) {
                    errorContainer.showError("Invalid paramater: [" + params[i].trim() + "]. eg: setEnabled(false), setVisibility(0), setAlpha(0.9f)");
                }
            }
        }
        viewController.customCommand(selectedNode.name, data.data).catch(errorContainer.showError.bind(errorContainer));
    };

    let viewMethodList = null;

    const autoCompleteSource = function (term, suggest) {
        term = term.toLowerCase().trim();
        const matches = [];
        for (let i = 0; i < viewMethodList.length; i++) {
            if (~viewMethodList[i][0].toLowerCase().indexOf(term)) matches.push(viewMethodList[i]);
        }
        suggest(matches);
    };

    const suggestionRenderer = function (item, search) {
        // escape special characters
        search = search.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
        return '<div class="autocomplete-suggestion" data-val="' + item[0] + '">' + item[0].replace(re, "<b>$1</b>") + "(" + item[1] + ")" + '</div>';
    };

    const loadSuggestions = async function (device) {
        await device.sendFile("/data/local/tmp/methods.jar", "commands/methods.jar");
        let response = await device.shellCommand("export CLASSPATH=/data/local/tmp/methods.jar;exec app_process /system/bin MethodList");
        response = JSON.parse(response.split("\n", 2)[1]);
        viewMethodList = response;
    };

    /** ********************** Main Menu ********************** */
    $("#btn-options").click(function() {
        const menu = [
            {
                text: "Show hidden node",
                icon: showHiddenNodes ? "ic_checked" : "ic_unchecked",
                id: 0
            },
            null,
            {
                text: "Dark theme",
                icon: isDarkTheme() ? "ic_checked" : "ic_unchecked",
                id: 5
            }
        ];

        if (!$("#hviewtabs").is(":visible")) {
            // Only show the preview menu when tabs are not available
            menu.unshift({
                text: "Preview",
                icon: "ic_submenu",
                id: 6
            },
            null);
        }

        if (viewController.loadScreenshot) {
            menu.push(null, {
                text: "Load screenshot",
                icon: "ic_layers",
                id: 4
            });
        }

        if (adbDevice && !adbDevice.disconnectedDevice) {
            menu.push(null,
                {
                    text: "Save hierarchy",
                    icon: "ic_save",
                    id: 1
                },
                {
                    text: "Refresh",
                    icon: "ic_refresh",
                    id: 2
                },
                {
                    text: "Disconnect",
                    icon: "ic_disconnect",
                    id: 3
                });
        }

        const offset = $(this).offset();
        showContext(menu, function (el) {
            switch(this.id) {
                case 0:
                    showHiddenNodes = !showHiddenNodes;
                    showHiddenNodeOptionChanged();
                    break;
                case 1:
                    saveHierarchy();
                    break;
                case 2:
                    hViewAction(currentAppInfo);
                    break;
                case 3:
                    if (adbDevice) {
                        adbDevice.disconnect();
                    }
                    break;
                case 4:
                    viewController.loadScreenshot().then(url => {
                        currentRootNode.imageUrl = url;
                        $("#border-box").css('background-image', 'url("' + url + '")');
                        if (currentRootNode.box.hasClass(CLS_SELECTED)) {
                            currentRootNode.box.css('background-image', 'url("' + url + '")');
                            $("#image-preview").empty().css('background-image', 'url("' + url + '")');
                        }
                    });
                    break;
                case 5:
                    switchTheme();
                    break;
                case 6:
                    const submenuOffset = $(el).addClass(CLS_SELECTED).offset();
                    showPreviewContext({pageX: submenuOffset.left + el.width() / 2, pageY: submenuOffset.top + el.height() / 4});
                    return true;    // Don't ide te existing popup
            }
        },
        {pageX: offset.left, pageY: offset.top});
    });

    function buildPreviewMenuItem(id, text) {
        return {
            text: text,
            icon: currentPreviewMode == id ? "ic_checked" : "ic_unchecked",
            id: id
        }
    }

    let currentPreviewMode = 3;
    const showPreviewContext = function(e) {
        const menu = [ buildPreviewMenuItem(0, "Grid") ];
        if (!viewController.hasNoImage) {
            menu.push(null, buildPreviewMenuItem(1, "Image"), null, buildPreviewMenuItem(2, "Both"));
        }
        menu.push(null, buildPreviewMenuItem(3, "App"));

        showContext(menu, function () {
            switch (this.id) {
                case GRID_MODE:  // only grid
                    enableGridMode();
                    break;
                case IMAGE_MODE: // Only image
                    $("#image-preview").show();
                    break;
                case GRID_AND_IMAGE_MODE: // both
                    $("#image-preview").hide();
                    $("#border-box").removeClass(CLS_FORCE_NO_BG).addClass(CLS_HIDE_MY_BG);
                    break;
                case APP_MODE: // App view
                    $("#image-preview").hide();
                    $("#border-box").addClass(CLS_FORCE_NO_BG).removeClass(CLS_HIDE_MY_BG);
                    break;
            }
            currentPreviewMode = this.id;
        }, e);
    };
    $("#sshot-tab").bind("contextmenu", showPreviewContext);

    function enableGridMode() {
        $("#border-box").addClass(CLS_FORCE_NO_BG).addClass(CLS_HIDE_MY_BG);
        $("#image-preview").hide();
        currentPreviewMode = GRID_MODE;
    }

    /** ********************** Show/hide hidden nodes ********************** */
    // Hides the node and all its children recursively.
    const hideNode = function (node, hide) {
        hide = hide || !node.isVisible;
        if (hide) {
            node.box.style.display = "none";
            node.el.style.display = "none";
        }
        if (node.children.length) {
            for (let i = 0; i < node.children.length; i++) {
                hideNode(node.children[i], hide);
            }
        }
    };

    const showHiddenNodeOptionChanged = function () {
        if (showHiddenNodes) {
            $("#vlist_content label, #border-box div").show();
        } else {
            hideNode(currentRootNode);
        }
    };

    /** ********************** Save hierarchy ********************** */
    const saveHierarchy = async function () {
        const zip = new JSZip();
        const config = {
            version: 1,
            title: currentAppInfo.name,
            density: viewController.density,
            sdk_version: viewController.sdk_version,
            use_new_api: viewController.use_new_api
        };
        zip.file("config.json", JSON.stringify(config));
        zip.file("hierarchy.txt", serializeNode(currentRootNode));

        const imgFolder = zip.folder("img");

        const loaders = {};
        function loadImagesRecur(node) {
            if (node.imageUrl) {
                loaders[node.name + ".png"] = doXhr(node.imageUrl, 'arraybuffer');
            }

            for (let i = 0; i < node.children.length; i++) {
                loadImagesRecur(node.children[i]);
            }
        }
        loadImagesRecur(currentRootNode);

        for (const name in loaders) {
            if (loaders[name]) {
                try {
                    imgFolder.file(name, await loaders[name], { binary: true });
                } catch (e) {
                    // Ignore
                }
            }
        }
        let title = currentAppInfo.name.split(".");
        title = title[title.length - 1];
        saveFile(title + "-hierarchy.zip", createUrl(zip.generate({ type: "blob" })));
    };

    /** ********************** Tabs ********************** */
    $("#hviewtabs div").click(function() {
        $("#hviewtabs div").removeClass("selected");
        $("#sshot, #vlist, #pList, #rcontent").removeClass("showAsTab");
        $($(this).addClass("selected").attr("target")).addClass("showAsTab");
        resizeBoxView();
    });
})();

// Copyright 2018 Google LLC

function setActivityListAction(overridenAction) {
    activityListAction = overridenAction;
}

/* Action to refresh activity list */
var activityListAction = function (initializer, skipPush) {
    if (!skipPush) {
        backStack.add("?activity_list", () => activityListAction(initializer, true));
    }
    progress.show();
    var content = $("#device-list-content").empty().show();
    $("#hview, #dmirrorview").addClass("hide").addClass("hidden");

    let jdwpErrorContainer;
    let windowLoaded;
    const mainContent = $("<div>").appendTo(content);

    let newApiChk = null;

    const startHView = function () {
        const info = $(this).data("appInfo");
        if (newApiChk != null && newApiChk.is(':checked')) {
            info.use_new_api = false;
        }

        if (info.type == TYPE_TIME_LAPSE_BUG_REPORT || info.type == TYPE_TIME_LAPSE_BUG_REPORT_DEPRECATED) {
            tlHvAction(info);
        } else {
            hViewAction(info);
        }
    };

    const renderActivities = function(container, list) {

        const buttonbar = $("<div class='button-bar'>").css({display: "flex"}).appendTo(container);
        if (list.use_new_api) {
            newApiChk = $('<input type="checkbox" />');
            $("<label class='old-api'>").appendTo(buttonbar).append(newApiChk).append($("<span class='slider'>")).append($("<span class='text'>").text("Load custom properties"));
        } else {
            newApiChk = null;
        }
        if (adbDevice) {
            $("<div>").css({flexGrow: 1}).appendTo(buttonbar);
            $("<button>").text("Mirror Display").appendTo(buttonbar).click(deviceMirrorAction);
        }

        container = $("<div>").appendTo(container).addClass("activity-list");
        for (let i = 0; i < list.length; i++) {
            const l = list[i];
            const entry = $("<div>").data("appInfo", l).appendTo(container).click(startHView).addClass("entry");

            const icon = $('<div class="icon">').appendTo(entry).attr("icon-pid", l.pid);
            if (l.isTimeLapse) {
                icon.addClass("time-lapse");
            }
            if (l.icon && l.icon.value) {
                icon.css("background-image", `url(${l.icon.value})`);
            }

            if (l.name == "") {
                l.name = "---";
            }
            $('<div class="title">').text(l.name).appendTo(entry);
            let subText;
            if (l.pid != undefined && l.pname != undefined) {
                subText = `${l.pname} (${l.pid})`;
            } else if (l.pname != undefined) {
                subText = l.pname;
            } else if (l.pid != undefined) {
                subText = `Process id: ${l.pid}`;
            } else {
                subText = null;
            }
            if (subText != null) {
                $('<div class="subtext">').appendTo(entry).text(subText);
            }
        }
    };

    const callbacks = {
        jdwpError: function () {            if (!jdwpErrorContainer) {
                jdwpErrorContainer = $("<div>").prependTo(content)
                    .showError("Using old API. Something bad might have happened. You should probably take a break.");
            }
        },

        windowsError: function (msg) {
            if (!windowLoaded) {
                progress.hide();
                mainContent.showError(msg);
            }
        },

        windowsLoaded: function (list) {
            windowLoaded = true;
            progress.hide();
            renderActivities(mainContent.empty(), list);
        },

        iconLoaded: function(pid, value) {
            $(`div[icon-pid=${pid}]`).css("background-image", `url(${value})`);
        }
    };

    initializer(callbacks);
};

// Copyright 2018 Google LLC

const progress = $("#main-progress");

(function main() {
	$("#device-picker").click(function () {
		handleSelectDevice(navigator.usb.requestDevice({ filters: [DEVICE_FILTER] }));
	});

	const loadFile = function() {
		if (!this.files || this.files.length < 1) {
			return;
		}
		progress.show();
		const w = createWorker("js/file_load_worker.js");
		w.onerror = function(e) {
			progress.hide();
			toast("Not a valid view hierarchy file: " + e.message);
		};
		w.onmessage = function (e) {
			if (e.data.type == TYPE_BUG_REPORT) {
				activityListAction(function(callbacks) {
					callbacks.windowsLoaded(e.data.list);
				});
			} else if (e.data.type == TYPE_ZIP) {
				const appInfo = e.data;
				appInfo.data = new JSZip(appInfo.data);
				hViewAction(appInfo);
			} else if (e.data.type == TYPE_ERROR) {
				w.onerror(e.data);
			} else {
				progress.hide();
				toast("Unknown response " + e.data.type);
			}
		};
		w.postMessage(this.files[0]);
	};
	$("#hierarchy-picker-input").on("change", loadFile);
	const pickerButton = $("#hierarchy-picker")
		.click(() => $("#hierarchy-picker-input").click())
		.on('dragover dragenter', () => pickerButton.addClass('drag_over'))
		.on('dragleave dragend drop', () => pickerButton.removeClass('drag_over'))
		.on('drop', e => loadFile.call(e.originalEvent.dataTransfer))
		.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
			e.preventDefault();
			e.stopPropagation();
		});

	// Load any verified devices
	refreshConnectedDevices();
	navigator.usb.addEventListener("connect", refreshConnectedDevices);
	navigator.usb.addEventListener("disconnect", refreshConnectedDevices);
	ActiveState.push(function() {
		navigator.usb.removeEventListener("connect", refreshConnectedDevices);
		navigator.usb.removeEventListener("disconnect", refreshConnectedDevices);
	});


	$("#darkThemeSwitch").click(switchTheme);

	if (isDarkTheme()) {
		switchTheme();
	}
})();

function refreshConnectedDevices() {
	navigator.usb.getDevices().then(devices => {
		const container = $("#connected-devices");
		container.empty();
		$("#connected-devices-title")[devices.length == 0 ? "hide" : "show"]();
		for (let i = 0; i < devices.length; i++) {
			const d = devices[i];
			const entry = $("<div>").data("device", d).appendTo(container).click(verifiedDeviceClicked).addClass("entry");
			$('<div class="title">').text(d.manufacturerName + " " + d.productName).appendTo(entry);

			const subText = $('<div class="subtext">').appendTo(entry);
			$("<label>").text("serial: " + d.serialNumber).appendTo(subText);
		}
	});
}

function verifiedDeviceClicked() {
	const d = $(this).data("device");
	handleSelectDevice(Promise.resolve(d));
}

function handleSelectDevice(devicePromise) {
	devicePromise.then(selectedDevice => {
		progress.show();
		return openAndClaim(selectedDevice);
	})
		.catch(error => {
			progress.hide();
			toast("Unable to connect " + error);
			console.log(error);
		});
}

let adbDevice;

async function openDevice(device) {
	await device.close();
	await device.open();
	if (!device.configuration) {
		await device.selectConfiguration(1);
	}
	let deviceInterface = null;
	const interfaces = device.configuration.interfaces;
	for (let i = 0; i < interfaces.length; i++) {
		deviceInterface = interfaces[i];
		const iface = deviceInterface.alternates[0];
		if (iface.interfaceClass === INTERFACE_CLASS &&
			iface.interfaceSubclass === INTERFACE_SUB_CLASS &&
			iface.interfaceProtocol === INTERFACE_PROTOCOL) {
			break;
		}
		deviceInterface = null;
	}
	if (deviceInterface == null) {
		throw "No interface found";
	}
	await device.claimInterface(deviceInterface.interfaceNumber);
	return deviceInterface;
}

async function openAndClaim(device) {
	console.debug("Opening device", device);

	let deviceInterface = null;
	for (let i = 0; i < 3 && deviceInterface == null; i++) {
		try {
			deviceInterface = await openDevice(device);
		} catch(e) {
			console.log("Device is use, trying reset", e);
			await new Promise(r => setTimeout(r, i * 500 + 500));
			device.reset();
			deviceInterface = null;
		}
	}
	if (deviceInterface == null) {
		throw "Unable to claim device"
	}

	$(window).on('beforeunload', function () {
		device.releaseInterface(deviceInterface.interfaceNumber);
		device.close();
	});
	console.log("Device connected, starting handshake");
	adbDevice = new AdbDevice(device, deviceInterface);
	adbDevice.stateCallback = onDeviceStateChange;
	await adbDevice.connect();
}

function onDeviceStateChange(newState) {
	if (newState != STATE_CONNECTED_DEVICE) {
		return;
	}

	ActiveState.push(function () {
		adbDevice.closeAll();
	});

	document.title = adbDevice.device.manufacturerName + " " + adbDevice.device.productName;
	activityListAction(function(callbacks) {
		const client = new DDMClient(adbDevice, callbacks);
		client.loadOldWindows();
		client.trackProcesses();
	});
}

function switchTheme() {
	const isDark = $(document.body).toggleClass("darkTheme").hasClass("darkTheme");
	$("#darkThemeSwitch").text(isDark ? "Lights on" : "Lights off");
	localStorage.isDarkTheme = isDark;
}

function isDarkTheme() {
	return localStorage.isDarkTheme == "true";
}

/**
 * Adds a node displaying the error message in the container
 */
$.fn.showError = function(msg) {
  $("#main-progress").hide();
  return this.empty().removeClass("hide").removeClass("hidden").append($("<span>").text(msg).addClass("error"));
};

export { adbDevice, isDarkTheme, progress, refreshConnectedDevices, switchTheme };
