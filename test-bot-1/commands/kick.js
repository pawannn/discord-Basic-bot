exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You don't have permission to use this command.");
    let member = message.mentions.members.first();
    if(!member) { return message.channel.send('Invalid Member Given');}
    if(member.role.highest.position > message.member.role.highest.position) { return message.channel.send('You cannot ban this member.')};
    let reason = args.slice(1).join(' ');
    if(!reason) { return message.channel.send('Please provide a reason \b `!kick [@member] [reason]`');}
    member.kick(reason);
    message.channel.send(`Kicked **${member.user.tag}** for **${reason}**`);
}

exports.help = {
    name : 'kick'
}

// !kick @pawan spamming too much