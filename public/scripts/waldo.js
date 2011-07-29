(function(){
    var form = document.getElementById('identity_form');
    var field = document.getElementById('screen_name');
    var twitter = new waldo.Twitter();
    var lastIdentity = null;

    /**
     * Loads the users that follow the given twitter user
     *
     * @param name REQUIRED: The screen name of the targeted twitter user
     */
    function loadUsers(name){
        if (!name) {
            return false;
        }

        if (name == lastIdentity) {
            return false;
        }

        lastIdentity = name;

        twitter.request('followers/ids.json?screen_name=' + name, {}, 'GET', function(client){
            var ids = json_parse(client.responseText);
            var x, y;

            var sections = [];
            var count = 100;
            var currentSection = -1;
            for (x in ids) {
                if (count >= 100) {
                    count = 0;
                    currentSection++;
                    sections[currentSection] = [];
                }

                sections[currentSection].push(ids[x]);
                count++;
            }

            var tmpCount = 0;
            for (x in sections) {
                if (tmpCount >= 1) {
                    break;
                }

                twitter.request('users/lookup.json?user_id=' + sections[x].join(','), {}, 'GET', function(client){
                    var users = json_parse(client.responseText);
                    var x;
                    var distinctLocations = {};

                    for (x in users) {
                        users[x].location = (users[x].location + '').toLowerCase();
                        if (!distinctLocations[users[x].location]) {
                            distinctLocations[users[x].location] = 0;
                        }

                        distinctLocations[users[x].location]++;
                    }

                    console.log(distinctLocations);
                    // TODO: Geocode and plot
                });

                tmpCount++;
            }
        });
        
        return false;
    };

    (function(){
        var query = window.location.search.substr(1);
        var variables = query.split('&');
        var x;

        form.onsubmit = function() {
            return loadUsers(field.value);
        };

        for (x in variables) {
            var variable = variables[x].split('=');
            if (variable[0] == 'name') {
                field.value = variable[1];
                loadUsers(field.value);
                break;
            }
        }
    })();
})();