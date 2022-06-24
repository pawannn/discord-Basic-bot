exports.run = async (bot, message, args) => { //This is the code that is run when the command is called.
    if(!message.member.hasPermission("MANAGE_MESSAGES")) { return message.channel.send("You dont have permission to excute this command!") }; //This is the code that checks if the user has the permission to use the command.
    channelView = args[0];
    if(channelView === "public"){ //if the channel type is public
        console.log("public");
        let channelname = args.slice(1).join("-"); 
        if(!channelname){ channelname = message.member.username;}
        await message.guild.channels.create(`pubtext-${channelname}`, { //This is the code that creates a channel.
            type : "Voice", //channel type voice
        });
    }
    else if(channelView === "private"){ //if the channel type is private
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
        await message.guild.channels.create(`pritext-${channelname}`, { //This is the code that creates a channel.
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
    else{ //if type of the channel is not specified
        return message.channel.send("Please specify if the channel is public or private!") 
    }
}

exports.help = {
    name : 'cvc'    //This is the code that shows the name of the command.
}