const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  let embed = new MessageEmbed()
  .setAuthor(message.guild.name + " Bad Word List", message.guild.iconURL())
  .setColor(color)
  
        let database = db.get(`cmd.${message.guild.id}`)

        if (!database) return message.channel.send(`There is not badword for this server.`)
        
  
  
      let bw = database.slice()  
       
      embed.setDescription(bw.map(x => `\`${x}\``).join(", "))
  
  message.channel.send(embed)
  
}

exports.conf = {
    aliases: ['lbw'],
    cooldown: "5"
}

exports.help = {
    name: 'listbadword',
    description: 'Show the bad word list',
    usage: 'listbadword'
}