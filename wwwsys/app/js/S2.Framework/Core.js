/*
# Created by S2DesignsTeam © 2035 (Salvatore Nillo AKA ㊙️anonimo㊙️).
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

/* Symbol legend:
# 🛠️ DEBUG PURPOSE ONLY
# ⚙️ SETUP 
# 🧪 EXPERIMENTAL 
# 💻 SYSTEM FUNCTION
# 🔍 TO INVESTIGATE
# 💡 BRILLIANT IDEA
# 📜 STEP EXPLANATION

# 📎 DOCUMENTATION COMMENT
# ⏰ USED AS DELEGATE TRIGGERED ELSEWHERE
# ⏱️ ASYNCHRONISM
# ⌚ TIMER LOOP
*/

/*👉️ AUTHOR COMMENT TO PAY ATTENTION: The entry point to start the application (do not modify) */
$(document).ready(function () {	
	/* 🛠️ DEBUG PURPOSE ONLY
	console.log("applicationName  = " + oHta.applicationName + "<br>" + 
                "border           = " + oHta.border          + "<br>" +
                "borderStyle      = " + oHta.borderStyle     + "<br>" + 
                "caption          = " + oHta.caption         + "<br>" +
                "commandLine      = " + oHta.commandLine     + "<br>" +
                "icon             = " + oHta.icon            + "<br>" +
                "maximizeButton   = " + oHta.maximizeButton  + "<br>" +
                "minimizeButton   = " + oHta.minimizeButton  + "<br>" + 
                "showInTaskBar    = " + oHta.showInTaskbar   + "<br>" +
                "singleInstance   = " + oHta.singleInstance  + "<br>" +  
                "sysMenu          = " + oHta.sysMenu         + "<br>" + 
                "version          = " + oHta.version         + "<br>" + 
                "windowState      = " + oHta.windowState     + "<br>" );
	*/
	console.log("# Created by S2DesignsTeam © 2035 (Salvatore Nillo AKA ㊙️anonimo㊙️).       " + "</BR>" +
                "#                                                                          " + "</BR>" +
                "# Licensed under the Apache License, Version 2.0 (the 'License');          " + "</BR>" +
                "# you may not use this file except in compliance with the License.         " + "</BR>" +
                "# You may obtain a copy of the License at                                  " + "</BR>" +
                "#                                                                          " + "</BR>" +
                "#      http://www.apache.org/licenses/LICENSE-2.0                          " + "</BR>" +
                "#                                                                          " + "</BR>" +
                "# Unless required by applicable law or agreed to in writing, software      " + "</BR>" +
                "# distributed under the License is distributed on an 'AS IS' BASIS,        " + "</BR>" +
                "# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. " + "</BR>" +
                "# See the License for the specific language governing permissions and      " + "</BR>" +
                "# limitations under the License.                                           " + "</BR>" +
                "#                                                                          " + "</BR>" +
                "# Symbol legend:                                                           " + "</BR>" +
                "# 🛠️ DEBUG PURPOSE ONLY                                                   " + "</BR>" +
                "# ⚙️ SETUP                                                                " + "</BR>" +
                "# 🧪 EXPERIMENTAL                                                         " + "</BR>" +
                "# 💻 SYSTEM FUNCTION                                                      " + "</BR>" +
                "# 🔍 TO INVESTIGATE                                                       " + "</BR>" +
                "# 💡 BRILLIANT IDEA                                                       " + "</BR>" +
                "# 📜 STEP EXPLANATION                                                     " + "</BR>" +
                "# 📎 DOCUMENTATION COMMENT                                                " + "</BR>" +
                "# ⏰ USED AS DELEGATE TRIGGERED ELSEWHERE                                 " + "</BR>" +
                "# ⏱️ ASYNCHRONISM                                                         " + "</BR>" +
                "# ⌚ TIMER LOOP                                                           " + "</BR>" +
                "###########################################################################");

	console.info(System.getJavascriptVersion() + " | " + System.getJScriptVersion());
	console.info("Document ready.");
	console.info("Web Application type: " + (Application.isHTA() ? "HTA (Html Application)" : "Html standard"));
	Application.start();

});

