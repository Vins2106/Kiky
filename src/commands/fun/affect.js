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
  const m = await message.channel.send("Loading Image...");

  const user = message.mentions.users.first() || message.author;

  let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
  let image = await canvacord.Canvas.affect(avatar);
  let attachment = new Discord.MessageAttachment(image, "affect.png");

  setTimeout(function() {
    message.channel.send(attachment).then(() => {
      m.delete();
    });
  });
};

exports.conf = {
  aliases: ["af"],
  cooldown: "5"
};

exports.help = {
  name: "affect",
  description: "Get affect image from avatar",
  usage: "affect <@user>"
};
