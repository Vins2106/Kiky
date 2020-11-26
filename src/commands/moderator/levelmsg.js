const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Sorry, you need **Administrator** permission!`)
  
  const newmsg = args.join(" ")
  if (!newmsg) {
    const embed = new MessageEmbed()
    .setAuthor(client.user.username + " Level Up Settings", client.user.displayAvatarURL())
    .setColor(color)
    .setDescription(`
**{user}** > \`user name\`
**{usertag}** > \`user tag\`
**{level}** > \`user level up\``)
    .setFooter(`${prefix}levelmsg GG **{user}**, you level up to **{level}**!`)
    return message.channel.send(embed)
  }
  
  const msg = newmsg.replace(/{user}/g, message.author.username).replace(/{usertag}/g, message.author.tag).replace(/{level}/g, `1`)
  
  message.channel.send(`Level up message has been set!\n${msg}`)
  db.set(`levelmsg.${message.guild.id}`, newmsg)
  
  
}

exports.conf = {
    aliases: ['lvlmsg'],
    cooldown: "5"
}

exports.help = {
    name: 'levelmsg',
    description: 'Set server level up message',
    usage: 'levelmsg [message]'
}