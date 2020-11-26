const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, you need **Manage Messages** permission")
  
  let bw = db.get(`cmd_${message.guild.id}`)
  if (!bw) return message.channel.send(`this server do not have badword.`)
  
  message.channel.send(`Deleting badword list...`).then(x => {
    
    db.delete(`cmd_${message.guild.id}`)
    
  })
}

exports.conf = {
    aliases: ['rbw'],
    cooldown: "5"
}

exports.help = {
    name: 'resetbadword',
    description: 'Delete a word on badword list',
    usage: 'resetbadword'
}