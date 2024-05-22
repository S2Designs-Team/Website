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
        this.props          = [];
        this.appNeedRefresh = false;
        this.appStatus      = null;

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
    * Description:  This method adds or updates a global property
    * last modify:  2024-05-22
    * MethodName:   setProperty
    * Parameters:   [required] nameOrObject ==========> It could ne a string (the property name) or an object.
    *               [optional][default = null] value => The property value.
    */
    setProperty = (nameOrObject, value = null) => {
        switch (typeof nameOrObject) {
                
            case "string":
                /*
                * if the 1st parameter is a string uses directly the name and the value parameters.
                */
                this.props[nameOrObject] = value;
                break;
                
            case "object":
                if (nameOrObject !== null) {
                    /*
                    * if the 1st parameter is an object, extracts its name and its value.
                    */
                    Object.keys(nameOrObject).forEach(key => {
                        this.props[key] = nameOrObject[key];
                    });
                } else {
                    throw new Error('Invalid parameter: nameOrObject must not be null');
                }
                break;
                
            default:
                throw new Error('Invalid parameter: nameOrObject must be either a string or an object');
        }
    };  
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
    getProperty = (propertyName) => { return this.props[propertyName]; };
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
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description:  Function to get the local application start path
    * last modify:  2024-05-24
    * FunctionName: getStartPath
    */	
    getStartPath = () => {
        var pathWithOutResourceName = document.location.pathname.substring(0, document.location.pathname.lastIndexOf("/"));
        var protocolWithDomain      = document.location.href.substr(0, document.location.href.indexOf("/", 8));
        return (protocolWithDomain + pathWithOutResourceName + "/").substr(8).toLowerCase();
    };
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description:  Function to get if the supplied url is locally or remotely located
    * last modify:  2024-05-24
    * FunctionName: isLocallyHosted
    * Returns:      true  => the url is locally hosted
    *               false => the url is remotely hosted
    */		
    isLocallyHosted = (url) => {
        if (url){

            // Checks if URL starts with "file:///" (for local urls)
            if (url.indexOf("file:///") === 0) { return true; }

            // Checks if URL starts with "http://" o "https://" (for remote urls)
            if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) { return false; }

            // If we reach this point we assume that it is a local url
           return true;
        }
	
        console.error("[AppContext::isLocallyHosted] No url has been supplied.");
        return false;
    };
    /*📎DOCUMENTATION
    * Author:       ㊙️anonimo㊙️
    * Description:  Checks if the current page has been executed as HTA (HTML Application)
    * last modify:  2024-05-24	
    * FunctionName: isHTA
    * Returns:      true  => indica che la pagina è eseguita in un ambiente HTA
    *               false => indica che la pagina NON è in un ambiente HTA
    */	
    isHTA = () => {
        // Retrieves the 1st occurence of the element <HTA:APPLICATION> inside the current document (if it is present).
        var htmlElement = document.getElementsByTagName('HTA:APPLICATION')[0];

        // Checks idf the retrieved element 'htmlElement' is undefined (AKA not found) or not and if if contains an 'applicationname' property defined.
        return (typeof htmlElement !== 'undefined' && htmlElement.getAttribute('applicationname') !== null);
    },	
};

// Export the singleton instance
const appContextInstance = new AppContext();
Object.freeze(appContextInstance);

export { appContextInstance as AppContext };
