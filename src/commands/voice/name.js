const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  const name = args.join(" ")
  if (!name)
    {
      return message.channel.send("Please give new name!")
    }
  
  if (name.length > "15")
    {
      return message.channel.send("The voice name can't 15+")
    }
  
  message.channel.send(`Your voice name has been set to: **${name}**`)
  db.set(`voicename.${message.author.id}`, name)
  
  const chs = db.get(`voicem.${message.author.id}`)
  if (!chs === null || !chs === undefined) return;
  
  if (message.member.voice.channel.id == chs) {
    client.channels.cache.get(chs).setName(name)
  }
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'name',
    description: 'Change your voice name',
    usage: 'name <new voice name>'
}