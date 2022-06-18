exports.run = async(bot, message, args) => { //Command run
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command."); //if user does not have permission to use this command
    let member = message.mentions.members.first(); //getting the member to be kicked
    if(!member) { return message.channel.send('Invalid Member Given \n cmd : `!kick [@member] [reason]`');} //if member is not mentioned
    if(member.roles.highest.position > message.member.roles.highest.position) { return message.channel.send('You cannot ban this member.')}; //if member has permission to manage messages
    let reason = args.slice(1).join(' '); //getting the reason
    if(!reason) { return message.channel.send('Please provide a reason \n `!kick [@member] [reason]`');} //if reason is not provided
    member.kick(reason); //kick the member
    message.channel.send(`Kicked **${member.user.tag}** for **${reason}**`); // send message
}

exports.help = {
    name : 'kick' //name of the command
}

// !kick @pawan spamming too much