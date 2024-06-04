import { BaseComponent } from '../Core/BaseComponent.js';  // Import BaseComponent class from BaseComponent.js

class HtaConsole extends BaseComponent {
    constructor(properties = {}, cssFileUrl = null) {
        super(properties, cssFileUrl); // Chiamata al costruttore della classe base

        if (HtaConsole.instance) {
            return HtaConsole.instance;
        }

        this.htmlSegment = `
            <DIV ID='console-dragBorder'></DIV>
            <DIV ID='console-titleBar'>
                <SPAN ID='console-titleBar-caption'>Console</SPAN>	    
                <SPAN ID='console-titleBar-btnClear'>&#10680;</SPAN>
                <SPAN ID='console-titleBar-btnOpacity'>&#9680;</SPAN>
                <SPAN ID='console-titleBar-btnReload'>&#10227;</SPAN>
                <SPAN ID='console-titleBar-btnClose'>&#10006;</SPAN>
                <SPAN ID='console-titleBar-btnMinimize'>&#9660;</SPAN>
            </DIV>
            <DIV ID='console-history-panel' STYLE='background: rgba(19,19,19,1);'>
                <DIV ID='panel-console'></DIV>
                <SPAN STYLE='border-top:1px solid grey; min-height: 1.5em; padding-left:4px; font-weight:700; font-size:16px; color:#62adea'>&#62;
                    </I><INPUT ID='commandline'>
                </SPAN>
            </DIV>
            <DIV ID='console-statusBar'></DIV>
        `;

        this.cssStyles = `
            #HtaConsole {
                width:         100%;
                color:         #000000;
                font-family:   Consolas, Courier;
                font-size:     1em;
                padding:       3px 0px 3px 0px;
                position:      fixed;
                bottom:        -4px;
                left:          0px;
                opacity:       1.0;
                display:       block;
                z-index:       10000;
            }
            #console-dragBorder {
                border-top:    3px solid #ededed;
                border-bottom: 1px solid #ccc;
                width:         100%;
                cursor:        row-resize;
            }
            #console-titleBar {
                height:        24px;
                background:    #ededed;
                border-top:    1px solid #fff;
                border-bottom: 1px solid #cacaca;
                text-align:    left;
                font-family:   Arial;
            }
            #console-titleBar-caption {
                padding-left:       5px;
                font-weight:        700; 
                color:              #555;	    
                border-right-style: solid;
                padding-inline-end: 0.2em;
            }
            #console-titleBar-btnClear,
            #console-titleBar-btnOpacity,
            #console-titleBar-btnReload,
            #console-titleBar-btnClose,
            #console-titleBar-btnMinimize{
                cursor:        pointer;
            }
            #console-titleBar-btnClose {
                float:        right; 
		margin-right: 8px; 
                color:        grey;
            }
            #console-titleBar-btnMinimize {
                float:        right; 
                margin-top:   1px;
                margin-right: 10px; 
                color:        grey;
	    }
            #panel-console {
                display:       block;
                overflow:      auto;
                height:        150px;
                color:         #62ADEA;
                text-align:    left;
                padding:       0 5px 0 5px;
                background:    rgba(19,19,19,1);
            }
            #console-statusBar {
                height:        21px;
                width:         100%;
                padding-left:  4px;
                line-height:   1;
                font-size:     18px;
                font-weight:   700;
                background:    #ededed;
                border-top:    1px solid #cacaca;
                font-family:   Arial;
                color:         grey;
            }
            #commandline {
                width:         97%;
                border:        none;
                color:         #62ADEA;
                padding-left:  6px;
                outline-width: 0px;
                background:    rgba(19,19,19,0);
            }
        `;
        this.panelConsoleHeight;
        this.isDebugEnvEnabled = true;
        this.cmdHistory = [];
        this.cmdHistoryPosition = 0;

        HtaConsole.instance = this;
    }

