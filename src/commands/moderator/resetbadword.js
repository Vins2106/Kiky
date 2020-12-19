const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, you need **Manage Messages** permission")
  
  let bw = db.get(`cmd.${message.guild.id}`)
  if (!bw) return message.channel.send(`this server do not have badword.`)
  
      let cmdname = args[0]

    if(!cmdname) return message.channel.send(`Sorry, you need provide a word! \`${prefix}listbadword\``)

    let database = db.get(`cmd.${message.guild.id}`)

    if(database) {
      let data = database.find(x => x === cmdname.toLowerCase())

      if(!data) return message.channel.send(`Sorry, im unable to delete \`${cmdname}\`, try again`)

      let value = database.indexOf(data)
      delete database[value]

      var filter = database.filter(x => {
        return x != null && x != ''
      })

      db.set(`cmd.${message.guild.id}`, filter)
      return message.channel.send(`Succesfully delete badword: **${cmdname}**!`)


    } else {
      return message.channel.send("Sorry, im unable to delete that word.")
    


  }
}

exports.conf = {
    aliases: ['dbw'],
    cooldown: "5"
}

exports.help = {
    name: 'deletebadword',
    description: 'Delete a word on badword list',
    usage: 'resetbadword'
}