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
Author:      ㊙️anonimo㊙️
Description: (Singleton) Retrieves some system informations
last modify: 2024-05-24
ClassName:   System
Version:     0.0.001
*/
class System {
    constructor() {
        if (System.instance) {
            return System.instance;
        } 
        System.instance = this;    
    }
	
	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:   Gets the Javascript Version used by the client browser
	Function Name: getJavascriptVersion
	Version:       0.0.001
	Returns:       The Javascript Version used by the client browser.
	*/	
	getJavascriptVersion = () =>{
		// STEP ONE: Convert all characters to lowercase to simplify testing
		var agt=navigator.userAgent.toLowerCase();
	
		// SETP TWO: Determine Browser Version
		// Note: On IE5, these return 4, so use is_ie5up to detect IE5.
		var is_major = parseInt(navigator.appVersion);
		var is_minor = parseFloat(navigator.appVersion);
	
		// Note: Opera and WebTV spoof Navigator.  We do strict client detection.
		// If you want to allow spoofing, take out the tests for opera and webtv.
		var is_nav         = ((agt.indexOf('mozilla')!=-1) 
						   && (agt.indexOf('spoofer')==-1)
						   && (agt.indexOf('compatible') == -1) 
						   && (agt.indexOf('opera')==-1) 
						   && (agt.indexOf('webtv')==-1) 
						   && (agt.indexOf('hotjava')==-1));
		
		var is_nav2        = (is_nav && (is_major == 2));
		var is_nav3        = (is_nav && (is_major == 3));
		var is_nav4        = (is_nav && (is_major == 4));
		var is_nav4up      = (is_nav && (is_major >= 4));
		var is_navonly     = (is_nav && ((agt.indexOf(";nav") != -1) || (agt.indexOf("; nav") != -1)) );
		var is_nav6        = (is_nav && (is_major == 5));
		var is_nav6up      = (is_nav && (is_major >= 5));
		var is_gecko       = (agt.indexOf('gecko') != -1);
	
		var is_ie          = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
		var is_ie3         = (is_ie && (is_major < 4));
		var is_ie4         = (is_ie && (is_major == 4) && (agt.indexOf("msie 4")!=-1) );
		var is_ie4up       = (is_ie && (is_major >= 4));
		var is_ie5         = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")!=-1) );
		var is_ie5_5       = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.5") !=-1));
		var is_ie5up       = (is_ie && !is_ie3 && !is_ie4);
		var is_ie5_5up     = (is_ie && !is_ie3 && !is_ie4 && !is_ie5);
		var is_ie6         = (is_ie && (is_major == 4) && (agt.indexOf("msie 6.")!=-1) );
		var is_ie6up       = (is_ie && !is_ie3 && !is_ie4 && !is_ie5 && !is_ie5_5);
	
		/*👉️ KNOWN BUG: On AOL4, returns false if IE3 is embedded browser
		or if this is the first browser window opened.  Thus the
		variables is_aol, is_aol3, and is_aol4 aren't 100% reliable. */
		var is_aol         = (agt.indexOf("aol") != -1);
		var is_aol3        = (is_aol && is_ie3);
		var is_aol4        = (is_aol && is_ie4);
		var is_aol5        = (agt.indexOf("aol 5") != -1);
		var is_aol6        = (agt.indexOf("aol 6") != -1);
	
		var is_opera       = (agt.indexOf("opera") != -1);
		var is_opera2      = (agt.indexOf("opera 2") != -1 || agt.indexOf("opera/2") != -1);
		var is_opera3      = (agt.indexOf("opera 3") != -1 || agt.indexOf("opera/3") != -1);
		var is_opera4      = (agt.indexOf("opera 4") != -1 || agt.indexOf("opera/4") != -1);
		var is_opera5      = (agt.indexOf("opera 5") != -1 || agt.indexOf("opera/5") != -1);
		var is_opera5up    = (is_opera && !is_opera2 && !is_opera3 && !is_opera4);
	
		var is_webtv       = (agt.indexOf("webtv") != -1); 
		var is_TVNavigator = ((agt.indexOf("navio") != -1) || (agt.indexOf("navio_aoltv") != -1)); 
		var is_AOLTV       = is_TVNavigator;
	
		var is_hotjava     = (agt.indexOf("hotjava") != -1);
		var is_hotjava3    = (is_hotjava && (is_major == 3));
		var is_hotjava3up  = (is_hotjava && (is_major >= 3));
	
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
	
		/*👉️ AUTHOR COMMENT TO PAY ATTENTION: 
		In the future, update this code when newer versions of JS
		are released. For now, we try to provide some upward compatibility
		so that future versions of Nav and IE will show they are at
		*least* JS 1.x capable. Always check for JS version compatibility
		with > or >=. 
		*/
		else if (is_nav6up) is_js = 1.5;
		
		/*👉️ AUTHOR COMMENT TO PAY ATTENTION: 
		ie5up on mac is 1.4*/
		else if (is_ie5up) is_js = 1.3
	
		/*👉️ AUTHOR COMMENT TO PAY ATTENTION: 
		no idea for other browsers; 
		always check for JS version with > or >=*/
		else is_js = 0.0;
		return ("Javascript ver. " + is_js) ;
	};
	
	/*📎DOCUMENTATION
	Author:        ㊙️anonimo㊙️
	Description:   The same as getJavascriptVersion but for JScript (Jscript and Javascript are not the same thing!!!)
	Function Name: getJScriptVersion
	Version:       0.0.001
	Returns:       the JScript Version used by the client browser
	*/	
	getJScriptVersion = ()=> {
		return  (ScriptEngine() + " ver. " + ScriptEngineMajorVersion() + "." + ScriptEngineMinorVersion() + "." + ScriptEngineBuildVersion());
	};	
};
// Export the singleton instance
const systemInstance = new System();
Object.freeze(systemInstance);

export { systemInstance as System };
