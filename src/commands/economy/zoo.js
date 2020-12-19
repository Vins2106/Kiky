const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {

  
        const user = message.author;
    
  let cek = db.get(`check.${user.id}`)
  if (!cek)
    {
      return message.channel.send(`__${user.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
  if (args[0] === "rename") {
    if (!args[1]) {
      return message.channel.send(`Please provide the animal name.`)
    }
    
    if (args[1].toLowerCase() === "cat" || args[1] === db.get(`cat.${message.author.id}.name`)) {
      const cek = db.get(`cat.${message.author.id}`)
      if (!cek) return message.channel.send(`Sorry, you do not have cat`)
      
      const newname = args.slice(2).join(" ")
      if (!newname) return message.channel.send(`Sorry, you need provide new name.`)
      if (newname.length > 10) return message.channel.send(`The new name word can't 10+`)
      
      const old = db.get(`cat.${message.author.id}.name`)
      
      message.channel.send(`Name for **${old}** has been set to **${newname}**`)
      
      
      if (db.get(`huntpet.${message.author.id}.name`) === "cat" || db.get(`huntpet.${message.author.id}.name`) === old) {
        db.set(`cat.${message.author.id}.name`, newname)
        db.set(`huntpet.${message.author.id}.name`, newname)
      } else {
        db.set(`cat.${message.author.id}.name`, newname)
      }
    } else
    
    if (args[1].toLowerCase() === "dog" || args[1] === db.get(`dog.${message.author.id}.name`)) {
      const cek = db.get(`dog.${message.author.id}`)
      if (!cek) return message.channel.send(`Sorry, you do not have dog`)
      
      const newname = args.slice(2).join(" ")
      if (!newname) return message.channel.send(`Sorry, you need provide new name.`)
      if (newname.length > 10) return message.channel.send(`The new name word can't 10+`)
      
      const old = db.get(`dog.${message.author.id}.name`)
      
      message.channel.send(`Name for **${old}** has been set to **${newname}**`)
            if (db.get(`huntpet.${message.author.id}.name`) === "dog" || db.get(`huntpet.${message.author.id}.name`) === old) {
        db.set(`dog.${message.author.id}.name`, newname)
        db.set(`huntpet.${message.author.id}.name`, newname)
      } else {
        db.set(`dog.${message.author.id}.name`, newname)
      }
      
    } else
    
    if (args[1].toLowerCase() === "chicken" || args[1] === db.get(`chicken.${message.author.id}.name`)) {
      const cek = db.get(`chicken.${message.author.id}`)
      if (!cek) return message.channel.send(`Sorry, you do not have chicken`)
      
      const newname = args.slice(2).join(" ")
      if (!newname) return message.channel.send(`Sorry, you need provide new name.`)
      if (newname.length > 10) return message.channel.send(`The new name word can't 10+`)
      
      const old = db.get(`chicken.${message.author.id}.name`)
      
      message.channel.send(`Name for **${old}** has been set to **${newname}**`)
      if (db.get(`huntpet.${message.author.id}.name`) === "chicken" || db.get(`huntpet.${message.author.id}.name`) === old) {
        db.set(`chicken.${message.author.id}.name`, newname)
        db.set(`huntpet.${message.author.id}.name`, newname)
      } else {
        db.set(`chicken.${message.author.id}.name`, newname)
      }
      
    } else
    
    if (args[1].toLowerCase() === "rabbit" || args[1] === db.get(`rabbit.${message.author.id}.name`)) {
      const cek = db.get(`rabbit.${message.author.id}`)
      if (!cek) return message.channel.send(`Sorry, you do not have rabbit`)
      
      const newname = args.slice(2).join(" ")
      if (!newname) return message.channel.send(`Sorry, you need provide new name.`)
      if (newname.length > 10) return message.channel.send(`The new name word can't 10+`)
      
      const old = db.get(`rabbit.${message.author.id}.name`)
      
      message.channel.send(`Name for **${old}** has been set to **${newname}**`)
      if (db.get(`huntpet.${message.author.id}.name`) === "rabbit" || db.get(`huntpet.${message.author.id}.name`) === old) {
        db.set(`rabbit.${message.author.id}.name`, newname)
        db.set(`huntpet.${message.author.id}.name`, newname)
      } else {
        db.set(`rabbit.${message.author.id}.name`, newname)
      }
      
      
      
    } else {
      return message.channel.send(`Please provide valid name`)
    }
    
    
  } else {
  
  const name = db.get(`account.${user.id}.username`)
  
  const msg = `
  **${name}** Zoo.
  
  Pet:
  
  🐱 \`${db.get(`cat.${message.author.id}.name`) || "Empty"}\`\n**${db.get(`cat.${message.author.id}.features`) || "Empty"}**
  
  🐶 \`${db.get(`dog.${message.author.id}.name`) || "Empty"}\`\n**${db.get(`dog.${message.author.id}.features`) || "Empty"}**
  
  🐔 \`${db.get(`chicken.${message.author.id}.name`) || "Empty"}\`\n**${db.get(`chicken.${message.author.id}.features`) || "Empty"}**
  
  🐰 \`${db.get(`rabbit.${message.author.id}.name`) || "Empty"}\`\n**${db.get(`rabbit.${message.author.id}.features`) || "Empty"}**
  
  Hunt Pet:
  
  ⚔️ \`${db.get(`huntpet.${message.author.id}.name`) || `Use ${prefix}hunt set <pet_name>`}\`\n**${db.get(`huntpet.${message.author.id}.features`) || "Empty"}**
  
  Battle Pet:
  
  🔪 \`${db.get(`battlepet.${message.author.id}.name`) || `Use ${prefix}battle set <pet_name>`}\`\n**${db.get(`battlepet.${message.author.id}.features`) || "Empty"}**
  `
  
  
  message.channel.send(`${msg}`)
  }
  
  
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'zoo',
    description: 'zoo',
    usage: 'zoo'
}