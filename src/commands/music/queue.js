const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
        
        
        if (!serverQueue) return message.channel.send({
            embed: {
                color: "RED",
                description: "There is nothing playing"
            }
        });
  
  let songsss = serverQueue.songs.slice()
  
        let embedQueue = new MessageEmbed()
        .setColor(color)
        .setAuthor(client.user.username + ' Music Manager', client.user.displayAvatarURL())
        .setTitle(`Now playing: **${serverQueue.songs[0].title}**`)
        embedQueue.setDescription(`${songsss.map((x, i) => `\`${i + 1}\` **|** \`${x.title}\`\n${x.url}`).join("\n\n")}`)
        const m = await message.channel.send(embedQueue);

}

exports.conf = {
    aliases: ['q'],
    cooldown: "5"
}

exports.help = {
    name: 'queue',
    description: 'Show server queue',
    usage: 'queue'
}