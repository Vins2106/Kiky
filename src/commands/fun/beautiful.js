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
  let image = await canvacord.Canvas.beautiful(avatar);
  let attachment = new Discord.MessageAttachment(image, "beautiful.png");

  setTimeout(function() {
    message.channel.send(attachment).then(() => {
      m.delete();
    });
  });
};

exports.conf = {
  aliases: ["bt"],
  cooldown: "5"
};

exports.help = {
  name: "beautiful",
  description: "Get beautiful image from avatar",
  usage: "beautiful <@user>"
};
