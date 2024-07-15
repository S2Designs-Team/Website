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
        this.navLinks.push("LLM Training");
        this.navLinks.push("LLM Chat");
        this.navLinks.push("WebTvg");
        NavBar.instance = this;
    }

    initialize() {
        this.navLinks.foeEach((element) => {
            console.log(element);
        });
    }

    addEventListeners(container) {
        chatHeader.addEventListener('mousedown', (event) => {
            isDragging = true;
            offsetX = event.clientX - chatContainer.offsetLeft;
            offsetY = event.clientY - chatContainer.offsetTop;
          
            // Inizializza le coordinate precedenti
            previousX = event.clientX;
            previousY = event.clientY;
          
            // Applica l'ombra e l'opacità durante il drag
            chatContainer.style.boxShadow = '15px 8px 35px rgba(0, 0, 0, 1.0)';
            chatContainer.style.opacity = 0.6;
          });

        // Adds an 'On clickEvent' to all hyperlinks inside '.nav-menu' element
        // then anonymous function will be called
        $(".NavLink").click(function () {
            console.clear();
            var url     = $(this).attr('href');
            $('.nav-menu li').removeClass('selected');
            $(this).parent().addClass('selected');
	
            /*👉️ [SNI] ONLY FOR DEBUG MODE UNCOMMENT THE FOLLOWING CODE:
            //debugger;
            //console.log($(this).href);
            //link.protocol + "//" + link.host + link.pathname
            //const myUrl = new URL(url);
            //const parts = ['protocol', 'hostname', 'pathname', 'port', 'hash'];
            //parts.forEach(key => console.log(key, myUrl[key]));
            */
            $(strDestinationVideoScreenDom).load(url, async function(responseTxt, statusTxt, jqXHR){
                if (statusTxt == "success"){
                    console.log();
                    var ParsedHtmlPage = $(responseTxt);
                    /*👉️ [SNI] ONLY FOR DEBUG MODE UNCOMMENT THE FOLLOWING CODE:
                    //debugger;
                    //console.log(url + " content loaded successfully!\n"+
                    //            "[Loaded Html]:\n" + 
                    //            "==============================================================================\n"+
                    //            responseTxt);
                    */
                }
                if(statusTxt == "error"){
                    alert("Error: " + jqXHR.status + " " + jqXHR.statusText);
                }
            });
            selectedChannelName = $(this).parent().attr('id');
            console.log("Selected link: '" + selectedChannelName + "'");
            return false;
        });        
    }

    /* 
    * ===========================================================
    * = EVENT HANDLERS ==========================================
    * ===========================================================
    */ 
    linkMouseClick = (evt) => {
        const myConsole = document.getElementById("HtaConsole");
        evt.preventDefault();
    }
    linkMouseHover = (evt) => {
        evt.preventDefault();
    }

    linkMouseLeave = (evt) => {
        evt.preventDefault();
    }
}

// Export the singleton instance
//const navBarInstance = new NavBar();
//Object.freeze(navBarInstance);

export { NavBar };
