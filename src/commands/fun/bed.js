const canvacord = require("canvacord");
const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js")

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  
  
  const users = message.mentions.users.first()
if (!users)
  {
    return message.channel.send('Please mentions someone')
  }
  
  const m = await message.channel.send("Loading Image...")
  
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  let avatar2 = users.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.bed(avatar, avatar2);
        let attachment = new Discord.MessageAttachment(image, "bed.png");
  
  
  
        setTimeout(function() {
          
          message.channel.send(attachment).then(() => {m.delete()})
          
        })
  
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'bed',
    description: 'Get bed image from avatar',
    usage: 'bed <@user> [@user]'
}