const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if (args[0] === "set") {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send("Sorry, you need **Manage Messages** permission")
    }
    
    const db = require("quick.db")
    
    const chl = message.mentions.channels.first()
    if (!chl) {
      return message.channel.send("Please mentions channel!")
    }
    
    message.channel.send(`Chat channel has been set to: ${chl}`)
    db.set(`chatting.${message.guild.id}`, chl.id)
  }
  
  
  
}

exports.conf = {
    aliases: ['pesan'],
    cooldown: "5"
}

exports.help = {
    name: 'chat',
    description: 'Chat with me',
    usage: 'chat set <#channel>'
}