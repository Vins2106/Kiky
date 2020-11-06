const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
          if (!message.member.voice.channel) return message.channel.send({
            embed: {
                color: color,
                description: "Sorry, you need join a voice channel"
            }
        });
  
  if (serverQueue)
    {
      return message.channel.send(`Sorry, im currently playing a music\n**${serverQueue.songs[0].title}**`)
    }
  
  if (!message.guild.me.voice.channel)
    {
      return message.channel.send('Sorry, i do not join any voice channel')
    }
  
  message.guild.me.voice.channel.leave()
  message.channel.send(`Succesfully disconnect!`)
  
  
}

exports.conf = {
    aliases: ['dc'],
    cooldown: "5"
}

exports.help = {
    name: 'leave',
    description: 'Leave a voice channel',
    usage: 'leave'
}