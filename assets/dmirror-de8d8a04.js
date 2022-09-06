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

const deviceMirrorAction = async function() {
    backStack.add("?mode=mirror");
    $("#main-progress").show();
    $("#device-list-content").empty().hide();
    $("#darkThemeSwitch").remove();
    $("#dmirrorview").removeClass("hide").removeClass("hidden");

    const player = createScreencopyPlayer("#dmirrorview .frame");

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