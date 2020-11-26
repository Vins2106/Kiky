const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const fs = require("fs");


exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
    let user = message.author;
    let cek = db.get(`check.${user.id}`)
  if (!cek)
    {
      return message.channel.send(`__${message.author.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
  let bal = db.get(`balance.${message.author.id}.wallet`)
  
    let slots = ['🍇', '🍐', '🍒', '🍋', '🍊', '🥑', '🍉']
  const { shuffle } = require("../../../util.js")  
  let amount = (args[0]);
  
    if (!amount) amount = 2;
    if (isNaN(amount)) return message.channel.send(`**${message.author.username}**, Please enter valid number!`);
    if (amount > 500) amount = 500;
  
     let random = 5 * amount;

    if(bal < amount) return message.channel.send(`**${message.author.username}**, You not have insufficient balance yet, Keep active and don't forget to take your daily everyday!`);
  
      const arr1 = shuffle(slots);
      const arr2 = shuffle(slots);
      const arr3 = shuffle(slots);
  
  const embed1 = new MessageEmbed()
  .setAuthor(message.author.username + " Spin", message.author.displayAvatarURL())
  .setColor(color)
  .setDescription(`
${arr1[2]} : ${arr2[0]} : ${arr3[2]}
${arr1[1]} : ${arr2[1]} : ${arr3[1]} **<**
${arr1[0]} : ${arr2[2]} : ${arr3[0]}
`)
  .setFooter(`1`)
  
      const thisMes = await message.channel.send(embed1)

    for(let i = 0; i < 5; i++){
  	arr1.push(arr1.shift());
	  arr2.push(arr2.shift());
   	arr3.push(arr3.shift());
    
   const embed2 = new MessageEmbed()
  .setAuthor(message.author.username + " Spin", message.author.displayAvatarURL())
  .setColor(color)
  .setDescription(`
${arr1[2]} : ${arr2[0]} : ${arr3[2]}
${arr1[1]} : ${arr2[1]} : ${arr3[1]} **<**
${arr1[0]} : ${arr2[2]} : ${arr3[0]}
`)
  .setFooter(`2`)     
      
    await setTimeout(() => thisMes.edit(embed2), 800)
    
     const embed3 = new MessageEmbed()
  .setAuthor(message.author.username + " Spin", message.author.displayAvatarURL())
  .setColor(color)
  .setDescription(`
${arr1[2]} : ${arr2[0]} : ${arr3[2]}
${arr1[1]} : ${arr2[1]} : ${arr3[1]} **<**
${arr1[0]} : ${arr2[2]} : ${arr3[0]}
`)
  .setFooter(`3`)      
      
  setTimeout(() => thisMes.edit(embed3), 1300);
    
	  if(arr1[1] === arr2[1] && arr1[1] === arr3[1] || arr1[1] && arr2[1] === arr1[1] && arr3[1] || arr2[1] === arr1[1] && arr2[1] === arr3[1] || arr3[1] === arr2[1] && arr3[1] === arr1[1] || arr3[1] && arr2[1] === arr3[1] && arr1[1] || arr1[1] === arr3[1] && arr3[1] && arr2[1] ) {
      db.add(`balance.${message.author.id}.wallet`, random)
      
     const win = new MessageEmbed()
  .setAuthor(message.author.username + " Spin", message.author.displayAvatarURL())
  .setColor(color)
  .setDescription(`
${arr1[2]} : ${arr2[0]} : ${arr3[2]}
${arr1[1]} : ${arr2[1]} : ${arr3[1]} **<**
${arr1[0]} : ${arr2[2]} : ${arr3[0]}
`)
  .setFooter(`==> WIN <==`)      
      
    return setTimeout(() => thisMes.edit(`**${message.author.username}** used **${amount} 🪙** and won **${random} 🪙**`, win), 2300);
  }
      
      db.subtract(`balance.${message.author.id}.wallet`, amount)
  
  const lose = new MessageEmbed()
  .setAuthor(message.author.username + " Spin", message.author.displayAvatarURL())
  .setColor(color)
  .setDescription(`
${arr1[2]} : ${arr2[0]} : ${arr3[2]}
${arr1[1]} : ${arr2[1]} : ${arr3[1]} **<**
${arr1[0]} : ${arr2[2]} : ${arr3[0]}
`)
  .setFooter(`==> LOSE <==`)    
      
	    return setTimeout(() => thisMes.edit(`**${message.author.username}** used **${amount} 🪙** and lost everything.`, lose),2300)
  }

  
}

exports.conf = {
    aliases: ['slot'],
    cooldown: "5"
}

exports.help = {
    name: 'slots',
    description: 'Play slots game',
    usage: 'slots <amount>'
}