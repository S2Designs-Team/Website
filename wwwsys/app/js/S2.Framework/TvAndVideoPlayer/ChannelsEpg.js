/*
# Copyright 2035 S2DesignsTeam (Salvatore Nillo).
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
*/
class ChannelsEpg {
    #EpgData;
    #EPG_URL_RAI;
    #EPG_URL_MEDIASET;
    #EPG_URL_RAKUTEN;
    #EPG_URL_VIACOM;
    #PollingId;

    constructor(){
        console.debug("[+][ChannelsEpg::init][EPG rollup initialization] ...");
        try {
            this._httpRequest       = new HttpClient();
            this.EpgData            = ["Rai", "Mediaset", "Rakuten", "Viacom"];
            this.EPG_URL_RAI        = "https://www.raiplay.it/palinsesto/onAir.json";
            this.EPG_URL_MEDIASET   = "https://static3.mediasetplay.mediaset.it/apigw/nownext/nownext.json";
            this.EPG_URL_RAKUTEN    = "https://gizmo.rakuten.tv/v3/live_channels?" +
                                           "classification_id=36&" +
                                           "device_identifier=web&" +
                                           "device_stream_audio_quality=2.0&" +
                                           "device_stream_hdr_type=NONE&" +
                                           "device_stream_video_quality=FHD&" +
                                           "epg_duration_minutes=240&" +
                                           "epg_ends_at=2024-05-29T23%3A00%3A00.000Z&" +
                                           "epg_ends_at_timestamp=1715295600000&" +
                                           "epg_starts_at=2024-05-28T19%3A00%3A00.000Z&" +
                                           "epg_starts_at_timestamp=1715281200000&" +
                                           "locale=it&" +
                                           "market_code=it&" +
                                           "per_page=120";
            this.update();
            this.startPolling();
        } catch (error){
            console.error(" {0}" + error.message);
        }
        console.debug("[-][ChannelsEpg::init]");
    }
	
    update2 = async() =>{
		console.log("Caricamento della Guida Elettronica di Programmazione (EPG)...");
		
		// RAI EPG ================================================================================
		try {
			// Esempio di utilizzo di una richiesta GET con dati di filtro
			_httpRequest.Url = this.EPG_URL_RAI;
			_httpRequest.RequestOptions = {
   				method: 'GET',
    				headers: {
        				'Access-Control-Allow-Origin': '*', // Definizione CORS
    				}
			};
			_httpRequest.get().then(data => {
				console.log('Risposta GET:', data);
				this.EpgData["Rai"] = data;
			});
        } catch (error) { }
		
		// MEDIASET EPG ===========================================================================
		try {	
			_httpRequest.Url = this.EPG_URL_MEDIASET;
			_httpRequest.RequestOptions = {
   				method: 'GET',
    				headers: {
        				'Access-Control-Allow-Origin': '*', // Definizione CORS
    				}
			};
			_httpRequest.get().then(data => {
				console.log('Risposta GET:', data);
				this.EpgData["Mediaset"] = data;
			});
		} catch (error) { }
    }
    
