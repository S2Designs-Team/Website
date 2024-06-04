import { StringHelper }  from './Core/StringHelper.js';   // Import StringHelper class from SpaHelper.js
import { BaseComponent } from './Core/BaseComponent.js';  // Import BaseComponent class from BaseComponent.js
import { System }        from './Core/System.js';         // Import System class from System.js
import { HttpClient }    from './Core/HttpClient.js';     // Import HttpClient class from HttpClientk.js
import { AppContext }    from './Core/AppContext.js';     // Import AppContext instance from AppContext.js
import { SpaHelper }     from './Core/SpaHelper.js';      // Import SpaHelper instance from SpaHelper.js
import {           }     from './Core/Routing.js';        // Import SpaHelper instance from SpaHelper.js
import { HtaConsole }    from './DevTools/HtaConsole.js'; // Import HtaConsole instance from HtaConsole.js

function loadjQuery() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        script.onload = () => {
            window.$ = window.jQuery; // Assicurati che $ e jQuery siano disponibili globalmente
            resolve();
        };
        script.onerror = () => reject(new Error('jQuery load error'));
        document.head.appendChild(script);
    });
}

function loadCoreServices() {
    window.StringHelper  = StringHelper;    
    window.BaseComponent = BaseComponent;
    window.System        = System;
    window.HttpClient    = HttpClient;
    window.AppContext    = AppContext;
    window.HtaConsole    = HtaConsole;
    window.SpaHelper     = SpaHelper;
}

function loadMainScript() {
    AppContext.addService(new HttpClient());
    AppContext.addService(new SpaHelper());

    // Get the base URL of the current page
    const baseUrl = AppContext.getBaseUrl();
    // Load program.js after page load
    const script  = document.createElement('script');
    script.type   = 'module';
    script.src    = `${baseUrl}program.js`;
    document.body.appendChild(script);
}

// ===========================================================
// = Function to be executed after the page has fully loaded = 
// ===========================================================
function startApplication() {
    loadjQuery()
        .then(() => {
            loadCoreServices();
            loadMainScript();
        })
        .catch((error) => {
            console.error("Error occurred during jQuery loading: ", error);
        }
    );
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
export { BaseComponent, System, HttpClient, AppContext, HtaConsole, SpaHelper, StringHelper };
