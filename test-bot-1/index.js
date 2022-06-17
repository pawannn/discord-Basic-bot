//Bot Token : OTg3MDY3NDU3NDM5MTcwNjMw.GNrgof.cxctzxcg94pFwNx7WvIe_uGcwYytQu2rxK2WdM

const Discord = require('discord.js'); //Discord.js
const bot = new Discord.Client(); //Discord.js
const fs = require('fs'); //File System
const token = 'OTg3MDY3NDU3NDM5MTcwNjMw.GNrgof.cxctzxcg94pFwNx7WvIe_uGcwYytQu2rxK2WdM';   //Bot Token
bot.commands = new Discord.Collection(); //Discord.js

bot.on('ready', () =>{ //Bot is ready
    console.log('This bot is online!'); //Bot is online message

    fs.readdir('./commands', (err, files) => { //Reads the commands folder
        if(err) return console.log(err); //if error in opening file
        //hello.js => hello
        let jsfile = files.filter(f => f.split('.').pop() == 'js'); //filter files to only get js files
    });
});

bot.on('message', (message) => { //Bot is messaged
    let PREFIX = '!';  //Prefix
    let messageArray = message.content.split(" "); //spliting the message into array
    if(message.author.bot) { return; }; //if author of the message is bot
    if(!message.content.startsWith(PREFIX)) { return; }; //if message does not starts with '!'
    if(message.channel.type !== 'text') { return; }; //if message is not in text channel
    let cmd = messageArray[0].slice(PREFIX.length); //getting the command by removing '!' from the first element of the array
    if(cmd == 'hello' || cmd == 'hey'){  //if command is 'hello' or 'hey'
        let member = message.mentions.members.first(); //getting the mentioned member if any in the message
        if(!member) {message.channel.send('Hello!');} else {message.channel.send('hello '+member.user.tag)}; //if no member is mentioned, send 'hello' else send 'hello '+member.user.tag (user and tage)
    }
});

bot.login(token); //login the bot with the token