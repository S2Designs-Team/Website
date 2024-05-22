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
import { BaseComponent } from './BaseComponent.js';
import { HttpClient }    from './HttpClient.js';

/*📎DOCUMENTATION
* Author:      ㊙️anonimo㊙️
* Description: (Singleton) The global App Context.
* last modify: 2024-05-22
* ClassName:   AppContext
* Version:     0.0.001
*/
class AppContext {
    constructor() {
        if (AppContext.instance) {
            return AppContext.instance;
        } 
        this.appServices    = [];
        this.appProperties  = [];
        this.appNeedRefresh = false;
        this.appStatus      = null;
        this.BaseComponent  = BaseComponent;
        this.HttpClient     = new HttpClient();

        AppContext.instance = this;    
    }
    
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description: 
    * last modify:  2024-05-22
    * MethodName:   addService
    */
    addService = (service)=> { this.appServices.push(service); };
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description: 
    * last modify:  2024-05-22
    * MethodName:   addProperty
    */
    addProperty = (property) => { this.appProperties.push(property); };
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description:  
    * last modify:  2024-05-22
    * FunctionName: getService
    */
    getService = (serviceName) => { return this.appServices.find(service => service.name === serviceName); };
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description: 
    * last modify:  2024-05-22
    * FunctionName: getProperty
    */
    getProperty = (propertyName) => { return this.appProperties.find(property => property.name === propertyName); };
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description:  Function to get the base URL of the current page
    * last modify:  2024-05-22
    * FunctionName: getBaseUrl
    */
    getBaseUrl = () => {
        const url = window.location.href;
        const lastSlashIndex = url.lastIndexOf('/');
        return url.substring(0, lastSlashIndex + 1);
    };
};

// Export the singleton instance
const appContextInstance = new AppContext();
Object.freeze(appContextInstance);

export { appContextInstance as AppContext };
