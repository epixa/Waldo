(function(){
    var twitter = new waldo.Twitter();
    
    window.onsubmit = function(){
        var name = document.getElementById('screen_name').value;
        if (!name) {
            return false;
        }
        
        twitter.request('followers/ids.json?screen_name=' + name, {}, 'GET', function(client){
            console.log(json_parse(client.responseText));
            // TODO: Lookup these followers via users/lookup
        });
        
        return false;
    };
})();