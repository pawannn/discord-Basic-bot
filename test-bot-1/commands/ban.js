exports.run = async(bot, message, args) => { //Command run
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You don't have permission to use this command."); //if user does not have permission to use this command
    let member = message.mentions.members.first(); //getting the member to be banned
    if(!member) { return message.channel.send('Invalid Member Given');} //if member is not mentioned
    if(member.role.highest.position > message.member.role.highest.position) { return message.channel.send('You cannot ban this member.')}; //if member has permission to manage messages
    let days = args[1]; //getting the no. of days to be banned
    if(!Number.isInteger(days) || days < 1) { return message.channel.send('Please provide a valid number of days. \n `!ban [@mention] [days] [reason]`');} //if days is not provided
    let reason = args.slice(2).join(' '); //getting the reason
    if(!reason) { return message.channel.send('Please provide a reason \n `!ban [@mention] [days] [reason]`');} //if reason is not provided
    member.ban({days : days, reason : reason}); //ban the member
    message.channel.send(`Kicked **${member.user.tag}** for **${reason}**`); // send message
}

exports.help = {
    name : 'ban' //name of the command
}

// !ban @pawan 7 spamming too much