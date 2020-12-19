const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
    let cek = db.get(`check.${message.author.id}`)
  if (!cek)
    {
      return message.channel.send(`__${message.author.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
  
  if (args[0] === "all")
    {
               let amount = db.get(`balance.${message.author.id}.bank`)
  
  if (!amount)
    {
      return message.channel.send("Sorry, you do not have coin on bank!")
    }
  
  
  
  return message.channel.send(`Succesfully withdraw **${amount}** 🪙 to wallet`).then(() => {
      db.subtract(`balance.${message.author.id}.bank`, amount)
  db.add(`balance.${message.author.id}.wallet`, amount)
  })
    } else {
            let amount = args[0]
      if (!amount)
        {
          return message.channel.send("Please provide amount!")
        }
      
      if (isNaN(amount))
        {
          return message.channel.send("The amount must be a number!")
        }
      if (amount == "0")
        {
          return message.channel.send("The amount can't be 0!")
        }
      
      let bal = db.get(`balance.${message.author.id}.bank`)
      if (amount > bal)
        {
          return message.channel.send(`Sorry, you do not have **${amount}** on bank!`)
        }
      
      return message.channel.send(`Succesfully withdraw **${amount}** to wallet!`).then(() => {
              db.subtract(`balance.${message.author.id}.bank`, amount)
  db.add(`balance.${message.author.id}.wallet`, amount)
      })
      
      
    }

}

exports.conf = {
    aliases: ['with'],
    cooldown: "5"
}

exports.help = {
    name: 'withdraw',
    description: 'Withdraw your coin from bank to wallet',
    usage: 'withdraw <amount/all>'
}