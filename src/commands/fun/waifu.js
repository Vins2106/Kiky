const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const random = require("random-anime");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  let image = random.anime();
  
  const embed = new MessageEmbed()
  .setAuthor(message.author.username + " Waifu", message.author.displayAvatarURL())
  .setColor(color)
  .setImage(image)
  .setFooter(`npm: random-anime`)
  
  message.channel.send(embed)
  
  
}

exports.conf = {
    aliases: ['wf'],
    cooldown: "5"
}

exports.help = {
    name: 'waifu',
    description: 'Get random waifu image',
    usage: 'waifu'
}