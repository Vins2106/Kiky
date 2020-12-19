const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  let user = message.author;
    let cek = db.get(`check.${user.id}`)
  if (!cek)
    {
      return message.channel.send(`__${message.author.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
      const xp = {
    amount: "10",
    buy: "xp",
    desc: "Buy xp and get free 25xp."
  }
  
  const level = {
    amount: "1000",
    buy: "level",
    desc: "If you buy level, you can upgrade to next level."
  }
  
  const lotre = {
    amount: "50",
    buy: "lotre",
    desc: "You can got jackpot from buy lotre"
  }
  
  let item = {
    xp: xp,
    level: level,
    lotre: lotre
  }
  
  let map = new Map();
    
    map.set(message.guild.id, item)
  
  
  if (!args[0]) {
  
    let x = map.get(message.guild.id)
    
  const embed = new MessageEmbed()
  .setAuthor(client.user.username + " Shop", client.user.displayAvatarURL())
  .setColor(color)
  .setFooter(`type: <prefix>shop buy [item]`)
  .addField(`XP (${x.xp.amount} 🪙)`, `${prefix}**shop buy ${x.xp.buy}**\n\`${x.xp.desc}\``)
  .addField(`Level (${x.level.amount} 🪙)`, `${prefix}**shop buy ${x.level.buy}**\n\`${x.level.desc}\``)
  .addField(`Lotre (${x.lotre.amount} 🪙)`, `${prefix}**shop buy ${x.lotre.buy}**\n\`${x.lotre.desc}\``)
  
  message.channel.send(embed)
  
  }
  
  if (args[0] === "buy") {
    let ar = args[1]
    if (!ar) return message.channel.send(`Sorry, you need provide the item name (\`<prefix>shop\`)`)
    let bal = db.get(`balance.${message.author.id}.wallet`)
    
    
    
    if (args[1] === "xp") {
      let p = map.get(message.guild.id);
      
      if (p.xp.amount > bal) return message.channel.send(`Sorry, you coin on wallet not enough`);
      
      message.channel.send(`__${message.author.tag}__ buy **${p.xp.buy}** for **1x**`)
            db.subtract(`balance.${message.author.id}.wallet`, p.xp.amount)
      db.add(`${p.xp.buy}.${message.author.id}`, 1)
    }
    
        if (args[1] === "level") {
      let p = map.get(message.guild.id);
      
      if (p.level.amount > bal) return message.channel.send(`Sorry, you coin on wallet not enough`);
      
      message.channel.send(`__${message.author.tag}__ buy **${p.level.buy}** for **1x**`)
      db.subtract(`balance.${message.author.id}.wallet`, p.level.amount)
      db.add(`${p.level.buy}.${message.author.id}`, 1)
      
    }
    
        if (args[1] === "lotre") {
      let p = map.get(message.guild.id);
      
      if (p.lotre.amount > bal) return message.channel.send(`Sorry, you coin on wallet not enough`);
      
      message.channel.send(`__${message.author.tag}__ buy **${p.lotre.buy}** for **1x**`)
                db.subtract(`balance.${message.author.id}.wallet`, p.lotre.amount)
      db.add(`${p.lotre.buy}.${message.author.id}`, 1)
    }
  }
  
  
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'shop',
    description: 'Get shop items list and buy a items',
    usage: 'shop'
}