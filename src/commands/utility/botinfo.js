const { MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../../../package.json');
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
  if (!args[0]) {
    const core = os.cpus()[0];
  const embed = new MessageEmbed()
  .setAuthor(client.user.username + " Statistics", client.user.displayAvatarURL())
  .setColor(color)
  .setThumbnail("https://cdn.discordapp.com/attachments/771735123963674635/771953807121842186/iconfinder-server2-4417099_116631.png")
  .addField("📁 | General", `
\`1\`) | **Server's** : **__${client.guilds.cache.size.toLocaleString()}__** 
\`2\`) | **User's** : **__${client.users.cache.size.toLocaleString()}__**
\`3\`) | **Channel's** : **__${client.channels.cache.size.toLocaleString()}__**
\`4\`) | **Total Command's** : **__${client.commands.size.toLocaleString()}__**
\`5\`) | **Total Category's** : **__${client.helps.size.toLocaleString()}__**
\`6\`) | **Total Aliases** : **__${client.aliases.size.toLocaleString()}__**
`)
  .addField("🗄️ | System", `
\`1\`) | **Node.js** : **__${process.version}__**
\`2\`) | **Discord.js** : **__${djsversion}__**
\`3\`) | **Platform** : **__${process.platform}__**
\`4\`) | **Uptime** : **__${parseDur(client.uptime)}__**
\`5\`) | **Cpu** : {
- **Cores**: **__${os.cpus().length}__**
- **Model**: **__${core.model}__**
- **Speed**: **__${core.speed}MHz__**
}
\`6\`) | **Memory** : {
- **Total**: **__${formatBytes(process.memoryUsage().heapTotal)}__**
- **Used**: **__${formatBytes(process.memoryUsage().heapUsed)}__**
} 
`)
  .addField("🔗 | Useful Link", `
\`1\`) | **Invite** : **__[INVITE](https://kiky-bot.glitch.me/invite)__**
\`2\`) | **Website** : **__[WEBSITE](https://kiky-bot.glitch.me)__**
\`3\`) | **Commands** : **__[COMMANDS](https://kiky-bot.glitch.me/commands)__**
\`4\`) | **Github** : **__[GITHUB](https://kiky-bot.glitch.me/github)__**`)
  
  
  
  message.channel.send(embed)
  }
  
  function 	formatBytes(bytes) {
		if (bytes === 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	}
  
  function  parseDur(ms){
    let seconds = ms / 1000;
    let days = parseInt(seconds / 86400);
    seconds = seconds % 86400;
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
    
    if (days) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    else if (hours) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    else if (minutes) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }
}

exports.conf = {
    aliases: ['bi', 'stats'],
    cooldown: "5"
}

exports.help = {
    name: 'botinfo',
    description: 'Get my info',
    usage: 'botinfo'
}