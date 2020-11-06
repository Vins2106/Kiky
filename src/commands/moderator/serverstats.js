const db = require('quick.db');
const serverstats = new db.table('ServerStats');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if(!message.member.hasPermission('MANAGE_SERVERS')) return message.channel.send(`:x: You need **MANAGE_GUILD** permission to use this command.`)
if (!args[0]) return message.channel.send(":x: Invalid parameters. Correct usage: `.serverstats enable` | `.serverstats disable`.");  
if(args[0] === 'enable') {
let totusers = await serverstats.fetch(`Statss_${message.guild.id}`, { target: '.totusers' })
let membcount = await serverstats.fetch(`Statss_${message.guild.id}`, { target: '.membcount' })
let botcount = await serverstats.fetch(`Statss_${message.guild.id}`, { target: '.botcount' })
if(totusers !== null || membcount !== null || botcount !== null) return message.channel.send(`:x: Server stats are already enabled for this server.`)
if(!message.guild.me.hasPermission(`MANAGE_CHANNELS`)) return message.channel.send(`:x: I don't have **MANAGE_CHANNELS** permission.`);
	const totalsize = message.guild.memberCount;
	const botsize = message.guild.members.cache.filter(m => m.user.bot).size;
	const humansize = totalsize - botsize;
message.guild.channels.create(`📈 ${message.guild.name} 📈`, {
  id: message.guild.id,
  deny: ['CONNECT'],
  type: 'category'
}).then(channel => {
channel.setPosition(0)
message.guild.channels.create("Total Users : " + totalsize, {
  id: message.guild.id,
  deny: ['CONNECT'],
  type: 'voice'
}).then(channel1 => {
channel1.setParent(channel.id)
let x = channel1.id
message.guild.channels.create("Human Users  : " + humansize, {
  id: message.guild.id,
  deny: ['CONNECT'],
  type: 'voice'
}).then(channel2 => {
channel2.setParent(channel.id)
let y = channel2.id
message.guild.channels.create("Bot Users : " + botsize, {
  id: message.guild.id,
  deny: ['CONNECT'],
  type: 'voice'
}).then(async channel3 => {
channel3.setParent(channel.id)
let z = channel3.id
await serverstats.set(`Statss_${message.guild.id}`, { guildid: message.guild.id, totusers: x, membcount: y, botcount: z, categid: channel.id})
})
})
})
})
message.channel.send(`:white_check_mark: Serverstats enabled for this server.`)
} else if (args[0] === 'disable') {
  
let totusers = await serverstats.fetch(`Statss_${message.guild.id}`, { target: '.totusers' })
let membcount = await serverstats.fetch(`Statss_${message.guild.id}`, { target: '.membcount' })
let botcount = await serverstats.fetch(`Statss_${message.guild.id}`, { target: '.botcount' })
let categ = await serverstats.fetch(`Statss_${message.guild.id}`, { target: '.categid' })
if(totusers === null || membcount === null || botcount === null) return message.channel.send(`:x: Serverstats for this server is not enabled.`)
  client.channels.cache.get(totusers).delete()
  client.channels.cache.get(membcount).delete()
  client.channels.cache.get(botcount).delete()
  client.channels.cache.get(categ).delete()
  
serverstats.delete(`Statss_${message.guild.id}`)
message.channel.send(`:white_check_mark: Serverstats disabled for this server.`) 
}
  
}

exports.conf = {
    aliases: ['ss'],
    cooldown: "5"
}

exports.help = {
    name: 'serverstats',
    description: 'Create server stats',
    usage: 'serverstats [enable/disable]'
}