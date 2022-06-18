const Discord = require('discord.js') //Discord.js

exports.run = (bot, message,args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        var embed = new Discord.MessageEmbed()
        .setTitle('You can Excute the following Commands : ')
        .setDescription('`!help` - Shows the list of commands\n `!hello [@mentions (optional)] ` - Say Hello to bot \n `!meme` - To enjoy a random meme \n `!bye [@mentions (optional)] ` - Say Bye to bot \n');
    }
    else{
        var embed = new Discord.MessageEmbed()
        .setTitle('You can Excute the following Commands : ')
        .setDescription('`!help` - Shows the list of commands\n `!hello [@mentions (optional)] ` - Say Hello to bot \n `!meme` - To enjoy a random meme \n `!bye [@mentions (optional)]` - Say Bye to bot \n `!kick [@mention] [reason]` - Kick any voilated member from the server \n `!ban [@mention] [days (number)] [reason]` - to ban someone from server');
    }

    message.channel.send(embed);
}

exports.help = {
    name: 'help'
}