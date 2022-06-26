exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) { return message.channel.send("You dont have permission to create private text channel!") }; //This is the code that checks if the user has the permission to use the command.
    let numberofmessages = args[0];
    if(!numberofmessages || isNaN(numberofmessages)){ return message.channel.send("Please enter a valid no. of messages to be deleted")}
    if(numberofmessages > 99) {return message.channel.send("You cannot delete more than 99 messages at a time")}
    let fetch = await message.channel.messages.fetch({limit: numberofmessages+1});
    message.channel.bulkDelete(fetch);
}

exports.help = {
    name : "delmessages"
}