/*📎DOCUMENTATION
Author:      ㊙️anonimo㊙️
Description: The Application construct 
ClassName:
Version:     0.0.001
Parameters:  none
*/
const Application = {
	name                    : "My application",
	landingPageUrl          : "/Website/wwwsys/pages/index.html",
	contentContainerDomName : ".content",
	isLocalContent          : true,
	
	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:
	Function Name: start
	Version:       0.0.001
	*/	
	start : function(){ 
		console.info("Application Start.");
		console.info(Application.isLocallyHosted(window.location.href) ? 
					 "Web app running locally from " + Application.getStartPath() + "</BR>" : 
		             "Web app running remotely at "  + window.location.href       + "</BR>");
		
		AppHelper.wrapAllRoutes();
		console.info("Redirecting to the landing page....");
		
		AppHelper.loadUrl(Application.landingPageUrl);
		console.log(PCSystemHelper.getCPUName[0]);
		
		/*
		console.info("Staring speech recognition......");
		SpeechRecognition.start();
		*/
	},
	
	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:
	Function Name: getStartPath
	Version:       0.0.001
	Returns:
	*/
	getStartPath : function() {
		// document.location.pathname === window.location.pathname === top.location.pathname
		var pathWithOutResourceName = document.location.pathname.substring(0, document.location.pathname.lastIndexOf("/"));
		var protocolWithDomain      = document.location.href.substr(0, document.location.href.indexOf("/", 8));
		return (protocolWithDomain + pathWithOutResourceName + "/").substr(8).toLowerCase();
	},
	
	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:
	Function Name: isLocallyHosted
	Version:       0.0.001
	Returns:
	*/	
	isLocallyHosted : function(url) {
		var hostName1 = window.location.hostname;
		var hostName2 = location.hostname;
		var hostUrl   = window.location.href; 

		if (url){

			// Controlla se l'URL inizia con "file:///" (locale)
			if (url.indexOf("file:///") === 0) {
				return true;
			}

			// Controlla se l'URL inizia con "http://" o "https://" (server remoto)
			if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) {
				return false;
			}

			// Se non corrisponde a nessuno dei due, assume che sia locale
			return true;
		}
		
		console.error("[Application::isLocallyHosted] No url has been passed.");
		return false;
	},
	
	isCurrentContentLocal: function(){
		return Application.isLocalContent;
	},
	
	setCurrentContentAsLocal : function(){
		Application.isLocalContent = true;
	},
	
	setCurrentContentAsRemote : function(){
		Application.isLocalContent = false;
	},
	
	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:   Funzione che verifica se la pagina corrente viene eseguita in un ambiente HTA (HTML Application)
	Function Name: isHTA
	Version:       0.0.001
	Returns:       TRUE  => indica che la pagina è eseguita in un ambiente HTA
				   FALSE => indica che la pagina NON è in un ambiente HTA
	*/	
	isHTA : function () {
		// Recupera la prima occorrenza dell'elemento <HTA:APPLICATION> dal documento (se è presente).
		var htmlElement = document.getElementsByTagName('HTA:APPLICATION')[0];

		// Controlla se l'elemento 'htmlElement' recuperato non è undefined e se ha l'attributo 'applicationname' definito.
		return (typeof htmlElement !== 'undefined' && htmlElement.getAttribute('applicationname') !== null);
	},
};

