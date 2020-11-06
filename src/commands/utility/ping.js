const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args, color) => {
  
  const m = await message.channel.send("**Please wait!**")
  
  setTimeout(function() {
    message.channel.send({
      embed: {
        color: color,
        description: `:ping_pong: Pong! __**${client.ws.ping}**ms__`
      }
    }).then(() => {m.delete()})
  }, 3000);
}

exports.conf = {
    aliases: ['pong'],
    cooldown: "5"
}

exports.help = {
    name: 'ping',
    description: 'Get client websocket',
    usage: 'ping'
}