exports.run = async (bot, message, args) => {
    let member = message.mentions.members.first();
    if(!member) {return message.channel.send("Please mention a valid member!")};
    let role = await message.guild.roles.create({
        data: {
            name: "Private Text Channel",
            color: "RED",
        }
    })

    let channel = await message.guild.channels.create(`${message.author.username}-${member.user.username}`, {
        type : "text",
        permissionOverwrites:  [
            {
                id: role.id,
                allow : ["VIEW_CHANNEL", "SEND_MESSAGES"]
            },
            {
                id: message.guild.roles.everyone.id,
                deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
            }
        ]
    });

    member.roles.add(role);
    message.member.roles.add(role);
    message.channel.send(`${channel} Channel Has been Created!`);
}

exports.help = {
    name : 'ctc'
}