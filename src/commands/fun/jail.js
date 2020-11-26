const canvacord = require("canvacord");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

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
  const users = message.mentions.users.first() || message.author;

  const m = await message.channel.send("Loading Image...");

  let avatar = users.displayAvatarURL({ dynamic: false, format: "png" });
  let image = await canvacord.Canvas.jail(avatar);
  let attachment = new Discord.MessageAttachment(image, "jail.png");

  setTimeout(function() {
    message.channel.send(attachment).then(() => {
      m.delete();
    });
  });
};

exports.conf = {
  aliases: [""],
  cooldown: "5"
};

exports.help = {
  name: "jail",
  description: "Get jail image from avatar",
  usage: "jail <@user>"
};
