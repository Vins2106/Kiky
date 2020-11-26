const { MessageEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");
const { VultrexHaste } = require("vultrex.haste")
const haste = new VultrexHaste({ url: "https://hasteb.in" }) 
const { inspect } = require("util")

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
      if(message.author.id !== "727110220400033865") return;

  const code = args.join(" ")
  if (!code) {
    return message.channel.send("Please provide some code to run eval!")
  }
  
  try {
    const start = process.hrtime();
    let output = eval(code);
    const difference = process.hrtime(start);
    if (typeof output !== "string") output = inspect(output, {depth: 2});
    
    return message.channel.send(stripIndents`
*Executed in ${difference[0] > 0 ? `${difference[0]}s ` : ""}${difference[1] /  1e6}ms*
\`\`\`js
${output.length > 1950 ? await haste.post(output) : output}
\`\`\`
`)
    
    
  } catch(e) {
   message.channel.send(`
**Error**:
\`\`\`js
${e}
\`\`\``) 
  }
}

exports.conf = {
    aliases: ['ev', 'e'],
    cooldown: "1"
}

exports.help = {
    name: 'eval',
    description: 'Owner bot only',
    usage: 'eval <code>'
}