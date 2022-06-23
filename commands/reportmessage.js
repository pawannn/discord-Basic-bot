const Discord = require('discord.js'); //Discord.js

exports.run = async (bot, message, args) => {
    const messageAuthor = message.author.username;
    const repliedto = await message.channel.messages.fetch(message.reference.messageID);
    if(!repliedto) {return message.channel.send("Please reply to the reported message and use the command")}
    const reportrole = message.guild.roles.cache.find(role => role.name === "Manage Reports");
    if(!reportrole){
        reportrole = await message.guild.roles.create({ //This is the code that creates a role.
            data: { //This is the code that creates a role.
                name: "Manage Reports", //This is the code that creates a role.
                color: "GREEN", //This is the code that creates a role.
            }
        });
        message.channel.send("`Manage Reports` Role has been created to manage the reports \n Aissin the role to the person who can manage the reports.");
    }
    let reportchannel = message.guild.channels.cache.find(ch => ch.name === "reported-messages");
    if(!reportchannel) {
        reportchannel = await message.guild.channels.create('reported-messages', { //This is the code that creates a channel.
            type : "text", //channel type text
            permissionOverwrites: [
                {
                    id: message.guild.roles.everyone.id, //@everyone role
                    deny: ["SEND_MESSAGES"]
                },
                {
                    id : reportrole.id, //role who can manage the reports
                },
            ]
        }); 
    }
    let embed = new Discord.MessageEmbed()
    .setTitle(`${messageAuthor} reported a message`)
    .setDescription(`**Message content** : ${repliedto['content']} \n **message url** : ${repliedto.url} \n **Reported user** : ${repliedto.author.username}`);
    reportchannel.send(embed);
    message.channel.send(`The mods have got your report. They will be in touch with you in a short time.\n You can check your report status in ${reportchannel} channel`);
    console.log(repliedto.url);
}

exports.help = {
    name : "reportmessage"
}