/*📎DOCUMENTATION
Author:      ㊙️anonimo㊙️
Description: The Application construct 
Version:     0.0.001
Parameters:  none
*/
const System = {
	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:
	Function Name: getJavascriptVersion
	Version:       0.0.001
	Returns:
	*/	
	getJavascriptVersion : function(){
		// STEP ONE: Convert all characters to lowercase to simplify testing
		var agt=navigator.userAgent.toLowerCase();

		// SETP TWO: Determine Browser Version
		// Note: On IE5, these return 4, so use is_ie5up to detect IE5.
		var is_major = parseInt(navigator.appVersion);
		var is_minor = parseFloat(navigator.appVersion);

		// Note: Opera and WebTV spoof Navigator.  We do strict client detection.
		// If you want to allow spoofing, take out the tests for opera and webtv.
		var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
						&& (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
						&& (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));
		var is_nav2 = (is_nav && (is_major == 2));
		var is_nav3 = (is_nav && (is_major == 3));
		var is_nav4 = (is_nav && (is_major == 4));
		var is_nav4up = (is_nav && (is_major >= 4));
		var is_navonly = (is_nav && ((agt.indexOf(";nav") != -1) || (agt.indexOf("; nav") != -1)) );
		var is_nav6 = (is_nav && (is_major == 5));
		var is_nav6up = (is_nav && (is_major >= 5));
		var is_gecko = (agt.indexOf('gecko') != -1);

		var is_ie     = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
		var is_ie3    = (is_ie && (is_major < 4));
		var is_ie4    = (is_ie && (is_major == 4) && (agt.indexOf("msie 4")!=-1) );
		var is_ie4up  = (is_ie && (is_major >= 4));
		var is_ie5    = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")!=-1) );
		var is_ie5_5  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.5") !=-1));
		var is_ie5up  = (is_ie && !is_ie3 && !is_ie4);
		var is_ie5_5up =(is_ie && !is_ie3 && !is_ie4 && !is_ie5);
		var is_ie6    = (is_ie && (is_major == 4) && (agt.indexOf("msie 6.")!=-1) );
		var is_ie6up  = (is_ie && !is_ie3 && !is_ie4 && !is_ie5 && !is_ie5_5);

		// KNOWN BUG: On AOL4, returns false if IE3 is embedded browser
		// or if this is the first browser window opened.  Thus the
		// variables is_aol, is_aol3, and is_aol4 aren't 100% reliable.
		var is_aol   = (agt.indexOf("aol") != -1);
		var is_aol3  = (is_aol && is_ie3);
		var is_aol4  = (is_aol && is_ie4);
		var is_aol5  = (agt.indexOf("aol 5") != -1);
		var is_aol6  = (agt.indexOf("aol 6") != -1);

		var is_opera = (agt.indexOf("opera") != -1);
		var is_opera2 = (agt.indexOf("opera 2") != -1 || agt.indexOf("opera/2") != -1);
		var is_opera3 = (agt.indexOf("opera 3") != -1 || agt.indexOf("opera/3") != -1);
		var is_opera4 = (agt.indexOf("opera 4") != -1 || agt.indexOf("opera/4") != -1);
		var is_opera5 = (agt.indexOf("opera 5") != -1 || agt.indexOf("opera/5") != -1);
		var is_opera5up = (is_opera && !is_opera2 && !is_opera3 && !is_opera4);

		var is_webtv = (agt.indexOf("webtv") != -1); 
		var is_TVNavigator = ((agt.indexOf("navio") != -1) || (agt.indexOf("navio_aoltv") != -1)); 
		var is_AOLTV = is_TVNavigator;

		var is_hotjava = (agt.indexOf("hotjava") != -1);
		var is_hotjava3 = (is_hotjava && (is_major == 3));
		var is_hotjava3up = (is_hotjava && (is_major >= 3));

		// STEP THREE: Associate Javascript Version with Browser
		var is_js;
		if (is_nav2 || is_ie3) is_js = 1.0;
		else if (is_nav3) is_js = 1.1;
		else if (is_opera5up) is_js = 1.3;
		else if (is_opera) is_js = 1.1;
		else if ((is_nav4 && (is_minor <= 4.05)) || is_ie4) is_js = 1.2;
		else if ((is_nav4 && (is_minor > 4.05)) || is_ie5) is_js = 1.3;
		else if (is_hotjava3up) is_js = 1.4;
		else if (is_nav6 || is_gecko) is_js = 1.5;
		// NOTE: In the future, update this code when newer versions of JS
		// are released. For now, we try to provide some upward compatibility
		// so that future versions of Nav and IE will show they are at
		// *least* JS 1.x capable. Always check for JS version compatibility
		// with > or >=.
		else if (is_nav6up) is_js = 1.5;
		// NOTE: ie5up on mac is 1.4
		else if (is_ie5up) is_js = 1.3
		// HACK: no idea for other browsers; always check for JS version with > or >=
		else is_js = 0.0;
		return ("Javascript ver. " + is_js) ;
	},
	
	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:
	Function Name: getJavascriptVersion
	Version:       0.0.001
	Returns:
	*/	
	getJScriptVersion : function(){
		return  (ScriptEngine() + " ver. " + ScriptEngineMajorVersion() + "." + ScriptEngineMinorVersion() + "." + ScriptEngineBuildVersion());
	},	
};

