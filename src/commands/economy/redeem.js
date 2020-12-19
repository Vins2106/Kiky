const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  const user = message.author
    let cek = db.get(`check.${user.id}`)
  if (!cek)
    {
      return message.channel.send(`__${user.tag}__ is not login! use \`${prefix}login\` to login!`)
    }

  const redeem = db.get(`redeem`)
  if (!redeem) return message.channel.send(`Sorry, there is no redeem code`)
  
  const code = args[0];
  if (!code) return message.channel.send(`Sorry, you need enter the redeem code`)
  
  const redems = db.get(`redeem.code`)

  if (redems == code) {
    const hdh = db.get(`redeem.reward`)
    db.add(`balance.${message.author.id}.wallet`, hdh)
    
    return message.channel.send(`Contrats you got **${hdh}** :coin: from redeem a code!`).then(() => db.delete(`redeem`))
    
  } else {
    message.channel.send(`Wrong redeem code!`)
  }
  
  
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'redeem',
    description: 'Redeem a code',
    usage: 'redeem <code>'
}