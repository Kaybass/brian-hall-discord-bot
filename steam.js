/*
get steam keys
http://steamcommunity.com/dev/apikey

Domain Name: brendenadamczak.ninja

#https://www.npmjs.com/package/steam-api
*/
var Settings = require("./settings.json")
var SteamApi = require('steam-api');
var webScrappingMod = require("./webScrappingMod.js")

var apiKey = Settings.steamKey
var app = new SteamApi.App(apiKey);
var userStats = new SteamApi.UserStats(apiKey)


var scrapeSteamId = function(name){
    return webScrappingMod.getSteamIdFromName(name)
}
var getTags = function(name){
    webScrappingMod.getTagsFromName(name).then((data)=>{
        console.log(data)
    })
}

module.exports.getTags = function(name){
    var deferred = Promise.defer()
    webScrappingMod.getTagsFromName(name).then((appId) =>{
        deferred.resolve(appId)
    });
    return deferred.promise;
}

module.exports.numberOfUsers = function(name){
    var deferred = Promise.defer()
    scrapeSteamId(name
    ).then((appId)=>{
        userStats.GetNumberOfCurrentPlayers(appId).done(function(result){
            deferred.resolve(result)
        });
        
    });
    return deferred.promise;
}

module.exports.appDetails = function(name,listAttributes){
    var deferred = Promise.defer()
    scrapeSteamId(name).then((appId)=>{
        app.appDetails(appId).done(function(result){

            returnObject = {};
            returnObject["metacritic"] = result.metacritic.score;
            returnObject["categories"] = [];
            returnObject["genres"] = [];

            for (var i = 0, len = result.categories.length; i < len; i++) {
                returnObject["categories"].push(result.categories[i]["description"])
            }
            for (var i = 0, len = result.genres.length; i < len; i++) {
                returnObject["genres"].push(result.genres[i]["description"])
            }


            deferred.resolve(returnObject)
        });
    });
    return deferred.promise;
    
}

/*
Examples 
*/ 
//webScrappingMod.getSteamIdFromName("war thunder").then((appId) =>{
//    console.log("got completed")

    /*
    app.appDetails(appId).done(function(result){
      console.log(result);
    });
    //*/
    /*
    userStats.GetNumberOfCurrentPlayers(appId).done(function(result){
      console.log(result);
    });
    */
    /*
    //gets descriptions about achivements
    userStats.GetSchemaForGame(appId).done(function(result){
      console.log(result);
      //console.log(result["availableGameStats"]["achievements"][0])
      console.log("\n")
      //console.log(result["availableGameStats"]["achievements"].length)
    });
    //*/
    /*
    //gets percents for achivements and possible name
    userStats.GetGlobalAchievementPercentagesForApp(appId).done(function(result){
      console.log(result);
    });
    //*/
//}).catch((error) =>{
//    console.log(error)
//})