const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Sorry, you need **Administrator** permission!`)
  
  
  let newprefix = args[0]
  if (!newprefix) return message.channel.send(`Please give new prefix!`)
  
  if (newprefix.lenght > 4) return message.channel.send(`Bot prefix can't 4+`)
  
  message.channel.send(`Prefix has been set to **${newprefix}**`)
  
  db.set(`prefix.${message.guild.id}`, newprefix)
}

exports.conf = {
    aliases: ['setprefix'],
    cooldown: "5"
}

exports.help = {
    name: 'prefix',
    description: 'Change server prefix',
    usage: 'prefix <new_prefix>'
}