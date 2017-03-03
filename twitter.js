Settings = require("./settings.json")

var Twit = require('twit');



var T = new Twit({
    consumer_key:         Settings.twitter.consumer_key,
    consumer_secret:      Settings.twitter.consumer_secret,
    access_token:         Settings.twitter.access_token,
    access_token_secret:  Settings.twitter.access_token_secret
})





module.exports.handlerForOnSteamTweet = function(channel) {
  var GaryJohnsonStream = T.stream('user', { screen_name: 'GovGaryJohnson' })
  GaryJohnsonStream.on('tweet', function (tweet) {
    channel.sendMessage(tweet)
  })
};

//-----------------------------------------------------------------------
// Examples
//
//  Get tweets from a specific person
//  Ex.
//    GaryJohnson
/*
var options = { screen_name: 'GovGaryJohnson',
                count: 3 };
T.get('statuses/user_timeline', options , function(err, data) {
  for (var i = 0; i < data.length ; i++) {
    console.log(data[i].text);
  }
})
*/


//  Stream random topics
//  Ex. 
//    Mango
/*
var stream = T.stream('statuses/filter', { track: 'mango' })

stream.on('tweet', function (tweet) {
  console.log(tweet)
})
*/