exports.run = async (bot, message, args) => { //This is the code that is run when the command is called.
    let member = message.mentions.members.first(); //This is the code that mentions the user.
    if(!member) {return message.channel.send("Please mention a valid member!")}; //This is the code that checks if the user has mentioned a valid member.
    let role = await message.guild.roles.create({ //This is the code that creates a role.
        data: { //This is the code that creates a role.
            name: "Private voice Channel", //This is the code that creates a role.
            color: "GREEN", //This is the code that creates a role.
        }
    }) 
    let channelname = args[args.length -1]; // !cvc @user channelname => channelname = channelname
    console.log(channelname);
    await message.guild.channels.create(`${channelname}`, { //This is the code that creates a channel.
        type : "Voice", //channel type text
        permissionOverwrites:  [ //permissions
            {
                id: role.id, //specified role
                allow : ["VIEW_CHANNEL", "SPEAK"] //permissions :  can view and send messages
            },
            {
                id: message.guild.roles.everyone.id, //@everyone role
                deny: ["VIEW_CHANNEL", "SPEAK"] //permissions : cannot view and send messages
            } //end of permissions
        ] 
    }); 


    member.roles.add(role); //This is the code that adds the role to the user.
    message.member.roles.add(role); //This is the code that adds the role to the message author.
}

exports.help = {
    name : 'cvc'    //This is the code that shows the name of the command.
}