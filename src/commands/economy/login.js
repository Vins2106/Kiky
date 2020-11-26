const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  let cek = db.get(`check.${message.author.id}`)
  if (cek)
    {
      return message.channel.send("Sorry, you already login!")
    }
  
  const filter = x => {

    return (x.author.id === message.author.id);

};
  const msg = await message.channel.send("What your name?");

const verify = await message.channel.awaitMessages(filter, {max: 1, time: 6500}); // 6.5 seconds.



if (!verify.size) return message.channel.send("Canceled, because you do not answer");
  
  let choice = verify.first().content;
  
  const msg2 = await message.channel.send(`Okay, i will call you **${choice}**, now you got economy features`)
  
  const id = (`${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`)
  
  db.set(`check.${message.author.id}`, "okay")
  db.set(`account.${message.author.id}.username`, choice)
  db.set(`account.${message.author.id}.id`, id)
  db.set(`balance.${message.author.id}`, {wallet: 0, bank: 0})
  
}

exports.conf = {
    aliases: ['start'],
    cooldown: "5"
}

exports.help = {
    name: 'login',
    description: 'Login and get economy features',
    usage: 'login'
}