const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
          if (!message.member.voice.channel) return message.channel.send({
            embed: {
                color: color,
                description: "Sorry, you need join a voice channel"
            }
        });
        if (!serverQueue) return message.channel.send({
            embed: {
                color: color,
                description: "Nothing playing for this server"
            }
        });
  
  const db = require("quick.db");
  const voice = db.get(`myvoice.${message.guild.id}`)
  if (message.member.voice.channel.id !== voice) 
    {
      return message.channel.send("You need join same voice!")
    }
  
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end("[runCmd] Stop command has been used");
        return message.channel.send({
            embed: {
                color: color,
                description: "Why you do this? U_U, ok i delete the server queue"
            }
        });
  
}

exports.conf = {
    aliases: ['berhenti'],
    cooldown: "5"
}

exports.help = {
    name: 'stop',
    description: 'Stop a music',
    usage: 'stop'
}