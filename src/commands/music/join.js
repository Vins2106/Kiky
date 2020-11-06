const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
    if (!message.guild.me.voice.channel)
    {
      
          if (!message.member.voice.channel) return message.channel.send({
            embed: {
                color: color,
                description: "Sorry, you need join a voice channel"
            }
        });
      
      message.member.voice.channel.join()
      return message.channel.send(`Succesfully join!`)
      
    } 
  
  if (message.guild.me.voice.channel) 
    {
      return message.channel.send(`Sorry, i already join a voice channel (**${message.guild.me.voice.channel.name}**)`)
    }
  
  
  
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'join',
    description: 'Join a voice channel',
    usage: 'join'
}