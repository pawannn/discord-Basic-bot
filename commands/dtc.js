exports.run = async (bot,message, args) => {
    var channelname = args[0];
    if(!channelname) {return message.channel.send("Please specify a channel name!")}
    const fetchchannel = message.guild.channels.cache.find(channel => channel.name === channelname);
    if(!fetchchannel) {return message.channel.send("No such channel exist! or check your channel spelling")}
    fetchchannel.delete();
}

exports.help = {
    name : 'dtc'    //This is the code that shows the name of the command.
}

// !dtc [name of channel]