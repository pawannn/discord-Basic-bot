const ms = require("ms");  //This is the code that imports the module millisecond (ms)
exports.run = async(bot, message, args) => { //This is the code that is run when the command is called.
    if(!message.member.hasPermission("MANAGE_MESSAGES")) { return message.channel.send("You dont have permission to excute this command!") }; //This is the code that checks if the user has the permission to use the command.
    let member = message.mentions.members.first(); //This is the code that mentions the user.
    if(member.roles.highest.position >= message.member.roles.highest.position) { return message.channel.send('You cannot Mute this member.')}; //This is the code that checks if the user has the permission to use the command.
    if(!member) { return message.channel.send("Please mention a valid member!") }; //This is the code that checks if the user has mentioned a valid member.
    //to do 
    let muteTime = args[1]; //time to mute ['@pawan','10s'] ['@pawan','10m'] ['@pawan','10h'] ['@pawan','10d']
    if(!muteTime) {return message.channel.send("Please specify a time to mute!")}; //This is the code that checks if the user has specified a time to mute.
    let msTime = ms(muteTime);  //This is the code that converts the time to milliseconds.
    var muteRole = message.guild.roles.cache.find(r => r.name === "Mute"); //This is the code that finds the mute role.
    if(!muteRole) { //This is the code that checks if the mute role exists.
        console.log("creating role");
        muteRole = await member.guild.roles.create({  //This is the code that creates the mute role.
            data : {  
                name: "Mute",  //role name
                color: "RED",  //role color
            }
        });
    }
    member.guild.channels.cache.array().forEach((channel) => { //select all channels 
        channel.overwritePermissions([ //overwrite the permission for each channel
            {
            id: muteRole,  //select the role
            deny: ['SEND_MESSAGES'], //deny sending messages
            },
        ]);
    });

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