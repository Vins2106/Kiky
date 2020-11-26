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
  let image = await canvacord.Canvas.trigger(avatar);
  let attachment = new Discord.MessageAttachment(image, "triggered.gif");

  setTimeout(function() {
    message.channel.send(attachment).then(() => {
      m.delete();
    });
  });
};

exports.conf = {
  aliases: ["trigger"],
  cooldown: "5"
};

exports.help = {
  name: "triggered",
  description: "Get triggered gif from avatar",
  usage: "triggered <@user>"
};
