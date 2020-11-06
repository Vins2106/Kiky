const canvacord = require("canvacord");
const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js")

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  
  
  const avatar = args.join(" ")
  if (!avatar)
    {
      return message.channel.send("Please give text!")
    }
  
  const m = await message.channel.send("Loading Image...")
  

        let image = await canvacord.Canvas.clyde(avatar);
        let attachment = new Discord.MessageAttachment(image, "clyde.png");
  
  
  
        setTimeout(function() {
          
          message.channel.send(attachment).then(() => {m.delete()})
          
        })
  
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'clyde',
    description: 'Get clyde image from avatar',
    usage: 'clyde [message]'
}