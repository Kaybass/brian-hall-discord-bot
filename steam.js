/*
NOT IMPLEMENTED YET
 */
var Settings = require("./settings.json")
var SteamApi = require('steam-api');
var webScrappingMod = require("./webScrappingMod.js")
/*
get steam keys
http://steamcommunity.com/dev/apikey

Domain Name: brendenadamczak.ninja

#https://www.npmjs.com/package/steam-api
*/
var apiKey = Settings.steamKey
var app = new SteamApi.App(apiKey);
var userStats = new SteamApi.UserStats(apiKey)



webScrappingMod.getSteamIdFromName("war thunder").then((appId) =>{
    console.log("got completed")

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
}).catch((error) =>{
    console.log(error)
})



/*
example of using webScrappingMod
webScrappingMod.getSteamIdFromName("ICEY").then((data) =>{
    console.log("got completed")
    console.log(data)

    webScrappingMod.getTagsFromSteamId(data).then((data)=>{
        console.log(data)
    })
}).catch((error) =>{
    console.log(error)
})
*/
