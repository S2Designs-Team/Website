import { BaseComponent } from './Core/BaseComponent.js';  // Import BaseComponent class from BaseComponent.js
import { System }        from './Core/System.js';         // Import System class from System.js
import { StringHelper }  from './Core/StringHelper.js';   // Import StringHelper class from SpaHelper.js
import { HttpClient }    from './Core/HttpClient.js';     // Import HttpClient class from HttpClientk.js
import { AppContext }    from './Core/AppContext.js';     // Import AppContext instance from AppContext.js
import { SpaHelper }     from './Core/SpaHelper.js';      // Import SpaHelper instance from SpaHelper.js
import { HtaConsole }    from './DevTools/HtaConsole.js'; // Import HtaConsole instance from HtaConsole.js

// Function to be executed after the page has fully loaded
// =======================================================
function startApplication() {
    loadCoreServices();
    loadMainScript();
}
function loadCoreServices() {
    window.String        = StringHelper;    
    window.BaseComponent = BaseComponent;
    window.System        = System;
    window.HttpClient    = HttpClient;
    window.AppContext    = AppContext;
    window.HtaConsole    = HtaConsole;
    window.SpaHelper     = SpaHelper;
}
function loadMainScript() {
    // Get the base URL of the current page
    const baseUrl = AppContext.getBaseUrl();
    // Load program.js after page load
    const script  = document.createElement('script');
    script.type   = 'module';
    script.src    = `${baseUrl}program.js`;
    document.body.appendChild(script);
}

// Check if the document has fully loaded
if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    startApplication();
} else {
    document.addEventListener('DOMContentLoaded', startApplication);
}

/*
* Exports BaseComponent, System, HttpClient, AppContext, HtaConsole to be accessible globally
*/
export { BaseComponent, System, HttpClient, AppContext, HtaConsole, SpaHelper, StringHelper as String };
