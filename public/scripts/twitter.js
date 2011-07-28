window.waldo = window.waldo || {};
waldo.Twitter = waldo.Twitter || {};

(function(){
    /**
     * Manages requests to the twitter REST API
     */
    waldo.Twitter = function(){
        var self = this;

        self.proxyUrl = 'proxy.php?uri='

        self.request = function(uri, data, method, onSuccess) {
            var url = self.proxyUrl + uri;
            var request = new waldo.Request(url, data, method);
            request.onSuccess = onSuccess;
            request.send();
        };
    };
})();