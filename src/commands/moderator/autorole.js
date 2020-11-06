const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
   if (args[0] === "disable") {
  
    if (!message.member.hasPermission("ADMINISTRATOR"))
    {
      return message.channel.send("Sorry, you need **Administrator** permission")
    }
      
      let role = db.get(`autorole.${message.guild.id}`)
      if (role === null || role === undefined)
        {
          return message.channel.send("Autorole not set!")
        }
      
      return message.channel.send(`Autorole has been disable`)
      db.delete(`autorole.${message.guild.id}`)
    
  } else {

      if (!message.member.hasPermission("ADMINISTRATOR"))
    {
      return message.channel.send("Sorry, you need **Administrator** permission")
    }
  
  const role = message.mentions.roles.first()
  if (!role)
    {
      return message.channel.send("Please mention the role!")
    }
  
  message.channel.send(`Autorole set to **${role.name}**! \`.autorole disable\``)
  db.set(`autorole.${message.guild.id}`, role.id)
  }

}

exports.conf = {
    aliases: ['ar'],
    cooldown: "5"
}

exports.help = {
    name: 'autorole',
    description: 'Make the server have autorole',
    usage: 'autorole [@role]'
}