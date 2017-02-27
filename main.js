console.log("my name is brian i am the bot");

Settings = require("./settings.json")

Responses = require("./Responses.json")

Discord = require('discord.js');

client = new Discord.Client();

client.login(Settings.token);

var channel;
var channelConnection;
var isJazzing = false;

AttachmentFunctions = {
    "grade" : attachment => {
        console.log(attachment.url);

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
            } else{
                message.reply(response);
            }
			if(messageSplit[1].toLowerCase() == "jazz")
			{
				channel.join().then(connection => {
					channelConnection = connection;
					const dispatcher = connection.playFile('jazz.mp3');
					isJazzing = true;
				});
			}
			else if(messageSplit[1].toLowerCase() == "stopthejazz")
			{
				channel.leave();
			}
        }else{
            message.reply(Responses._annoying);
        }
    }else if (client.user.id === message.mentions.users.firstKey()){
        var messageSplit = message.content.match(/("[^"]*")|[^ ]+/g);

        var attachment = Array.from(message.attachments.values())[0];

        console.log(attachment, attachment.width);

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
});
client.on('ready', () => {
  channel = client.channels.get('164382040215650304');
});
function intervalCheck()
{	
	if(isJazzing)
	{
		if(!channelConnection.speaking)
		{
			channel.leave();
		}
	}
}

setInterval(intervalCheck, 1000);