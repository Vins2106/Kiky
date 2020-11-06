const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {

  try {
    
    if (!message.member.hasPermission("ADMINISTRATOR"))
      {
        return message.channel.send('Sorry, you need **Administrator** permission')
      }
    
    const nick = args.join(" ")
    if (!nick)
      {
        return message.channel.send(`Please give and nick | Example: **<Nick> ${message.author.username}**`)
      }
    
    message.channel.send(`Succesfully set autonick to: **${nick} ${message.author.username}**`)
    db.set(`autonick.${message.guild.id}`, nick)
    
  } catch (e) {
    
  }
  
}

exports.conf = {
    aliases: ['an'],
    cooldown: "5"
}

exports.help = {
    name: 'autonick',
    description: 'Set new user nickname',
    usage: 'autonick <nick>'
}