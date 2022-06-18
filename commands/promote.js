exports.run = async (bot, message, args) => { //Command run
    if(!message.member.hasPermission("ADMINISTRATOR")) { return message.channel.send("You dont have permission to excute this command!") }; //if user does not have permission to use this command
    let member = message.mentions.members.first(); //getting the member to be promoted
    if(!member) { return message.channel.send("Please mention a valid member!") }; //if member is not mentioned
    let requestedRole = args[1]; //getting the role to be promoted
    console.log(requestedRole); //logging the role to be promoted 
    let role = message.guild.roles.cache.find(r => r.name === requestedRole); //finding the role to be promoted
    if(!role) { return message.channel.send("Please mention a valid role!") }; //if role is not mentioned
    if(member.roles.cache.has(role.id)) { return message.channel.send("This member already has this role!") }; //if member already has the role
    member.roles.add(role); //adding the role to the member
    message.member.roles.add(role); //adding the role to the user
    message.channel.send(`${member} Has been assigned to the role ${requestedRole}`); //sending a message to the channel
}

exports.help = {
    name : 'promote' //name of the command
}