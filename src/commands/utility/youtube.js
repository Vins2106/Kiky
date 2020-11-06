const { MessageEmbed } = require('discord.js');
const fetch = require('node-superfetch')
const ytsr = require("ytsr");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  const name = args.join(" ")
  if (!name)
    {
      return message.channel.send("Please provide something!")
    }
  
  const videos = await youtube.searchVideos(name, 10)
  const video = await youtube.getVideoByID(videos[0].id)
  if (!video)
    {
      return message.channel.send("No result found!")
    }
  
  message.channel.send(`https://www.youtube.com/watch?v=${video.id}`)
}

exports.conf = {
    aliases: ['yt'],
    cooldown: "5"
}

exports.help = {
    name: 'youtube',
    description: 'Search user youtube name',
    usage: 'youtube [channel_name]'
}