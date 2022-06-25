exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) { return message.channel.send("You dont have permission to excute this command!") }; //This is the code that checks if the user has the permission to use the command.
    let member = message.mentions.members.first();
    let MuteRole = message.guild.roles.cache.find(r => r.name === "Mute");
    if(!MuteRole){ return message.channel.send("`Mute` Role not found"); }
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
