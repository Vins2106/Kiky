const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
    const user = message.author;
  
  let cek = db.get(`check.${user.id}`)
  if (!cek)
    {
      return message.channel.send(`__${user.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
      const pets = new Map()
    
    const cat = {
      name: "cat",
      amount: "150",
      features: "Add 150 - 250 coin on hunting",
      id: "252"
    }
    const dog = {
      name: "dog",
      amount: "250",
      features: "Add 250 - 350 coin on hunting",
      id: "774"
    }    
    const chicken = {
      name: "chicken",
      amount: "550",
      features: "Add 350 - 500 coin on hunting",
      id: "387"
    }
    const rabbit = {
      name: "rabbit",
      amount: "1150",
      id: "588",
      features: "Add 500 - 750 coin on hunting"
    }    
    const petss = [cat, dog, chicken, rabbit]
    
    pets.set(message.guild.id, petss)
    
    let data = pets.get(message.guild.id)
    
    const x = data.slice()
  
  
  if (args[0] === 'buy') {
    if (!args[1]) {
      return message.channel.send(`Sorry, you need provide pet id or name!`)
    }
    
    let bal = db.get(`balance.${message.author.id}.wallet`)
    
    
    if (args[1] === "252" || args[1] === "cat") {
      let amount = cat.amount;
      
      if (amount > bal) return message.channel.send(`Sorry, you need **${amount}** :coin: for buy this item.`)
      
      let cats = db.get(`cat.${message.author.id}`)
      if (cats) return message.channel.send(`Sorry, you already have cat`)
      
      message.channel.send(`**${message.author.tag}** buy **cat** for **${amount}** :coin:`)
      let datas = cat
      
      db.set(`cat.${message.author.id}`, {name: cat.name, features: cat.features})
      db.subtract(`balance.${message.author.id}.wallet`, amount)
      
    } else 
    
    if (args[1] === "774" || args[1] === "dog") {
      let amount = dog.amount
      
      if (amount > bal) return message.channel.send(`Sorry, you need **${amount}** :coin: for buy this item.`)
      
      let dogs = db.get(`dog.${message.author.id}`)
      if (dogs) return message.channel.send(`Sorry, you already have dog`)
      
      message.channel.send(`**${message.author.tag}** buy **dog** for **${amount}** :coin:`)
      let datas = dog
      
      db.set(`dog.${message.author.id}`, {name: dog.name, features: dog.features})
      db.subtract(`balance.${message.author.id}.wallet`, amount)      
    } else 
    
    if (args[1] === "387" || args[1] === "chicken") {
      let amount = chicken.amount
      
      if (amount > bal) return message.channel.send(`Sorry, you need **${amount}** :coin: for buy this item.`)
      
      let chickens = db.get(`chicken.${message.author.id}`)
      if (chickens) return message.channel.send(`Sorry, you already have chicken`)
      
      message.channel.send(`**${message.author.tag}** buy **chicken** for **${amount}** :coin:`)
      let datas = chicken
      
      db.set(`chicken.${message.author.id}`, {name: chicken.name, features: chicken.features})
      db.subtract(`balance.${message.author.id}.wallet`, amount)      
    } else 
    
    if (args[1] === "588" || args[1] === "rabbit") {
      let amount = rabbit.amount
      
      if (amount > bal) return message.channel.send(`Sorry, you need **${amount}** :coin: for buy this item.`)
      
      let rabbits = db.get(`rabbit.${message.author.id}`)
      if (rabbits) return message.channel.send(`Sorry, you already have rabbit`)
      
      message.channel.send(`**${message.author.tag}** buy **rabbit** for **${amount}** :coin:`)
      let datas = rabbit
      
      db.set(`rabbit.${message.author.id}`, {name: rabbit.name, features: rabbit.features})
      db.subtract(`balance.${message.author.id}.wallet`, amount)      
    } else {
      message.channel.send(`Pet not found!`)
    }
    
  } else {
    
    const embed = new MessageEmbed()
    .setAuthor(client.user.username + " Pet's Shop", client.user.displayAvatarURL())
    .setColor(color)
    .setFooter(`use ${prefix}petshop buy <pet_id>`)
    .setDescription(x.map(d => `**${d.name} [\`#${d.id}\`]**\nFeatures: **${d.features}**\nNeed Coin: **${d.amount}** :coin:`).join("\n\n"))
    
    message.channel.send(embed)
  }
  
  
}

exports.conf = {
    aliases: ['ps'],
    cooldown: "5"
}

exports.help = {
    name: 'petshop',
    description: 'Buy a pet',
    usage: 'petshop buy <pet_id>'
}