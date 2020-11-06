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
        if (!args[0]) return message.channel.send({
            embed: {
                color: color,
                description: `Default volume: **\`${serverQueue.volume}%/100%\`**`
            }
        });
        if (isNaN(args[0]) || args[0] > 100) return message.channel.send({
            embed: {
                color: color,
                description: "Volume only can be set in a range of **\`1\`** - **\`100\`**"
            }
        });
  
    const db = require("quick.db");
  const voice = db.get(`myvoice.${message.guild.id}`)
  if (message.member.voice.channel.id !== voice) 
    {
      return message.channel.send("You need join same voice!")
    }
  
        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolume(args[0] / 100);
        return message.channel.send({
            embed: {
                color: color,
                description: `Volume set to **${args[0]}%**`
            }
        });

  
}

exports.conf = {
    aliases: ['v'],
    cooldown: "5"
}

exports.help = {
    name: 'volume',
    description: 'Set server volume',
    usage: 'volume [1% - 100%]'
}