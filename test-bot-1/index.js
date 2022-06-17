//Bot Token : OTg3MDY3NDU3NDM5MTcwNjMw.GNrgof.cxctzxcg94pFwNx7WvIe_uGcwYytQu2rxK2WdM

const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'OTg3MDY3NDU3NDM5MTcwNjMw.GNrgof.cxctzxcg94pFwNx7WvIe_uGcwYytQu2rxK2WdM';

bot.login(token);

bot.on('ready', () => {
    console.log('This bot is online!');
});

bot.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type !== 'text') return;
    let PREFIX = '!';
    if(!message.content.startsWith(PREFIX)) return;
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0].slice(PREFIX.length);
    if(cmd == 'hello') {
        message.channel.send('Hello');
    }
});