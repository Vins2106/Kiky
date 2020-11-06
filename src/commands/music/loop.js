const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
          if (!message.member.voice.channel) return message.channel.send({
            embed: {
                color: color,
                description: "Sorry, you need join a voice channel"
            }
        });
  
    const db = require("quick.db");
  const voice = db.get(`myvoice.${message.guild.id}`)
  if (message.member.voice.channel.id !== voice) 
    {
      return message.channel.send("You need join same voice!")
    }
  
          if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: color,
                    description: `loop **${serverQueue.loop === true ? "enabled" : "disabled"}** for the music`
                }
            });
        };
        return message.channel.send({
            embed: {
                color: color,
                description: "Error: nothing playing"
            }
        });
  
}

exports.conf = {
    aliases: ['l'],
    cooldown: "5"
}

exports.help = {
    name: 'loop',
    description: 'Loop a music',
    usage: 'loop'
}