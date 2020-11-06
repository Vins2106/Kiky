const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, color) => {
  if (!args[0]) {
    let module = client.helps.array();
    
    const a = client.helps.get(module.name);
    
    const embed = new MessageEmbed()
    .setAuthor(client.user.username + ' Category', client.user.displayAvatarURL())
    .setColor(color)
    .setThumbnail(client.user.displayAvatarURL())
    for (const mod of module) {
      embed.addField(`**${mod.name}** (**__${client.helps.get(mod.call).cmds.length}__**)`, `\`${mod.desc}\``, true)
    }
    return message.channel.send(embed);
  } else {
    let cmd = args[0]
    if (client.helps.get(cmd).call) {
      const embed = new MessageEmbed()
      .setAuthor(`${client.helps.get(cmd).name} Category`, client.user.displayAvatarURL())
      .setColor(color)
      .setThumbnail(client.user.displayAvatarURL())
      
      const x = client.helps.get(cmd);
        let index = 0;
        embed.setDescription(x.cmds.map(a => `\`${++index}\` **|** \`${client.config.prefix}${a.usage}\`\n${a.description}`).join("\n\n"))
      
      return message.channel.send(embed)
    }
  }
}

exports.conf = {
    aliases: ['h', 'cmds', 'cmdlist'],
    cooldown: "5"
}

exports.help = {
    name: 'help',
    description: 'Show all command list',
    usage: 'help [command]'
}