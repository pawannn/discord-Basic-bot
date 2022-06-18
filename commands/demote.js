exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) { return message.channel.send("You dont have permission to excute this command!") };
    let member = message.mentions.members.first();
    if(member.roles.highest.position > message.member.roles.highest.position) { return message.channel.send('You cannot demote this member.')};
    if(!member) { return message.channel.send("Please mention a valid member!") };
    let requestedRole = args[1];
    let role = message.guild.roles.cache.find(r => r.name === requestedRole);
    if(!role) { return message.channel.send("Please mention a valid role!") };
    if(!member.roles.cache.has(role.id)) { return message.channel.send("This member Does not have the sepcified role") };
    member.roles.remove(role);
    message.channel.send(`${member} Has been demoted!`);
};

exports.help = {
    name : 'demote'
}