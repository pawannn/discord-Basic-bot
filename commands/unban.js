exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {return message.channel.send("You cannot Perform this command!")}
    let member = args[0];
    if(!member) {return message.channel.send("Please mention a valid member.")}
    let reason = args.slice(1).join(" ");
    if(!reason){ reason  = "No reason provided"}
    const banList = await message.guild.fetchBans();
    const bannedUser = banList.find(user => user.id === member);
    if(!bannedUser) {return message.channel.send("The user is not banned")}
    user.unban({reason : reason});

}

exports.help = {
    name : "unban"
}
