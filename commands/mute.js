const ms = require("ms");  //https://www.npmjs.com/package/ms

exports.run = async(bot, message, args) => { //This is the code that is run when the command is called.
    if(!message.member.hasPermission("MANAGE_MESSAGES")) { return message.channel.send("You dont have permission to excute this command!") }; //This is the code that checks if the user has the permission to use the command.
    let member = message.mentions.members.first(); //This is the code that mentions the user.
    if(!member) { return message.channel.send("Please mention a valid member!") }; //This is the code that checks if the user has mentioned a valid member.
    //to do 
    let muteTime = args[1]; //time to mute ['@pawan','10s'] ['@pawan','10m'] ['@pawan','10h'] ['@pawan','10d']
    if(!muteTime) {return message.channel.send("Please specify a time to mute!")}; //This is the code that checks if the user has specified a time to mute.
    let msTime = ms(muteTime);  //This is the code that converts the time to milliseconds.
    let muteRole = message.guild.roles.cache.find(r => r.name === "Mute"); //This is the code that finds the mute role.
    if(!muteRole) {return message.channel.send("`Mute` role not found!")}; //This is the code that checks if the mute role is found.
    member.roles.add(muteRole); //This is the code that adds the mute role to the user.
    message.channel.send(`${member.user.tag} has been muted for ${muteTime}`); //This is the code that sends a message to the channel.

    setTimeout(() => { //This is the code that runs after the time specified.
        member.roles.remove(muteRole); //This is the code that removes the mute role from the user.
        message.channel.send(`${member.user.tag} has been unmuted!`); //This is the code that sends a message to the channel.
    }, msTime); //This is the code that sets the time to mute.
}

exports.help = { //This is the code that shows the help command.
    name : 'mute' //This is the code that shows the name of the command.
} //This is the code that shows the description of the command.

//mute @pawan 10s