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
  message.channel.send(msg);
};

exports.conf = {
  aliases: [""],
  cooldown: "5"
};

exports.help = {
  name: "say",
  description: "Make the bot say something",
  usage: "say [message]"
};
