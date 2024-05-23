class HtaConsole extends BaseComponent {
    constructor(properties = {}, cssFileUrl = null) {
        super(properties, cssFileUrl); // Chiamata al costruttore della classe base

        if (HtaConsole.instance) {
            return HtaConsole.instance;
        }

        this.htmlSegment = `
            <DIV ID='panel-box'>
                <DIV ID='panel-dragbar'></DIV>
                <DIV ID='panel-header'>
                    <SPAN ID='panel-menu-clear' STYLE='cursor: pointer'>&#10680;</SPAN>
                    <SPAN ID='panel-menu-transparent' STYLE='cursor: pointer'>&#9680;</SPAN>
                    <SPAN ID='panel-menu-reload' STYLE='cursor: pointer'>&#10227;</SPAN>
                    <SPAN STYLE='padding-left: 5px; font-weight: 700; color: #555;'>Console</SPAN>
                    <SPAN ID='panel-menu-close' STYLE='float: right; margin-right: 8px; cursor: pointer; color: grey;'>&#10006;</SPAN>
                    <SPAN ID='panel-menu-minimize' STYLE='float: right; margin-top:1px;margin-right: 10px; cursor: pointer; color: grey;'>&#9660;</SPAN>
                </DIV>
                <DIV STYLE='background: rgba(19,19,19,1);'>
                    <DIV ID='panel-console'></DIV>
                    <SPAN STYLE='border-top:1px solid grey; min-height: 1.5em; padding-left:4px; font-weight:700; font-size:16px; color:#62adea'>&#62;</I><INPUT ID='commandline'></SPAN>
                </DIV>
                <DIV ID='panel-navigation'></DIV>
            </DIV>
        `;

        this.cssStyles = `
            #panel-box {
                width: 100%;
                color: #000000;
                font-family: Consolas, Courier;
                font-size: 1em;
                padding: 3px 0px 3px 0px;
                position: fixed;
                bottom: -4px;
                left: 0px;
                opacity: 1.0;
                display: block;
                z-index: 10000;
            }
            #panel-dragbar {
                border-top: 3px solid #ededed;
                border-bottom: 1px solid #ccc;
                width: 100%;
                cursor: row-resize;
            }
            #panel-header {
                height: 24px;
                background: #ededed;
                border-top: 1px solid #fff;
                border-bottom: 1px solid #cacaca;
                text-align: left;
                font-family: Arial;
            }
            #panel-console {
                display: block;
                overflow: auto;
                height: 150px;
                color: #62ADEA;
                text-align: left;
                padding: 0 5px 0 5px;
                background: rgba(19,19,19,1);
            }
            #panel-navigation {
                height: 21px;
                width: 100%;
                padding-left: 4px;
                line-height: 1;
                font-size: 18px;
                font-weight: 700;
                background: #ededed;
                border-top: 1px solid #cacaca;
                font-family: Arial;
                color: grey;
            }
            #commandline {
                width: 97%;
                border: none;
                color: #62ADEA;
                padding-left: 6px;
                outline-width: 0px;
                background: rgba(19,19,19,0);
            }
        `;

        this.isDebugEnvEnabled = true;
        this.cmdHistory = [];
        this.cmdHistoryPosition = 0;

        HtaConsole.instance = this;
    }

    initialize() {
        this.createTooltip("panel-menu-reload", "Reload the page avoiding cached data.");

        document.getElementById("panel-dragbar").addEventListener("mousedown", this.dragHandler);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", this.dragHandler);
        });

        document.addEventListener("keydown", (evt) => {
            if (evt.keyCode === 123) this.toggle();
        }, true);

        document.getElementById("panel-console").addEventListener("click", () => {
            document.getElementById("commandline").focus();
        });

        document.getElementById('commandline').addEventListener('keypress', this.commandLineHandler);
        document.getElementById('commandline').addEventListener('keydown', this.commandLineKeyHandler);

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
            clear: () => this.clear(),
            cmd: (arg) => this.log(`<SPAN STYLE='color:#777; font-weight:700'>&#62;</SPAN> <SPAN>${arg}</SPAN>`),
            info: (arg) => this.log(`<SPAN STYLE='padding-left: 6px; color: RoyalBlue'>ℹ️</SPAN> <SPAN>${arg}</SPAN>`),
            log: (arg) => this.log(`<SPAN STYLE='padding-left: 2px;'>${arg}</SPAN>`),
            debug: (arg) => this.log(`<SPAN STYLE='color: white'>🛠️</SPAN> <SPAN STYLE='color: white'>${arg}</SPAN>`),
            warn: (arg) => this.log(`<SPAN STYLE='color: orange'>⚠️</SPAN> <SPAN>${arg}</SPAN>`),
            error: (arg) => this.log(`<SPAN STYLE='color: red'>☢️</SPAN> <SPAN STYLE='color: red'>${arg}</SPAN>`)
        };
    }

    addEventListeners(container) {
        document.getElementById('panel-menu-clear').addEventListener('click', () => this.clear());
        document.getElementById('panel-menu-transparent').addEventListener('click', () => this.transparent());
        document.getElementById('panel-menu-reload').addEventListener('click', () => this.reload());
        document.getElementById('panel-menu-close').addEventListener('click', () => this.toggle());
        document.getElementById('panel-menu-minimize').addEventListener('click', () => this.minimize());
    }

    dragHandler(evt) {
        const height = window.innerHeight || document.documentElement.offsetHeight;
        document.getElementById("panel-console").style.height = `${height - 86 - evt.clientY}px`;
    }

    commandLineHandler(evt) {
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
                HtaConsole.instance.cmdHistoryPosition = HtaConsole.instance.cmdHistory.length;
            }
        }
    }

    commandLineKeyHandler(evt) {
        if (evt.keyCode === 38) {
            if (HtaConsole.instance.cmdHistoryPosition > 0) {
                evt.target.value = HtaConsole.instance.cmdHistory[--HtaConsole.instance.cmdHistoryPosition];
            }
        } else if (evt.keyCode === 40) {
            if (HtaConsole.instance.cmdHistoryPosition < HtaConsole.instance.cmdHistory.length - 1) {
                evt.target.value = HtaConsole.instance.cmdHistory[++HtaConsole.instance.cmdHistoryPosition];
            }
        }
    }

    log(arg) {
        const divConsole = document.getElementById("panel-console");
        divConsole.innerHTML += `<SPAN>${arg}</SPAN><BR>`;
        divConsole.scrollTop = divConsole.scrollHeight;
    }

    clear() {
        document.getElementById("panel-console").innerHTML = "";
    }

    reload() {
        location.reload(true);
    }

    minimize() {
        const el = document.getElementById("panel-box");
        el.style.height = (el.style.height !== "20px") ? "20px" : "220px";
    }

    transparent() {
        const el = document.getElementById("panel-box");
        el.style.opacity = (el.style.opacity !== "0.5") ? "0.5" : "1.0";
    }

    toggle() {
        const el = document.getElementById("panel-box");
        el.style.display = (el.style.display !== "none") ? "none" : "block";
    }
    
    showModal(scriptURL) {
        window.open(scriptURL, "_blank");
    }

    censor(censor) {
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
