/*
# Created by S2DesignsTeam © 2035 (Phobetor1999 AKA ㊙️anonimo㊙️).
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
*/
export class ChannelLink extends BaseComponent {
    channels = [];

    constructor(properties = {}, cssFileUrl = null) {
        super(properties, cssFileUrl); // Calls the Base Class constructor

        if (ChannelLink.instance) {
            return ChannelLink.instance;
        } 
	    ChannelLink.instance = this;
    }

    initialize() {
        this.initializeComponentData();
        this.initializeGui();
        console.log('Component1 initialized');
    }

    initializeComponentData() {
        this.channels[0]  = { on: false, type: "webTv", url: "wwwsys/pages/webTv/channels/TEST_dashJs_stream_mp4.html",       group: "S2",          iconStyleClass: "test-icon",       channelTitle: "S2 Test TV" }; 
        this.channels[1]  = { on: false, type: "tv",    url: "wwwsys/pages/webTv/channels/rai_1.html",                        group: "RAI",         iconStyleClass: "rai1",            channelTitle: "Rai Uno" }; 
        this.channels[2]  = { on: false, type: "tv",    url: "wwwsys/pages/webTv/channels/rai_2.html",                        group: "RAI",         iconStyleClass: "rai2",            channelTitle: "Rai Due" }; 
        this.channels[3]  = { on: false, type: "tv",    url: "wwwsys/pages/webTv/channels/rai_3.html",                        group: "RAI",         iconStyleClass: "rai3",            channelTitle: "Rai Tre" }; 
        this.channels[4]  = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/mediaset_rete_4.html",              group: "MEDIASET",    iconStyleClass: "rete4",           channelTitle: "Rete 4" };
        this.channels[5]  = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/mediaset_canale_5.html",            group: "MEDIASET",    iconStyleClass: "canale5",         channelTitle: "Canale 5" };
        this.channels[6]  = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/mediaset_italia_1.html",            group: "MEDIASET",    iconStyleClass: "italia1",         channelTitle: "Italia 1" };
        this.channels[7]  = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/la7.html",                          group: "CAIRO",       iconStyleClass: "la7",             channelTitle: "La 7" };
        this.channels[8]  = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/tv8.html",                          group: "N.A.",        iconStyleClass: "tv8",             channelTitle: "Tv 8" };
        this.channels[9]  = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/discovery_+_nove.html",             group: "DISCOVERY+",  iconStyleClass: "nove",            channelTitle: "Nove" };
        this.channels[10] = { on: false, type: "tv",    url: "",                                                              group: "",            iconStyleClass: "",                channelTitle: "" };
        this.channels[11] = { on: false, type: "tv",    url: "",                                                              group: "",            iconStyleClass: "",                channelTitle: "" };
        this.channels[12] = { on: false, type: "tv",    url: "",                                                              group: "",            iconStyleClass: "",                channelTitle: "" };
        this.channels[13] = { on: false, type: "tv",    url: "",                                                              group: "",            iconStyleClass: "",                channelTitle: "" };
        this.channels[14] = { on: false, type: "tv",    url: "",                                                              group: "",            iconStyleClass: "",                channelTitle: "" };
        this.channels[15] = { on: false, type: "tv",    url: "",                                                              group: "",            iconStyleClass: "",                channelTitle: "" };
        this.channels[16] = { on: false, type: "tv",    url: "",                                                              group: "",            iconStyleClass: "",                channelTitle: "" };
        this.channels[17] = { on: false, type: "tv",    url: "",                                                              group: "",            iconStyleClass: "",                channelTitle: "" };
        this.channels[18] = { on: false, type: "tv",    url: "",                                                              group: "",            iconStyleClass: "",                channelTitle: "" };
        this.channels[19] = { on: false, type: "tv",    url: "",                                                              group: "",            iconStyleClass: "",                channelTitle: "" };
        this.channels[20] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/mediaset_20.html",                  group: "MEDIASET",    iconStyleClass: "_20",             channelTitle: "20" };
        this.channels[21] = { on: false, type: "tv",    url: "",                                                              group: "RAI",         iconStyleClass: "rai4",            channelTitle: "Rai Quattro" }; 
        this.channels[22] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/mediaset_iris.html",                group: "MEDIASET",    iconStyleClass: "iris",            channelTitle: "Iris" };
        this.channels[23] = { on: false, type: "tv",    url: "",                                                              group: "RAI",         iconStyleClass: "rai5",            channelTitle: "Rai Cinque" }; 
        this.channels[24] = { on: false, type: "tv",    url: "",                                                              group: "RAI",         iconStyleClass: "raiMovie",        channelTitle: "Rai Movie" }; 
        this.channels[25] = { on: false, type: "tv",    url: "",                                                              group: "RAI",         iconStyleClass: "raiPremium",      channelTitle: "Rai Premium" }; 
        this.channels[26] = { on: false, type: "tv",    url: "",                                                              group: "SKY",         iconStyleClass: "cielo",           channelTitle: "Cielo" }; 
        this.channels[27] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/mediaset_27.html",                  group: "MEDIASET",    iconStyleClass: "_27",             channelTitle: "27" };
        this.channels[28] = { on: false, type: "tv",    url: "",                                                              group: "N.A.",        iconStyleClass: "TV2000",          channelTitle: "Tv2000" }; 
        this.channels[29] = { on: false, type: "tv",    url: "",                                                              group: "CAIRO",       iconStyleClass: "la7d",            channelTitle: "La 7d" }; 
        this.channels[30] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/mediaset_la_5.html",                group: "MEDIASET",    iconStyleClass: "la5",             channelTitle: "La 5" };
        this.channels[31] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/discovery_realtime.html",           group: "DISCOVERY+",  iconStyleClass: "realTime",        channelTitle: "RealTime" };
        this.channels[32] = { on: false, type: "tv",    url: "",                                                              group: "N.A.",        iconStyleClass: "qvc",             channelTitle: "QVC" }; 
        this.channels[33] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/discovery_+_foodnetwork.html",      group: "DISCOVERY+",  iconStyleClass: "foodNetwork",     channelTitle: "Food Network" };
        this.channels[34] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/mediaset_cine_34.html",             group: "MEDIASET",    iconStyleClass: "cine34",          channelTitle: "Cine 34" };
        this.channels[35] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/mediaset_focus.html",               group: "MEDIASET",    iconStyleClass: "focus",           channelTitle: "Focus" };
        this.channels[36] = { on: false, type: "radio", url: "",                                                              group: "MEDIASET",    iconStyleClass: "rtl102.5",        channelTitle: "RTL 102.5 TV" }; 
        this.channels[37] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/mediaset_37.html",                  group: "MEDIASET",    iconStyleClass: "_37",             channelTitle: "37" }; 
        this.channels[38] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/discovery_+_giallo.html",           group: "DISCOVERY+",  iconStyleClass: "giallo",          channelTitle: "Giallo" };        
        this.channels[39] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/mediaset_top_crime.html",           group: "MEDIASET",    iconStyleClass: "topCrime",        channelTitle: "Top Crime" };
        this.channels[40] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/mediaset_boing.html",               group: "MEDIASET",    iconStyleClass: "boing",           channelTitle: "Boing" };
        this.channels[41] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/discovery_+_k2.html",               group: "DISCOVERY+",  iconStyleClass: "k2",              channelTitle: "K2" };
        this.channels[42] = { on: false, type: "tv",    url: "",                                                              group: "RAI",         iconStyleClass: "raiGulp",         channelTitle: "Rai Gulp" }; 
        this.channels[43] = { on: false, type: "tv",    url: "",                                                              group: "RAI",         iconStyleClass: "raiYoyo",         channelTitle: "Rai YoYo" }; 
        this.channels[44] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/discovery_+_frisbee.html",          group: "DISCOVERY+",  iconStyleClass: "frisbee",         channelTitle: "Frisbee" };
        this.channels[45] = { on: false, type: "tv",    url: "",                                                              group: "",            iconStyleClass: "",                channelTitle: "" };
        this.channels[46] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/mediaset_cartoonito.html",          group: "MEDIASET",    iconStyleClass: "cartoonito",      channelTitle: "Cartonito" };
        this.channels[47] = { on: false, type: "tv",    url: "",                                                              group: "VIACOM",      iconStyleClass: "super",           channelTitle: "Super!" }; 
        this.channels[48] = { on: false, type: "tv",    url: "",                                                              group: "RAI",         iconStyleClass: "raiNews24",       channelTitle: "Rai News 24" }; 
        this.channels[49] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/mediaset_italia_2.html",            group: "MEDIASET",    iconStyleClass: "italia2",         channelTitle: "Italia 2" };
        this.channels[50] = { on: false, type: "tv",    url: "",                                                              group: "SKY",         iconStyleClass: "tg24",            channelTitle: "Sky TG24" }; 
        this.channels[51] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/mediaset_tgcom_24.html",            group: "MEDIASET",    iconStyleClass: "tgCom24",         channelTitle: "TGCom 24" };
        this.channels[52] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/discovery_+_dmax.html",             group: "DISCOVERY+",  iconStyleClass: "dmax",            channelTitle: "DMAX" };
        this.channels[53] = { on: false, type: "tv",    url: "",                                                              group: "CASA ITALIA", iconStyleClass: "casaItalia53",    channelTitle: "Canale Italia 53" }; 
        this.channels[54] = { on: false, type: "tv",    url: "",                                                              group: "RAI",         iconStyleClass: "raiStoria",       channelTitle: "Rai Storia" }; 
        this.channels[55] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/mediaset_extra.html",               group: "MEDIASET",    iconStyleClass: "extra",           channelTitle: "Mediaset Extra" };
        this.channels[56] = { on: true,  type: "tv",    url: "wwwsys/pages/webTv/channels/discovery_+_hgtv.html",             group: "DISCOVERY+",  iconStyleClass: "hgtv",            channelTitle: "HGTV" };
        this.channels[57] = { on: false, type: "tv",    url: "",                                                              group: "RAI",         iconStyleClass: "raiScuola",       channelTitle: "Rai Scuola" }; 
        this.channels[59] = { on: true,  type: "tv",    url: "",                                                              group: "DISCOVERY+",  iconStyleClass: "motorTrend",      channelTitle: "Motor Trend" }; 
        this.channels[60] = { on: false, type: "tv",    url: "",                                                              group: "PARAMOUNT",   iconStyleClass: "vh1",             channelTitle: "VH1" }; 
        this.channels[61] = { on: true,  type: "radio", url: "wwwsys/pages/webTv/channels/mediaset_radio_101_tv.html",        group: "MEDIASET",    iconStyleClass: "radio101",        channelTitle: "Radio 101 TV" };
        this.channels[62] = { on: true,  type: "radio", url: "wwwsys/pages/webTv/channels/mediaset_radio_105_tv.html",        group: "MEDIASET",    iconStyleClass: "radio105n",       channelTitle: "Radio 105 TV" };
        this.channels[63] = { on: true,  type: "radio", url: "wwwsys/pages/webTv/channels/mediaset_radio_virgin_tv.html",     group: "MEDIASET",    iconStyleClass: "virginRadio",     channelTitle: "VirginRadio TV" };
        this.channels[64] = { on: true,  type: "radio", url: "wwwsys/pages/webTv/channels/mediaset_radio_montecarlo_tv.html", group: "MEDIASET",    iconStyleClass: "radioMonteCarlo", channelTitle: "Radio Montecarlo TV" };	
        this.channels[65] = { on: true,  type: "webTv", url: "wwwsys/pages/webTv/channels/samsung_fail_army.html",            group: "",            iconStyleClass: "failArmy",        channelTitle: "Fail Army" };	
        this.channels[66] = { on: true,  type: "webTv", url: "wwwsys/pages/webTv/channels/samsung_fuel_tv.html",              group: "",            iconStyleClass: "sofyTv",          channelTitle: "Fuel Tv" }; 
        this.channels[67] = { on: false, type: "webTv", url: "wwwsys/pages/webTv/channels/samsung_teletubbies.html",          group: "RAKUTEN",     iconStyleClass: "teleTubbies",     channelTitle: "Teletubbies" }; 
        this.channels[68] = { on: true,  type: "webTv", url: "wwwsys/pages/webTv/channels/rakuten_tv_azione.html",            group: "RAKUTEN",     iconStyleClass: "azione",          channelTitle: "Azione" };
        this.channels[69] = { on: true,  type: "webTv", url: "wwwsys/pages/webTv/channels/rakuten_tv_cinema_italiano.html",   group: "RAKUTEN",     iconStyleClass: "cinemaItaliano",  channelTitle: "Cinema Italiano" };
        this.channels[70] = { on: true,  type: "webTv", url: "wwwsys/pages/webTv/channels/rakuten_tv_commedia.html",          group: "RAKUTEN",     iconStyleClass: "commedia",        channelTitle: "Commedia" };
        this.channels[71] = { on: true,  type: "webTv", url: "wwwsys/pages/webTv/channels/rakuten_tv_dramma.html",            group: "RAKUTEN",     iconStyleClass: "dramma",          channelTitle: "Dramma" };
        this.channels[72] = { on: true,  type: "webTv", url: "wwwsys/pages/webTv/channels/rakuten_tv_film_top.html",          group: "RAKUTEN",     iconStyleClass: "filmTop",         channelTitle: "Film Top" };
        this.channels[73] = { on: true,  type: "webTv", url: "wwwsys/pages/webTv/channels/rakuten_tv_romance.html",           group: "RAKUTEN",     iconStyleClass: "romance",         channelTitle: "Romance" };
        this.channels[74] = { on: true,  type: "webTv", url: "wwwsys/pages/webTv/channels/rakuten_tv_family.html",            group: "RAKUTEN",     iconStyleClass: "family",          channelTitle: "Family" };
        this.channels[75] = { on: true,  type: "webTv", url: "wwwsys/pages/webTv/channels/rakuten_tv_cineWestern.html",       group: "RAKUTEN",     iconStyleClass: "cineWestern",     channelTitle: "Cine Western" };
        this.channels[76] = { on: true,  type: "webTv", url: "wwwsys/pages/webTv/channels/rakuten_tv_andromeda.html",         group: "RAKUTEN",     iconStyleClass: "andromeda",       channelTitle: "Andromeda" };
        this.channels[77] = { on: true,  type: "webTv", url: "wwwsys/pages/webTv/channels/rakuten_tv_sciFi.html",             group: "RAKUTEN",     iconStyleClass: "sciFi",           channelTitle: "Sci-Fi" };
        this.channels[78] = { on: true,  type: "webTv", url: "wwwsys/pages/webTv/channels/rakuten_tv_fantascienza.html",      group: "RAKUTEN",     iconStyleClass: "drWho",           channelTitle: "Dr. WHO" };
    }

    initializeGui() {
        this.htmlSegment = `<UL CLASS="channelList">`;
        this.channels.forEach((element) => {
            if (element.on === true) {
                this.htmlSegment += 
                `
                    <LI ID="Rai 1">
                        <A CLASS="channelLink" HREF='${element.url}'>
                            <DIV CLASS="icon ${element.iconStyleClass}" ID="${element.iconStyleClass}"></DIV>
                            <DIV CLASS="truncate"  ID="title">${element.channelTitle}</DIV>
                        </A>
                    </LI>
                `;
                console.log(element);
            }
        });
        this.htmlSegment += `</UL>`;
        console.dataView(this.htmlSegment);
    }
	
    addEventListeners(container) {
        // Adds an 'On clickEvent' to all hyperlinks inside '.channelList' element
        // then anonymous function will be called
        $(".channelLink").click(function () {
            console.clear();
            var url     = $(this).attr('href');
            $('.channelList li').removeClass('selected');
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
            console.log("Selected channel: '" + selectedChannelName + "'");
            return false;
        });
    }
}
