const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
    let cek = db.get(`check.${message.author.id}`)
  if (!cek)
    {
      return message.channel.send(`__${message.author.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
  let user = message.mentions.users.first()
  if (!user) return message.channel.send(`Please mention someone!`)
  
  if (user.id == message.author.id) return message.channel.send(`Sorry, you can't pay to yourself`)
  
  if (user.bot) return message.channel.send(`You can't pay to bot`)
  
      let cek2 = db.get(`check.${user.id}`)
  if (!cek2)
    {
      return message.channel.send(`__${user.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
  let amount = args[1]
  if (!amount) return message.channel.send(`Sorry, you need provide amount!`)
  
  let bal = db.get(`balance.${message.author.id}.wallet`)
  if (!bal) return message.channel.send(`Sorry, you do not have coin!`)
  
  if (amount > bal) return message.channel.send(`Sorry, you do not have **${amount}** on wallet! (\`minimal transaction 50\`)`)
  
  
  
  message.channel.send(`Succesfully pay to **${user.tag}**, amount: **${amount}**`)
  db.add(`balance.${user.id}.wallet`, amount)
  db.subtract(`balance.${message.author.id}.wallet`, amount)
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'pay',
    description: 'Give someone money',
    usage: 'pay [@user]'
}