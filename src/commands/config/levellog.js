const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Sorry, you need **Manage Messages** permission`)
  
  if (args[0] === "disable") {
    let cek = db.get(`lvlcek.${message.guild.id}`)
    if (!cek) return message.channel.send(`Level Log do not enable on this server.`)
    
    message.channel.send(`Leveling Log has been **disable**`)
    db.delete(`lvllog.${message.guild.id}`);
    db.delete(`lvlcek.${message.guild.id}`);
    
  } else {
      const channel = message.mentions.channels.first()
  if (!channel) return message.channel.send(`Sorry, you need mention the log channel.`)
  
  message.channel.send(`Leveling log channel has been set to **${channel}**, use \`${prefix}levellog disable\` to disable`)
    db.set(`lvllog.${message.guild.id}`, channel.id)
    db.set(`lvlcek.${message.guild.id}`, 'enable')
  }
  
}

exports.conf = {
    aliases: ['lvllog'],
    cooldown: "5"
}

exports.help = {
    name: 'levellog',
    description: 'Set level up log',
    usage: 'levellog'
}