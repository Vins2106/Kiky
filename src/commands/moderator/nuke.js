const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR"))
    {
      return message.channel.send("Sorry, you need **Administrator** permission")
    }
  
  const chl = message.channel;
  const position = chl.position;
  
  const m = await message.channel.send({
    embed: {
      color: color,
      description: `Are you sure to nuke ${chl} ? (react ✅ to yes, and react ❌ to cancel)`
    }
  })
  
  m.react('✅');
  m.react('❌');
  
    const filter = (reaction, user) => user.id !== client.user.id && user.id === message.author.id;
    var collector = m.createReactionCollector(filter)  
      collector.on("collect", (reaction, user) => {
      const member = user;

      switch (reaction.emoji.name) {
        case '✅':
          chl.clone().then(channel => {
            channel.setPosition(position)
            chl.delete()
            channel.send(`**Succesfully** nuke!`).then(a => {a.delete(
            {
              timeout: 10000
            }
            )})
          })
          break;
          
        case '❌':
          
          m.delete()
          message.channel.send("Canceled to nuke...")
          
          break;
          
      }
    });

    collector.on("end", () => {
      m.reactions.removeAll()
      if (m && !m.deleted) {
        m.delete({ timeout: 3000 })
      }
    });
  
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'nuke',
    description: 'Nuke a channel',
    usage: 'nuke <#channel>'
}