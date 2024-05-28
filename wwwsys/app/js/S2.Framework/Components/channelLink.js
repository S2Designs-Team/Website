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


export class channelLink extends BaseComponent {
    
    constructor(properties = {}, cssFileUrl = null) {
        super(properties, cssFileUrl); // Calls the Base Class constructor

        if (HtaConsole.instance) {
            return HtaConsole.instance;
        } 
        this.htmlSegment = `
		    <LI ID="Rai 1">
			    <A CLASS="channelLink" HREF="wwwsys/pages/webTv/channels/rai_1.html">
				    <DIV CLASS="icon rai1" ID="rai1-icon"></DIV>
				    <DIV CLASS="truncate"  ID="title">Rai Uno</DIV>
			    </A>
		    </LI>
            `;   
    }

    initialize() {
        var channels = [];
        channels[0]  = { type: "tv",    url: "webTv/channels/TEST_dashJs_stream_mp4.html",       iconStyleClass: "test-icon",            channelTitle: "S2 Test TV" };                          // NOT WORKING
        channels[1]  = { type: "tv",    url: "webTv/channels/rai_1.html",                        iconStyleClass: "rai1-icon",            channelTitle: "Rai Uno" };
        channels[2]  = { type: "tv",    url: "webTv/channels/rai_2.html",                        iconStyleClass: "rai2-icon",            channelTitle: "Rai Due" };
        channels[3]  = { type: "tv",    url: "webTv/channels/rai_3.html",                        iconStyleClass: "rai3-icon",            channelTitle: "Rai Tre" };
        channels[4]  = { type: "tv",    url: "webTv/channels/mediaset_rete_4.html",              iconStyleClass: "rete4-icon",           channelTitle: "Mediaset - Rete 4" };
        channels[5]  = { type: "tv",    url: "webTv/channels/mediaset_canale_5.html",            iconStyleClass: "canale5-icon",         channelTitle: "Mediaset - Canale 5" };
        channels[6]  = { type: "tv",    url: "webTv/channels/mediaset_italia_1.html",            iconStyleClass: "italia1-icon",         channelTitle: "Mediaset - Italia 1" };
        channels[7]  = { type: "tv",    url: "webTv/channels/webTv/channels/la7.html",           iconStyleClass: "la7-icon",             channelTitle: "La 7" };
        channels[8]  = { type: "tv",    url: "webTv/channels/tv8.html",                          iconStyleClass: "tv8-icon",             channelTitle: "Tv 8" };
        channels[9]  = { type: "tv",    url: "webTv/channels/mediaset_italia_2.html",            iconStyleClass: "italia2-icon",         channelTitle: "Mediaset - Italia 2" };
        channels[10] = { type: "tv",    url: "webTv/channels/mediaset_focus.html",               iconStyleClass: "focus-icon",           channelTitle: "Mediaset - Focus" };
        channels[11] = { type: "tv",    url: "webTv/channels/mediaset_extra.html",               iconStyleClass: "extra-icon",           channelTitle: "Mediaset - Extra" };
        channels[12] = { type: "tv",    url: "webTv/channels/rai_4.html",                        iconStyleClass: "rai4-icon",            channelTitle: "Rai Quattro" };                         // NOT WORKING
        channels[13] = { type: "tv",    url: "webTv/channels/mediaset_la_5.html",                iconStyleClass: "la5-icon",             channelTitle: "Mediaset - La 5" };
        channels[14] = { type: "tv",    url: "webTv/channels/mediaset_20.html",                  iconStyleClass: "_20-icon",             channelTitle: "Mediaset - 20" };
        channels[15] = { type: "tv",    url: "webTv/channels/mediaset_27.html",                  iconStyleClass: "_27-icon",             channelTitle: "Mediaset - 27" };
        channels[16] = { type: "tv",    url: "webTv/channels/mediaset_iris.html",                iconStyleClass: "iris-icon",            channelTitle: "Mediaset - Iris" };
        channels[17] = { type: "tv",    url: "webTv/channels/mediaset_top_crime.html",           iconStyleClass: "topCrime-icon",        channelTitle: "Mediaset - Top Crime" };
        channels[18] = { type: "tv",    url: "webTv/channels/mediaset_cine_34.html",             iconStyleClass: "cine34-icon",          channelTitle: "Mediaset - Cine 34" };
        channels[19] = { type: "tv",    url: "webTv/channels/paramount_vh1.html",                iconStyleClass: "paramount-icon",       channelTitle: "Paramount VH1" };	                    // NOT WORKING
        channels[20] = { type: "tv",    url: "webTv/channels/mediaset_boing.html",               iconStyleClass: "boing-icon",           channelTitle: "Mediaset - Boing" };
        channels[21] = { type: "tv",    url: "webTv/channels/mediaset_cartoonito.html",          iconStyleClass: "cartoonito-icon",      channelTitle: "Mediaset - Cartonito" };
        channels[22] = { type: "tv",    url: "webTv/channels/mediaset_tgcom_24.html",            iconStyleClass: "tgCom24-icon",         channelTitle: "Mediaset - TGCom 24" };
        channels[23] = { type: "radio", url: "webTv/channels/mediaset_radio_101_tv.html",        iconStyleClass: "radio101-icon",        channelTitle: "Mediaset - Radio 101 TV" };
        channels[24] = { type: "radio", url: "webTv/channels/mediaset_radio_105_tv.html",        iconStyleClass: "radio105-icon",        channelTitle: "Mediaset - Radio 105 TV" };
        channels[24] = { type: "radio", url: "webTv/channels/mediaset_radio_virgin_tv.html",     iconStyleClass: "virginRadio-icon",     channelTitle: "Mediaset - VirginRadio TV" };
        channels[25] = { type: "radio", url: "webTv/channels/mediaset_radio_montecarlo_tv.html", iconStyleClass: "radioMonteCarlo-icon", channelTitle: "Mediaset - Radio Montecarlo TV" };	
        channels[26] = { type: "tv",    url: "webTv/channels/samsung_fail_army.html",            iconStyleClass: "failArmy-icon",        channelTitle: "Samsung - Fail Army" };	
        channels[27] = { type: "tv",    url: "webTv/channels/samsung_fuel_tv.html",              iconStyleClass: "sofyTv-icon",          channelTitle: "Samsung - Fuel Tv" };	                // NOT WORKING
        channels[28] = { type: "tv",    url: "webTv/channels/samsung_teletubbies.html",          iconStyleClass: "teleTubbies-icon",     channelTitle: "Rakuten TV - Teletubbies" };	        // NOT WORKING
        channels[29] = { type: "tv",    url: "webTv/channels/rakuten_tv_azione.html",            iconStyleClass: "azione-icon",          channelTitle: "Rakuten TV - Azione" };
        channels[30] = { type: "tv",    url: "webTv/channels/rakuten_tv_cinema_italiano.html",   iconStyleClass: "cinemaItaliano-icon",  channelTitle: "Rakuten TV - Cinema Italiano" };
        channels[31] = { type: "tv",    url: "webTv/channels/rakuten_tv_commedia.html",          iconStyleClass: "commedia-icon",        channelTitle: "Rakuten TV - Commedia" };
        channels[32] = { type: "tv",    url: "webTv/channels/rakuten_tv_dramma.html",            iconStyleClass: "dramma-icon",          channelTitle: "Rakuten TV - Dramma" };
        channels[33] = { type: "tv",    url: "webTv/channels/rakuten_tv_film_top.html",          iconStyleClass: "filmTop-icon",         channelTitle: "Rakuten TV - Film Top" };
        channels[34] = { type: "tv",    url: "webTv/channels/rakuten_tv_romance.html",           iconStyleClass: "romance-icon",         channelTitle: "Rakuten TV - Romance" };
        channels[35] = { type: "tv",    url: "webTv/channels/rakuten_tv_family.html",            iconStyleClass: "family-icon",          channelTitle: "Rakuten TV - Family" };
        channels[36] = { type: "tv",    url: "webTv/channels/rakuten_tv_cineWestern.html",       iconStyleClass: "cineWestern-icon",     channelTitle: "Rakuten TV - Cine Western" };
        channels[37] = { type: "tv",    url: "webTv/channels/rakuten_tv_andromeda.html",         iconStyleClass: "andromeda-icon",       channelTitle: "Rakuten TV - FilmRise Andromeda" };
        channels[38] = { type: "tv",    url: "webTv/channels/rakuten_tv_sciFi.html",             iconStyleClass: "sciFi-icon",           channelTitle: "Rakuten TV - Sci-Fi" };
        channels[39] = { type: "tv",    url: "webTv/channels/rakuten_tv_fantascienza.html",      iconStyleClass: "fantascienza-icon",    channelTitle: "Rakuten TV - Fantascienza" };
        console.log('Component1 initialized');
    }
}
