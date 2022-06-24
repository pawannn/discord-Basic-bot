exports.run = async (bot, message, args) => { //This is the code that is run when the command is called.
    let channelView = args[0];
    if(channelView === "public"){ //if the channel type is public
        console.log("public");
        let channelname = args.slice(1).join("-");
        if(!channelname || channelname.length == 0){ channelname = message.author.username;}
        let pubvoiceCategory = message.guild.channels.cache.find(channel => channel.type == "category" && channel.name == "public-voice-channels");
        if(!pubvoiceCategory) {
            pubvoiceCategory = await message.guild.channels.create("public-voice-channels", {type : "category"});
        }
        console.log(channelname)
        let pubvoicechannel = await message.guild.channels.create(`pubvoice-${channelname}`, { //This is the code that creates a channel.
            type : "Voice", //channel type voice
        });
        await pubvoicechannel.setParent(pubvoiceCategory.id);
        message.channel.send(`${pubvoicechannel} has been created.`)
    }
    else if(channelView === "private"){ //if the channel type is private
        if(!message.member.hasPermission("MANAGE_MESSAGES")) { return message.channel.send("You dont have permission to create private channels!") }; //This is the code that checks if the user has the permission to use the command.
        let member = message.mentions.members.first(); //This is the code that mentions the user.
        if(!member) {return message.channel.send("Please mention a valid member!")}; //This is the code that checks if the user has mentioned a valid member.
        let role = await message.guild.roles.create({ //This is the code that creates a role.
            data: { //This is the code that creates a role.
                name: "Private voice Channel", //This is the code that creates a role.
                color: "PINK", //This is the code that creates a role.
            }
        }) 
        let channelname = args.slice(2).join("-");
        if(!channelname || channelname.length == 0){ channelname = message.author.username;}
        let privoiceCategory = message.guild.channels.cache.find(channel => channel.type == "category" && channel.name == "private-voice-channels");
        if(!privoiceCategory) {
            privoiceCategory = await message.guild.channels.create("private-voice-channels", {type : "category"});
        }
         // !cvc @user channelname => channelname = channelname
        console.log(channelname);
        let privatechannel = await message.guild.channels.create(`privoice-${channelname}`, { //This is the code that creates a channel.
            type : "Voice", //channel type text
            permissionOverwrites:  [ //permissions
                {
                    id: role.id, //specified role
                    allow : ["VIEW_CHANNEL", "SPEAK", "SEND_MESSAGES"] //permissions :  can view and send messages
                },
                {
                    id: message.guild.roles.everyone.id, //@everyone role
                    deny: ["VIEW_CHANNEL", "SPEAK", "SEND_MESSAGES"] //permissions : cannot view and send messages
                } //end of permissions
            ] 
        }); 
        await privatechannel.setParent(privoiceCategory);
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