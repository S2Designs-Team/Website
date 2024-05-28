// import { HtaConsole } from './wwwsys/app/js/S2.Framework/DevTools/HtaConsole.js'; // Import HtaConsole instance from HtaConsole.js
// Import of needed graphic components
import { NavBar } from './wwwsys/app/js/S2.Framework/Components/NavBar.js';
import { ChannelLink } from './wwwsys/app/js/S2.Framework/Components/ChannelLink.js';

// Inizializzazione della console
HtaConsole.render();

// Sets a proprerty using an object 
const config = { apiUrl: 'https://api.example.com', timeout: 5000 };

AppContext.setProperty("landingPageUrl"          , "wwwsys/pages/index.html");
AppContext.setProperty("name"                    , "My application");
AppContext.setProperty("contentContainerDomName" , "#content");
AppContext.setProperty("isLocalContent"          , "true");
AppContext.setProperty(config);

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
console.log("# Created by S2DesignsTeam © 2035 (Phobetor1999 AKA ㊙️anonimo㊙️).         " + "</BR>" +
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

console.info(AppContext.isHTA() ? System.getJavascriptVersion() + " | " + System.getJScriptVersion() + "." :
                                  System.getJavascriptVersion() + "." );
console.info("Application Start.");
console.info(AppContext.isLocallyHosted(window.location.href) ? "Web app running locally from " + AppContext.getStartPath() + "</BR>" : 
                                                                "Web app running remotely at "  + AppContext.getBaseUrl()   + "</BR>");

// Export the singleton instance
const appHttpClient = new HttpClient();
SpaHelper.wrapAllRoutes();
console.info("Redirecting to the landing page....");
		
SpaHelper.loadUrl(AppContext.props["landingPageUrl"]);

// Istanze dei componenti grafici
const navBar = new NavBar();
//component1.render("content");
