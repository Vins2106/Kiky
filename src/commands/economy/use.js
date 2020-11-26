const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
    const user = message.author;
  
  let cek = db.get(`check.${user.id}`)
  if (!cek)
    {
      return message.channel.send(`__${user.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
  let xp = db.get(`xp.${user.id}`)
  let level = db.get(`level.${user.id}`)
  let lotre = db.get(`lotre.${user.id}`)
  
  
  if (!args[0]) return message.channel.send(`Sorry, you need provide a item! **${prefix}inventory**`)
  
  if (args[0] === "xp") {
    if (!xp) return message.channel.send(`Sorry, you do not have xp. (Item)`)
    
    let hdh = 25;
    
    message.channel.send(`Succesfully use **1**x XP (Item), you got **25xp**`)
    db.add(`leveling.${message.author.id}.xp`, hdh)
    db.subtract(`xp.${user.id}`, 1)
  }
  
    if (args[0] === "level") {
    if (!level) return message.channel.send(`Sorry, you do not have level (Item).`)
    
    let hdh = 1;
    
    message.channel.send(`Succesfully use **1**x Level (Item), you got **1 level**`)
    db.add(`leveling.${message.author.id}.level`, hdh)
    db.subtract(`level.${user.id}`, 1)
  }
    if (args[0] === "lotre") {
    if (!lotre) return message.channel.send(`Sorry, you do not have lotre.`)
      
      let list = ['10', '10', '10', '10', '10', '10', '10', '10', '10', '10', ,'10', '10', '25', '35', '50', '75', '100', '150', '150', '35', '145', '165', '170', '190', '200', '210', '220', '230', '250', '300']
      
    let hdh = list[Math.floor(Math.random() * list.length)];
    
    message.channel.send(`Succesfully use **1**x lotre (Item), you got **${hdh}**`)
    db.add(`balance.${message.author.id}.wallet`, hdh)
    db.subtract(`lotre.${user.id}`, 1)
  }
  
  
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'use',
    description: 'Use a item',
    usage: 'use [item]'
}