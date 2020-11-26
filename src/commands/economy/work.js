const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const workAns = require("../../../json/workAsn.json")

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  
  
    const user = message.author;
  
  let cek = db.get(`check.${user.id}`)
  if (!cek)
    {
      return message.channel.send(`__${user.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
  let working = workAns[Math.floor(Math.random() * workAns.length)];
  let wallet = Math.floor(Math.random() * 99) 
  let bank = Math.floor(Math.random() * 10) 
  
  
  message.channel.send(`**__${user.tag}__, ${working}  __${wallet}__ 🪙 on wallet, and ${bank} 🪙 on bank!**`)
  db.add(`balance.${user.id}.wallet`, wallet)
  db.add(`balance.${user.id}.bank`, bank)
  
  
}

exports.conf = {
    aliases: ['kerja'],
    cooldown: "10"
}

exports.help = {
    name: 'work',
    description: 'Work and got coin!',
    usage: 'work'
}