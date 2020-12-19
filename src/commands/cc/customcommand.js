const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const custom = require("../../../custom.js");

exports.run = async (client, message, args, color, prefix, serverQueue, url, searchString, ytdl, YouTube, play, chunk, handleVideo, youtube, queue) => {
  
      if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(`Sorry, you need **Manage Messages** permission!`);
  
    const filter = x => {

    return (x.author.id === message.author.id);

};
  
  let triger = await message.channel.send(`Give triger name. (ex: hi)`)
  
  const verify = await message.channel.awaitMessages(filter, {max: 1, time: 10000}); // 6.5 seconds.



if (!verify.size) return message.channel.send("Canceled, because you do not answer").then(() => {triger.edit(`Canceled`)})
  
  let a = verify.first().content.toLowerCase();
  
  let response = await message.channel.send(`Ok, the trigger name ***${a}***, now give response name.`)
  
  triger.edit(`Succes`)
  
  const res = await message.channel.awaitMessages(filter, {max: 1, time: 10000}); // 6.5 seconds.
  
  
  


if (!res.size) return message.channel.send("Canceled, because you do not answer").then(() => {response.edit(`Canceled`)})
  
  let b = res.first().content;
  
  let random = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
  
    custom.findOne(
      { Guild: message.guild.id, Command: a },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          data.Content = b
          data.ID = random;
          data.save();

          return message.channel.send(
            `Successfully updated the command \`${a}\` (\`${random}\`)`
          );
        } else if (!data) {
          let newData = new custom({
            Guild: message.guild.id,
            Command: a,
            Content: b,
            ID: random
          });
          newData.save();
        }
      }
    );

  
            return  message.channel.send(`Succesfully create new custom command, you can test by type **${a}**, the custom command id is: **${random}**, \`<prefix>ccdelete <cc_id>\` to delete a custom command`).then(() => {response.edit(`Succes (**${random}**)`)})
  
  
}

exports.conf = {
    aliases: [''],
    cooldown: "5"
}

exports.help = {
    name: 'ccadd',
    description: 'Make new custom commands',
    usage: 'ccadd <trigger> <response>'
}