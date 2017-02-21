console.log("my name is brian i am the bot");

Settings = require("./settings.json")

Responses = require("./Responses.json")

Discord = require('discord.js');

client = new Discord.Client();

client.login(Settings.token);

client.on('message', message => {

    if (message.attachments.size === 0 && client.user.id === message.mentions.users.firstKey()){
        var messageSplit = message.content.match(/("[^"]*")|[^ ]+/g);

        if(messageSplit[0] === '<@' + client.user.id + '>' && messageSplit.length >= 2){
            
            var response = Responses[messageSplit[1].toLowerCase()];

            if(response === undefined){
                message.reply(Responses.annoying);
            } else{
                message.reply(response);
            }
        }else{
            message.reply(Responses.annoying);
        }
    }else if (client.user.id === message.mentions.users.firstKey()){
        message.reply("Not implemented");

        //Do things with attachments here
    }
});