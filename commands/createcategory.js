exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {return message.channels.send("You cannot execute this command!")}
    let categoryname =  args[0];
    if(!categoryname){ return message.channel.send("Please give a valid category name");}
    let check = message.guild.channels.cache.find(ch => ch.name === categoryname && ch.type === "category");
    if(!check){
        await message.guild.channels.create(categoryname, {type : "category"});
    }else {
        message.channel.send(`${categoryname} category already exist`);
    }
}

exports.help = {
    name : "createcategory"
}

//!createcategory [name of category]
//!createcategory xyz