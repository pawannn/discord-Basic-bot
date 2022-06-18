const fetch = require("node-fetch") //Fetch
const Discord = require('discord.js') //Discord.js
const link = 'https://www.reddit.com/r/dankmemes.json?sort=top&t=week'; //link to gather memes from reddit

exports.run = async(bot,message,args) => { //run the command
    console.log('meme command called'); //log the command
    let fetchmemes = await fetch(link).then(res => res.json()); //fetch the json from the link
    const getMemes = fetchmemes.data.children; //get the data from the json
    let randomMemes = getMemes[Math.floor(Math.random() * getMemes.length)]; //get a random meme from the json
    let messageEmbed = new Discord.MessageEmbed() //create a new embed
    .setTitle(randomMemes.data.title) //set the title of the embed
    .setImage(randomMemes.data.url); //set the image of the embed

    message.channel.send(messageEmbed); //send the embed
}

exports.help = {
    name : 'meme'//name of the command
}

// !meme