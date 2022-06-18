exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You don't have permission to use this command.");
    let member = message.mentions.members.first();
    if(!member) { return message.channel.send('Please mention a member\n `!mute [@member] [reason]`');}
    if(member.hasPermission('MANAGE_MESSAGES')) { return message.channel.send('You cannot mute this member.');}
    let reason = args.slice(1).join(' ');
    if(!reason) { return message.channel.send('Please provide a reason \n `!mute [@member] [reason]`');}
    member.setMute(true, reason);
    message.channel.send(`Muted **${member.user.tag}** for **${reason}**`);
}

exports.help = {
    name: 'mute'
}