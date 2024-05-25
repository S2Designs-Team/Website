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

/*📎DOCUMENTATION
* Author:       ㊙️anonimo㊙️
* Description:  An helper class to manage the urls routes
* Last modify:  2024-05-25
* ClassName:    SpaHelper
* Version:      0.0.001
*/
class SpaHelper {
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description:  The class constructor.
    * Last modify:  2024-05-25
    */   
    constructor () { }
    
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description:  A 'placeholder' method to be used to add inizialization to the GUI Component.
    *               This method has to be overrided inside upper level component class implementing this Base Component class.
    * Last modify:  2024-05-25
    * MethodName:   wrapAllRoutes
    */
    wrapAllRoutes = () => {
        AppHelper.wrapNavRoutes();
        AppHelper.wrapContentRoutes();
    };

    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description:  Manages all the links composing all nav bars inside the document 
    *               wrapping each link click event and setting the right style class
    * Last modify:  2024-05-25
    * MethodName:   wrapNavRoutes
    */
    wrapNavRoutes = () => {		
        $("nav ul li a").click(function(event) {
            event.preventDefault(); // Impedisce il comportamento predefinito del link

            var percorsoContenuto = $(this).attr("href");
            console.info("Navigation item '" + $(this).text() + "'has been clicked.");
			
            //👉️AppHelper.loadUrl(percorsoContenuto);
            AppHelper.loadUrl(percorsoContenuto);
			
            AppHelper.wrapContentRoutes();
        });
    };
  
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description:  Manages all the links composing all contents in the document  
    *               wrapping each link click event and setting the right style class
    * Last modify:  2024-05-25
    * MethodName:   wrapContentRoutes
    */
    wrapContentRoutes = () =>{	
        $(".content a").click(function(event) {
            var myContentPath = $(this).attr("href");
            console.info("Content link '" + $(this).text() + "'has been clicked.");
            console.info("Link url = '" + myContentPath + "'.");
			
            if (myContentPath.indexOf("http://") === 0 || myContentPath.indexOf("https://") === 0){
                console.debug("Loading the web hosted page')]");
                //urlContent = AppHelper.loadRemoteUrl(Application.contentContainerDomName, percorsoContenuto);
            } else {
                event.preventDefault(); // Impedisce il comportamento predefinito del link
                urlContent = AppHelper.loadLocalUrl(Application.contentContainerDomName, Application.getStartPath() + myContentPath);	
            }
        });
    };
  
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description: 
    * Last modify:  2024-05-25
    * MethodName:   loadUrl
    * Parameters:   [required] url => The url from where the content has to be picked up.    
    */
    loadUrl = async (url) => {
        console.debug("[AppHelper::loadUrl('" + url + "')]");
		
        var urlContent = "";
		
        if (!Application.isLocallyHosted(window.location.href)) {
			
            if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0){
                // We are going to load from an absolute url
                console.debug("We are going to load from an absolute url " + url);
                urlContent = await AppHelper.loadRemoteUrl(Application.contentContainerDomName, url);
            } else {
                // We are going to load from a relative url
                console.debug("We are going to load from an relative url transforming it into " + window.location.href + url);
                urlContent = await AppHelper.loadRemoteUrl(Application.contentContainerDomName, window.location.href + url);					
            }
        } else {
            urlContent = await AppHelper.loadLocalUrl(Application.contentContainerDomName, Application.getStartPath() + url);	
        }
        if (!StringHelper.isEmpty(urlContent)) { AppHelper.executeScripts(urlContent); }
    };
  
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description: 
    * Last modify:  2024-05-25
    * FunctionName: loadRemoteUrl
    * Parameters:   [required] targetDomName ==> The target dom object where the content has to be shown. 
    *               [required] url ============> The url from where the content has to be picked up.
    * Returns:      The content loaded from the remote url
    */
    loadRemoteUrl = async (targetDomName, url) => {
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
                    var errorMessage = `Errore durante il caricamento della risorsa remota: ${url} <BR>
                                       ${textStatus} <BR>`;
                    console.error(errorMessage);
                    throw "errorMessage";
                });
                //$(targetDomName).html(remoteContent);
                //return remoteContent;
            }
        } catch (e) {
            console.error(e.message + " <BR>" + e.stack);
            remoteContent = null;
        } finally {
            return remoteContent;
        }			
    };
  
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description: 
    * Last modify:  2024-05-25
    * FunctionName: loadLocalUrl
    * Parameters:   [required] targetDomName ==> The target dom object where the content has to be shown. 
    *               [required] filePath =======> The file path from where the content has to be picked up.
    * Returns:      The content loaded from the remote url
    */
    loadLocalUrl = async (targetDomName, filePath) => {
        var file;
        var fileContent = "";
        try {
            if (!StringHelper.isEmpty(targetDomName)) {
                var fso = new ActiveXObject("Scripting.FileSystemObject");
				
                if (fso.FileExists(filePath)) {
                    var modus   = 1;   // 1 => [read only], 2 => [write only], 8 => [attach text]
                    var format  = -2;  //-1 => [Unicode],   0 => [ASCII],     -2 => [system configuration]
					
                    console.info("Loading file: " + filePath);
                    fileStream  = fso.OpenTextFile(filePath, modus)
                    fileContent = fileStream.ReadAll();
                    fileStream.Close();
                    //console.dataView(fileContent);

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
    };
  
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description: 
    * Last modify:  2024-05-25
    * FunctionName: executeScripts
    * Parameters:   [required] htmlContent ==> The target dom object where the content has to be shown. 
    *               [required] filePath =======> The file path from where the content has to be picked up.
    * Returns:      The content loaded from the remote url
    */
    executeScripts = (htmlContent) => {
        debugger;
        var scriptSrcList = [];
        var scriptContent = ""; 
        var scripts       = $(htmlContent).find('script'); // Seleziona tutti gli script nel contenuto
        
        scripts.each(function() {
            scriptContent = $(this).text();
            console.log("Codice javascript, integrato nell'html, da eseguire: " + "<BR>" + 
                        scriptContent);
            eval(scriptContent); // Esegue lo script
        });
        
        scripts = $(htmlContent).find('script');
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
    };
  
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description: 
    * Last modify:  2024-05-25
    * FunctionName: getAbsoluteUrl
    * Parameters:   [required] url ==> The target dom object where the content has to be shown. 
    * Returns:      The content loaded from the remote url
    */
    getAbsoluteUrl = (url) => {
        var result = "";
        if (isUrlAbsolute(url)) {
            result = url;
        } else {
            var pathWithOutResourceName = document.location.pathname.substring(0, document.location.pathname.lastIndexOf("/"));
            var protocolWithDom   = document.location.href.substr(0, document.location.href.indexOf("/", 8));
            result = protocolWithDom + pathWithOutResourceName + url;
        }
        return result;
    };
};

this.getAppUrl      = () => { return window.location.href; };     // "https://phobetor1999.github.io/Website/"
this.getAppHost     = () => { return window.location.host; };     // "phobetor1999.github.io"
this.getAppHostname = () => { return window.location.hostname; }; // "phobetor1999.github.io"
this.getAppOrigin   = () => { return window.location.origin; };   // "https://phobetor1999.github.io"
this.getAppPathName = () => { return window.location.pathname; }; // "/Website/""
this.getAppPort     = () => { return window.location.port; };     // ""
this.getAppProtocol = () => { return window.location.protocol; }; // "https:"
this.getAppSearch   = () => { return window.location.search; };   // ""

/*📎DOCUMENTATION
* Author:       ㊙️anonimo㊙️
* Description:  Returns a value that has been rounded to a set precision
* last modify:  2024-05-21
* FunctionName: round
* Version:      0.0.001
* Parameters:   [required] value ==================> The value to round
*               [optional][default = 3] precision => Precision the precision (decimal places)
* Return:       {Number}
*/   
round = (value, precision = 3) => parseFloat(value.toFixed(precision));

/*📎DOCUMENTATION
* Author:       ㊙️anonimo㊙️
* Description:  Returns a value that has been limited between min & max.
* last modify:  2024-05-21
* FunctionName: clamp
* Version:      0.0.001
* Parameters:   [required] value ==============> The value to clamp.
*               [optional][default = 0] min ===> Minimum value to allow.
*               [optional][default = 100] max => Maximum value to allow.
* Return:       {Number}
*/ 
clamp = (value, min = 0, max = 100 ) => { return Math.min(Math.max(value, min), max); };

/*📎DOCUMENTATION
* Author:       ㊙️anonimo㊙️
* Description:  Returns a value that has been re-mapped according to the from/to
*               - for example, adjust(10, 0, 100, 100, 0) = 90
* last modify:  2024-05-21
* FunctionName: adjust
* Version:      0.0.001
* Parameters:   [required] value ===> The value to re-map (or adjust).
*               [required] fromMin => Min value to re-map from.
*               [required] fromMax => Max value to re-map from.
*               [required] toMin ===> Min value to re-map to.
*               [required] toMax ===> Max value to re-map to.
* Return:       {Number}
*/   
adjust = (value, fromMin, fromMax, toMin, toMax) => {	return round(toMin + (toMax - toMin) * (value - fromMin) / (fromMax - fromMin)); };

export { SpaHelper, round, clamp, adjust }