/*📎DOCUMENTATION
Author:      ㊙️anonimo㊙️
Description:📎⏱️ Loads a local or a page using the path/url provided into the DOM Element
				  defined by strDestinationDomName.
Function Name: loadPage
Version: 0.0.001
Parameters: 
Returns:
*/
const AppHelper = {
	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:   
	Function Name: wrapAllRoutes
	Version:       0.0.001
	Parameters:    none
	*/
    wrapAllRoutes : function() {
		AppHelper.wrapNavRoutes();
		AppHelper.wrapContentRoutes();
    },
	
	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:   Manages all the links composing all nav bars inside the document 
	               wrapping each link click event and setting the right style class
	Function Name: wrapNavRoutes
	Version:       0.0.001
	Parameters:    none
	*/
	wrapNavRoutes : function() {		
		$("nav ul li a").click(function(event) {
			event.preventDefault(); // Impedisce il comportamento predefinito del link

			var percorsoContenuto = $(this).attr("href");
			console.info("Navigation item '" + $(this).text() + "'has been clicked.");
			
			//👉️AppHelper.loadUrl(percorsoContenuto);
			AppHelper.loadUrl(percorsoContenuto);
			
			AppHelper.wrapContentRoutes();
		});
	},
	
	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:   Manages all the links composing all nav bars inside the document 
	               wrapping each link click event and setting the right style class
	Function Name: wrapNavRoutes
	Version:       0.0.001
	Parameters:    none
	*/
	wrapContentRoutes : function() {	
		$(".content a").click(function(event) {
			var percorsoContenuto = $(this).attr("href");
			console.info("Content link '" + $(this).text() + "'has been clicked.");
			console.info("Link url = '" + percorsoContenuto + "'.");
			
			if (percorsoContenuto.indexOf("http://") === 0 || percorsoContenuto.indexOf("https://") === 0){
				//urlContent = AppHelper.loadRemoteUrl(Application.contentContainerDomName, percorsoContenuto);
			} else {
				event.preventDefault(); // Impedisce il comportamento predefinito del link
				urlContent = AppHelper.loadLocalUrl(Application.contentContainerDomName, Application.getStartPath() + percorsoContenuto);	
			}
			
			//👉️AppHelper.loadUrl(percorsoContenuto);
			//AppHelper.loadUrl(percorsoContenuto);
		});
	},	
	
	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:
	Function Name: loadUrl
	Version: 0.0.001
	Parameters: 
	Returns:
	*/
	loadUrl : function (url){
		console.debug("[AppHelper::loadUrl('" + url + "')]");
		
		var urlContent = "";
		
			if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0){
				//urlContent = AppHelper.loadRemoteUrl(Application.contentContainerDomName, url);
			} else {
				urlContent = AppHelper.loadLocalUrl(Application.contentContainerDomName, Application.getStartPath() + url);	
			}
			
		AppHelper.executeScripts(urlContent);
	},
	
	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:
	Function Name: loadRemoteUrl
	Version: 0.0.001
	Parameters: 
	Returns:
	*/
	loadRemoteUrl : function (targetDomName, url) {
		var file;
		var fileContent="";
	    try {
			if (!StringHelper.isEmpty(targetDomName)) {
				remoteContent = $.get(url, function(data) {
					$(targetDomName).html(data);
				})
				.done(function(data) {
					$(Application.contentContainerDomName).html(data);
					console.dataView(data);			
					return data;
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					console.error("Errore durante il caricamento della risorsa remota:" + url + "<BR>" +
								  textStatus + "<BR>" +
								  e.stack);
					return "";
				});
				//$(targetDomName).html(remoteContent);
				return remoteContent;
			}
		} catch (e) {
			console.error("Errore nel caricamento della risorsa locale: " + filePath + "<BR>" +
						  e.stack);
			remoteContent = null;
		} finally {
			return remoteContent;
		}			
    },
	
	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:
	Function Name: loadLocalUrl
	Version: 0.0.001
	Parameters: 
	Returns:
	*/
	loadLocalUrl : function (targetDomName, filePath) {
		var file;
		var fileContent="";
	    try {
			if (!StringHelper.isEmpty(targetDomName)) {
				var fso = new ActiveXObject("Scripting.FileSystemObject");
				
				if(fso.FileExists(filePath)){
					var modus   = 1;   // 1 => [read only], 2 => [write only], 8 => [attach text]
					var format  = -2;  //-1 => [Unicode],   0 => [ASCII],     -2 => [system configuration]
					
					console.info("Loading file: " + filePath);
					fileStream  = fso.OpenTextFile(filePath, modus)
					fileContent = fileStream.ReadAll();
					fileStream.Close();
					console.dataView(fileContent);

					$(targetDomName).html(fileContent);
					
				} else {
					console.error("file " + filePath + " doesn't exist.");
				}

				return fileContent;
			}			
		} catch (e) {
			fileContent = null;
		} finally {
			return fileContent;
		}
	},

	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:
	Function Name: loadLocalUrl
	Version: 0.0.001
	Parameters: 
	Returns:
	*/
	executeScripts : function (htmlContent){
        var scriptSrcList = [];
		var scriptContent = ""; 
		var scripts = $(Application.contentContainerDomName + ' script'); // Seleziona tutti gli script nel contenuto
		
		scripts.each(function() {
			scriptContent = $(this).text();
			console.log("Codice javascript, integrato nell'html, da eseguire: " + "<BR>" + 
						scriptContent);
			eval(scriptContent); // Esegue lo script
		});	
		
		scripts = $(htmlContent).find('script[src]');
        scripts.each(function() {
            var src = $(this).attr('src');
			
			if (url.indexOf("file:///") === 0 || Application.isLocallyHosted(url)) {
				scriptContent = AppHelper.loadLocalUrl("", Application.getStartPath() + url);	
				console.log("Codice javascript locale, esterno all'html, da eseguire: " + "<BR>" + 
						    scriptContent);
			} else {
				scriptContent = AppHelper.loadRemoteUrl("", url);
				console.log("Codice javascript remoto, esterno all'html, da eseguire: " + "<BR>" + 
						    scriptContent);
			}				
			eval(scriptContent);
        });
	},
	
	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:
	Function Name: getAbsoluteUrl
	Version: 0.0.001
	Parameters: 
	Returns:
	*/
	getAbsoluteUrl : function(url) {
		var result = "";
		
		if (isUrlAbsolute(url)){
			result = url;
		} else {
			var pathWithOutResourceName = document.location.pathname.substring(0, document.location.pathname.lastIndexOf("/"));
			var protocolWithDom   = document.location.href.substr(0, document.location.href.indexOf("/", 8));
			result = protocolWithDom + pathWithOutResourceName + url;
		}
		
		return result;
	},
};

