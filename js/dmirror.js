/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function createJmuxPlayer(container) {
    // Rgus flavor is built around the "Media Source Extensions"
    // (https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API)
    // and is widely supported for all browsers
    console.log("Using jmuxplayer");
    const ret = {
        el: $("<video autoplay>").appendTo(container)
    };

    ret.onFirstFrame = () => { };
    ret.onMetadata = () => { };

    ret.el.on("loadedmetadata", () => {
        ret.onMetadata();
    });

    // JMuxer is used to decode the h.264 packet stream and re-mux it into an
    // MP4 container format. This is needed as the "Media Source Extensions"
    // (https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API)
    // only support h.264 video codec, but not the streaming format.
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
    // This flavor is built around the WebCodecs APIs
    // https://developer.mozilla.org/en-US/docs/Web/API/WecbCodecs_API
    // which are only supported in Chromium based browsers (https://caniuse.com/webcodecs)

    console.log("Using video decoder");
    // spec PDF: https://www.itu.int/ITU-T/recommendations/rec.aspx?rec=11466
    // IDR: instantaneous decoding refresh picture

    const NDR = 1; // Coded slice of a non-IDR picture
    const IDR = 5; // Coded slice of an IDR picture
    const SPS = 7; // Sequence parameter set (see 7.3.2.1 Sequence parameter set RBSP syntax)
    const PPS = 8; // Picture parameter set (see 7.3.2.2 Picture parameter set RBSP syntax)

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
    }
    ret.resize(0, 0);

    function nalu(data) {
        // 7.3.1 NAL unit syntax
        this.data = data;
        this.type = data[0] & 0x1f;
    }

    let pendingFrames = [];
    let pendingBytes = null;
    let configPending = true;

    function createConfig(spsFrame, ppsFrame) {
        // Create description:
        const sps = spsFrame.data;
        const pps = ppsFrame.data;
        return {
            // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/codecs_parameter#avc_profiles
            // getUint32 reads 4 bytes big-endian, thus 1st byte is NALu, the next 3 bytes are  Sequence parameter set RBSP, with profile (8 bits), constraints (8 bits), level (8 bits)
            codec: 'avc1.' + new DataView(sps.buffer, sps.byteOffset).getUint32(0).toString(16).substr(-6),
            description: Uint8Array.from(
                // AVCDecoderConfigurationRecord
                // https://gist.github.com/uupaa/8493378ec15f644a3d2b#52411-syntax
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
                    pendingFrames.push(new nalu(buffer.subarray(lastPos, endPos)))
                }
                lastPos = i + 3;
            }
        }

        pendingBytes = buffer.subarray(lastPos);
    }

    let frameeNo = 0;

    ret.feed = function(data) {
        // This waits for the SPS and PPS NAL units, and configures the deconder
        // once ready. From there on, the android device created stream only
        // contains IDRs and NDRs
        parseNALu(data);

        if (configPending) {
            const spsFrame = pendingFrames.find(frame => frame.type === SPS);
            const ppsFrame = pendingFrames.find(frame => frame.type === PPS);
            if (!spsFrame || !ppsFrame) {
                return;
            }
            decoder.configure(createConfig(spsFrame, ppsFrame));
            configPending = false;
        }

        pendingFrames
            .filter(frame => frame.type === IDR || frame.type === NDR)
            .map(frame => {
                // create a data buffer with the frame data, prefixed by the
                // buffer's length
                const data = new Uint8Array(4 + frame.data.byteLength);
                new DataView(data.buffer).setUint32(0, frame.data.byteLength);
                data.set(frame.data, 4);

                return new EncodedVideoChunk({
                    type: frame.type === IDR ? 'key' : 'delta',
                    timestamp: Date.now(),
                    duration: 0,
                    data: data
                });
            }).forEach(chunk => decoder.decode(chunk));
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
            }
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
              stream.write(`me:${code}:${x}:${y}:${Date.now()}\n`)
            }

            sendEvent("d", e);
            const doc = $(document);
            doc.mousemove(e1 => sendEvent("m", e1))
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
        }

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
            stream.write(response)
            e.preventDefault();
        });
    }

    player.onMetadata = function() {
        const maxW = $("#dmirrorview").width() - 40;
        const maxH = $("#dmirrorview").height() - 40;
        const s = Math.max(player.videoWidth() / maxW, player.videoHeight() / maxH);
        player.resize(player.videoWidth() / s, player.videoHeight() / s);
    }
    $(window).resize(player.onMetadata);

    player.onFirstFrame = function() {
        $("#main-progress").hide();
        $("#video-message").remove();
        startInputChannel();
    }

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
}
