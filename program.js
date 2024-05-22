// Import of needed graphic components
import { Component1 } from './wwwsys/app/js/S2.Framework/Components/Component1.js';

AppContext.setProperty("landingPageUrl"          , "wwwsys/pages/index.html");
AppContext.setProperty("name"                    , "My application");
AppContext.setProperty("contentContainerDomName" , "content");
AppContext.setProperty("isLocalContent"          , "true");

// Sets a proprerty using an object 
const config = { apiUrl: 'https://api.example.com', timeout: 5000 };
AppContext.setProperty(config);

// Istanze dei componenti grafici
const component1 = new Component1();
component1.render("content");
