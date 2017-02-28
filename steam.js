/*
NOT IMPLEMENTED YET
 */
Settings = require("./settings.json")
var SteamApi = require('steam-api');
/*
get steam keys
http://steamcommunity.com/dev/apikey

Key: 6373F8810E9FA6C9781491E5F32D753F

Domain Name: brendenadamczak.ninja

#https://www.npmjs.com/package/steam-api
*/

var SteamApi = require('steam-api');
var apiKey = settings.steamKey
var app = new SteamApi.App(apiKey);

appId = 244870


app.appDetails(appId).done(function(result){
  console.log(result);
});


/*
GetNumberStatesForGame
GetNumberOfCurrentPlayer
GetUserStatesForGame
AppDetails
*/
