const { MessageEmbed } = require('discord.js');
const axios = require("axios");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  const sc = args.join(" ")
  if (!sc) {
    return message.channel.send('Please give something to search')
  }
  
      const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      sc
    )}`

    axios
      .get(uri)
      .then((embed) => {
        const { data } = embed

        if (data && !data.error) {
          message.channel.send({ embed: data })
        } else {
          message.reply('Could not find that documentation')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  
}

exports.conf = {
    aliases: ['djs'],
    cooldown: "5"
}

exports.help = {
    name: 'docs',
    description: 'Search discord.js documentation',
    usage: 'docs [something]'
}