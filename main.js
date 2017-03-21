console.log("my name is brian i am the bot");

Settings = require("./settings.json")

Responses = require("./Responses.json")

VoiceResponses = require("./VoiceResponses.json")

Discord = require('discord.js');

twitter = require("./twitter.js")

Steam = require("./steam.js");

client = new Discord.Client();

client.login(Settings.token);

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/ global chat channel
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var channel;
var voiceChannel;
var voiceChannelConnection;
var isJazzing = false;



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/ When client inits. set game and global channel
/ Sends few mesages to tell everboy brain
/ halls in the house.
/ 
/ Also send the channel object to twitter.js .
/ so it can send message when it recieves tweets
//*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
client.on("ready", function(){
    client.user.setGame("Harvest Moon");
    channel = client.channels.find("name", "general");
    channel.sendMessage("Rebooting",{"tts": true  });
    channel.sendCode("C", "return 'DOCTOR B.HALL'");
	voiceChannel = client.channels.get('164382040215650304');

    twitter.handlerForOnSteamTweet(channel);
})
AttachmentFunctions = {
    "grade" : attachment => {

        attachment.message.reply("F");
    }
}

client.on('message', message => {

    if (message.attachments.size === 0 && client.user.id === message.mentions.users.firstKey()){
        var messageSplit = message.content.match(/("[^"]*")|[^ ]+/g);

        if(messageSplit[0] === '<@' + client.user.id + '>' && messageSplit.length >= 2){
            
            var response = Responses[messageSplit[1].toLowerCase()];
			
            if(response === undefined){
                message.reply(Responses._annoying);
            } else if(response!="noresponse"){
                message.reply(response);
            }
			
			var filename = VoiceResponses[messageSplit[1].toLowerCase()];
			if(filename != undefined)
			{
				voiceChannel.join().then(connection => {
					voiceChannelConnection = connection;
					const dispatcher = connection.playFile("sfx/" + filename);
					isJazzing = true;
				});
			}
			else if(messageSplit[1].toLowerCase() == "stoptalking")
			{
				voiceChannel.leave();
			}
        }else{
            message.reply(Responses._annoying);
        }
    }else if (client.user.id === message.mentions.users.firstKey()){
        var messageSplit = message.content.match(/("[^"]*")|[^ ]+/g);

        var attachment = Array.from(message.attachments.values())[0];

        if(messageSplit[0] === '<@' + client.user.id + '>' && attachment.width !== undefined && messageSplit.length >= 2){
            
            var response = AttachmentFunctions[messageSplit[1].toLowerCase()];

            if(response === undefined){
                message.reply(Responses._annoyingimage);
            } else{
                response(attachment);
            }
        }else if (messageSplit.length >= 2){
            message.reply(Responses._annoyingimage);
        }else {
            message.reply(Responses._imagesonly);
        }
    }
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    / if nobody's sent a message in the last minite
    / or so send a message.  If your receiving
    / lots of messages then restart the timer.
    //*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    clearTimeout()
});

function intervalCheck()
{	
	if(isJazzing)
	{
		if(!voiceChannelConnection.speaking)
		{
			voiceChannel.leave();
		}
	}
}

setInterval(intervalCheck, 1000);



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/  fires a events when somebody presence changes.
/  So if they start a new game or log off.
/  https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=presenceUpdate
/  info on presence
/  https://discord.js.org/#/docs/main/stable/class/Presence?scrollTo=game
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

client.on('presenceUpdate', (oldPresence, newPresence) => {

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    / get the old presence
    /~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    //console.log(oldPresence.frozenPresence.status)
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    / get a user and then with a promise get the 
    / presence so you can get the game idea    
    /~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    client.fetchUser(newPresence.id).then((user) =>{
        //console.log(user.presence)
        if(user.presence.game !=  null){
            game = user.presence.game.name.replace(".x86_64","").replace(".x64","")
            console.log(game)
            
            Steam.numberOfUsers(game).then((numberofUsers)=>{
                console.log("got through")
                if(numberofUsers < 100){
                    channel.sendMessage("what a indie darling")
                }
            });
            
            Steam.getTags(user.presence.game.name).then((info)=>{
                for(var i= 0; i < info.length; i++){
                    if(info[i] = "anime"){
                        channel.sendMessage("We can not tolerate this kind of behavior.")
                    }
                }
            });
            
            Steam.appDetails(user.presence.game.name).then((info)=>{
                if(info["metacritic"] < 50){
                    channel.sendMessage("It pains me to see you hurt yourself like this.")
                }
            });
            

        }
        
    })
});
