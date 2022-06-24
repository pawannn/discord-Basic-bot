const { Permissions, PermissionOverwrites } = require('discord.js');

exports.run = async (bot, message, args) => {
    console.log("setup")
    if(!message.member.hasPermission("MANAGE_GUILD")) { return message.channel.send("You dont have permission to excute this command!") }; //This is the code that checks if the user has the permission to use the command.
    
    //roles setup
    let modRole = message.guild.roles.cache.find(r => r.name === "Moderator");
    if(!modRole){
       modRole =  await message.guild.roles.create({
            data : {
                name : "Moderator",
                color : "BLUE",
                permissions:[
                    Permissions.FLAGS.MANAGE_MESSAGES, 
                    Permissions.FLAGS.SEND_MESSAGES, 
                    Permissions.FLAGS.VIEW_CHANNEL, 
                    Permissions.FLAGS.MANAGE_CHANNELS,
                    Permissions.FLAGS.CREATE_INSTANT_INVITE,
                    Permissions.FLAGS.CHANGE_NICKNAME,
                    Permissions.FLAGS.SEND_TTS_MESSAGES,
                    Permissions.FLAGS.CREATE_PUBLIC_THREADS,
                    Permissions.FLAGS.EMBED_LINKS,
                    Permissions.FLAGS.ADD_REACTIONS,
                    Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
                    Permissions.FLAGS.USE_EXTERNAL_STICKERS,
                    Permissions.FLAGS.MENTION_EVERYONE,
                    Permissions.FLAGS.CONNECT,
                    Permissions.FLAGS.SPEAK,
                    Permissions.FLAGS.VIDEO,
                    Permissions.FLAGS.MANAGE_ROLES
                ] 
            }
        })
        message.channel.send("`Moderator` Role has been created. \n Assign the role to the user who can manage the server");
    }

    let reportrole =  message.guild.roles.cache.find(r => r.name === "Manage Reports");
    if(!reportrole) {
        reportrole = await message.guild.roles.create({ //This is the code that creates a role.
            data: { //This is the code that creates a role.
                name: "Manage Reports", 
                color: "GREEN", 
            }
        });
        message.channel.send("`Manage Reports` Role has been created to manage the reports \n Aissin the role to the person who can manage the reports.");
    }

    let MuteRole = message.guild.roles.cache.find(r => r.name === "Mute");
    if(!MuteRole) {
        MuteRole = await message.guild.roles.create({ //This is the code that creates a role.
            data: { //This is the code that creates a role.
                name: "Mute", 
                color: "RED", 
            }
        });
        message.channel.send("`Mute` Role has been created to manage the reports \n Aissin the role to the person who deserves it.");
    }

    //checking if proper roles are assigned to the owner
    if(!message.member.roles.cache.find(r => r.name === modRole.name)){ 
        message.member.roles.add(modRole);
        message.channel.send(`${modRole.name} role has been assigned to the owner`);
    };
    if(!message.member.roles.cache.find(r => r.name === reportrole.name)){ 
        message.member.roles.add(reportrole)
        message.channel.send(`${reportrole.name} role has been assigned to the owner`)
    };

    //create categories

    //report category
    let reportCategory = message.guild.channels.cache.find(channel => channel.type == "category" && channel.name == "REPORTS");
    if(!reportCategory){
        reportCategory = await message.guild.channels.create("REPORTS", {type : "category"});
        message.channel.send("Created `REPORTS` category");
    }

    //welcome category
    var welcomecategory = message.guild.channels.cache.find(ch =>  ch.type == "category" && ch.name == "WELCOME");
    if(!welcomecategory){
        welcomecategory = await message.guild.channels.create("WELCOME", {type : "category"})
        welcomecategory.setPosition(0);
    }
    else{
        welcomecategory.setPosition(0);
    }

    //create channels
    let reportmessagechannel = message.guild.channels.cache.find(ch => ch.name === "reported-messages");
    if(!reportmessagechannel){
        reportmessagechannel = await message.guild.channels.create("REPORTED MESSAGES", {
            type : "text",
            permissionOverwrites: [
                {
                    id: message.guild.roles.everyone.id, //@everyone role
                    deny: ["SEND_MESSAGES"]
                },
                {
                    id : reportrole.id, //role who can manage the reports
                },
            ]
        });
        await reportmessagechannel.setParent(reportCategory.id);
        message.channel.send(`${reportmessagechannel} has been created`)
    }
    else {
        await reportmessagechannel.setParent(reportCategory.id);
    }

    let reporteduserschannel = message.guild.channels.cache.find(ch => ch.name === "reported-users");
    if(!reporteduserschannel){
        reporteduserschannel = await message.guild.channels.create('REPORTED USERS', {
            type : "text",
            PermissionOverwrites: [
                {
                    id: message.guild.roles.everyone.id, //@everyone role
                    deny: ["SEND_MESSAGES"]
                },
                {
                    id : reportrole.id, //role who can manage the reports
                }
            ]
        })
        await reporteduserschannel.setParent(reportCategory.id);
        message.channel.send(`${reporteduserschannel} has been created`)
    }
    else {
        await reporteduserschannel.setParent(reportCategory.id);
    }

    let welcomeChannel = message.guild.channels.cache.find(ch => ch.name === "welcome-members");
    if(!welcomeChannel){
        welcomeChannel = await message.guild.channels.create("welcome-members", {type : "text"});
        welcomeChannel.setParent(welcomecategory.id);
    }
    else{
        welcomeChannel.setParent(welcomecategory.id);
    }

    let ruleschannel = message.guild.channels.cache.find(ch => ch.name === "rules");
    if(!ruleschannel){
        ruleschannel = await message.guild.channels.create("rules", {type : "text"});
        ruleschannel.setParent(welcomecategory.id);
    }
    else{
        ruleschannel.setParent(welcomecategory.id);
    }

    //setup completed
    message.channel.send("The Setup is Done! \n You can Now enjoy our services")
}

exports.help = {
    name : "setup"
}