    update = async() =>{
        console.log("Caricamento della Guida Elettronica di Programmazione (EPG)...");
	    
        const epoch = Math.round(new Date().valueOf() / 1000);
	    
        this.EPG_URL_RAI        = "https://www.raiplay.it/palinsesto/onAir.json";
        try {
            fetch(this.EPG_URL_RAI).
                then(response     => response.json()).
                then(jsonizedData => { this.EpgData["Rai"] = jsonizedData; } ).
                catch(err         => { console.log(err); } );  //👉️"Something went wrong"
        } catch(error) { }

	    
        this.EPG_URL_MEDIASET   = "https://static3.mediasetplay.mediaset.it/apigw/nownext/nownext.json";
        try {			
            fetch(this.EPG_URL_MEDIASET).
                then(response     => response.json()).
                then(jsonizedData => { this.EpgData["Mediaset"] = jsonizedData;}).
                catch(err         => { console.log(err); } );  //👉️"Something went wrong"
        } catch(error) { }
        console.log(epoch);
                                  
        this.EPG_URL_RAKUTEN    = "https://gizmo.rakuten.tv/v3/live_channels/top-free-it-rakuten-tv?classification_id=36&device_identifier=web&device_stream_audio_quality=2.0&device_stream_hdr_type=NONE&device_stream_video_quality=FHD&disable_dash_legacy_packages=false&locale=it&market_code=it&support_closed_captions=true"
        try {			
            fetch(this.EPG_URL_RAKUTEN, { 
                //headers: {
                //        "Access-Control-Allow-Origin": "*",
                //        accept:               'application/json, text/plain, */*',
                //        "Accept-Encoding":    'gzip, deflate, br, zstd',
                //        "accept-language":    'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7',
                //        "cache-control":      'no-cache',
                //        "pragma":               'no-cache',
                //        "priority":             'u=1, i',
                //        "sec-ch-ua":          '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
                //        "sec-ch-ua-mobile":   '?0',
                //        "sec-ch-ua-platform": '"Windows"',
                //        "sec-fetch-dest":     'empty',
                //        "sec-fetch-mode":     'cors',
                //        "sec-fetch-site":     'same-site'
                //    },
                    referrer:       'https://www.rakuten.tv/',
                    referrerPolicy: 'strict-origin-when-cross-origin',
                    body:           null,
                    method:         'GET',
                    mode:           'cors',
                    credentials:    'omit'
                }).
                then(response     => response.json()).
                then(jsonizedData => { this.EpgData["Rakuten"] = jsonizedData; } ).
                catch(err         => { console.log(err); } );  //👉️"Something went wrong"
        } catch(error) { }
    }
	
