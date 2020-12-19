const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Sorry, you need **Manage Messages** permission`)
  
  let cek = db.get(`lvlx.${message.guild.id}`)
  if (!cek) return message.channel.send(`Sorry, level message do not disable for this server!`)
  
  message.channel.send(`Level message has been enable.`)
  db.delete(`lvlx.${message.guild.id}`)
  
}

exports.conf = {
    aliases: ['lvle'],
    cooldown: "5"
}

exports.help = {
    name: 'lvlenable',
    description: 'Enable level message',
    usage: 'lvlenable'
}