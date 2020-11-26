const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const ms = require('parse-ms')

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
    let cek = db.get(`check.${message.author.id}`)
  if (!cek)
    {
      return message.channel.send(`__${message.author.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
      let pad_zero = num => (num < 10 ? '0' : '') + num;
    let cooldown = 8.64e+7;
    let amount = 450; 

    let lastDaily = await db.get(`lastDaily.${message.author.id}`);
    let buck = await db.get(`account.${message.author.id}.balance`);

    try {
        
        if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
            let timeObj = ms(cooldown - (Date.now() - lastDaily));

            let hours = pad_zero(timeObj.hours).padStart(2, "0"),
                mins = pad_zero(timeObj.minutes).padStart(2, "0"),
                secs = pad_zero(timeObj.seconds).padStart(2, "0");

            let finalTime = `**${hours}:${mins}:${secs}**`;
            return message.channel.send(`Sorry, you cannot collect your dailies too early. Please wait until ${finalTime}.`);
        } else {
            db.set(`lastDaily.${message.author.id}`, Date.now());
            db.add(`balance.${message.author.id}.wallet`, amount);
            return message.channel.send(`Great **${message.author.tag}!** You've been received **500** coin!`);
        }

    } catch (error) {
        console.log(error);
        return message.channel.send(`Oopsie, unknown error I guess: ${error}`);
    }
  
}

exports.conf = {
    aliases: ['daily'],
    cooldown: "5"
}

exports.help = {
    name: 'daily',
    description: 'daily',
    usage: 'daily'
}