exports.run = async(bot, message, args) => { //run the command
    let member = message.mentions.members.first(); //getting the mentioned member if any in the message
    if(!member) {message.channel.send('Hello!');} else {message.channel.send('Have a nice day '+member.user.tag)}; //if no member is mentioned, send 'hello' else send 'hello '+member.user.tag (user and tage)
}

exports.help = {    //help command
    name : 'bye' //name of the command
}

//!bye [@mention]