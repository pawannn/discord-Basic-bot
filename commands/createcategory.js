exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {return message.channels.send("You cannot execute this command!")}
    let reportCategory = await message.guild.channels.create("hello", {type : "category"});
    console.log(reportCategory);
    categoryName = "HELLO";
    let xyz = await message.guild.channels.create(`yo`, { //This is the code that creates a channel.
        type : "text", //channel type text
    }); 
    await xyz.setParent(reportCategory.id);
}

exports.help = {
    name : "createcategory"
}

//!createcategory [name of category]
//!createcategory xyz