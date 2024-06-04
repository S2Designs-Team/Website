/*
# Copyright 2035 S2DesignsTeam (Salvatore Nillo).
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
*/

var isFullScreen  = false;

class FullscreenToggleFixer {
    #videoPlayerId = "";
    constructor() {}

    fix = (videoPlayerId) => {
        this.#videoPlayerId = videoPlayerId;

        // Hide the original full screen button
        $(".vjs-fullscreen-control.vjs-control.vjs-button").
            css("display","none");

        // Manually add full screen button
        $(".vjs-control-bar").click()
            append('<button class         = "vjs-fullscreen-control vjs-control vjs-button" '  +
                   '        type          = "button" '                                         +
                   '        title         = "Fullscreen" '                                     +
                   '        aria-disabled = "false" '                                          +
                   '        id            = "danmu_send_opt" '                                 +
                   '        onclick       = "toggleFullScreen(' + this.#videoPlayerId + ')"> ' +
                   '    <span aria-hidden = "true" '                                           +
                   '          class       = "vjs-icon-placeholder"> '                          +
                   '    </span>'                                                               +
                   '</button>');
    }
}

toggleFullScreen = (videoPlayerId) => {
    var video      = document.querySelector("#" + videoPlayerId);
    isFullScreen   = !isFullScreen;
    const screen_w = window.screen.width;
    const screen_h = window.screen.height; 

    if (isFullScreen) {
        $("#header").
            css("display","none");

        video.setAttribute("style", "transform:rotate(90deg);"+
                                    "width:"+ screen_w +'px;'+ 
                                    "height:"+ screen_w +'px;'+ 
                                    "postion:absolute;"+
                                    "top:"+ ((screen_h - screen_w)/2 - 10) +'px;'+ 
                                    "left:-"+ ((screen_h - screen_w) /2 - 10) +"px;"+
                                    "z-index:2018;");
    } else {
        $("#header").
            css("display","block");

        video.setAttribute("style", "transform:rotate(0deg);"+
                                    "width:"+screen_w+ 'px;'+
                                    "height:150px;"+
                                    "postion:absolute;"+
                                    "top:0;"+
                                    "left:0;"+
                                    "right:0;");
    }
}