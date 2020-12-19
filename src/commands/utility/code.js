const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if (message.author.id !== client.config.owner) return message.channel.send(`Sorry, owner only!`)
  
  const code = args[0];
  if (!code) return message.channel.send(`Sorry, you need provide the code`)
  
  const reward = args[1];
  if (!reward) return message.channel.send(`Sorry, you need provide the coin reward`)
  

  
  message.channel.send(`New redeem code! **${code}**, reward: **${reward}**`)
  db.set(`redeem.code`, code)
  db.set(`redeem.reward`, reward)
  
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'code',
    description: 'Set new redeem code',
    usage: 'code <code> <reward> <limit>'
}