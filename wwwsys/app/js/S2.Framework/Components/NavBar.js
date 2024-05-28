import { BaseComponent } from '../Core/BaseComponent.js';  // Import BaseComponent class from BaseComponent.js

class NavBar extends BaseComponent {
    constructor(properties = {}, cssFileUrl = null) {
        super(properties, cssFileUrl); // Chiamata al costruttore della classe base

        if (NavBar.instance) {
            return NavBar.instance;
        }

        this.htmlSegment = `
            <HEADER>
                <DIV CLASS= "logo"></DIV>
                <INPUT TYPE="checkbox" ID="nav-toggle-status" CLASS="nav-toggle-status" NAME="nav-toggle-status" TITLE="nav-toggle-title" PLACEHOLDER="">
                <LABEL FOR="nav-toggle-status" CLASS="nav-toggle">
                    <SPAN> </SPAN>
                </LABEL>
                <NAV CLASS="nav-menu">
                    <UL>
                        <!--
                        <LI><A href="wwwsys/pages/operatingSystems/index.html"            >Sistema Operativo   </A></LI>
                        <LI><A href="wwwsys/pages/pcSystem/drivers/index.html"            >Drivers             </A></LI>
                        <LI><A href="wwwsys/pages/applications/index.html"                >Applicazioni        </A></LI>
                        <LI><A href="wwwsys/pages/applications/configurations/index.html" >Configurazioni      </A></LI> 
                        -->
                        <LI><A href="wwwsys/pages/webTv/index.html"                       >WebTv               </A></LI>
                        <!--
                        <LI><A href="https://www.rakuten.tv/it/gardens/avod"              >Registrazione Audio </A></LI>
                        -->
                    </UL>
                </NAV>
            </HEADER>
        `;
        this.navLinks = [];
        
        this.cssStyles = ``;
        this.isDebugEnvEnabled = true;
        this.navLinks.push("elemento di navigazione n 1");
        this.navLinks.push("elemento di navigazione n 2");
        this.navLinks.push("elemento di navigazione n 3");
        NavBar.instance = this;
    }

    initialize() {
        for (let i=0; i < this.navLinks.length; i++) {
            console.log(this.navLinks[i]);
        }
    }

    addEventListeners(container) { }
    /* 
    * ===========================================================
    * = EVENT HANDLERS ==========================================
    * ===========================================================
    */ 
    linkMouseClick = (evt) => {
        const myConsole = document.getElementById("HtaConsole");
        if (myConsole.style.display === "block") {
            myConsole.style.display = "none";
        } else {
            myConsole.style.display = "block";
            this.resize();
        }
        evt.preventDefault();
    }
    linkMouseHover = (evt) => { }

    linkMouseLeave = (evt) => { }
    
}

// Export the singleton instance
const navBarInstance = new NavBar();
Object.freeze(navBarInstance);

export { navBarInstance as NavBar };
