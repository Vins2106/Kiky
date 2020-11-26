const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if (!args[0]) {
      let status = db.get(`status`)
  if (!status) status = '**[`Unknown`] Unknown Status**'
  
  const embed = new MessageEmbed()
  .setAuthor(client.user.username + ' Status', client.user.displayAvatarURL())
  .setDescription(status)
  .setColor(color)
  
  message.channel.send(embed)
  }
  
  if (args[0] === "set") {
    if (message.author.id !== "727110220400033865") return message.channel.send(`Sorry, you are not my owner.`)
    
    let stats = args.slice(1).join(" ")
    if (!stats) return message.channel.send(`Please give the new status!`)
    
    message.channel.send(`My status set to **${stats}**`)
    db.set(`status`, stats)
  }
  
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'status',
    description: 'status',
    usage: 'status'
}