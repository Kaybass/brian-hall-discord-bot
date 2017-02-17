console.log("my name is brian i am the bot");

Settings = require("./settings.json")

Responses = require("./Responses.json")

Discord = require('discord.js');

client = new Discord.Client();

client.login(Settings.token);

client.on('message', message => {

    if (client.user.id == message.mentions.users.firstKey()){
        var messageSplit = message.content.match(/("[^"]*")|[^ ]+/g);

        console.log(messageSplit);

        if(messageSplit[0] == '<@' + client.user.id + '>'){
            if(messageSplit[1] == "philosophy"){
                message.reply(Responses.Philosophy);
            }else if(messageSplit[1] == "about"){
                message.reply(Responses.About);
            }else if(messageSplit[1] == "book"){
                message.reply(Responses.Book);
            }else{
                message.reply(Responses.Annoying);
            }
        }
    }
});