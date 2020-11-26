const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
    let Emojis;
    let EmojisAnimated;
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.map((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += (`<:${emoji.name}:${emoji.id}>`)
      } else {
        EmojiCount++;
        Emojis += (`<:${emoji.name}:${emoji.id}>`)
      }
    });

  
  let anim;
  let non;
  const embed = new MessageEmbed()
  .setAuthor(message.guild.name + " Information", message.guild.iconURL({ dynamic: true }))
  .setColor(color)
  .setFooter(client.user.username + '', client.user.displayAvatarURL())
  .setDescription(`
**Owner**:
__\`${message.guild.owner.user.tag} (${message.guild.owner.user.id})\`__

**Server**:
__\`${message.guild.name} (${message.guild.id})\`__

**Created**:
__\`${message.guild.createdAt}\`__

**Member Count**:
__\`${message.guild.memberCount}\`__

**Online Member Count**:
__\`${message.guild.members.cache.filter(x => x.presence.status == "online").size}\`__

**Offline Member Count**:
__\`${message.guild.members.cache.filter(x => x.presence.status !== "online").size}\`__

**Emoji: [${message.guild.emojis.cache.size}]**:
**Animated**: __\`${message.guild.emojis.cache.filter(x => x.animated).size}\`__
**Default**: __\`${message.guild.emojis.cache.size - message.guild.emojis.cache.filter(x => x.animated).size}\`__
`)
  .setThumbnail(message.guild.iconURL({ dynamic: true }))
  
  message.channel.send(embed)
  
  

  
  
}

exports.conf = {
    aliases: ['si'],
    cooldown: "5"
}

exports.help = {
    name: 'serverinfo',
    description: 'Get this server information',
    usage: 'serverinfo'
}