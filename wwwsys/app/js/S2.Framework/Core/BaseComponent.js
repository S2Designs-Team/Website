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
* Description: The Base Component class used as Base for the further Gui components defined elsewhere.
* last modify: 2024-05-19
* ClassName:   BaseComponent
* Version:     0.0.001
*/
class BaseComponent {

    /*📎DOCUMENTATION
    * Author:      ㊙️anonimo㊙️
    * Description: The class constructor.
    * last modify: 2024-05-19
    * Parameters:  [optional] properties  => properties of the component
    *              [optional] cssFilePath => the css style of the component
    */   
    constructor(properties = {}, cssFilePath = null) {
        this.properties  = properties;
        this.htmlSegment = "";
        this.cssStyles   = "";
        this.cssFilePath = cssFilePath;
        this.container   = null;
        this.scriptUrls  = [];
        
        // Creates a container element for this GUI Component
        this.container = document.createElement("SPAN");
        this.container.innerHTML = this.htmlSegment;
    }

    /*📎DOCUMENTATION
    * Author:      ㊙️anonimo㊙️
    * Description: A 'placeholder' method to be used to add inizialization to the GUI Component.
    *              This method has to be overrided inside upper level component class implementing this Base Component class.
    * last modify: 2024-05-19
    * MethodName:  initialize
    * Parameters:  [required] parentId => is the id of parent component containing this GUI Component
    */        
    initialize() {}

    /*📎DOCUMENTATION
    * Author:      ㊙️anonimo㊙️
    * Description: This method loads the css style defined inside the file passed with 'filePath' parameter.
    * last modify: 2024-05-19
    * MethodName:  loadCssFile
    * Parameters:  [required] filePath => The file path defined to be applied to this component.
    */   
    loadCssFile(url) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.setAttribute('data-component', this.constructor.name);
            link.rel     = 'stylesheet';
            link.href    = url;
            link.onload  = () => resolve();
            link.onerror = () => reject('Could not load CSS file: ${url}');
            document.head.appendChild(link);
        });
    }

    /*📎DOCUMENTATION
    * Author:      ㊙️anonimo㊙️
    * Description: Method to add a script to the component.
    * last modify: 2024-05-19
    * MethodName:  addScript
    * Parameters:  [required] url => URL of the script to be added.
    */
    addScript(url) {
        this.scriptUrls.push(url);
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.setAttribute('data-component', this.constructor.name);
            script.src     = url;
            script.onload  = () => resolve();
            script.onerror = () => reject('Could not load script: ${url}');
            document.body.appendChild(script);
        });
    }

    /*📎DOCUMENTATION
    * Author:      ㊙️anonimo㊙️
    * Description: This async method shows up the GUI Component inside the parent one.
    * last modify: 2024-05-19
    * MethodName:  render
    * Parameters:  [required] parentId => is the id of parent component containing this GUI Component
    */    
    async render(parentId) {
        /*
        * Calls the 'placeholder' method to initialize this GUI Component.
        * if it is overrided by the implementing class then runs the code defined in there
        * otherwise it runs the placeholder that is empty (so it does nothing).
        */
        this.initialize();
        
        const parent = document.getElementById(parentId);
        
        /*
        * If no parentId has been found then shows up a console error message and
        * extits the render procedure.
        */
        if (!parent) {
            console.error("Parent element with id '${parentId}' not found.");
            return;
        }
        
        /*
        * If has been defined a css file path related to this GUI Component 
        * proceeds to load it.
        */
        if (this.cssFilePath) {
            try {
                await this.loadCssFile(this.cssFilePath);
            } catch (error) {
                console.warn(error);
            }
        }

        /* 
        * If the component class has an style defined internally then it creates 
        * the relative DOM object appending the style defined inside the component
        * after that it places the Object inside the head section of the main HTML page.
        */
        if (this.cssStyles) {
            const style = document.createElement('style');
            style.textContent = this.cssStyles;
            document.head.appendChild(style);
        }

        /* 
        * Adds the component in the parent GUI object
        */
        parent.appendChild(this.container);

        /* 
        * Adds the component in the parent GUI object
        */
        this.addEventListeners(this.container);
    }
    
    /*📎DOCUMENTATION
    * Author:      ㊙️anonimo㊙️
    * Description: A 'placeholder' method to be used to add event listeners to the GUI Component.
    *              This method has to be overrided inside upper level component class implementing this Base Component class.
    * last modify: 2024-05-19
    * MethodName:  addEventListeners
    * Parameters:  [required] container => the component's container to which add the events listeners
    */
    addEventListeners(container) {}

    /*📎DOCUMENTATION
    * Author:      ㊙️anonimo㊙️
    * Description: This method is intended to be used to remove this GUI component from the HTML code.
    * last modify: 2024-05-19
    * MethodName:  dispose
    */
    dispose() {
        if (this.container) {
            this.container.remove();
            this.container = null;

            /*
            * Removes inline styles
            */
            const internalStyle = document.querySelector(`style[data-component="${this.constructor.name}"]`);
            if (internalStyle) {
                internalStyle.remove();
            }

            /*
            * Removes external stylesheet link
            */
            const externalStyle = document.querySelector(`link[href="${this.cssFilePath}"]`);
            if (externalStyle) {
                externalStyle.remove();
            }

            /*
            * Removes added scripts
            */
            this.scriptUrls.forEach(url => {
                const script = document.querySelector(`script[src="${url}"]`);
                if (script) {
                    script.remove();
                }
            });
            
            /*
            * Removes added external scripts
            */
            this.scriptUrls.forEach(url => {
                const script = document.querySelector(`script[src="${url}"]`);
                if (script) {
                    script.remove();
                }
            });

            /*
            * Removes added script inline
            */
            const inlineScripts = this.container.querySelectorAll('script');
            inlineScripts.forEach(inlineScript => {
                /*
                * Checks if the inline script is related to this component
                */
                if (inlineScript.getAttribute('data-component') === this.constructor.name) {
                    inlineScript.remove();
                }
            });
            
        }
    }   
}
