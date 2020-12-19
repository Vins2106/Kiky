const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const { get } = require("node-superfetch");
const Discord = require("discord.js")

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  const user = message.mentions.users.first() || message.author;
  
  let cek = db.get(`check.${user.id}`)
  if (!cek)
    {
      return message.channel.send(`__${user.tag}__ is not login! use \`${prefix}login\` to login!`)
    }
  
  let balance = db.get(`balance.${user.id}.wallet`)
  let bank = db.get(`balance.${user.id}.bank`)
  if (balance === null || balance === undefined) balance = 0;
  if (bank === null || bank === undefined) bank = 0;
  

  
  const acc = db.get(`account.${user.id}.username`)
  const id = db.get(`account.${user.id}.id`)
  let level = db.get(`leveling.${user.id}.level`);
  let exp = db.get(`leveling.${user.id}.xp`);  
  if (!level) level = '0'
  if (!exp) exp = '0'
  
  const m = await message.channel.send('**Load image...**')
  
    const { Canvas } = require("canvas-constructor")

  async function createCanvas() {
    var imageUrlRegex = /\?size=2048$/g;
    var namam = acc + '#' + id;
    var jadim = namam.length > 10 ? namam.substring(0, 12) + "..." : namam;
    var {body: avatar} = await get(user.displayAvatarURL({dynamic: true, format: 'png'}));
    var {body: background1} = await get('https://i.pinimg.com/originals/8e/8c/72/8e8c72a1459ad7332b14306bea1af865.gif')
    var {body: background2} = await get('https://cdn.discordapp.com/attachments/492914262482878485/493210917488558111/1537660968355.png');
    var {body: dIcon} = await get('https://orig00.deviantart.net/2133/f/2016/200/f/a/discord_token_icon_dark_by_flexo013-daaj71i.png')
    var {body: FiSh} = await get('https://twemoji.maxcdn.com/2/72x72/1f3a3.png')
    var {body: cIcon} = await get('https://cdn.discordapp.com/attachments/492914262482878485/494027120557817866/chat-message-text-bubble-chatbubble-comment-speech-6-14759.png');
    var {body: wIcon} = await get('https://cdn.discordapp.com/attachments/501064603233681411/502354808750080002/1f4bc.png') 

  return new Canvas(600, 600)
    .setColor('#000000')
    .addImage(background1, 0,0,600,600)
    .addBeveledImage(background2, 0,0,600,600)
    .addImage(dIcon, 190,250,55,55)
    .setTextFont('30px NotoEmoji, RobotoRegular') 
    .addText(`User Tag: ${acc}#${id}`, 250, 285)
    .setTextFont('30px Impact') 
    .setTextFont('30px Impact')
    .addText('_______________________', 150,500)
    .setTextFont('bold 28px Courier New')
   // .addImage(cIcon, 300,355,40,40)
    .addText('Wallet', 290,385)
    .setTextFont('17px NotoEmoji')
    .addText(`${balance.toLocaleString()}`, 295, 413)
    .setTextFont('bold 30px Courier New')
    .addText('Level', 172,390)
    .setTextFont('17px RobotoRegular') 
    .addText('Bank', 180, 530)
    .addText('XP', 180, 560)
    .addText(`${bank.toLocaleString()}`, 370, 530)
    .addText(`${exp.toLocaleString()}`, 370, 560)
    .setTextAlign('center')
    .setTextFont('bold 20px Courier New')
    .setTextFont('bold 40px Courier New')
    .addText(`${level.toLocaleString()}`, 220,450)
    .setColor("#459466")
    .setTextFont("16px RobotoRegular")
    .setColor("#000000")
    .setTextAlign("center")
    .addRoundImage(avatar, 10, 190, 168, 168, 168/2)
    .toBufferAsync();
  }
  
  const attachment = new Discord.MessageAttachment(await createCanvas(), 'profile.png')
  
  message.channel.send(attachment).then(() => m.delete())
  

  
}

exports.conf = {
    aliases: ['balance', 'bal', 'coin', 'pf'],
    cooldown: "5"
}

exports.help = {
    name: 'profile',
    description: 'Get user profile/balance/cash',
    usage: 'profile <@user>'
}