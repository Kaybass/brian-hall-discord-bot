var Settings = require("./settings.json");
var speak = require("speakeasy-nlp");

var Twit = require('twit');



var T = new Twit({
    consumer_key:         Settings.twitter.consumer_key,
    consumer_secret:      Settings.twitter.consumer_secret,
    access_token:         Settings.twitter.access_token,
    access_token_secret:  Settings.twitter.access_token_secret
})


//426938019 - brendenAAAA
//95713333 -GovGaryJohnson


module.exports.handlerForOnSteamTweet = function(channel) {
  /*
  var Narine = T.stream('user', {screen_name: 'narulka22000 '})
  Narine.on('tweet', function(tweet){

  }) 

  var RepMattDean = T.stream('user', {screen_name: 'repmattdean'})
  RepMattDean.on('tweet', function(tweet){

  })
  */
  var stream = T.stream('statuses/filter', { follow : ['95713333','426938019'], filter_level: "none"});
    stream.on('tweet', function (tweet, err) {
      console.log("got message")
      var tokens = speak.sentiment.analyze(tweet.text).tokens;
      var tokens2 = [];
      for (var i = 0, L=words.length ; i < L; i++) {
        tokens2[i]=words[i].toLowerCase();
      }
      if(tokens.indexOf("make") > -1 && tokens.indexOf("america") > -1 && tokens.indexOf("great") > -1 && tokens.indexOf("again") > -1){
        channel.sendMessage(":(")
      }
      else if(tweet.user.screen_name == "brendenAAAA"){
        if(speak.sentiment.analyze(tweet.text) < 0){
          channel.sendMessage("take it easy Bro, " + tweet.user.name+ "  " + tweet.text)
        }
        else{
          channel.sendMessage("true words of wisdom " + tweet.user.name+ " - " + tweet.text)
        }
      }
      else if(tweet.user.screen_name == "GovGaryJohnson"){
        channel.sendMessage("He has spoken and the message is " + tweet.text)
      }
      
    });

};


/*
console.log(speak.classify("make america great again"))
console.log(speak.classify("Do you know what time it is?"))
console.log(speak.sentiment.negativity("I hate hate your guts"))
console.log(speak.sentiment.analyze("I love you, but you smell something aweful") )
*/
/*
So i can do couple type of comments
I could do a random prebake comment before retweeting it.

I could do a search for specific words.

*/


//-----------------------------------------------------------------------
// Examples
//
//  Get tweets from a specific person
//  Ex.
//    GaryJohnson
/*
var options = { screen_name: 'brendenAAAA',
                count: 3 };
T.get('statuses/user_timeline', options , function(err, data) {
  for (var i = 0; i < data.length ; i++) {
    console.log(data[i].text);
  }
})
//*/


//  Stream random topics
//  Ex. 
//    Mango
/*
var stream = T.stream('statuses/filter', { track: 'mango' })

stream.on('tweet', function (tweet) {
  console.log(tweet)
})
*/



/*
var stream = T.stream('statuses/filter', { track: 'mango' })

stream.on('tweet', function (tweet) {
  console.log(tweet.text)
  console.log(tweet.lang)
  console.log("\n\n")
})
*/
/*
T.get('search/tweets', {q: 'mango',count:5}, function(error, tweets, response) {
  for(var i = 0; i < tweets.statuses.length; i++){
    text = tweets.statuses[i].text
    sentiment = speak.classify(text)
    if(tweets.statuses[i].lang == "en"){
      var b = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
      console.log(b)
      console.log(speak.classify(text))
      console.log(speak.sentiment.analyze(text))
      console.log("\n\n")
    }
    
  }
});
*/