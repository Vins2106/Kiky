const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send('Sorry, you do not have **Administrator** permission')
  }
  
  const user = message.mentions.users.first()
  if (!user) {
    return message.channel.send("Please mention a user!")
  }
  
  if (user.id == message.author.id) {
    return message.channel.send("You can't remove your warn!")
  }
  
  let warn = db.get(`amoint.${user.id}`)
  if (warn === undefined) {
    return message.channel.send("This user do not have warn!")
  }
  
  let  amount = args.slice(1).join(" ")
  if (!amount) {
  return message.channel.send("Please give amount")
  }
  
  if (amount < warn) {
    return message.channel.send(`This user do not have **${amount}** warn!`)
  }
  
  message.channel.send(`**${message.author.tag}** remove **${amount}** from **${user.tag}** warn!`)
  db.subtract(`warning.${user.id}`, amount)
}

exports.conf = {
    aliases: ['wr'],
    cooldown: "5"
}

exports.help = {
    name: 'warnremove',
    description: 'Remove user warn',
    usage: 'warnremove <@user> amount'
}