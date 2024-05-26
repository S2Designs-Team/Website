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
* Author:      ㊙️anonimo㊙️
* Description: (Singleton) The global App Context.
* Last modify: 2024-05-26
* ClassName:   StringHelper
* Version:     0.0.001
*/
class StringHelper {
    
    /*📎DOCUMENTATION
    * Author:      ㊙️anonimo㊙️
    * Description: The class constructor.
    * Last modify: 2024-05-26
    */   
    constructor (){
        if (StringHelper.instance) {
            return StringHelper.instance;
        }
        StringHelper.instance = this;
    }   
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description:  Checks if the string passed is null or empty.
    * Last modify:  2024-05-26
    * FunctionName: isEmpty
    * Returns:      {boolean} true ==> the string is empty or null.
    *                         false => the string is NOT empty.
    */
    isNullOrEmpty = (par_str) => {
        if (par_str == null || par_str.trim().length === 0) {
            return true;
        } else {
            return false;
        }
    };
}

// Export the singleton instance
const stringInstance = new StringHelper();
Object.freeze(stringInstance);

export { stringInstance as StringHelper };
