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
this.round = (value, precision = 3) => parseFloat(value.toFixed(precision));

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
this.clamp = (value, min = 0, max = 100 ) => { return Math.min(Math.max(value, min), max); };

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
this.adjust = (value, fromMin, fromMax, toMin, toMax) => {	return round(toMin + (toMax - toMin) * (value - fromMin) / (fromMax - fromMin)); };

export { round, clamp, adjust }
