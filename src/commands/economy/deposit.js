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
               let amount = db.get(`balance.${message.author.id}.wallet`)
  
  if (!amount)
    {
      return message.channel.send("Sorry, you do not have coin!")
    }
  
  
  
  return message.channel.send(`Succesfully deposit **${amount}** 🪙 to bank`).then(() => {
      db.subtract(`balance.${message.author.id}.wallet`, amount)
  db.add(`balance.${message.author.id}.bank`, amount)
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
      
      
      let bal = db.get(`balance.${message.author.id}.wallet`)
      if (amount > bal)
        {
          return message.channel.send(`Sorry, you do not have **${amount}** on wallet!`)
        }
      
      return message.channel.send(`Succesfully deposit **${amount}** to bank!`).then(() => {
              db.subtract(`balance.${message.author.id}.wallet`, amount)
  db.add(`balance.${message.author.id}.bank`, amount)
      })
      
      
    }

}

exports.conf = {
    aliases: ['dep'],
    cooldown: "5"
}

exports.help = {
    name: 'deposit',
    description: 'Deposit your coin from wallet to bank',
    usage: 'deposit <amount/all>'
}