const { MessageEmbed } = require('discord.js');
const lyricsFinder = require("lyrics-finder");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {

            if (!message.member.voice.channel) return message.channel.send({
            embed: {
                color: color,
                description: "Sorry, you need join a voice channel"
            }
        });
        if (!serverQueue) return message.channel.send({
            embed: {
                color: color,
                description: "Nothing playing for this server"
            }
        });
  
    let lyrics = null;

    try {
      lyrics = await lyricsFinder(serverQueue.songs[0].title, "");
      if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `No lyrics found for ${serverQueue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(serverQueue.songs[0].title)
      .setDescription(lyrics)
      .setColor(color)

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
  

exports.conf = {
    aliases: ['ly'],
    cooldown: "5"
}

exports.help = {
    name: 'lyrics',
    description: 'Get now playing music lyrics',
    usage: 'lyrics'
}