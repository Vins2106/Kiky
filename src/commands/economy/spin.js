const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const ms = require('parse-ms')

exports.run = async (client, message, args, color, prefix, api, CanvasRenderService, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
      let cek = db.get(`check.${message.author.id}`)
  if (!cek)
    {
      return message.channel.send(`__${message.author.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
      let pad_zero = num => (num < 10 ? '0' : '') + num;
    let cooldown = 300000;
  
  let a = ["100", "100", "100", "100", "100", "100", "200", "300", "400", "500"]
  
    let amount = a[Math.floor(Math.random() * a.length)]; 

    let lastDaily = await db.get(`test.${message.author.id}`);
    let buck = await db.get(`account.${message.author.id}.balance`);

    try {
        
        if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
            let timeObj = ms(cooldown - (Date.now() - lastDaily));

       
                let mins = pad_zero(timeObj.minutes).padStart(2, "0"),
                secs = pad_zero(timeObj.seconds).padStart(2, "0");

            let finalTime = `**${mins}:${secs}**`;
            return message.channel.send(`Sorry, you can't spin after ${finalTime}.`);
        } else {
          
          const embed1 = new MessageEmbed()
          .setAuthor(`Spinner. . .`, 'https://media0.giphy.com/media/WRRJbQYlTtn6TXOLUj/giphy.gif')
          .setColor(color)
          .setImage('https://media0.giphy.com/media/WRRJbQYlTtn6TXOLUj/giphy.gif')
          .setFooter(`Spinner...`)
          
          const m = await message.channel.send(embed1)
          
          setTimeout(async function() {
            
            const embed2 = new MessageEmbed()
            .setAuthor(`Succesfully.`, 'https://media0.giphy.com/media/WRRJbQYlTtn6TXOLUj/giphy.gif')
            .setColor(color)
            .setDescription(`Congratulations, you won **${amount}** :coin:`)
            .setFooter(`Succes`)
            
            m.edit(embed2)
            
            db.add(`balance.${message.author.id}.wallet`, amount)
            db.set(`test.${message.author.id}`, Date.now())
            
          }, 3000)
          
        }

    } catch (error) {
        console.log(error);
        return message.channel.send(`Oopsie, unknown error I guess: ${error}`);
    }
  
  
}

exports.conf = {
    aliases: ['spinner'],
    cooldown: "5"
}

exports.help = {
    name: 'spin',
    description: 'Spin every 5 minutes',
    usage: 'spin <amount>'
}