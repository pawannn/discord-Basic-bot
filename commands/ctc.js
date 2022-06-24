exports.run = async (bot, message, args) => { //This is the code that is run when the command is called.
    if(!message.member.hasPermission("MANAGE_MESSAGES")) { return message.channel.send("You dont have permission to excute this command!") }; //This is the code that checks if the user has the permission to use the command.
    var channelname = args[args.length -1]; // !cvc @user channelname => channelname = channelname
    channelView = args[0]
    if(channelView === "public"){ //if the channel type is public
        console.log("public");
        var channel = await message.guild.channels.create(`${channelname}`, { //This is the code that creates a channel.
            type : "text", //channel type text
        }); 
    }
    else if(channelView === "private"){ //if the channel type is private
        console.log("private"); 
        var member = message.mentions.members.first(); //This is the code that mentions the user.
        if(!member) {return message.channel.send("Please mention a valid member!")}; //This is the code that checks if the user has mentioned a valid member.
        var role = await message.guild.roles.create({ //This is the code that creates a role.
            data: { //This is the code that creates a role.
                name: "Private Text Channel", //This is the code that creates a role.
                color: "RED", //This is the code that creates a role.
            }
        }) 
        var channel = await message.guild.channels.create(`privoice-${channelname}`, { //This is the code that creates a channel.
            type : "text", //channel type text
            permissionOverwrites:  [ //permissions
                {
                    id: role.id, //specified role
                    allow : ["VIEW_CHANNEL", "SEND_MESSAGES"] //permissions :  can view and send messages
                },
                {
                    id: message.guild.roles.everyone.id, //@everyone role
                    deny: ["VIEW_CHANNEL", "SEND_MESSAGES"] //permissions : cannot view and send messages
                } //end of permissions
            ] 
        }); 
        member.roles.add(role); //This is the code that adds the role to the user.
        message.member.roles.add(role); //This is the code that adds the role to the message author.
    }
    else{ //if type of the channel is not specified
        return message.channel.send("Please specify if the channel is public or private!") 
    }
    message.channel.send(`${channel} Channel Has been Created! by ${message.author.username}`); //This is the code that sends a message to the channel.
}

exports.help = {
    name : 'ctc'    //This is the code that shows the name of the command.
}

// !ctc [@mentions] [name of channel]