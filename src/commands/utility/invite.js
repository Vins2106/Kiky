const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  message.channel.send(`https://kiky-bot.glitch.me/invite`)
  
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'invite',
    description: 'Invite me',
    usage: 'invite'
}