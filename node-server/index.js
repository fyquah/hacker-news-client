// require the modules here
var FirebaseConstructor = require("firebase");
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var request = require("request");

// declaring some varables
var locations = function(){
    var _firebase = new FirebaseConstructor("https://hacker-news.firebaseio.com/vo/");
    var _locations = {
        "top_stories": _firebase.child("topstories"),
        "item_updates": _firebase.child("updates/items")
    };
    var _deep_copy = function(obj){
        return JSON.parse(JSON.stringify(obj));
    }
    return function(type, id){
        if (type === "item") {
            return _firebase.child("item/" + id.toString());
        } else {
            return _locations[type];
        }
    }
}();

var update_db = (function(){
    var _host_name = "http://localhost:3000"

    return function(type_of_update, data){ 
    // this function will be responsible in determining the object type and assigning them accordingly to the right rails request
    // in other words, this function is very important
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

// updating items
var handleUpdatedItem = function(new_child_ss){
    var id = new_child_ss.val();
    console.log("New child of %s has been added!", id);
    location("item", id).once("value", function(){
        update_db(obj_ss.val().type, obj_ss.val());
    });
}

location("item_updates").on("child_removed", function(removed_child){
    console.log("A child is removed, but there is nothing i need to do bout it!");
});
location("item_updates").on("child_added", handleUpdatedItem);
location("item_updates").on("child_changed", handleUpdatedItem);

// updating top stories
location("top_stories").on("value", function(top_stories_ss){
    console.log("A new list of top stories have just been obtained!");
    update_db("top_stories", top_stories_ss.val())
});
