window.waldo = window.waldo || {};
waldo.Request = waldo.Request || {};

(function(){
    /**
     * Manages a single HTTP request
     *
     * @param uri    REQUIRED: The uri to request
     * @param data   OPTIONAL: The data to send with the request
     * @param method OPTIONAL: The request HTTP method [GET]
     * @param type   OPTIONAL: The expected content type for the header [application/json]
     */
    waldo.Request = function(uri, data, method, type){
        var self = this;
        var client = new XMLHttpRequest();

        self.uri = uri;
        self.data = data || null;
        self.method = method || 'GET';
        self.type = type || "application/json";

        /**
         * Sends the current request
         */
        this.send = function(){
            client.open(self.method, self.uri, true);
            client.setRequestHeader("Content-Type", self.type);
            client.send(self.data);
        };

        /**
         * Callback function for when the request headers are received
         */
        this.onHeadersReceived = function(client){};

        /**
         * Callback function for when response data is received but is still partial
         */
        this.onLoading = function(client){};

        /**
         * Callback function for when the request is completed
         */
        this.onSuccess = function(client){};

        /**
         * Constructor
         *
         * Sets up the onreadystatechange event calls for the XMLHttpRequest client
         */
        (function(){
            client.onreadystatechange = function(){
                switch (client.readyState) {
                    case 4:
                        self.onSuccess(client);
                        break;

                    case 3:
                        self.onLoading(client);
                        break;

                    case 2:
                        self.onHeadersReceived(client);
                        break;

                    default:
                        break;
                }
            };
        })();
    };
})();