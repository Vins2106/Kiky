const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Sorry, you need **Manage Messages** permission`)
  
  let cek = db.get(`lvlx.${message.guild.id}`)
  if (cek) return message.channel.send(`Sorry, level messages already disable for this server`)
  
  message.channel.send(`Level message has been disable for this server`)
  db.set(`lvlx.${message.guild.id}`, 'disablelvl')
  
}

exports.conf = {
    aliases: ['lvld'],
    cooldown: "5"
}

exports.help = {
    name: 'lvldisable',
    description: 'Disable level message',
    usage: 'lvldisable'
}