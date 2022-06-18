exports.run = async (bot, message, args) => { //This is the code that is run when the command is called.
    let member = message.mentions.members.first(); //This is the code that mentions the user.
    if(!member) {return message.channel.send("Please mention a valid member!")}; //This is the code that checks if the user has mentioned a valid member.
    let role = await message.guild.roles.create({ //This is the code that creates a role.
        data: { //This is the code that creates a role.
            name: "Private Text Channel", //This is the code that creates a role.
            color: "RED", //This is the code that creates a role.
        }
    }) 

    let channel = await message.guild.channels.create(`${message.author.username}-${member.user.username}`, { //This is the code that creates a channel.
        type : "text", //channel type text
        permissionOverwrites:  [ //permissions
            {
                id: role.id, //specified role
                allow : ["VIEW_CHANNEL", "SEND_MESSAGES"] //permissions :  can view and send messages
            },
            {
                id: message.guild.roles.everyone.id, //@everyone role
                deny: ["VIEW_CHANNEL", "SEND_MESSAGES"] //permissions : cannot view and send messages
            } 
        ] 
    }); 

    member.roles.add(role); //This is the code that adds the role to the user.
    message.member.roles.add(role); //This is the code that adds the role to the message author.
    message.channel.send(`${channel} Channel Has been Created!`); //This is the code that sends a message to the channel.
}

exports.help = {
    name : 'ctc'    //This is the code that shows the name of the command.
}