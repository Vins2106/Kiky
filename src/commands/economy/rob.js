const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const ms = require('parse-ms');

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  let cek = db.get(`check.${message.author.id}`)
  if (!cek)
    {
      return message.channel.send(`__${message.author.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
  let user = message.mentions.users.first()
  if (!user) return message.channel.send(`Please provide an valid user!`)
  
  if (user.bot) return message.channel.send(`You cant rob bot!`)
  
  let cek2 = db.get(`check.${user.id}`)
  if (!cek2) return message.channel.send(`__${user.tag}__ is not login! use \`${prefix}login\` to login!`)
  

  
        let pad_zero = num => (num < 10 ? '0' : '') + num;
    let cooldown = 3.6e+6;
    let amount = 450; 

    let lastDaily = await db.get(`rob.${message.author.id}`);
    let buck = await db.get(`account.${message.author.id}.balance`);

    try {
        
        if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
            let timeObj = ms(cooldown - (Date.now() - lastDaily));

            let hours = pad_zero(timeObj.hours).padStart(2, "0"),
                mins = pad_zero(timeObj.minutes).padStart(2, "0"),
                secs = pad_zero(timeObj.seconds).padStart(2, "0");

            let finalTime = `**${hours}:${mins}:${secs}**`;
            return message.channel.send(`Sorry, you need wait after ${finalTime} to rob again!`);
        } else {
            let authorBal = db.get(`balance.${message.author.id}.wallet`)
  if(!authorBal) return message.channel.send(`Sorry, you need coin to rob someone.`)
  
  if (authorBal < 200) return message.channel.send(`Sorry, you need **200 :coin:** to rob!`)
  
  let userBal = db.get(`balance.${user.id}.wallet`);
  if (!userBal) return message.channel.send(`Sorry, this user do not have coin on wallet`)
  
          if (userBal > 10000) userBal = 10000
          
  let persen = Math.floor(Math.random() * 10);
  
  if (persen < 6) {
      message.channel.send(`Sorry, you try to rob **${user.tag}**, but he can fight, you lost **200 :coin:**`)
    db.subtract(`balance.${message.author.id}.wallet`, 200)
  }
  if (persen > 6) {
    message.channel.send(`You rob **${user.tag}**, and got all they money on wallet (**${userBal} :coin:**)`)
    db.add(`balance.${message.author.id}.wallet`, userBal)
    db.subtract(`balance.${user.id}.wallet`, userBal)
  }
                   db.set(`rob.${message.author.id}`, Date.now());
        }

    } catch (error) {
        console.log(error);
        return message.channel.send(`Oopsie, unknown error I guess: ${error}`);
    }
  
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'rob',
    description: 'Rob a user',
    usage: 'rob <@user>'
}