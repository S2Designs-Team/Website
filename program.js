// Import of needed graphic components
import { Component1 } from './wwwsys/app/js/S2.Framework/Components/Component1.js';

AppContext.addProperty({ name: "landingPageUrl"          , value: "wwwsys/pages/index.html" });
AppContext.addProperty({ name: "name"                    , value: "My application"} );
AppContext.addProperty({ name: "contentContainerDomName" , value: ".content"} );
AppContext.addProperty({ name: "isLocalContent"          , value: "true"} );

// Istanze dei componenti grafici
const component1 = new Component1();
component1.render("content");
