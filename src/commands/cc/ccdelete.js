const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const custom = require("../../../custom.js");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
      if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(`Sorry, you need **Manage Messages** permission!`);
    if (!args.join(" "))
      return message.channel.send(`Please give command id/name! \`<prefix>cclist\``);
    custom.findOne(
      { Guild: message.guild.id, ID: args[0] },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          data.Content = args.slice(1).join(" ");
          data.remove();

          message.channel.send(
            `Successfully remove **${args[0]}**!`
          );
        } else if (!data) {
              custom.findOne(
      { Guild: message.guild.id, Command: args.join(" ") },
      async (er, datas) => {
        if (er) throw err;
        if (datas) {
          datas.Content = args.slice(1).join(" ");
          datas.remove();

          message.channel.send(
            `Successfully remove **${args.join(" ")}**!`
          );
        } else if (!datas) {
          message.channel.send(`Custom Command Not Found! type \`<prefix>cclist\``)
          
        }
      }
    );
          
        }
      }
    );
  
}

exports.conf = {
    aliases: ['ccd'],
    cooldown: "5"
}

exports.help = {
    name: 'ccdelete',
    description: 'Make delete commands',
    usage: 'ccdelete <cc_id>'
}