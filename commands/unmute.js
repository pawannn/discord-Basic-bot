exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("OWNER")) { return message.channel.send("You dont have permission to excute this command!") }; //This is the code that checks if the user has the permission to use the command.
    let member = message.mentions.members.first();
    let MuteRole = message.guild.roles.cache.find(r => r.name === "Mute");
    if(!member){ return message.channel.send("Please meantion a valid member"); }
    if(member.roles.cache.has(MuteRole.id)){
        member.roles.remove(MuteRole.id);
        return message.channel.send(`${member} has been unmuted!`);
    }
    else {
        return message.channel.send("Member is not muted");
    }
}

exports.help = {
    name : "unmute"
}