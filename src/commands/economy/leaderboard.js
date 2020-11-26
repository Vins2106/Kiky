const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const moment = require("moment");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if (!args[0])
    {
      return message.channel.send(`levels, coin`)
    }
  
  if (args[0] === "levels")
    {
      
      try {
                let data = db.get("leveling");
  if (!data) return message.channel.send("Unknown generated data.");

  // Limit.
  var limit = 10; // 1 page with 15 users inside the leaderboard.
  // You can change it to 10 maybe, to decrease the embed.

  let lastpage = Math.ceil(Object.keys(data).length / limit);
  let page;
  if (!page) page = 1;
  if (page > lastpage)
    return message.channel.send(`Sorry, there is no **page ${page}**.`);

  let frompages = limit * (page - 1);
  let pageslimit = 10 * page;

  let list = Object.entries(data)
    .sort((a, b) => b[1].xp - a[1].xp)
    .slice(frompages, pageslimit);
  let arr = [];

  for (var i in list) {
    let user = await client.users.fetch(list[i][0]);

    let x = user.tag;

    arr.push(
      `**${i * 1 + 1 + frompages}.**  ${x}\n XP: **${list[i][1].xp ||
        "0"}** | Level: **${list[i][1].level || "0"}**`
    );
  }

  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor(
      `XP & Level Leaderboard`,
      client.user.displayAvatarURL({ size: 2048, dynamic: true })
    )
    .setThumbnail(client.user.displayAvatarURL({ size: 4096, dynamic: true }))
    .setDescription(arr.join("\n"));
  return message.channel.send(embed);
      } catch (e) {
        message.channel.send(`Unabel to get data or error: **${e}**`)
      }
      
    }
  
  if (args[0] === "coin")
    {
      
             let data = db.get("balance");
  if (!data) return message.channel.send("Null database");

  // Limit.
  var limit = 10; // 1 page with 15 users inside the leaderboard.
  // You can change it to 10 maybe, to decrease the embed.

  let lastpage = Math.ceil(Object.keys(data).length / limit);
  let page;
  if (!page) page = 1;
  if (page > lastpage) return message.channel.send(`Sorry, there is no **page ${page}**.`);

  let frompages = limit * (page - 1);
  let pageslimit = 10 * page;

  let list = Object.entries(data).sort((a, b) => b[1].wallet - a[1].wallet).slice(frompages, pageslimit);
  let arr = [];

  for (var i in list) {
    
    let user = await client.users.fetch(list[i][0])
    
    let x = user.tag;
    
  const acc = db.get(`account.${user.id}.username`)
  const id = db.get(`account.${user.id}.id`)
    
    arr.push(`**${i * 1 + 1 + frompages}.**  ${acc}#${id}\n  Wallet: **${list[i][1].wallet.toLocaleString() || '0'}**`);
  };

  const embed = new MessageEmbed()
  .setColor(color)
  .setAuthor(`Coin Leaderboard`, client.user.displayAvatarURL({size: 2048, dynamic: true}))
  .setThumbnail(client.user.displayAvatarURL({size: 4096, dynamic: true}))
  .setDescription(arr.join("\n"))
  return message.channel.send(embed);
    }
}

exports.conf = {
    aliases: ['lb', 'top'],
    cooldown: "5"
}

exports.help = {
    name: 'leaderboard',
    description: 'Get economy leaderboard',
    usage: 'leaderboard <page>'
}