const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
          const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send({
            embed: {
                color: color,
                description: "Sorry, you need join a voice channnel"
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
                description: "Sorry, you need provide url/title to search"
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
                    let index = 0;
                    let embedPlay = new MessageEmbed()
                    .setAuthor(client.user.username + ' Music Search', client.user.displayAvatarURL())
                    .setColor(color)
                    .setDescription(`${videos.map(x => `[**${++index}**.] ~ \`${x.title}\`\n${x.url}`).join("\n\n")}`)
                    .setFooter("Select 1 - 10 to play (this collection will deleted after 15 seconds)")
                    message.channel.send(embedPlay).then(m => m.delete({
                        timeout: 15000
                    }))
                    try {
                        var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                            max: 1,
                            time: 15000,
                            errors: ["time"]
                        });
                    } catch (err) {
                        console.error(err);
                        return message.channel.send({
                            embed: {
                                color: color,
                                description: "Canceled collector..."
                            }
                        });
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return message.channel.send({
                        embed: {
                            color: color,
                            description: "Error: nothing found"
                        }
                    });
                }
            }
            response.delete();
            return handleVideo(video, message, voiceChannel);
        }
  
}

exports.conf = {
    aliases: ['sc'],
    cooldown: "5"
}

exports.help = {
    name: 'search',
    description: 'Search a music',
    usage: 'search [title]'
}