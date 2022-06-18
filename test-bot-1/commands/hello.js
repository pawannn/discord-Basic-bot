exports.run = async(bot, message, args) => {
    // if(cmd == 'hello' || cmd == 'hey'){  //if command is 'hello' or 'hey'
        let member = message.mentions.members.first(); //getting the mentioned member if any in the message
        if(!member) {message.channel.send('Hello! '+message.author.username);} else {message.channel.send('hello '+member.user.tag)}; //if no member is mentioned, send 'hello' else send 'hello '+member.user.tag (user and tage)
}

exports.help = {
    name : 'hello'
}

//!hello [@mention]