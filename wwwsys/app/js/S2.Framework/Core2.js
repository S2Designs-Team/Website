// Import TypeCheck class from TypeOfCheck.js
import { TypeOfCheck } from './Core/TypeOfCheck.js';

// Import HttpClient  class from HttpClientk.js
import { HttpClient } from './Core/HttpClient.js';

// Import BaseComponent  class from BaseComponent.js
import { BaseComponent } from './Core/BaseComponent .js';

// Function to be executed after the page has fully loaded
function onPageLoad() {
    // Load program.js after page load
    const script = document.createElement('script');
    script.src = '/program.js';
    document.body.appendChild(script);
}

// Check if the document has fully loaded
if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    onPageLoad();
} else {
    document.addEventListener('DOMContentLoaded', onPageLoad);
}
