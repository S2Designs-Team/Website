/*
# Created by S2DesignsTeam © 2035 (Phobetor1999 AKA ㊙️anonimo㊙️).
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
#
*/
export class ProjectLink extends BaseComponent {
    projects = [];
    chRoot = "wwwsys/pages/webTv/channels/";

    constructor(properties = {}, cssFileUrl = null) {
        super(properties, cssFileUrl); // Calls the Base Class constructor

        if (ProjectLink.instance) {
            return ProjectLink.instance;
        } 
	    ProjectLink.instance = this;
    }

    initialize() {
        this.initializeComponentData();
        this.initializeGui();
        console.log('Component1 initialized');
    }

    initializeComponentData() {
        this.projects[0]  = { on: true,  type: "3D",    url: "TEST_dashJs_stream_mp4.html",       group: "3D",         iconStyleClass: "test-icon",       projectTitle: "Ready Player Me" }; 
        this.projects[1]  = { on: true,  type: "3D",    url: "rai_1.html",                        group: "3D",         iconStyleClass: "rai1",            projectTitle: "I AM MAI" }; 
        this.projects[2]  = { on: true,  type: "3D",    url: "rai_2.html",                        group: "3D",         iconStyleClass: "rai2",            projectTitle: "Unreal Engine 5.4.2 Guide" }; 
    }

    initializeGui() {
        this.htmlSegment = `<UL CLASS="projectList">`;
        this.projects.forEach((element) => {
            if (element.on === true) {
                this.htmlSegment += 
                `
                    <LI ID="${element.projectTitle}">
                        <A CLASS="projectLink" HREF='${this.chRoot}${element.url}'>
                            <DIV CLASS="icon ${element.iconStyleClass}" ID="${element.iconStyleClass}"></DIV>
                            <DIV CLASS="truncate"  ID="title">${element.channelTitle}</DIV>
                        </A>
                    </LI>
                `;
                console.log(element);
            }
        });
        this.htmlSegment += `</UL>`;
        console.dataView(this.htmlSegment);
    }
	
    addEventListeners(container) {
        // Adds an 'On clickEvent' to all hyperlinks inside '.channelList' element
        // then anonymous function will be called
        $(".projectLink").click(function () {
            console.clear();
            var url     = $(this).attr('href');
            $('.projectList li').removeClass('selected');
            $(this).parent().addClass('selected');
	
            /*👉️ [SNI] ONLY FOR DEBUG MODE UNCOMMENT THE FOLLOWING CODE:
            //debugger;
            //console.log($(this).href);
            //link.protocol + "//" + link.host + link.pathname
            //const myUrl = new URL(url);
            //const parts = ['protocol', 'hostname', 'pathname', 'port', 'hash'];
            //parts.forEach(key => console.log(key, myUrl[key]));
            */
            $(strDestinationVideoScreenDom).load(url, async function(responseTxt, statusTxt, jqXHR){
                if (statusTxt == "success"){
                    console.log();
                    var ParsedHtmlPage = $(responseTxt);
                    /*👉️ [SNI] ONLY FOR DEBUG MODE UNCOMMENT THE FOLLOWING CODE:
                    //debugger;
                    //console.log(url + " content loaded successfully!\n"+
                    //            "[Loaded Html]:\n" + 
                    //            "==============================================================================\n"+
                    //            responseTxt);
                    */
                }
                if(statusTxt == "error"){
                    alert("Error: " + jqXHR.status + " " + jqXHR.statusText);
                }
            });
            selectedProjectName = $(this).parent().attr('id');
            console.log("Selected project: '" + selectedProjectName + "'");
            return false;
        });
    }
}
