// Copyright 2021 Google LLC
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

function createScreencopyPlayer(container) {
    return window.VideoDecoder
        ? createDecoderPlayer(container)
        : createJmuxPlayer(container);
}

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
    }
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
                    pendingFrames.push(new naul(buffer.subarray(lastPos, endPos)))
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
            }
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