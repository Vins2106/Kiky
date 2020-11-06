const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if (!message.member.hasPermission("MANAGE_CHANNELS"))
    {
      return message.channel.send("Sorry, you need **Manage Channels** permission")
    }
  
  if (!args[0])
    {
      return message.channel.send(`Choose one:
**textchannel**
**voicechannel**
`)
    }
  
  if (args[0] === 'textchannel')
    {
      
      const name = args.slice(1).join(" ")
      if (!name) {
        return message.channel.send("Please provide the text channel name!")
      }
      
      message.guild.channels.create(name).then(c => {
        message.channel.send(`Succesfully create! <#${c.id}>`)
      })
      
    }
  
  if (args[0] === "voicechannel") 
    {
      
      const name = args.slice(1).join(" ")
      if (!name) {
        return message.channel.send("Please provide the voice channel name!")
      }
      
      message.guild.channels.create(name, {type: "voice"}).then(c => {
        
        message.channel.send(`Succesfully create!`)
        
      })
      
    }
  
}

exports.conf = {
    aliases: ['c'],
    cooldown: "5"
}

exports.help = {
    name: 'create',
    description: 'Create a channel',
    usage: 'create textchannel/voicechannel'
}