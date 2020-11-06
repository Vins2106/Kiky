const canvacord = require("canvacord");
const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js")

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  
  
  const avatar = args.join(" ")
if (!avatar)
  {
    return message.channel.send('Please provide a message')
  }
  
  const m = await message.channel.send("Loading Image...")
  

        let image = await canvacord.Canvas.changemymind(avatar);
        let attachment = new Discord.MessageAttachment(image, "cmm.png");
  
  
  
        setTimeout(function() {
          
          message.channel.send(attachment).then(() => {m.delete()})
          
        })
  
}

exports.conf = {
    aliases: ['cmm'],
    cooldown: "5"
}

exports.help = {
    name: 'changemymind',
    description: 'Get change my mind image from avatar',
    usage: 'changemyming [message]'
}