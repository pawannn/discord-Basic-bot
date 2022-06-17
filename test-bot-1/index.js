//Bot Token : OTg3MDY3NDU3NDM5MTcwNjMw.GNrgof.cxctzxcg94pFwNx7WvIe_uGcwYytQu2rxK2WdM

const Discord = require('discord.js'); //Discord.js
const bot = new Discord.Client(); //Discord.js
const fs = require('fs'); //File System
const token = 'OTg3MDY3NDU3NDM5MTcwNjMw.GNrgof.cxctzxcg94pFwNx7WvIe_uGcwYytQu2rxK2WdM';   //Bot Token
bot.commands = new Discord.Collection(); //Discord.js

bot.on('ready', () =>{ //Bot is ready
    console.log('This bot is online!'); //Bot is online message

    fs.readdir('./commands/', (err, files) => { //Reads the commands folder
        if(err) return console.log(err); //if error in opening file
        //hello.js => hello
        let jsfile = files.filter(f => f.split('.').pop() == 'js'); //filter files to only get js files
        if(jsfile.length == 0) return console.log('Couldn\'t find commands.'); //if no js files found

        jsfile.forEach(f => { //for each js file
            let props = require('./commands/'+f); //require the file
            bot.commands.set(props.help.name, props); //set the command name to the props.help.name
        });
    });
});

bot.on('message', (message) => { //Bot is messaged
    let PREFIX = '!';  //Prefix
    let messageArray = message.content.split(" "); //spliting the message into array
    if(message.author.bot) { return; }; //if author of the message is bot
    if(!message.content.startsWith(PREFIX)) { return; }; //if message does not starts with '!'
    if(message.channel.type !== 'text') { return; }; //if message is not in text channel
    let cmd = messageArray[0].slice(PREFIX.length); //getting the command by removing '!' from the first element of the array
    let commandFile = bot.commands.get(cmd); //getting the command file
    let args = messageArray.slice(1); //getting the arguments by removing the command from the array
    if(commandFile) {commandFile.run(bot,message,args);}; //if command file is found, run the command
});

bot.login(token); //login the bot with the token