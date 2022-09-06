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

// Prefixes for simple primitives. These match the JNI definitions.
var SIG_BOOLEAN = 'Z'.charCodeAt(0);
var SIG_BYTE = 'B'.charCodeAt(0);
var SIG_SHORT = 'S'.charCodeAt(0);
var SIG_INT = 'I'.charCodeAt(0);
var SIG_LONG = 'J'.charCodeAt(0);
var SIG_FLOAT = 'F'.charCodeAt(0);
var SIG_DOUBLE = 'D'.charCodeAt(0);
var SIG_VOID = 'V'.charCodeAt(0);

// Prefixes for some commonly used objects
var SIG_STRING = 'R'.charCodeAt(0);

var SIG_MAP = 'M'.charCodeAt(0); // a map with an short key
var SIG_END_MAP = 0;

var readMap = function (stream) {
    var map = [];
    while (true) {
        var key = readObject(stream);
        if (typeof (key) != "number") {
            throw "Invalid data";
        }
        if (key === SIG_END_MAP) {
            break;
        }
        map[key] = readObject(stream);
    }
    return map;
}

var readObject = function (stream) {
    var sig = stream.read();
    switch (sig) {
        case SIG_BOOLEAN:
            return stream.read() == 0 ? "false" : "true";
        case SIG_BYTE:
            return stream.read();
        case SIG_SHORT:
            return stream.readShort();
        case SIG_INT:
            return stream.readInt();
        case SIG_LONG:
            return stream.readLong();
        case SIG_FLOAT:
            return stream.readFloat();
        case SIG_DOUBLE:
            return stream.readDouble();
        case SIG_STRING:
            return stream.readStrSmall();
        case SIG_MAP:
            return readMap(stream);
        case SIG_VOID:
            return undefined;
        default:
            throw "Invalid data";
    }
}
