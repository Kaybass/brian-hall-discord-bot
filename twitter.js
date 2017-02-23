Settings = require("./settings.json")

var Twit = require('twit');



var T = new Twit({
    consumer_key:         Settings.twitter.consumer_key//'7WAXNL8IWRbhoFrYafoqbJqVp'
  , consumer_secret:      Settings.twitter.consumer_secret//'8IbsmnXpqhgQzOXrFsRFFMp3fScOmF9nE0WJSD5HvrcbWslvfA'
  , access_token:         Settings.twitter.access_token//'833757833430757377-mYGTbJK6qj85xzfwajVexqSLNKnRYjz'
  , access_token_secret:  Settings.twitter.access_token_secret//'79MLFvA4NGVKJsasN5N65wQ5uVi90FL4hvtEqLVQWXguM'
})

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



module.exports.handlerForOnSteamTweet = function(channel) {
  var GaryJohnsonStream = T.stream('user', { screen_name: 'GovGaryJohnson' })
  GaryJohnsonStream.on('tweet', function (tweet) {
    channel.sendMessage(tweet)
  })
};
