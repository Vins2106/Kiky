const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  let user = message.author;
  
    let cek = db.get(`check.${user.id}`)
  if (!cek)
    {
      return message.channel.send(`__${user.tag}__ is not login! use \`${prefix}login\` to login!`)
    }

  
  
  if (args[0] === "set") {
    if (!args[1]) return message.channel.send(`Sorry, you need provide pet name`)
    
    if (args[1] === "cat" || args[1] === db.get(`cat.${message.author.id}.name`)) {
      let petcek = db.get(`cat.${message.author.id}`)
      if (!petcek) return message.channel.send(`Sorry, you do not have cat`)
      
      let petcek2 = db.get(`battlepet.${message.author.id}.id`)
      if (petcek2 === "cat") return message.channel.send(`Sorry, cat already set to battle pet`)
      
      message.channel.send(`**cat** has been set to battle pet`)
      let data = {
        name: db.get(`cat.${message.author.id}.name`),
        features: db.get(`cat.${message.author.id}.features`),
        id: "cat"
      }
      db.set(`battlepet.${message.author.id}`, data)
      
    } else if (args[1]=== "dog" || args[1] === db.get(`dog.${message.author.id}.name`)) {
      let petcek = db.get(`dog.${message.author.id}`)
      if (!petcek) return message.channel.send(`Sorry, you do not have dog`)
      
      let petcek2 = db.get(`battlepet.${message.author.id}.id`)
      if (petcek2 === "dog") return message.channel.send(`Sorry, dog already set to battle pet`)
      
      message.channel.send(`**dog** has been set to battle pet`)
      let data = {
        name: db.get(`dog.${message.author.id}.name`),
        features: db.get(`dog.${message.author.id}.features`),
        id: "dog"
      }
      db.set(`battlepet.${message.author.id}`, data)      
    } else if (args[1]=== "chicken" || args[1] === db.get(`chicken.${message.author.id}`)) {
      let petcek = db.get(`chicken.${message.author.id}`)
      if (!petcek) return message.channel.send(`Sorry, you do not have chicken`)
      
      let petcek2 = db.get(`battlepet.${message.author.id}.id`)
      if (petcek2 === "chicken") return message.channel.send(`Sorry, chicken already set to battle pet`)
      
      message.channel.send(`**chicken** has been set to battle pet`)
      let data = {
        name: db.get(`chicken.${message.author.id}.name`),
        features: db.get(`chicken.${message.author.id}.features`),
        id: "chicken"
      }
      db.set(`battlepet.${message.author.id}`, data)      
    } else if (args[1]=== "rabbit" || args[1] === db.get(`rabbit.${message.author.id}.name`)) {
      let petcek = db.get(`rabbit.${message.author.id}`)
      if (!petcek) return message.channel.send(`Sorry, you do not have rabbit`)
      
      let petcek2 = db.get(`battlepet.${message.author.id}.id`)
      if (petcek2 === "rabbit") return message.channel.send(`Sorry, rabbit already set to battle pet`)
      
      message.channel.send(`**rabbit** has been set to battle pet`)
      let data = {
        name: db.get(`rabbit.${message.author.id}.name`),
        features: db.get(`rabbit.${message.author.id}.features`),
        id: "rabbit"
      }
      db.set(`battlepet.${message.author.id}`, data)      
    } else {
      message.channel.send(`Pet not found!`)
    } 
    
  } else {
    
  let petcekbattle = db.get(`battlepet.${message.author.id}`)
  if (!petcekbattle) return message.channel.send(`Sorry, you do not set pet to battle! use \`${prefix}battle set <animal_name>\``)
  
  let user2 = message.mentions.users.first()
  
  if (!user2) {
    user2 = "AI"
  } else {
       if (user2.bot) return message.channel.send(`You can't battle with bot, bot op`)
    
        let wk = db.get(`check.${user2.id}`)
  if (!wk)
    {
      return message.channel.send(`__${user2.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
    
      let petcekbattle2 = db.get(`battlepet.${user2.id}`)
  if (!petcekbattle2) return message.channel.send(`Sorry, **${user2.username}** do not set pet to battle! use \`${prefix}battle set <animal_name>\``)
    
  }
  
  
  
  let battlerandom = random(1, 20)
  
  let coin = random(1, 100)
  
  if (user2 == 'AI') {
    let won;
    let text;
    let hdh;
    
    if (battlerandom < 10) {
      won = "win";
      text = "{user1} won, and {user2} lose :("
      hdh = coin;
    } else if (battlerandom > 10) {
      won = "lose"
      text = "{user2} won, and {user1} lose :("
      hdh = coin;
    }
    
    let p = ["Jack", "Kiky", "Carl", "Fin"];
    let userai = p[Math.floor(Math.random() * p.length)];
    
    
    let final = text.replace(/{user1}/g, message.author.username).replace(/{user2}/g, `${userai} (AI)`)
    return message.channel.send(`**${final}**, :tada:`);
  } else {
  
  let accept = ["accept", "yes", "yea", "yeah", "yap", "yep"]
  let cancel = ["cancel", "no", "nop", "nope", "not"]
  
  message.channel.send(`<@${user2.id}>, do you want to battle with <@${message.author.id}>? type \`accept\` to accept, and type \`cancel\` to cancel\nnote: \`timeout: 10s (seconds)\``)
  
    const filter = x => {

    return (x.author.id === user2.id);

};

  let wons;
  let texts;
  let hdhs;
  
  if (battlerandom < 10) {
    let wons = "lose";
    let texts = "{user2} won! congrats, you won {hdhs}."
    hdhs = coin;
  } else if (battlerandom > 10) {
    wons = "win";
    texts = "{user1} won! congrats, you won {hdhs}"
    hdhs = coin;
  } 
  

  
const acc = await message.channel.awaitMessages(filter, {max: 1, time: 10000});
  
  if (!acc.size) return message.channel.send(`The user canceled the battle (do not answer)`)
  

 

  let accmsg = acc.first().content.toLowerCase();
  
    let cooldown = 60000;
    let ms = require('parse-ms')
    let pad_zero = num => (num < 10 ? '0' : '') + num;
    
    let battle1 = await db.get(`battle.${message.author.id}`);
    let battle2 = await db.get(`battle.${user2.id}`)
    try {
              if (battle1 !== null && cooldown - (Date.now() - battle1) > 0) {
            let timeObj = ms(cooldown - (Date.now() - battle1));

       
                let mins = pad_zero(timeObj.minutes).padStart(2, "0"),
                secs = pad_zero(timeObj.seconds).padStart(2, "0");

            let finalTime = `**${mins}:${secs}**`;
            return message.channel.send(`Sorry, you battle after ${finalTime}.`);
                
              } else {
                                    if (battle2 !== null && cooldown - (Date.now() - battle2) > 0) {
            let timeObj = ms(cooldown - (Date.now() - battle2));

       
                let mins = pad_zero(timeObj.minutes).padStart(2, "0"),
                secs = pad_zero(timeObj.seconds).padStart(2, "0");

            let finalTime = `**${mins}:${secs}**`;
            return message.channel.send(`Sorry, you **${user2.username}** can't battle after ${finalTime}.`);
              } else {
                
                      let finalmsg;
  
    let uwaw = texts.replace(/{user1}/g, db.get(`battlepet.${message.author.id}.name`)).replace(/{user2}/g, db.get(`battlepet.${message.author.id}.name`)).replace(/{hdhs}/g, coin)  
  
                    if (wons == "win") {
    finalmsg = uwaw;
    db.add(`balance.${message.author.id}.wallet`, coin)
    db.set(`toppet.${message.author.id}.petowner`, message.author.id)
    db.add(`toppet.${message.author.id}.amount`, 1)
    db.set(`toppet.${message.author.id}.name`, db.get(`battlepet.${message.author.id}.name`))
  } else if (wons == "lose") {
    finalmsg = uwaw;
    db.add(`balance.${user2.id}.wallet`, coin)
    db.set(`toppet.${user2.id}.petowner`, user2.id)
    db.add(`toppet.${user2.id}.amount`, 1)
    db.set(`toppet.${user2.id}.name`, db.get(`battlepet.${user2.id}.name`))
  
  }
    
const vsmsg = await message.channel.send(`**${message.author.username}** vs **${user2.username}**`)  
setTimeout(function() {
    if (accept.includes(accmsg)) return vsmsg.edit(finalmsg + ` :tada:`)
   if (cancel.includes(accmsg)) return message.channel.send(`Canceled, the user cancel the battle`)
    


  if (!accept.includes(accmsg) || !cancel.includes(accmsg)) return message.channel.send(`Wrong answer! (\`accept/cancel\`)`)
                db.set(`battle.${message.author.id}`, Date.now())
                db.set(`battle.${user2.id}`, Date.now())
}, 3000)
 

              }
              }
      
              
    } catch (e) {
      return;
    }
    

  }
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

exports.conf = {
    aliases: ['fight'],
    cooldown: "5"
}

exports.help = {
    name: 'battle',
    description: 'Battle with other player/ai for get xp or money',
    usage: 'battle'
}