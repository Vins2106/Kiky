const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if (!args[0]) {
    let module = client.helps.array()
    
      const embed = new MessageEmbed()
      .setAuthor(client.user.username + " Category List", client.user.displayAvatarURL())
      .setColor(color)
      .setImage('https://cdn.discordapp.com/attachments/775987849698738176/781182821850808350/oie_abq7cqeQPXjN.png')
      .setFooter(`Get detailed of command on website`)
    for (const mod of module) {
      embed.addField(`__${mod.name}__`, `\`${mod.desc.replace(/{prefix}/g, prefix)}\``, true)
    }
      message.channel.send(embed)
  } else {
    try {
          let cmd = args[0].toLowerCase()
    if (client.helps.get(cmd).call) {
      const embed = new MessageEmbed()
      .setAuthor(`${client.helps.get(cmd).name} Category`, client.user.displayAvatarURL())
      .setColor(color)
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter(`https://kiky-bot.glitch.me/commands`)
      
      const x = client.helps.get(cmd);
        let index = 0;
        embed.setDescription(x.cmds.map(a => `\`${a.name}\``).join(", "))
      return message.channel.send(embed)
    }
    } catch (e) {
      message.channel.send("Not Found!")
    }
    }
  
}

exports.conf = {
    aliases: ['cmd', 'cmds'],
    cooldown: "5"
}

exports.help = {
    name: 'commands',
    description: 'Get category commands list',
    usage: 'commands <category>'
}