/*📎DOCUMENTATION
Author:        ㊙️anonimo㊙️
Description:
Class Name:     
Version:       0.0.001
*/	
const SpeechRecognition = {

	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:
	Function Name:     
	Version:       0.0.001
	*/	
	start : function (){
		var recognition = new ActiveXObject("SAPI.SpSharedRecognizer");
		var outputStream = new ActiveXObject("SAPI.SpMemoryStream");
		var audioInput = recognition.AudioInput;
		recognition.DictationSetState(1);

		/*var socket = new WebSocket('ws://localhost:8080');*/

		recognition.onRecognition = function (streamNumber, streamPosition, recognitionType, result) {
			if (recognitionType == 1) {
				var text = result.PhraseInfo.GetText();
				console.log('Testo riconosciuto:', text);
				// Invia il testo al server tramite WebSocket
				/*socket.send(text);*/
			}
		};

		/* Gestione degli errori WebSocket
		socket.onerror = function(error) {
			console.error('Errore WebSocket:', error);
		};*/
		
		/* Chiudi il socket quando la finestra viene chiusa
		window.onbeforeunload = function() {
			socket.close();
		};
		*/

		console.log('Registrazione audio e riconoscimento vocale con SAPI 5.4 in corso...');
	},
};

/*📎DOCUMENTATION
Author:      ㊙️anonimo㊙️
Description:📎⏱️ Loads a local or a page using the path/url provided into the DOM Element
				  defined by strDestinationDomName.
Function Name: loadPage
Version: 0.0.001
Parameters: 
Returns:
*/
const StringHelper = {
	/*📎[DOCUMENTATION]
	Description:   Checks if a string is empty or not
	Author:        ㊙️anonimo㊙️
	last modify:   2024-03-18
	Function Name: isEmpty
	Version:       0.0.001
	ECMASrcipt v:  5.1
	Parameters:    1. str:string => The string to be evaluate.
	Returns:       true  = the passed string (str) is empty
	               false = the passed string (str) is not empty
	*/
	isEmpty : function (str) {
		if (str.trim().length === 0) {
			return true;
		} else {
			return false;
		}
	},
};

