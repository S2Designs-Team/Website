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
    #EPG_URL_VIACOM;
    #PollingId;
	
    constructor(){
		this.#EpgData            = ["Rai", "Mediaset", "Viacom"];
        this.#EPG_URL_RAI        = "https://www.raiplay.it/palinsesto/onAir.json";
        this.#EPG_URL_MEDIASET   = "https://static3.mediasetplay.mediaset.it/apigw/nownext/nownext.json";
        //this.#RakutenTvEpg_Url   = "";
		this.update();
		this.startPolling();
    }
    
    update = async() =>{
		console.log("Caricamento della Guida Elettronica di Programmazione (EPG)...");
		try {
			fetch(this.#EPG_URL_RAI).
				then(response => response.json()).
				then(jsonizedData => {
						this.#EpgData["Rai"] = jsonizedData;
					}).
				catch(err => {
					//👉️"Something went wrong"
					console.log(err);
				});
			console.log(" - RAI EPG: invio eseguito correttamente.");
		} catch(error) {
			
		}
		/*
		} catch (error) {
			console.log('Errors occurred executing the GET EPG DATA request to: ' + url, error);
			return null;
		}
		*/
		
		try {			
			fetch(this.#EPG_URL_MEDIASET).
				then(response => response.json()).
				then(jsonizedData => {
						this.#EpgData["Mediaset"] = jsonizedData;
					}).
				catch(err => {
					//👉️"Something went wrong"
					console.log(err);
				});
			console.log(" - MEDIASET EPG: invio eseguito correttamente.");
		} catch(error) {
			
		}
		/*
		} catch (error) {
			console.log('Errors occurred executing the GET EPG DATA request to: ' + url, error);
			return null;
		}
		*/
	}

	applyChannelsEPG = () => {
		$("[id='Rai 1']").
			find('#title').
				html(this.#EpgData["Rai"].on_air[0].currentItem.name);
		$("[id='Rai 2']").
			find('#title').
				html(this.#EpgData["Rai"].on_air[1].currentItem.name);
		$("[id='Rai 3']").
			find('#title').
				html(this.#EpgData["Rai"].on_air[2].currentItem.name);
		$("[id='Rai 4']").
			find('#title').
				html(this.#EpgData["Rai"].on_air[3].currentItem.name);
		
		$("[id='Mediaset - Rete 4']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.R4.currentListing.mediasetlisting$epgTitle);
		$("[id='Mediaset - Canale 5']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.C5.currentListing.mediasetlisting$epgTitle);
		$("[id='Mediaset - Italia 1']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.I1.currentListing.mediasetlisting$epgTitle);
		$("[id='Mediaset - Italia 2']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.I2.currentListing.mediasetlisting$epgTitle);
		$("[id='Mediaset - Italia America']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.MW.currentListing.mediasetlisting$epgTitle);	
		$("[id='Mediaset - Focus']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.FU.currentListing.mediasetlisting$epgTitle);
		$("[id='Mediaset - Extra']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.KQ.currentListing.mediasetlisting$epgTitle);
		$("[id='Mediaset - La5']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.KA.currentListing.mediasetlisting$epgTitle);
		$("[id='Mediaset - 20']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.LB.currentListing.mediasetlisting$epgTitle);
		$("[id='Mediaset - 27']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.TS.currentListing.mediasetlisting$epgTitle);
		$("[id='Mediaset - Iris']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.KI.currentListing.mediasetlisting$epgTitle);
		$("[id='Mediaset - Top Crime']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.LT.currentListing.mediasetlisting$epgTitle);
		$("[id='Mediaset - Cine34']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.B6.currentListing.mediasetlisting$epgTitle);
		$("[id='Mediaset - Boing']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.KB.currentListing.mediasetlisting$epgTitle);
		$("[id='Mediaset - Cartoonito']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.LA.currentListing.mediasetlisting$epgTitle);
		$("[id='Mediaset - TG.COM 24']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.KF.currentListing.mediasetlisting$epgTitle);
		$("[id='Mediaset - Radio 101']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.ER.currentListing.mediasetlisting$epgTitle + "<BR />" + 
				     this.#EpgData["Mediaset"].response.listings.ER.currentListing.mediasetlisting$shortDescription);
		$("[id='Mediaset - Radio 105']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.EC.currentListing.mediasetlisting$epgTitle + "<BR />" + 
					 this.#EpgData["Mediaset"].response.listings.EC.currentListing.mediasetlisting$shortDescription);
		$("[id='Mediaset - Virgin Radio']").
			find('#title').
				html(this.#EpgData["Mediaset"].response.listings.EW.currentListing.mediasetlisting$epgTitle + "<BR />" + 
					 this.#EpgData["Mediaset"].response.listings.EW.currentListing.mediasetlisting$shortDescription);
		//$("#radioMonteCarlo-title").html(epgDataMediaset.response.listings.BB.currentListing.mediasetlisting$epgTitle + "<BR />" + epgDataMediaset.response.listings.BB.currentListing.mediasetlisting$shortDescription);		
	}

    infos = () => {
        return this.#EpgData;
    }
	
	startPolling = () =>{
		this.#PollingId = window.setInterval(async()=>{
			await this.update();
			this.applyChannelsEPG();
		}, 10000);
	};
		
	removePolling = () =>{
		window.clearInterval(this.#PollingId);
	};
}