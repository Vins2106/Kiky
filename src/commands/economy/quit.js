const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  
  
  let cek = db.get(`check.${message.author.id}`)
  if (cek === undefined)
    {
      return message.channel.send(`__${message.author.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
 
  const yes = ['yes', 'y', 'yeah', 'ok'];

const no = ['no', 'n', 'nope', 'nop', 'no'];



const filter = x => {

    return (x.author.id === message.author.id);

};

  const m = await message.channel.send(`Are you sure to logout? (yes/no)`)
  
const verify = await message.channel.awaitMessages(filter, {max: 1, time: 6500}); // 6.5 seconds.



if (!verify.size) return message.channel.send("Canceled, because you do not answer");



let choice = verify.first().content.toLowerCase();

if (yes.includes(choice))
  {
    return message.channel.send("Deleting your account...").then(() => {
      
          db.delete(`check.${message.author.id}`)
    db.delete(`account.${message.author.id}.username`)
    db.delete(`account.${message.author.id}.id`)
    db.delete(`balance.${message.author.id}.global`)
    db.delete(`balance.${message.author.id}.bank`)
    db.delete(`balance.${message.author.id}.wallet`)
      
    })
  }

if (no.includes(choice)) return message.channel.send("Canceled");

if (!yes.includes(choice) || !no.includes(choice)) return message.channel.send("(yes/no)");
  
}

exports.conf = {
    aliases: ['logout'],
    cooldown: "5"
}

exports.help = {
    name: 'quit',
    description: 'Quit from account',
    usage: 'quit'
}