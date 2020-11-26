const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
      const user = message.author;
  
  let cek = db.get(`check.${user.id}`)
  if (!cek)
    {
      return message.channel.send(`__${user.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
  let dm = db.get(`drop.${message.guild.id}`)
  if (!dm) return message.channel.send(`There no drop coin for this server, use \`${prefix}drop <amount>\` to drop!`)
  if (dm == "0") return message.channel.send(`There no drop coin for this server, use \`${prefix}drop <amount>\` to drop!`)
  
  let amount = args[0]
  if (!amount) return message.channel.send(`Sorry, you need provide amount!`)
  if (isNaN(amount)) return message.channel.send(`Sorry, the amount must be a number!`)
  if (amount === 0) return message.channel.send(`Sorry, the amount can't be 0!`)
  
  if (amount > dm) return message.channel.send(`Sorry, the drop amount do not have **${amount}** :coin:, the drop amount have **${dm}** :coin:`)
  
  message.channel.send(`**${user.tag}** pick up **${amount}** :coin:!`)
  db.subtract(`drop.${message.guild.id}`, amount)
  db.add(`balance.${user.id}.wallet`, amount)
  
  
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'pickup',
    description: 'Pickup droped coin on this server',
    usage: 'pickup <amount>'
}