/*📎[DOCUMENTATION]
Class Name:    GuiHelper
last modify:   2024-03-18
Version:       0.0.001
ECMASrcipt v:  5.1
Description:   Helper class that manages the GUI
Author:        ㊙️anonimo㊙️
*/
const GuiHelper = {
	
	/*📎DOCUMENTATION
	Author:      ㊙️anonimo㊙️
	Description:📎⏱️ Loads a local or a page using the path/url provided into the DOM Element
					  defined by strDestinationDomName.
	Function Name: loadPage
	Version: 0.0.001
	Parameters: 
	Returns:
	*/
	toggleFullScreen : function(){
		console.log("toggleFullScreen");
		if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
			(!document.mozFullScreen && !document.webkitIsFullScreen)) {
			console.log("toggleFullScreen step 1");
			if (document.documentElement.requestFullScreen) {  
				console.log("toggleFullScreen step 1.1");
				document.documentElement.msRequestFullscreen();  
			} else if (document.documentElement.mozRequestFullScreen) { 
				console.log("toggleFullScreen step 1.2");
				document.documentElement.mozRequestFullScreen();  
			} else if (document.documentElement.webkitRequestFullScreen) {
				console.log("toggleFullScreen step 1.3");
				document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
			}  
		} else { 
			console.log("toggleFullScreen step 2");
			if (document.cancelFullScreen) {  
				console.log("toggleFullScreen step 2.1");
				document.msExitFullscreen();  
			} else if (document.mozCancelFullScreen) {  
				console.log("toggleFullScreen step 2.2");
				document.mozCancelFullScreen();  
			} else if (document.webkitCancelFullScreen) {  
				console.log("toggleFullScreen step 2.3");
				document.webkitCancelFullScreen();  
			}  
		}  
	},
	
	/*📎DOCUMENTATION
	Author:      ㊙️anonimo㊙️
	Description:📎⏱️ Loads a local or a page using the path/url provided into the DOM Element
					  defined by strDestinationDomName.
	Function Name: loadPage
	Version: 0.0.001
	Parameters: 
	Returns:
	*/
	fullscreen : function (mode, el) {
		if(mode) {
			$(el).requestFullscreen() 
		} else {
			document.exitFullscreen();
		}
	},
	
	arrayAsHtmlList : function (array) {
		var listObject = document.createElement("UL");

		// Aggiungi i nomi dei processi come elementi di lista
		for (var i = 0; i < array.length; i++) {
			var listItem = document.createElement("LI");
			listItem.appendChild(document.createTextNode(array[i]));
			listObject.appendChild(listItem);
		}
		return listObject.innerHTML;
	},
	
	appendHtml : function(target, html) {
		$(target).append(html);
	},
	replaceHtml : function(target, html){
		$(target).html(html);
	},
};

/*📎DOCUMENTATION
Author:      ㊙️anonimo㊙️
Description:📎⏱️ Loads a local or a page using the path/url provided into the DOM Element
				  defined by strDestinationDomName.
Function Name: loadPage
Version: 0.0.001
Parameters: 
Returns:
*/
const DateTimeHelper = {
	
	/*📎DOCUMENTATION
	Author:      ㊙️anonimo㊙️
	Description:📎⏱️ Loads a local or a page using the path/url provided into the DOM Element
					  defined by strDestinationDomName.
	Function Name: loadPage
	Version: 0.0.001
	Parameters: 
	Returns:
	*/
	now : function () {
		// Mon Jun 08 2020 16:47:55 GMT+0800 (China Standard Time);	
		return new Date();
	},
	
	/*📎DOCUMENTATION
	Author:      ㊙️anonimo㊙️
	Description:📎⏱️ Loads a local or a page using the path/url provided into the DOM Element
					  defined by strDestinationDomName.
	Function Name: loadPage
	Version: 0.0.001
	Parameters: 
	Returns:
	*/
	tomorrowAsEpoch : function (){
		var start = parseInt((new Date()).getTime() / 1000) + 86400; 
		console.log("Data e ora in formato epoch: '" + start + "'.");
		return start;
	},
	
	/*📎DOCUMENTATION
	Author:      ㊙️anonimo㊙️
	Description:📎⏱️ Loads a local or a page using the path/url provided into the DOM Element
					  defined by strDestinationDomName.
	Function Name: loadPage
	Version: 0.0.001
	Parameters: 
	Returns:
	*/
	getTomorrowDateTimeAsEpoch : function() {
		var start = parseInt((new Date()).getTime() / 1000) + 86400; 
		console.log("Data e ora in formato epoch: '" + start + "'.");
		return start;
	},

	/*📎DOCUMENTATION
	Author:      ㊙️anonimo㊙️
	Description:📎⏱️ Loads a local or a page using the path/url provided into the DOM Element
					  defined by strDestinationDomName.
	Function Name: loadPage
	Version: 0.0.001
	Parameters: 
	Returns:
	*/
	dateToEpoc : function(date) {
		return Date.parse(date)
	},
}

