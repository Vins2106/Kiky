const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
    const user = message.author;
  
  let cek = db.get(`check.${user.id}`)
  if (!cek)
    {
      return message.channel.send(`__${user.tag}__ is not login! use \`${prefix}login\` to login!`)
    }

  const bal = db.get(`balance.${user.id}.wallet`)
  if (!bal) return message.channel.send(`Sorry, you do not have coin on wallet!`)
  
  
  const amount = args[0]
  if (!amount) return message.channel.send(`Sorry, you need provide the amount.`)
  if (isNaN(amount)) return message.channel.send(`Sorry, you need provide number.`)
  if (amount === 0) return message.channel.send(`The amount can't be 0.`)
  
  if (amount > bal) return message.channel.send(`Sorry, you do not have **${amount}** 🪙 on wallet`)
  
  message.channel.send(`Succesfully drop **${amount}** 🪙 for this server.\nuse \`${prefix}pickup <amount>\` to pickup money`)
  db.add(`drop.${message.guild.id}`, amount)
  db.subtract(`balance.${message.author.id}.wallet`, amount)
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'drop',
    description: 'Drop a money on some guild',
    usage: 'drop <amount>'
}