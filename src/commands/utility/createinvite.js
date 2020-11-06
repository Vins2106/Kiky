const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  const channel = message.mentions.channels.first()
  if (!channel) {
    return message.channel.send("Please mention a channel!")
  }
  
  try {
    const code = await channel.createInvite(
  {
    maxAge: 0,
    maxUses: 0
  }
  ).then(link => {
    message.channel.send(`Succesfully create invite link (unlimited time & uses): **https://discord.gg/${link.code}**`)
  })
  } catch(e) {
    message.channel.send(`Oh no: ${e}`)
  }
  
}

exports.conf = {
    aliases: ['ci'],
    cooldown: "5"
}

exports.help = {
    name: 'createinvite',
    description: 'Create invite link',
    usage: 'createinvite <#channel>'
}