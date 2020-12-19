const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {

      if (!message.member.hasPermission("ADMINISTRATOR"))
      {
        return message.channel.send('Sorry, you need **Administrator** permission')
      }

  if (args[0] === "disable") {
    let check = db.get(`nickcek.${message.guild.id}`)
    if (!check) return message.channel.send(`Sorry, you do not enable the auto nick`)
    
    message.channel.send(`Autonick has been disable for this server.`)
    db.delete(`autonick.${message.guild.id}`)
    db.delete(`nickcek.${message.guild.id}`)    
    
  } else {
      try {
    
    
    const nick = args.join(" ")
    if (!nick)
      {
        return message.channel.send(`Please give and nick | Example: **<Nick> ${message.author.username}**`)
      }
    
    message.channel.send(`Succesfully set autonick to: **${nick} ${message.author.username}**`)
    db.set(`autonick.${message.guild.id}`, nick)
    db.set(`nickcek.${message.guild.id}`, `enable`)
        
  } catch (e) {
    
  }

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