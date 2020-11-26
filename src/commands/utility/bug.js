const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  let bug = args.join(" ")
  if (!bug) return message.channel.send(`Please give the bug!`)
  
  const m = await message.channel.send(`Sending...`)
  
  setTimeout(() => {
    m.edit(`Complete, thx for report **${bug}**`)
    
  }, 1000)
  
  const iid = `${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`
  
  let owner = await client.users.fetch(client.config.owner);
  
  const embed = new MessageEmbed()
  .setAuthor(message.author.username + ` Bug Issue (#${iid})`)
  .setDescription(`You bug has been send to **${owner.username}**`)
  .addField(`Issue ID:`, `#${iid}`)
  .addField(`Bug:`, `${bug}`)
  .setColor(color)
  
  const embeds = new MessageEmbed()
    .setAuthor(message.author.username + ` Bug Issue (#${iid})`)
  .setColor(color)
  .addField(`Issue ID:`, `#${iid}`)
  .addField(`Bug:`, `${bug}`)
  
  message.author.send(embed)
  
  
  
  owner.send(embeds)
  
}

exports.conf = {
    aliases: ['report'],
    cooldown: "10"
}

exports.help = {
    name: 'bug',
    description: 'Report bug',
    usage: 'bug'
}