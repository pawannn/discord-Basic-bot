exports.run = async (bot, message, args) => { //Command run
    if(!message.member.hasPermission("ADMINISTRATOR")) { return message.channel.send("You dont have permission to excute this command!") }; //if user does not have permission to use this command
    let member = message.mentions.members.first(); //getting the member to be demoted
    if(member.roles.highest.position > message.member.roles.highest.position) { return message.channel.send('You cannot demote this member.')}; //if member has permission to manage messages
    if(!member) { return message.channel.send("Please mention a valid member!") }; //if member is not mentioned
    let requestedRole = args[1]; //getting the role to be demoted
    let role = message.guild.roles.cache.find(r => r.name === requestedRole); //finding the role to be demoted
    if(!role) { return message.channel.send("Please mention a valid role!") }; //if role is not mentioned
    if(!member.roles.cache.has(role.id)) { return message.channel.send("This member Does not have the sepcified role") }; //if member does not have the role
    member.roles.remove(role); //removing the role from the member
    message.channel.send(`${member} Has been demoted from ${requestedRole}`); //sending a message to the channel
};

exports.help = {
    name : 'demote' //name of the command
}