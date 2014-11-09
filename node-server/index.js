var FirebaseConstructor = require("firebase");
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var request = require("request");

var updates = new FirebaseConstructor("https://hacker-news.firebaseio.com/v0/updates/items");
var top_stories = new FirebaseConstructor("https://hacker-news.firebaseio.com/v0/topstories");
var items = new FirebaseConstructor("https://hacker-news.firebaseio.com/v0/item");

var update_db = (function(){
    var _host_name = "http://localhost:3000"

    return function(type_of_update, data){
        try {
            if (type_of_update === "top_stories") {
                request({
                    method: "POST",
                    uri: _host_name + "/top_stories",
                    json: {
                        "ids": data,
                        "authenticity_token": process.env["HN_CLIENT_AUTHENTICITY_TOKEN"]
                    }
                }, function(error, response, body){
                    if (!error && response.statusCode >= 200 && response.statusCode <= 299) {
                        console.log(body);
                    } else {
                        throw { 
                            "id": "top_stories" , 
                            "response": response,
                            "body": body,
                            "data": { 
                                "ids": data
                            },
                            "uri" : _host_name + "/top_stories",
                            "method": "POST"
                        };
                    }
                });
            } else if (type_of_update === "story") {
                request({
                    method: "PATCH",
                    uri: _host_name + "/stories/" + data.id.toString(),
                    json: {
                        "story": data,
                        "authenticity_token": process.env["HN_CLIENT_AUTHENTICITY_TOKEN"]
                    }
                }, function(error, response, body){
                    if (!error && response.statusCode >= 200 && response.statusCode <= 299) {
                        console.log(body);
                    } else {                
                        throw { 
                            "id": data.id.toString() , 
                            "response": response,
                            "body": body,
                            "data": { 
                                "story": data
                            },
                            "uri" : _host_name + "/top_stories",
                            "method": "PATCH",
                        };
                    }
                });
            }
        } catch(e) {
            console.log(e);
            throw e; // to terminate the program immeadiately!
        }
    };
})();

var retrieveItem = function(id, callback){
    items.child(id.toString()).once("value", callback);
}

var handleNewChild = function(new_child_ss){
    var id = new_child_ss.val();
    console.log("New child of %s has been added!", id);
    retrieveItem(id, function(obj_ss){
        update_db(obj_ss.val().type, obj_ss.val());
    });
}

updates.on("child_removed", function(removed_child){
    console.log("A child is removed, but there is nothing i need to do bout it!");
})

updates.on("child_added", handleNewChild);
updates.on("child_changed", handleNewChild);

top_stories.on("value", function(top_stories_ss){
    console.log("A new list of top stories have just been obtained!");
    update_db("top_stories", top_stories_ss.val())
});
