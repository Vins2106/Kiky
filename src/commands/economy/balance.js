const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  const user = message.mentions.users.first() || message.author;
  
  let cek = db.get(`check.${user.id}`)
  if (!cek)
    {
      return message.channel.send(`__${user.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
  let balance = db.get(`balance.${user.id}.wallet`)
  let bank = db.get(`balance.${user.id}.bank`)
  if (balance === null || balance === undefined) balance = 0;
  if (bank === null || bank === undefined) bank = 0;
  

  
  const acc = db.get(`account.${user.id}.username`)
  const id = db.get(`account.${user.id}.id`)
  
  const embed = new MessageEmbed()
  .setAuthor(acc + ` (${id})` + " Balance", user.displayAvatarURL())
  .setThumbnail(user.displayAvatarURL())
  .setDescription(`
Wallet: **__${balance.toLocaleString()}__** 🪙

Bank: **__${bank.toLocaleString()}__** 🪙`)
  .setFooter(client.user.username + " Economy System", client.user.displayAvatarURL())
  .setColor(color)
  
  message.channel.send(embed)
  
}

exports.conf = {
    aliases: ['balance', 'bal', 'coin'],
    cooldown: "5"
}

exports.help = {
    name: 'cash',
    description: 'Get user balance/cash',
    usage: 'cash <@user>'
}