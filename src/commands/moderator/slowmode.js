const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if (!message.member.hasPermission("MANAGE_SERVERS"))
    {
      return message.channel.send("Sorry, you need **Manage Servers** permission")
    }
  
  const chl = message.mentions.channels.first() || message.channel;
  
  
  let amount = args[0]
  if (!amount)
    {
      return message.channel.send("Please give time number for set slowmode time")
    }
  
  if (isNaN(amount))
    {
      return message.channel.send("The time must be a number")
    }

  
  chl.setRateLimitPerUser(amount).catch(e => {message.channel.send(`The value should be less then **21600**`)})
  message.channel.send(`i set slowmode for ${chl}, slowmode time: **${args[0]}** `)
  
}

exports.conf = {
    aliases: ['sm'],
    cooldown: "5"
}

exports.help = {
    name: 'slowmode',
    description: 'Set channel slowmode',
    usage: 'slowmode [0 - more]'
}