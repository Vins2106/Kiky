const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, you need **Manage Messages** permission")

    let cmdname = args[0]

    if(!cmdname) return message.channel.send(`Sorry, you need provide the word`)

    let database = db.get(`cmd_${message.guild.id}`)

    if(database && database.find(x => x.name === cmdname.toLowerCase())) return message.channel.send("Sorry, this word already added")



    db.push(`cmd.${message.guild.id}`, cmdname.toLowerCase())

    return message.channel.send(`Added \`${cmdname.toLowerCase()}\` to badword list. note: \`Badword do not work if message author have administration permission.\``)
  
}

exports.conf = {
    aliases: ['abw'],
    cooldown: "5"
}

exports.help = {
    name: 'addbadword',
    description: 'Add a badword',
    usage: 'addbadword <word>'
}