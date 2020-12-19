const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const ms = require("parse-ms")

let items = [
  "coin",
  "coin",
  "coin",
  "coin",
  "coin",
  "coin",
  "coin",
  "level",
  "xp",
  "lotre"
]

const item1 = items[Math.floor(Math.random() * items.length)];
const item2 = items[Math.floor(Math.random() * items.length)];

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
    const user = message.author;
  
  let cek = db.get(`check.${user.id}`)
  if (!cek)
    {
      return message.channel.send(`__${user.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  

  
  if (args[0] === "set") {
    if (!args[1]) return message.channel.send(`Sorry, you need provide the pet name`)
    
    if (args[1] === "cat" || args[1] === db.get(`cat.${message.author.id}.name`)) {
      const catty = db.get(`cat.${message.author.id}`)
      if (!catty) return message.channel.send(`Sorry, you do not have cat`)
      if (db.get(`huntpet.${message.author.id}.name`) === "cat") return message.channel.send(`Sorry, cat already set to hunt pet!`)
      
      
      message.channel.send(`Hunt pet has been set to **cat**`)
      db.set(`huntpet.${message.author.id}`, {name: db.get(`cat.${message.author.id}.name`), features: db.get(`cat.${message.author.id}.features`), id: "cat"})
    }
    
    if (args[1] === "dog" || args[1] === db.get(`dog.${message.author.id}.name`)) {
            const dogi = db.get(`dog.${message.author.id}`)
      if (!dogi) return message.channel.send(`Sorry, you do not have dog`)
      if (db.get(`huntpet.${message.author.id}.name`) === "dog") return message.channel.send(`Sorry, dog already set to hunt pet!`)
      
      
      message.channel.send(`Hunt pet has been set to **dog**`)
      db.set(`huntpet.${message.author.id}`, {name: db.get(`dog.${message.author.id}.name`), features: db.get(`dog.${message.author.id}.features`), id: "dog"})
    }
    
    if (args[1] === "chicken" || args[1] === db.get(`chicken.${message.author.id}.name`)) {
            const chi = db.get(`chicken.${message.author.id}`)
      if (!chi) return message.channel.send(`Sorry, you do not have chicken`)
      if (db.get(`huntpet.${message.author.id}.name`) === "chicken") return message.channel.send(`Sorry, chicken already set to hunt pet!`)
      
      
      message.channel.send(`Hunt pet has been set to **chicken**`)
      db.set(`huntpet.${message.author.id}`, {name: db.get(`chicken.${message.author.id}.name`), features: db.get(`chicken.${message.author.id}.features`), id: "chicken"})
    }
    
    if (args[1] === "rabbit" || args[1] === db.get(`rabbit.${message.author.id}.name`)) {
            const rab = db.get(`rabbit.${message.author.id}`)
      if (!rab) return message.channel.send(`Sorry, you do not have rabbit`)
      if (db.get(`huntpet.${message.author.id}.name`) === "rabbit") return message.channel.send(`Sorry, rabbit already set to hunt pet!`)
      
      
      message.channel.send(`Hunt pet has been set to **rabbit**`)
      db.set(`huntpet.${message.author.id}`, {name: db.get(`rabbit.${message.author.id}.name`), features: db.get(`rabbit.${message.author.id}.features`), id: "rabbit"})
    }
  } else {
      const huntpent = db.get(`huntpet.${message.author.id}`)
  if (!huntpent) return message.channel.send(`Sorry, you need set a pet to hunt! use \`${prefix}hunt set <animal_name>\``)

            let pad_zero = num => (num < 10 ? '0' : '') + num;
    let cooldown = 300000;
  

  

    let lastDaily = await db.get(`hunt.${message.author.id}`);

    try {
        
        if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
            let timeObj = ms(cooldown - (Date.now() - lastDaily));

       
                let mins = pad_zero(timeObj.minutes).padStart(2, "0"),
                secs = pad_zero(timeObj.seconds).padStart(2, "0");

            let finalTime = `**${mins}:${secs}**`;
            return message.channel.send(`Sorry, you can't hunting after ${finalTime}.`);
        } else {
          
          let bal = db.get(`balance.${message.author.id}.wallet`)
          let need = 50;
          
          if (need > bal) return message.channel.send(`Sorry, you need **50** :coin: to hunting`)
          
          db.subtract(`balance.${message.author.id}.wallet`, need)
          
                  let table1 = [];
    let table2 = [];
    

    
 
    const embed1 = new MessageEmbed()
    .setAuthor(message.author.username + ` & ${db.get(`huntpet.${message.author.id}.name`)} is hunting. . .`, message.author.displayAvatarURL())
    .setColor(color)
    .setDescription(`Loading...`)
    
    const m = await message.channel.send(embed1)
    
    if (db.get(`huntpet.${message.author.id}.id`) === "cat") {
              if (item1 === "coin") {
          let amount = Math.floor(Math.random() * 99)
          let plus = random(150, 250);
          let final = amount + plus
          
      db.add(`balance.${message.author.id}.wallet`, final)
      table1.push(`Coin ${final}`)
    }
    
    if (item1 === "level") {
      
      db.add(`level.${message.author.id}`, 1)
      table1.push(`Level 1`)
    }
    
    if (item1 === "lotre") {
      db.add(`lotre.${message.author.id}`, 1)
      table1.push(`Lotre 1`)
    }
    
    if (item1 === "xp") {
      db.add(`xp.${message.author.id}`, 1)
      table1.push(`XP 1`)
    }
    } else     if (db.get(`huntpet.${message.author.id}.id`) === "dog") {
              if (item1 === "coin") {
          let amount = Math.floor(Math.random() * 99)
          let plus = random(250, 350);
          let final = amount + plus
          
      db.add(`balance.${message.author.id}.wallet`, final)
      table1.push(`Coin ${final}`)
    }
    
    if (item1 === "level") {
      
      db.add(`level.${message.author.id}`, 1)
      table1.push(`Level 1`)
    }
    
    if (item1 === "lotre") {
      db.add(`lotre.${message.author.id}`, 1)
      table1.push(`Lotre 1`)
    }
    
    if (item1 === "xp") {
      db.add(`xp.${message.author.id}`, 1)
      table1.push(`XP 1`)
    }
    } else     if (db.get(`huntpet.${message.author.id}.id`) === "chicken") {
              if (item1 === "coin") {
          let amount = Math.floor(Math.random() * 99)
          let plus = random(350, 500);
          let final = amount + plus
          
      db.add(`balance.${message.author.id}.wallet`, final)
      table1.push(`Coin ${final}`)
    }
    
    if (item1 === "level") {
      
      db.add(`level.${message.author.id}`, 1)
      table1.push(`Level 1`)
    }
    
    if (item1 === "lotre") {
      db.add(`lotre.${message.author.id}`, 1)
      table1.push(`Lotre 1`)
    }
    
    if (item1 === "xp") {
      db.add(`xp.${message.author.id}`, 1)
      table1.push(`XP 1`)
    }
    } else     if (db.get(`huntpet.${message.author.id}.id`) === "rabbit") {
              if (item1 === "coin") {
          let amount = Math.floor(Math.random() * 99)
          let plus = random(500, 750);
          let final = amount + plus
          
      db.add(`balance.${message.author.id}.wallet`, final)
      table1.push(`Coin ${final}`)
    }
    
    if (item1 === "level") {
      
      db.add(`level.${message.author.id}`, 1)
      table1.push(`Level 1`)
    }
    
    if (item1 === "lotre") {
      db.add(`lotre.${message.author.id}`, 1)
      table1.push(`Lotre 1`)
    }
    
    if (item1 === "xp") {
      db.add(`xp.${message.author.id}`, 1)
      table1.push(`XP 1`)
    }
    } else {
              if (item1 === "coin") {
          let amount = Math.floor(Math.random() * 99)
          
      db.add(`balance.${message.author.id}.wallet`, amount)
      table1.push(`Coin ${amount}`)
    }
    
    if (item1 === "level") {
      
      db.add(`level.${message.author.id}`, 1)
      table1.push(`Level 1`)
    }
    
    if (item1 === "lotre") {
      db.add(`lotre.${message.author.id}`, 1)
      table1.push(`Lotre 1`)
    }
    
    if (item1 === "xp") {
      db.add(`xp.${message.author.id}`, 1)
      table1.push(`XP 1`)
    }
    }
    
//           
              if (db.get(`huntpet.${message.author.id}.id`) === "cat") {
              if (item2 === "coin") {
          let amount = Math.floor(Math.random() * 99)
          let plus = random(150, 250);
          let final = amount + plus
          
      db.add(`balance.${message.author.id}.wallet`, final)
      table2.push(`Coin ${final}`)
    }
    
    if (item2 === "level") {
      
      db.add(`level.${message.author.id}`, 1)
      table2.push(`Level 1`)
    }
    
    if (item2 === "lotre") {
      db.add(`lotre.${message.author.id}`, 1)
      table2.push(`Lotre 1`)
    }
    
    if (item2 === "xp") {
      db.add(`xp.${message.author.id}`, 1)
      table2.push(`XP 1`)
    }
    } else     if (db.get(`huntpet.${message.author.id}.id`) === "dog") {
              if (item2 === "coin") {
          let amount = Math.floor(Math.random() * 99)
          let plus = random(250, 350);
          let final = amount + plus
          
      db.add(`balance.${message.author.id}.wallet`, final)
      table2.push(`Coin ${final}`)
    }
    
    if (item2 === "level") {
      
      db.add(`level.${message.author.id}`, 1)
      table2.push(`Level 1`)
    }
    
    if (item2 === "lotre") {
      db.add(`lotre.${message.author.id}`, 1)
      table2.push(`Lotre 1`)
    }
    
    if (item2 === "xp") {
      db.add(`xp.${message.author.id}`, 1)
      table2.push(`XP 1`)
    }
    } else     if (db.get(`huntpet.${message.author.id}.id`) === "chicken") {
              if (item2 === "coin") {
          let amount = Math.floor(Math.random() * 99)
          let plus = random(350, 500);
          let final = amount + plus
          
      db.add(`balance.${message.author.id}.wallet`, final)
      table2.push(`Coin ${final}`)
    }
    
    if (item2 === "level") {
      
      db.add(`level.${message.author.id}`, 1)
      table2.push(`Level 1`)
    }
    
    if (item2 === "lotre") {
      db.add(`lotre.${message.author.id}`, 1)
      table2.push(`Lotre 1`)
    }
    
    if (item2 === "xp") {
      db.add(`xp.${message.author.id}`, 1)
      table2.push(`XP 1`)
    }
    } else     if (db.get(`huntpet.${message.author.id}.id`) === "rabbit") {
              if (item2 === "coin") {
          let amount = Math.floor(Math.random() * 99)
          let plus = random(500, 750);
          let final = amount + plus
          
      db.add(`balance.${message.author.id}.wallet`, final)
      table2.push(`Coin ${final}`)
    }
    
    if (item2 === "level") {
      
      db.add(`level.${message.author.id}`, 1)
      table2.push(`Level 1`)
    }
    
    if (item2 === "lotre") {
      db.add(`lotre.${message.author.id}`, 1)
      table2.push(`Lotre 1`)
    }
    
    if (item2 === "xp") {
      db.add(`xp.${message.author.id}`, 1)
      table2.push(`XP 1`)
    }
    } else {
              if (item2 === "coin") {
          let amount = Math.floor(Math.random() * 99)
          
      db.add(`balance.${message.author.id}.wallet`, amount)
      table2.push(`Coin ${amount}`)
    }
    
    if (item2 === "level") {
      
      db.add(`level.${message.author.id}`, 1)
      table2.push(`Level 1`)
    }
    
    if (item2 === "lotre") {
      db.add(`lotre.${message.author.id}`, 1)
      table2.push(`Lotre 1`)
    }
    
    if (item2 === "xp") {
      db.add(`xp.${message.author.id}`, 1)
      table2.push(`XP 1`)
    }
    }
          
          
    const embed2 = new MessageEmbed()
    .setAuthor(" Succesfully Hunting", message.author.displayAvatarURL())
    .setColor(color)
    .setDescription(`You find:\n1 : \`${table1}\`\n2 : \`${table2}\``)
    
    setTimeout(function() {
      m.edit(embed2)
      
    }, 3000)
            db.set(`hunt.${message.author.id}`, Date.now())
            
     
          
        }

    } catch (error) {
        console.log(error);
        return message.channel.send(`Oopsie, unknown error I guess: ${error}`);
    }
    

    

    
  }

  
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

exports.conf = {
    aliases: ['hunting'],
    cooldown: "5"
}

exports.help = {
    name: 'hunt',
    description: 'Hunting a coin & some items',
    usage: 'hunt'
}