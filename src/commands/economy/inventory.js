const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
    const user = message.mentions.users.first() || message.author;
  
  let cek = db.get(`check.${user.id}`)
  if (!cek)
    {
      return message.channel.send(`__${user.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
  let xp = db.get(`xp.${user.id}`)
  let level = db.get(`level.${user.id}`)
  let lotre = db.get(`lotre.${user.id}`)
  if (!xp) xp = 0;
  if (!level) level = 0;
  if (!lotre) lotre = 0;
  
    const acc = db.get(`account.${user.id}.username`)
  const id = db.get(`account.${user.id}.id`)
  
  const embed = new MessageEmbed()
  .setAuthor(acc + ` (${id})`, user.displayAvatarURL())
  .setColor(color)
  .addField(`XP (Item)`, xp)
  .addField(`Level (Item)`, level)
  .addField(`Lotre (Item)`, lotre)
  .setFooter(`<prefix>use [item]`)
  
  message.channel.send(embed)
  
  
}

exports.conf = {
    aliases: ['inv'],
    cooldown: "5"
}

exports.help = {
    name: 'inventory',
    description: 'Show user inventory',
    usage: 'inventory <@user>'
}