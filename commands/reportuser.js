const Discord = require('discord.js'); //Discord.js

exports.run = async(bot,message,args) => {
    let member = message.mentions.members.first();
    if(!member) {return message.channel.send("Please mentions a valid member")}
    let reason = args.slice(1).join(' ');
    if(!reason){return member.channel.send("Please enter a valid reason")}
    let reportrole = message.guild.roles.cache.find(r => r.name === "Manage Reports")
    if(!reportrole){
        reportrole = await message.guild.roles.create({ //This is the code that creates a role.
            data: { //This is the code that creates a role.
                name: "Manage Reports", //This is the code that creates a role.
                color: "GREEN", //This is the code that creates a role.
            }
        });
    }
    let reportchannel = message.guild.channels.cache.find(ch => ch.name === "reported-users")
    if(!reportchannel){
        reportchannel = await message.guild.channels.create('reported-users', {
            type : "text",
            PermissionOverwrites: [
                {
                    id: message.guild.roles.everyone.id, //@everyone role
                    deny: ["SEND_MESSAGES"]
                },
                {
                    id : reportrole.id, //role who can manage the reports
                }
            ]
        })
    }
    let messageAuthor = message.author.username;
    let embed = new Discord.MessageEmbed()
    .setTitle(`${messageAuthor} reported a User`)
    .setDescription(`**Reported User : ** ${member} \n **Reason : **${reason}`);
    reportchannel.send(embed)
    message.channel.send(`The mods have got your report. They will be in touch with you in a short time.\n You can check your report status in ${reportchannel} channel`)
}

exports.help = {
    name : "reportuser"
}