const { MessageEmbed } = require('discord.js');
const db = require("quick.db")

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  const user = message.mentions.users.first() || message.author;
  
  let amount = db.get(`warning.${user.id}`)
  if (amount === undefined) amount = 0;
  
  let latest = db.get(`latestwarn.${user.id}`);
  if (latest === undefined) latest = 'No Latest Warns'
  
  const embed = new MessageEmbed()
  .setAuthor(user.username + "", user.displayAvatarURL())
  .setColor(color)
  .setDescription(`**Latest warn reason:** \`${latest}\``)
  .addField("**Total Warn's**", amount)
 
  
  message.channel.send(embed)
}

exports.conf = {
    aliases: ['wof', 'wo'],
    cooldown: "5"
}

exports.help = {
    name: 'warnof',
    description: 'Check user warn',
    usage: 'warnof <@user>'
}