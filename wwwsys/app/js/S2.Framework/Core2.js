import { AppContext }    from './Core/AppContext.js';     // Import AppContext instance from AppContext.js
import { TypeOfCheck }   from './Core/TypeOfCheck.js';    // Import TypeCheck class from TypeOfCheck.js
import { HttpClient }    from './Core/HttpClient.js';     // Import HttpClient class from HttpClientk.js
import { BaseComponent } from './Core/BaseComponent.js';  // Import BaseComponent class from BaseComponent.js

// Export AppContext to be accessible globally
window.AppContext = new AppContext();

// Add BaseComponent to AppContext
AppContext.addService(BaseComponent);
// Add HttpClient to AppContext
AppContext.addService(new HttpClient());

// Function to be executed after the page has fully loaded
function loadMainScript() {
    // Get the base URL of the current page
    const baseUrl = AppContext.getBaseUrl();
    // Load program.js after page load
    const script = document.createElement('script');
    script.type  = 'module';
    script.src = `${baseUrl}program.js`;
    document.body.appendChild(script);
}

// Check if the document has fully loaded
if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    loadMainScript();
} else {
    document.addEventListener('DOMContentLoaded', loadMainScript);
}