    initialize() {
        this.createTooltip("console-titleBar-btnReload", "Reload the page avoiding cached data.");
        console = window.console;
        const method = [
            "log", "info", "warn", "onerror", "debug", "trace", "dir", "group",
            "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
            "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear", "cmd"
        ];
        
        for (let i = 0; i < method.length; i++) {
            if (!window.console[method[i]]) {
                if (method[i] === "nerror") {
                    console[method[i]] = function() {
                        const scriptURL = arguments[1];
                        const scriptName = scriptURL.split("/").pop();
                        this.log(
                            `<span style='color:red'>&otimes;` +
                            `  <span>${arguments[0]}</span>` +
                            `  <span class='pull-right' style='cursor:pointer; color:blue' onclick='HtaConsole.instance.showModal("${scriptURL}")'>${scriptName}:${arguments[2]}</span>` +
                            `</span>`
                        );
                        return true;
                    };
                } else {
                    console[method[i]] = function() { return true; };
                }
            }
        }
        
        console = {
            clear: ()    => this.clear(),
            cmd:   (arg) => this.log(`<SPAN STYLE='color:#777; font-weight:700'>&#62;</SPAN> <SPAN>${arg}</SPAN>`),
            info:  (arg) => this.log(`<SPAN STYLE='padding-left: 6px; color: RoyalBlue'>ℹ️</SPAN> <SPAN>${arg}</SPAN>`),
            log:   (arg) => this.log(`<SPAN STYLE='padding-left: 2px;'>${arg}</SPAN>`),
            debug: (arg) => this.log(`<SPAN STYLE='color: white'>🛠️</SPAN> <SPAN STYLE='color: white'>${arg}</SPAN>`),
            warn:  (arg) => this.log(`<SPAN STYLE='color: orange'>⚠️</SPAN> <SPAN>${arg}</SPAN>`),
            error: (arg) => this.log(`<SPAN STYLE='color: red'>☢️</SPAN> <SPAN STYLE='color: red'>${arg}</SPAN>`),
            dataView: (arg) => {
                if (arg) {
                    var formattedHTML = arg.replace(/&/g, "&amp;")
                                        .replace(/</g, "&lt;")
                                        .replace(/>/g, "&gt;")
                                        .replace(/"/g, "&quot;")
                                        .replace(/'/g, "&#39;");

                    // Replaces all 'crlf' (caret return + line forward) chars with '<br>'
                    formattedHTML = formattedHTML.replace(/[\r\n]+/g, "<br>");
					
                    formattedHTML = formattedHTML.replace(/\t/g, "    ");
					
                    // Replaces all 'tab' chars with 4 blank spaces
                    var preStyle = "word-wrap: normal; " + 
                                   "background-color: rgba(13, 13, 13, 1); " + 
                                   "-webkit-hyphens: none; " + 
                                   "hyphens: none; " + 
                                   "line-height: 1.5; " +
                                   "tab-size: 4; " + 
                                   "text-align: left; " + 
                                   "white-space: pre; " + 
                                   "word-break: normal; " + 
                                   "word-spacing: normal; " + 
                                   "padding-left: 30px;";

                    // Avvolgi il testo formattato con un tag <pre>
                    formattedHTML = "<pre style='" + preStyle + "'>" + formattedHTML + "</pre>";
					
                    var divStyle = "color: #90EE90; " + 
                                   "text-align: left; " + 
                                   "background-color: rgba(13, 13, 13, 1); " + 
                                   "border-radius: 0.375rem;" +
                                   "overflow: auto;" + 
                                   "margin-left: -1px;";			
                    this.log("<div style='" + divStyle + "'>" + formattedHTML + "</div>");
                }
            }
        };
    }

    addEventListeners(container) {
        /* */
        document.addEventListener("keydown", (evt) => { if (evt.keyCode === 123) { this.toggle(evt); } } , true); //The handler is executed in the capturing phase.
        /* */
        document.getElementById("console-dragBorder")
            .addEventListener("mousedown", (evt) => { evt.preventDefault(); document.addEventListener("mousemove", this.dragHandler); });
        /* */
        document.addEventListener("mouseup",   this.releaseDragHandler);
	    
        /* Manages the click on the console area placing the focus to the 'command line'  */
        document.getElementById("panel-console")
            .addEventListener("click", this.setFocus);
        /* */
        document.getElementById('commandline')
            .addEventListener('keypress', this.commandLineKeyPressHandler);
        /* */
        document.getElementById('commandline')
            .addEventListener('keydown', this.commandLineKeyDownHandler);
        /* */
        document.getElementById('console-titleBar-btnClear')
            .addEventListener('click', this.clear);
        /* */
        document.getElementById('console-titleBar-btnOpacity')
            .addEventListener('click', this.transparent);
        /* */
        document.getElementById('console-titleBar-btnReload')
            .addEventListener('click', this.reload);
        /* */
        document.getElementById('console-titleBar-btnClose')
            .addEventListener('click',  (evt) => { this.toggle(evt); } );
        /* */
        document.getElementById('console-titleBar-btnMinimize')
            .addEventListener('click', this.minimize);
    }
    /* 
    * ===========================================================
    * = EVENT HANDLERS ==========================================
    * ===========================================================
    */ 
    toggle = (evt) => {
        const myConsole = document.getElementById("HtaConsole");
        if (myConsole.style.display === "block") {
            myConsole.style.display = "none";
        } else {
            myConsole.style.display = "block";
            this.resize();
        }
        evt.preventDefault();
    }
    dragHandler = (evt) => {
        evt.preventDefault();
        const height = window.innerHeight || document.documentElement.offsetHeight;
        document.getElementById("panel-console").style.height = `${height - 67 - evt.clientY}px`;
    }
    releaseDragHandler = () => {
        document.removeEventListener("mousemove", this.dragHandler); 
    }
    setFocus = () =>{
        document.getElementById("commandline").focus();
    }

    commandLineKeyPressHandler = (evt) => {
        if (evt.keyCode === 13) {
            const sCmd = evt.target.value;
            if (sCmd === "clear") {
                HtaConsole.instance.clear();
                evt.target.value = "";
            } else if (sCmd === "history") {
                HtaConsole.instance.cmdHistory.forEach(cmd => console.log(cmd));
                evt.target.value = "";
            } else if (sCmd) {
                HtaConsole.instance.log(`<span style='color:#777; font-weight:700'>&#62;</span> <span>${sCmd}</span>`);
                HtaConsole.instance.cmdHistory.push(sCmd);
                try {
                    const evalCmd = eval(sCmd);
                    if (typeof evalCmd === "object") {
                        try { 
                            console.log(JSON.stringify(evalCmd)); 
                        } catch (e) {
                            try { 
                                console.log(JSON.stringify(evalCmd, HtaConsole.instance.censor(evalCmd))); 
                            } catch (e) { 
                                throw e; 
                            }
                        }
                    } else {
                        console.log(evalCmd);
                    }
                } catch (e) {
                    console.error(e.message);
                }
                evt.target.value = "";
                HtaConsole.instance.cmdHistoryPosition = this.cmdHistory.length;
            }
        }
    }

    commandLineKeyDownHandler = (evt) => {
        if (evt.keyCode === 38) {
            if (this.cmdHistoryPosition > 0) {
                evt.target.value = this.cmdHistory[--this.cmdHistoryPosition];
            }
        } else if (evt.keyCode === 40) {
            if (this.cmdHistoryPosition < this.cmdHistory.length - 1) {
                evt.target.value = this.cmdHistory[++this.cmdHistoryPosition];
            }
        }
    }

    log = (arg) => {
        const divConsole = document.getElementById("panel-console");
        divConsole.innerHTML += `<SPAN>${arg}</SPAN><BR>`;
        divConsole.scrollTop = divConsole.scrollHeight;
    }

    clear = () => {
        document.getElementById("panel-console").innerHTML = "";
    }
    reload = () => {
        location.reload(true);
    }
    minimize = () => {
        var myConsole = document.getElementById("panel-console");
        var myBtnMinimize = document.getElementById("console-titleBar-btnMinimize");
        if (myConsole.style.display === "block") {
            this.setProperty("panelConsoleHeight", myConsole.style.height);
            myConsole.style.height  = "0px";
            myConsole.style.display = "none";
            myBtnMinimize.innerHTML = "&#9650;";
        } else {
            myConsole.style.height  = this.props["panelConsoleHeight"];
            myConsole.style.display = "block";
            myBtnMinimize.innerHTML = '&#9660;'
            this.resize();
        }        
    }
    resize = () => {
        var myConsole = document.getElementById("panel-console");
        myConsole.scrollTop = myConsole.scrollHeight;
    };
    transparent = () => {
        const el = document.getElementById("HtaConsole");
        el.style.opacity = (el.style.opacity !== "0.5") ? "0.5" : "1.0";
    }
    showModal = (scriptURL) => {
        window.open(scriptURL, "_blank");
    }
    censor = (censor) => {
        const i = 0;
        return (key, value) => {
            if (i !== 0 && typeof censor === "object" && typeof value === "object" && censor === value) {
                return "[Circular]";
            }
            return value;
        }
    }
}

// Export the singleton instance
const htaConsoleInstance = new HtaConsole();
Object.freeze(htaConsoleInstance);

export { htaConsoleInstance as HtaConsole };
