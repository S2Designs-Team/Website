class HtaConsole {
    constructor() {
        if (HtaConsole.instance) {
            return HtaConsole.instance;
        }

        this.layout = `
            <DIV ID='panel-box'>
                <DIV ID='panel-dragbar'></DIV>
                <DIV ID='panel-header'>
                    <SPAN ID='panel-menu-clear' STYLE='cursor: pointer' ONCLICK='htaConsole.clear()'>&#10680;</SPAN>
                    <SPAN ID='panel-menu-transparent' STYLE='cursor: pointer' ONCLICK='htaConsole.transparent()'>&#9680;</SPAN>
                    <SPAN ID='panel-menu-reload' STYLE='cursor: pointer' ONCLICK='htaConsole.reload()'>&#10227;</SPAN>
                    <SPAN STYLE='padding-left: 5px; font-weight: 700; color: #555;'>Console</SPAN>
                    <SPAN ID='panel-menu-close' STYLE='float: right; margin-right: 8px; cursor: pointer; color: grey;' ONCLICK='htaConsole.toggle();'>&#10006;</SPAN>
                    <SPAN ID='panel-menu-minimize' STYLE='float: right; margin-top:1px;margin-right: 10px; cursor: pointer; color: grey;' ONCLICK='htaConsole.minimize()'>&#9660;</SPAN>
                </DIV>
                <DIV STYLE='background: rgba(19,19,19,1);'>
                    <DIV ID='panel-console'></DIV>
                    <SPAN STYLE='border-top:1px solid grey; min-height: 1.5em; padding-left:4px; font-weight:700; font-size:16px; color:#62adea'>&#62;</I><INPUT ID='commandline'></SPAN>
                </DIV>
                <DIV ID='panel-navigation'></DIV>
            </DIV>
        `;

        this.css = {
            panelBox: {
                'width': '100%',
                'color': '#000000',
                'font-family': 'Consolas, Courier',
                'font-size': '1em',
                'padding': '3px 0px 3px 0px',
                'position': 'fixed',
                'bottom': '-4px',
                'left': '0px',
                'opacity': '1.0',
                'display': 'block',
                'z-index': '10000'
            },
            panelDragbar: {
                'border-top': '3px solid #ededed',
                'border-bottom': '1px solid #ccc',
                'width': '100%',
                'cursor': 'row-resize'
            },
            panelHeader: {
                'height': '24px',
                'background': '#ededed',
                'border-top': '1px solid #fff',
                'border-bottom': '1px solid #cacaca',
                'text-align': 'left',
                'font-family': 'Arial'
            },
            panelConsole: {
                'display': 'block',
                'overflow': 'auto',
                'height': '150px',
                'color': '#62ADEA',
                'text-align': 'left',
                'padding': '0 5px 0 5px',
                'background': 'rgba(19,19,19,1)'
            },
            panelNavigation: {
                'height': '21px',
                'width': '100%',
                'padding-left': '4px',
                'line-height': '1',
                'font-size': '18px',
                'font-weight': '700',
                'background': '#ededed',
                'border-top': '1px solid #cacaca',
                'font-family': 'Arial',
                'color': 'grey'
            },
            commandline: {
                'width': '97%',
                'border': 'none',
                'color': '#62ADEA',
                'padding-left': '6px',
                'outline-width': '0px',
                'background': 'rgba(19,19,19,0)',
            }
        };

        this.isDebugEnvEnabled = true;
        this.cmdHistory = [];
        this.cmdHistoryPosition = 0;

        HtaConsole.instance = this;
    }

    camelCase = (input) => {
        return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    };

    hyphen = (input) => {
        return input.replace(/([a-z][A-Z])/g, function(group) {
            return group[0] + "-" + group[1].toLowerCase();
        });
    };

    censor = (censor) => {
        var i = 0;
        return function(key, value) {
            if (i !== 0 && typeof(censor) === "object" && typeof(value) == "object" && censor == value)
                return "[Circular]";
            if (i >= 29)
                return "[Unknown]";
            ++i;
            return value;
        };
    };

    init = () => {
        var container = document.createElement("div");
        container.innerHTML = this.layout;
        document.body.appendChild(container);
        for (var cssClass in this.css) {
            for (var cssProp in this.css[cssClass]) {
                document.getElementById(this.hyphen(cssClass)).style[this.camelCase(cssProp)] = this.css[cssClass][cssProp];
            }
        }

        var dragHandler = (evt) => {
            var height = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            document.getElementById("panel-console").style.height = (height - 86 - evt.clientY) + "px";
        };
        document.getElementById("panel-dragbar").addEventListener("mousedown", function(evt) {
            evt.preventDefault();
            document.addEventListener("mousemove", dragHandler);
        });
        document.addEventListener("mouseup", function(evt) {
            document.removeEventListener("mousemove", dragHandler);
        });

        document.addEventListener("keydown", function(evt) {
            if (evt.keyCode === 123) HtaConsole.instance.toggle();
        }, true);

        this.createTooltip("panel-menu-reload", "Reload the page avoiding cached data.");
        
        document.getElementById("panel-console").addEventListener("click", function(evt) {
            document.getElementById("commandline").focus();
        });

        document.getElementById('commandline').addEventListener('keypress', function(evt) {
            if (evt.keyCode === 13) {
                var sCmd = this.value;
                if (sCmd === "clear") {
                    HtaConsole.instance.clear();
                    this.value = "";
                } else if (sCmd === "history") {
                    for (var x = 0; x < HtaConsole.instance.cmdHistory.length; x++) console.log(HtaConsole.instance.cmdHistory[x]);
                    this.value = "";
                } else if (sCmd) {
                    HtaConsole.instance.log("<span style='color:#777; font-weight:700'>&#62;</span> <span>" + sCmd + "</span>");
                    HtaConsole.instance.cmdHistory.push(sCmd);
                    try {
                        var evalCmd = eval(sCmd);
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
                        this.value = "";
                    } catch (e) {
                        this.value = "";
                        throw e;
                    }
                }
                HtaConsole.instance.cmdHistoryPosition = HtaConsole.instance.cmdHistory.length;
            }
        });

        document.getElementById("commandline").addEventListener("keydown", function(evt) {
            if (evt.keyCode === 38) {
                HtaConsole.instance.cmdHistoryPosition--;
                
                if (HtaConsole.instance.cmdHistoryPosition < 0) HtaConsole.instance.cmdHistoryPosition = 0;
                
                if (HtaConsole.instance.cmdHistory[HtaConsole.instance.cmdHistoryPosition] !== undefined && HtaConsole.instance.cmdHistory[HtaConsole.instance.cmdHistoryPosition] !== "") {
                    this.value = HtaConsole.instance.cmdHistory[HtaConsole.instance.cmdHistoryPosition];
                    return false;
                } else if (HtaConsole.instance.cmdHistoryPosition === HtaConsole.instance.cmdHistory.length) {
                    this.value = "";
                    return false;
                }
            }

            if (evt.keyCode === 40) {
                HtaConsole.instance.cmdHistoryPosition++;
                if (HtaConsole.instance.cmdHistoryPosition >= HtaConsole.instance.cmdHistory.length) HtaConsole.instance.cmdHistoryPosition = HtaConsole.instance.cmdHistory.length;
                
                if (HtaConsole.instance.cmdHistory[HtaConsole.instance.cmdHistoryPosition] !== undefined && HtaConsole.instance.cmdHistory[HtaConsole.instance.cmdHistoryPosition] !== "") {
                    this.value = HtaConsole.instance.cmdHistory[HtaConsole.instance.cmdHistoryPosition];
                    return false;
                } else if (HtaConsole.instance.cmdHistoryPosition === HtaConsole.instance.cmdHistory.length) {
                    this.value = "";
                    return false;
                }
            }
        });

        console = window || window.console;
        var method = [
            "log", "info", "warn", "onerror", "debug", "trace", "dir", "group",
            "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
            "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear", "cmd"
        ];
        
        for (var i = 0; i < method.length; i++) {
            if (!window.console[method[i]]) {
                if (method[i] === "nerror") {
                    console[method[i]] = function() {
                        var scriptURL = arguments[1];
                        var scriptName = scriptURL.split("/")[scriptURL.split("/").length - 1];
                        HtaConsole.instance.log(
                            "<span style='color:red'>&otimes;" +
                            "  <span>" + arguments[0] + "</span>" +
                            "  <span class='pull-right' style='cursor:pointer; color:blue' onclick='HtaConsole.instance.showModal('" + scriptURL + "')'>" + scriptName + ":" + arguments[2] + "</span>" +
                            "</span>"
                        );
                        return true;
                    };
                } else {
                    console[method[i]] = function() { return true; };
                }
            }
        }

        console = {
            clear: function() {
                HtaConsole.instance.clear();
            },
            cmd: function(arg) {
                HtaConsole.instance.log("<SPAN STYLE='color:#777; font-weight:700'>&#62;</SPAN> <SPAN>" + arg + "</SPAN>");
            },
            info: function(arg) {
                HtaConsole.instance.log("<SPAN STYLE='padding-left: 6px; color: RoyalBlue'>ℹ️</SPAN> <SPAN>" + arg + "</SPAN>");
            },
            log: function(arg) {
                HtaConsole.instance.log("<SPAN STYLE='padding-left: 2px;'>" + arg + "</SPAN>");
            },
            debug: function(arg){
                HtaConsole.instance.log("<SPAN STYLE='color: white'>🛠️</SPAN> <SPAN STYLE='color: white'>" + arg + "</SPAN>");
            },
            dataView: function(arg) {
                if (arg) {
                    var formattedHTML = arg.replace(/&/g, "&amp;")
                                           .replace(/</g, "&lt;")
                                           .replace(/>/g, "&gt;")
                                           .replace(/"/g, "&quot;")
                                           .replace(/'/g, "&#39;");

                    formattedHTML = formattedHTML.replace(/[\r\n]+/g, "<br>");
                    
                    formattedHTML = formattedHTML.replace(/\t/g, "    ");
                    
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

                    formattedHTML = "<pre style='" + preStyle + "'>" + formattedHTML + "</pre>";
                    
                    var divStyle = "color: #90EE90; " + 
                                    "text-align: left; " + 
                                    "background-color: rgba(13, 13, 13, 1); " + 
                                    "border-radius: 0.375rem;" +
                                    "overflow: auto;" + 
                                    "margin-left: -1px;";            
                    HtaConsole.instance.log("<div style='" + divStyle + "'>" + formattedHTML + "</div>");
                }
            },
            warn: function(arg) {
                HtaConsole.instance.log("<SPAN STYLE='color: orange'>⚠️</SPAN> <SPAN>" + arg + "</SPAN>");
            },
            error: function(arg) {
                HtaConsole.instance.log("<SPAN STYLE='color: red'>☢️</SPAN> <SPAN STYLE='color: red'>" + arg + "</SPAN>");
            }
        };
    };

    log = (msg) => {
        var logContainer = document.createElement("div");
        logContainer.innerHTML = msg + "<br>";
        document.getElementById("panel-console").appendChild(logContainer);
        this.consoleresize();
    };

    consoleresize = () => {
        var panelConsole = document.getElementById("panel-console");
        panelConsole.scrollTop = panelConsole.scrollHeight;
    };

    clear = () => {
        document.getElementById("panel-console").innerHTML = "";
    };

    transparent = () => {
        var panelBox = document.getElementById("panel-box");
        var panelTransparent = document.getElementById("panel-menu-transparent");
        if (panelBox.style.opacity === "0.5") {
            panelBox.style.opacity = "1.0";
            panelTransparent.innerHTML = "&#9680;";
        } else {
            panelBox.style.opacity = "0.5";
            panelTransparent.innerHTML = "&#9899;";
        }
    };

    reload = () => {
        var panelBox = document.getElementById("panel-box");
        var panelReload = document.getElementById("panel-menu-reload");
        panelReload.innerHTML = "&#10227;";
        location.reload(true);
    };

    minimize = () => {
        var panelConsole = document.getElementById("panel-console");
        var panelMinimize = document.getElementById("panel-menu-minimize");
        if (panelConsole.style.display === "block") {
            this.panelConsoleHeight = panelConsole.style.height;
            panelConsole.style.height = "0px";
            panelConsole.style.display = "none";
            panelMinimize.innerHTML = "&#9650;";
        } else {
            panelConsole.style.height = this.panelConsoleHeight;
            panelConsole.style.display = "block";
            panelMinimize.innerHTML = '&#9660;'
            this.consoleresize();
        }
    };

    toggle = () => {
        var panelBox = document.getElementById("panel-box");
        if (panelBox.style.display === "block") {
            panelBox.style.display = "none";
        } else {
            panelBox.style.display = "block";
            this.consoleresize();
        }
    };

    showModal = (url) => {
        window.open(url);
    };

    createTooltip = (elementId, tooltipText) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.setAttribute("data-tooltip", tooltipText);
            
            element.onmousemove = (evt) => {
                evt.preventDefault();
                let x = 0 + evt.clientX;
                let y = 0 + evt.clientY;

                y += 10;
            };
        }
    };
}

const htaConsoleInstance = new HtaConsole();
Object.freeze(htaConsoleInstance);
export default { htaConsoleInstance as HtaConsole };
