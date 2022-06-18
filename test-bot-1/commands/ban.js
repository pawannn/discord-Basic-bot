exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You don't have permission to use this command.");
    let member = message.mentions.members.first();
    if(!member) { return message.channel.send('Invalid Member Given');}
    if(member.role.highest.position > message.member.role.highest.position) { return message.channel.send('You cannot ban this member.')};
    let days = args[1];
    if(!Number.isInteger(days) || days < 1) { return message.channel.send('Please provide a valid number of days. \n `!ban [@mention] [days] [reason]`');}
    let reason = args.slice(2).join(' ');
    if(!reason) { return message.channel.send('Please provide a reason \n `!ban [@mention] [days] [reason]`');}
    member.ban({days : days, reason : reason});
    message.channel.send(`Kicked **${member.user.tag}** for **${reason}**`);
}

exports.help = {
    name : 'ban'
}

// !ban @pawan 7 spamming too much