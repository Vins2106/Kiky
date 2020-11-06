const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  const user = message.mentions.users.first() || message.author;
  
  message.channel.send(`**${message.author.username}** here __${user.tag}__ avatar url:\n${user.displayAvatarURL({ dynamic: true, size: 4096 })}`)
  
}

exports.conf = {
    aliases: ['av', 'pp'],
    cooldown: "5"
}

exports.help = {
    name: 'avatar',
    description: 'Get user avatar url',
    usage: 'avatar <@user>'
}