const PCSystemHelper = {
	getCPUName : function (){
		try {
			var strComputer     = ".";
			var SWBemlocator    = new ActiveXObject("WbemScripting.SWbemLocator");
			var objWMIService   = SWBemlocator.ConnectServer(strComputer, "/root/CIMV2");
			var processorList   = [];
            var queryResult     = objWMIService.ExecQuery("SELECT * FROM Win32_Processor");
            var enumQueryResult = new Enumerator(queryResult);

            for (; !enumQueryResult.atEnd(); enumQueryResult.moveNext()) {
                var cpu = enumQueryResult.item().ProcessorId;
                processorList.push(cpu);
				
            }
            return processList;
		} catch (e) {
			console.error("Errore nel caricamento di servizi locali: " + e.message);
		}
	},
	getAllProcess : function (){
		try {
			var strComputer     = ".";
			var SWBemlocator    = new ActiveXObject("WbemScripting.SWbemLocator");
			var objWMIService   = SWBemlocator.ConnectServer(strComputer, "/root/CIMV2");
			var processList     = [];
			var queryResult     = objWMIService.ExecQuery("SELECT * FROM Win32_Process");
			var enumQueryResult = new Enumerator(queryResult);

			for(; ! enumQueryResult.atEnd(); enumQueryResult.moveNext()) {
				var process = enumQueryResult.item();
				processList.push(process.Name);
			}
            return processList;
		} catch (e) {
			console.error("Errore nel caricamento di servizi locali: " + e.message);
		}
	},
};

var getRequestQuery = function() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	console.log(vars);
	return vars;	
};

var isUrlAbsolute = function(url) { 
	return (url.indexOf('//') === 0 ? 
				true : 
			url.indexOf('://') === -1 ? 
				false : 
			url.indexOf('.') === -1 ? 
				false : 
			url.indexOf('/') === -1 ? 
				false : 
			url.indexOf(':') > url.indexOf('/') ? 
				false : 
			url.indexOf('://') < url.indexOf('.') ? 
				true : 
			false)
};

/*📎DOCUMENTATION
Author:      ㊙️anonimo㊙️
Description:📎⏱️ Loads a local or a page using the path/url provided into the DOM Element
				  defined by strDestinationDomName.
Function Name: loadPage
Version: 0.0.001
Parameters: 
Returns:
*/
/*
var loadScript = function(url) {
	console.log("Now loading script: '" + url + "'");
	var response = fetch(url);
	var script   = response.text();
	Function(script);
};
*/
// Funzione per convertire una sequenza di byte in una stringa UTF-8
function utf8ToBinary(utf8Bytes) {
    var string = '';
    var i = 0;
    while (i < utf8Bytes.length) {
        var byte1 = utf8Bytes.charCodeAt(i++);
        if (byte1 < 128) {
            string += String.fromCharCode(byte1);
        } else if (byte1 > 191 && byte1 < 224) {
            var byte2 = utf8Bytes.charCodeAt(i++);
            string += String.fromCharCode(((byte1 & 31) << 6) | (byte2 & 63));
        } else {
            var byte2 = utf8Bytes.charCodeAt(i++);
            var byte3 = utf8Bytes.charCodeAt(i++);
            string += String.fromCharCode(((byte1 & 15) << 12) | ((byte2 & 63) << 6) | (byte3 & 63));
        }
    }
    return string;
}
