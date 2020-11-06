const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
          const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send({
            embed: {
                color: color,
                description: "Sorry, you need join a voice channel!"
            }
        });
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) {
            return message.channel.send({
                embed: {
                    color: color,
                    description: "Sorry, i need **Connect** permission"
                }
            });
        }
        if (!permissions.has("SPEAK")) {
            return message.channel.send({
                embed: {
                    color: color,
                    description: "Sorry, i need **Speak** permission"
                }
            });
        }
        if (!url || !searchString) return message.channel.send({
            embed: {
                color: color,
                description: "Sorry, you need provide title/url to play"
            }
        });
  
  
  
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            return message.channel.send({
                embed: {
                    color: color,
                    description: `**Succesfully** added **${playlist.title}** to queue`
                }
            });
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    var video = await youtube.getVideoByID(videos[0].id);
                    if (!video) return message.channel.send({
                        embed: {
                            color: color,
                            description: "Sorry, nothing found"
                        }
                    });
                } catch (err) {
                    console.error(err);
                    return message.channel.send({
                        embed: {
                            color: color,
                            description: "Sorry, nothing found"
                        }
                    });
                }
            }
            const a = handleVideo(video, message, voiceChannel);
        }
        }

exports.conf = {
    aliases: ['p', 'putar'],
    cooldown: "5"
}

exports.help = {
    name: 'play',
    description: 'Play a music',
    usage: 'play [title?url]'
}