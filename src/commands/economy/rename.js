const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  const user = message.author;
  
    let cek = db.get(`check.${user.id}`)
  if (!cek)
    {
      return message.channel.send(`__${user.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
  let amount = 150;
  
  const newname = args.join(" ")
  if (!newname) return message.channel.send(`Sorry, you need provide new name`);
  
  if (newname.length > 5) return message.channel.send(`Sorry, the new name can't under 5 word.`)
  
  const bal = db.get(`balance.${message.author.id}.wallet`)
  if (!bal) return message.channel.send(`Sorry, you need **150** :coin: to rename!`)
  
  if (amount > bal) return message.channel.send(`Sorry, you need **150** :coin: to rename`)
  
  const name = db.get(`account.${message.author.id}.username`)
  
  message.channel.send(`Your name on account has been changed! before: **${name}**, after: **${newname}**`)
  db.set(`account.${message.author.id}.username`, newname)
  db.subtract(`balance.${message.author.id}.wallet`, amount)    
  
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'rename',
    description: 'Raname your account name',
    usage: 'rename <new_name>'
}