    applyChannelsEPG = () => {
        
        $("[id='Rai 1']").
            find('#title').
                html(this.EpgData["Rai"].on_air[0].currentItem.name);
        $("[id='Rai 2']").
            find('#title').
                html(this.EpgData["Rai"].on_air[1].currentItem.name);
        $("[id='Rai 3']").
            find('#title').
                html(this.EpgData["Rai"].on_air[2].currentItem.name);
        $("[id='Rai 4']").
            find('#title').
                html(this.EpgData["Rai"].on_air[3].currentItem.name);
        //========================================================================================================================
        $("[id='Mediaset - Rete 4']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.R4.currentListing.mediasetlisting$epgTitle);
        $("[id='Mediaset - Canale 5']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.C5.currentListing.mediasetlisting$epgTitle);
        $("[id='Mediaset - Italia 1']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.I1.currentListing.mediasetlisting$epgTitle);
        $("[id='Mediaset - Italia 2']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.I2.currentListing.mediasetlisting$epgTitle);
        $("[id='Mediaset - Italia America']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.MW.currentListing.mediasetlisting$epgTitle);	
        $("[id='Mediaset - Focus']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.FU.currentListing.mediasetlisting$epgTitle);
        $("[id='Mediaset - Extra']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.KQ.currentListing.mediasetlisting$epgTitle);
        $("[id='Mediaset - La5']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.KA.currentListing.mediasetlisting$epgTitle);
        $("[id='Mediaset - 20']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.LB.currentListing.mediasetlisting$epgTitle);
        $("[id='Mediaset - 27']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.TS.currentListing.mediasetlisting$epgTitle);
        $("[id='Mediaset - Iris']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.KI.currentListing.mediasetlisting$epgTitle);
        $("[id='Mediaset - Top Crime']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.LT.currentListing.mediasetlisting$epgTitle);
        $("[id='Mediaset - Cine 34']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.B6.currentListing.mediasetlisting$epgTitle);
        $("[id='Mediaset - Boing']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.KB.currentListing.mediasetlisting$epgTitle);
        $("[id='Mediaset - Cartoonito']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.LA.currentListing.mediasetlisting$epgTitle);
        $("[id='Mediaset - TG.COM 24']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.KF.currentListing.mediasetlisting$epgTitle);
        $("[id='Mediaset - Radio 101']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.ER.currentListing.mediasetlisting$epgTitle + "<BR />" + 
                     this.EpgData["Mediaset"].response.listings.ER.currentListing.mediasetlisting$shortDescription);
        $("[id='Mediaset - Radio 105']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.EC.currentListing.mediasetlisting$epgTitle + "<BR />" + 
                     this.EpgData["Mediaset"].response.listings.EC.currentListing.mediasetlisting$shortDescription);
        $("[id='Mediaset - Virgin Radio']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.EW.currentListing.mediasetlisting$epgTitle + "<BR />" + 
                     this.EpgData["Mediaset"].response.listings.EW.currentListing.mediasetlisting$shortDescription);
        $("[id='Mediaset - Radio MonteCarlo']").
            find('#title').
                html(this.EpgData["Mediaset"].response.listings.BB.currentListing.mediasetlisting$epgTitle + "<BR />" + 
                     this.EpgData["Mediaset"].response.listings.BB.currentListing.mediasetlisting$shortDescription);
        //========================================================================================================================  
        /*
	$("[id='Rakuten Tv - Azione']").
            find('#title').
                html(this.#EpgData["Rakuten"].response + "<BR />" );
	$("[id='Rakuten Tv - Cinema Italiano']").
            find('#title').
                html(this.#EpgData["Rakuten"].response + "<BR />" );
	$("[id='Rakuten Tv - Commedia']").
            find('#title').
                html(this.#EpgData["Rakuten"].response.listings.EW.currentListing.mediasetlisting$epgTitle + "<BR />" + 
                     this.#EpgData["Rakuten"].response.listings.EW.currentListing.mediasetlisting$shortDescription);
	$("[id='Rakuten Tv - Dramma']").
            find('#title').
                html(this.#EpgData["Rakuten"].response.listings.EW.currentListing.mediasetlisting$epgTitle + "<BR />" + 
                     this.#EpgData["Rakuten"].response.listings.EW.currentListing.mediasetlisting$shortDescription);
	$("[id='Rakuten Tv - Film Top']").
            find('#title').
                html(this.#EpgData["Rakuten"].response.listings.EW.currentListing.mediasetlisting$epgTitle + "<BR />" + 
                     this.#EpgData["Rakuten"].response.listings.EW.currentListing.mediasetlisting$shortDescription);
	$("[id='Rakuten Tv - Romance']").
            find('#title').
                html(this.#EpgData["Rakuten"].response.listings.EW.currentListing.mediasetlisting$epgTitle + "<BR />" + 
                     this.#EpgData["Rakuten"].response.listings.EW.currentListing.mediasetlisting$shortDescription);
	$("[id='Rakuten Tv - Family']").
            find('#title').
                html(this.#EpgData["Rakuten"].response.listings.EW.currentListing.mediasetlisting$epgTitle + "<BR />" + 
                     this.#EpgData["Rakuten"].response.listings.EW.currentListing.mediasetlisting$shortDescription);
	$("[id='Rakuten Tv - Cine Western']").
            find('#title').
                html(this.#EpgData["Rakuten"].response.listings.EW.currentListing.mediasetlisting$epgTitle + "<BR />" + 
                     this.#EpgData["Rakuten"].response.listings.EW.currentListing.mediasetlisting$shortDescription);
	$("[id='Rakuten Tv - Andromeda']").
            find('#title').
                html(this.#EpgData["Rakuten"].response.listings.EW.currentListing.mediasetlisting$epgTitle + "<BR />" + 
                     this.#EpgData["Rakuten"].response.listings.EW.currentListing.mediasetlisting$shortDescription);
	$("[id='Rakuten Tv - Sci Fi']").
            find('#title').
                html(this.#EpgData["Rakuten"].response.listings.EW.currentListing.mediasetlisting$epgTitle + "<BR />" + 
                     this.#EpgData["Rakuten"].response.listings.EW.currentListing.mediasetlisting$shortDescription);
        */
    }
	
    startPolling = () =>{		
        this.PollingId = window.setInterval(async()=>{
            await this.update();
            this.applyChannelsEPG();
        }, 15000);
    };
		
    removePolling = () =>{
        window.clearInterval(this.PollingId);
    };
}
