const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, color) => {
  if (!args[0]) {
    let module = client.helps.array();
    
    const a = client.helps.get(module.name);
    
    let ownername = await client.users.fetch(client.config.owner);
    
    const embed = new MessageEmbed()
    .setAuthor(client.user.username + " Help.", client.user.displayAvatarURL())
    .setDescription(`Hi **${message.author.tag}**, welcome to another discord bot (**${client.user.username}**)\nTo get commands list, you need type \`${client.config.prefix}commands\``)
    .addField(`New on ${client.user.username} ?`, `
    Get started with see \`${client.config.prefix}status\`
    `)
    .addField(`Need help with commands ?`, `
    You need to type \`${client.config.prefix}commands\` or go to [website](https://kiky-bot.glitch.me/commands)
    `)
    .addField(`Find bugs ?`, `
    Try with use \`${client.config.prefix}bug <bug>\`
    `)
    .addField(`Vote Kiky`, `
    You can [vote kiky](https://top.gg/bot/${client.user.id}/vote)
    `)
    .setColor(color)
    .setImage('https://cdn.discordapp.com/attachments/775987849698738176/781179925897543690/oie_YW3fXGPO5y06.png')
      message.channel.send(embed)
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