const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
          if (!serverQueue) return message.channel.send({
            embed: {
                color: color,
                description: "Nothing playing for this server"
            }
        });
  
  

  
  const embed = new MessageEmbed()
  .setAuthor(client.user.username + ' Music Manager', client.user.displayAvatarURL())
  .setColor(color)
  .addField("Now playing:", `\`${serverQueue.songs[0].title} (${serverQueue.songs[0].time.hours}h : ${serverQueue.songs[0].time.minutes}m : ${serverQueue.songs[0].time.seconds}s)\``)
  .setImage(serverQueue.songs[0].image.medium.url)
  .setFooter(`${serverQueue.songs[0].url}`)
        return message.channel.send(embed)
  
}

exports.conf = {
    aliases: ['np'],
    cooldown: "5"
}

exports.help = {
    name: 'nowplaying',
    description: 'Show the now playing music',
    usage: 'nowplaying'
}