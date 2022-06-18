exports.run = async(bot, message, args) => {
    let member = message.mentions.members.first();
    if(!member) { return message.channel.send('Invalid Member Given');}
    let reason = args.slice(1).join(' ');
    if(!reason) { return message.channel.send('Please provide a reason');}
    member.kick(reason);
    message.channel.send(`Kicked **${member.user.tag}** for **${reason}**`);
}

exports.help = {
    name : 'kick'
}