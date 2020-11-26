const { MessageEmbed } = require("discord.js");
exports.run = async (
  client,
  message,
  args,
  color,
  prefix,
  serverQueue,
  url,
  searchString,
  ytdl,
  YouTube,
  play,
  chunk,
  handleVideo,
  youtube,
  queue
) => {
  const msg = args.join(" ");
  if (!msg) {
    return message.channel.send("Please give message");
  }

  message.delete();
  const embed = new MessageEmbed()
  .setColor(color)
  .setDescription(msg)
  
  message.channel.send(embed);
};

exports.conf = {
  aliases: ["se"],
  cooldown: "5"
};

exports.help = {
  name: "sayembed",
  description: "Make the bot say something with embed",
  usage: "sayembed [message]"
};
