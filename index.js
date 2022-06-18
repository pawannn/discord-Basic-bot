//Bot Token : OTg3MDY3NDU3NDM5MTcwNjMw.GNrgof.cxctzxcg94pFwNx7WvIe_uGcwYytQu2rxK2WdM

const { channel } = require('diagnostics_channel');
const Discord = require('discord.js'); //Discord.js
const bot = new Discord.Client({ws : {intents : Discord.Intents.ALL}}); //Discord.js
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
    let args = messageArray.slice(1); //getting the arguments by removing the command from the array ([!hello, @pawan] => ['@pawan'])
    if(commandFile) {commandFile.run(bot,message,args);}; //if command file is found, run the command
});

bot.on('guildMemberAdd', (member) => { //When a member joins the server
    let channel = member.guild.channels.cache.find(ch => ch.name === 'welcome'); //find the channel named 'welcome'
    if(!channel) return; //if channel is not found
    channel.send(`Welcome to the server, ${member}`); //send the message
})

bot.on('guildMemberUpdate', (oldMember, newMember) => { //Bot is updated a guild member
    if(oldMember.nickname !== newMember.nickname){ //if nickname is updated
        newMember.send('Your nickname has been changed to ' + newMember.nickname); //send message
    }

    let oldAvatar = oldMember.user.avatarURL();   //Old avatar url
    let newAvtar = newMember.user.avatarURL();    //New avatar url
    if(oldAvatar !== newAvtar){ //If old avatar url is not equal to new avatar url
        newMember.send('Your avatar has been changed'); //Send message
    }
});

bot.on('guildMemberAdd', member => { //Bot is added a guild member
    let embed = new Discord.MessageEmbed() //Embed message
    .setTitle('Welcome to the server!') //Title of message
    .setDescription(`Thanks for joining our Server! We hope you have a great time here! \nMake Sure You stay active and have fun! with other members\n **current member count** : ${member.guild.memberCount}\n`) //Description
    .setAuthor(member.guild.owner.user.tag, member.guild.owner.user.avatarURL()) //Author of message
    .setFooter(`${member.guild.name}`, member.guild.iconURL()); //Footer of message
    member.send(embed); //Send embed message to the new member in DM
});

bot.on("channelCreate", channel => {
    let embed = new Discord.MessageEmbed() //Embed message
    .setTitle('Channel Created') //Title of message
    .setDescription(`Channel ${channel.name} has been created! \n On : ${channel.createdAt}`) //Description
    .setAuthor(channel.guild.client.user.tag, channel.guild.client.user.avatarURL()) //Author of message
    .setFooter(`${channel.guild.name}`, channel.guild.iconURL()); //Footer of message
    channel.send(embed); //Send embed message to the new member in DM
});


bot.login(token); //login the bot with the token