const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const custom = require("../../../custom.js");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  try {
  //Grab all of the users in said server
  custom.find({
    Guild: message.guild.id
  }).sort([
    ['Command']
  ]).exec((err, res) => {
    if (err) console.log(err);

    let embed = new MessageEmbed()
      .setTitle("Custom Commands List")
      .setFooter(`${prefix}ccdelete <command_id>`)
    //if there are no results
    if (res.length === 0) {
      embed.setColor(color);
      embed.addField("No data found", "Add new cc now!")
    } else if (res.length < 1000) {
      //less than 10 results
      embed.setColor(color);
      for (let i = 0; i < res.length; i++) {
        embed.addField(`${res[i].ID}`, `**${res[i].Command}** response with **${res[i].Content}**`)
      }
    } else {
      //more than 10 results
      embed.setColor(color);
      for (let i = 0; i < 1000; i++) {
        embed.addField(`${res[i].ID}`, `**${res[i].Command}** response with **${res[i].Content}**`)
      }
    }

    message.channel.send(embed);
  })
  } catch (e) {
    message.channel.send(`Error: ${e}`)
  }
  
}

exports.conf = {
    aliases: ['ccl'],
    cooldown: "5"
}

exports.help = {
    name: 'cclist',
    description: 'Get all custom command lists',
    usage: 'cclist'
}