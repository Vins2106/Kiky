const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const voice = new db.table('JS')

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR"))
    {
      return message.channel.send(`Sorry, you need **Administrator** permission!`)
    }
  
  if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
    {
      return message.channel.send(`Please give me **Manage Channels** permission!`)
    }
  
  try {
    message.guild.channels.create('Music Room', {
      type: 'category'
    }).then(c => {
      c.setPosition(0)
      message.guild.channels.create("➕ Join For Create", {
        type: 'voice',
        userLimit: 1
      }).then(c1 => {
        c1.setParent(c.id)
        db.set(`voice.${message.guild.id}`, c1.id)
        db.set(`cat.${message.guild.id}`, c.id)
      })
    })
    
    message.channel.send(`Created! now you can change the join for create channel name or position`)
    
  } catch (e) {
    message.channel.send(`oh no: ${e}`)
  }
  
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'setup',
    description: 'Setup for join for create voice channel',
    usage: 'setup'
}