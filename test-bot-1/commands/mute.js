const ms = require("ms");

exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) { return message.channel.send("You dont have permission to excute this command!") };
    let member = message.mentions.members.first();
    if(!member) { return message.channel.send("Please mention a valid member!") };
    //to do
    let muteTime = args[1]; //time to mute ['@pawan','10s']
    if(!muteTime) {return message.channel.send("Please specify a time to mute!")};
    let msTime = ms(muteTime);
    let muteRole = message.guild.roles.cache.find(r => r.name === "Mute");
    if(!muteRole) {return message.channel.send("`Mute` role not found!")};
    member.roles.add(muteRole);
    message.channel.send(`${member.user.tag} has been muted for ${muteTime}`);

    setTimeout(() => {
        member.roles.remove(muteRole);
        message.channel.send(`${member.user.tag} has been unmuted!`);
    }, msTime);
}

exports.help = {
    name : 'mute'
}

//mute @pawan 10s