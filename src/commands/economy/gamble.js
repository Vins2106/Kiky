const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const ms = require("parse-ms");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
      let cek = db.get(`check.${message.author.id}`)
  if (!cek)
    {
      return message.channel.send(`__${message.author.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
      const amount = parseInt(args[0]);
    const result = Math.floor(Math.random() * 10);
    const balance = db.get(`balance.${message.author.id}.wallet`);

    if (!amount) return message.channel.send("Please insert an amount first.");
    if (isNaN(amount)) return message.channel.send("The amount was not a number.");
    if (amount > balance || !balance || balance === 0) return message.channel.send("You don't have enough money.");
    
    // Optional:
    if (amount < 200) return message.channel.send("You don't have enough money for gambling. The minimum was $200.");

    let cooldown = 25000; // 25 Seconds.
    let pad_zero = num => (num < 10 ? '0' : '') + num;

    // 50:50
    if (result < 5) {
        await db.subtract(`balance.${message.author.id}.wallet`, amount);
        return message.channel.send(`Ahh, no. You lose $${amount}. Good luck next time.`);
    } else if (result > 5) {
        await db.add(`balance.${message.author.id}.wallet`, amount);
        return message.channel.send(`Woohoo! You won $${amount}! Good luck, have fun!`);
    }
  
}

exports.conf = {
    aliases: [''],
    cooldown: "10"
}

exports.help = {
    name: 'gamble',
    description: 'Gamble and get money',
    usage: 'gamble [amount]'
}