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

var strDestinationContainerDom = ".projectContainer";
var selectedLinkName           = "";

// Adds an 'On clickEvent' to all hyperlinks inside '.projectLink' element
// then anonymous function will be called
$(".projectLink").click(function () {
	console.clear();
	var url     = $(this).attr('href');
	$('.projectLink li').removeClass('selected');
	$(this).parent().addClass('selected');
	
	/*👉️ [SNI] ONLY FOR DEBUG MODE UNCOMMENT THE FOLLOWING CODE:
	//debugger;
	//console.log($(this).href);
	//link.protocol + "//" + link.host + link.pathname
	//const myUrl = new URL(url);
	//const parts = ['protocol', 'hostname', 'pathname', 'port', 'hash'];
	//parts.forEach(key => console.log(key, myUrl[key]));
	*/
	
	$(strDestinationContainerDom).load(url, async function(responseTxt, statusTxt, jqXHR){
		if(statusTxt == "success"){
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
	selectedLinkName = $(this).parent().attr('id');
	console.log("Selected project: '" + selectedLinkName + "'");
	return false;
});