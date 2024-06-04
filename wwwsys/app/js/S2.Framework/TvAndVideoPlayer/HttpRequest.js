class HttpRequest {
    /* 
    =============================================================
    = FIELDS/MEMBERS ============================================
    =============================================================
    */    
    var _url;
    var _requestOptions;
    var _requestResult;
    
    /* 
    =============================================================
    = PROPERTIES ================================================
    =============================================================
    */    
    // Url property GETTER
    get Url() { return this._url; }
    // Url property SETTER
    set Url (newValue) { this._url = newValue; };

    // RquestOptions property GETTER
    get RequestOptions() { return this._requestOptions; }
    // RquestOptions property SETTER
    set RequestOptions(newValue) { this._requestOptions = newValue; }
    
    /* 
    =============================================================
    = CONSTRUCTORS ==============================================
    =============================================================
    */    
    constructor(p_url = '', p_requestOptions = {}) {
        this._url            = p_url;
        this._requestOptions = p_requestOptions;
        this._requestResult  = null;
    }

    /* 
    =============================================================
    = METHODS ===================================================
    =============================================================
    */
    async Get() {
        try {
            const response = await fetch(this.url, {
                method: 'GET',
                ...this._requestOptions
            });
            this._requestResult = await response.json();
            return this._requestResult;
        } catch (error) {
            console.error('Some errors occurred during the GET request:', error);
        }
    }

    async Post() {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                ...this._requestOptions
            });
            this._requestResult = await response.json();
            return this._requestResult;
        } catch (error) {
            console.error('Some errors occurred during the POST request:', error);
        }
    }

    async Update() {
        try {
            const response = await fetch(this.url, {
                method: 'PUT',
                ...this._requestOptions
            });
            this._requestResult = await response.json();
            return this._requestResult;
        } catch (error) {
            console.error('Some errors occurred during the UPDATE request:', error);
        }
    }

    async Delete() {
        try {
            const response = await fetch(this.url, {
                method: 'DELETE',
                ...this._requestOptions
            });
            this._requestResult = await response.json();
            return this._requestResult;
        } catch (error) {
            console.error('Some errors occurred during the DELETE request:', error);
        }
    }
}
