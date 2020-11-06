const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send('Sorry, you do not have **Administrator** permission')
  }
  
  const user = message.mentions.users.first()
  if (!user) {
    return message.channel.send("Please mention a member!")
  }
  
  if (user.id == message.author.id) {
    return message.channel.send("You can't warn yourself!")
  }
  
  const reason = args.slice(1).join(" ")
  if (!reason) reason = "No Reason"
  
  message.channel.send(`**${user.tag}** has been warned by **${message.author.tag}**, reason: **${reason}**`)
  client.users.cache.get(user.id).send(`You has been warned by **${message.author.tag}** because: **${reason}**`)
  db.add(`warning.${user.id}`, 1)
  db.set(`latestwarn.${user.id}`, reason)
}

exports.conf = {
    aliases: ['wa'],
    cooldown: "5"
}

exports.help = {
    name: 'warnaadd',
    description: 'Warn someone',
    usage: 'warn [@user] <reason>'
}