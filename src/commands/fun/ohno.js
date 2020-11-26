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
  const avatar = args.join(" ");
  if (!avatar) {
    return message.channel.send("Please give some word!");
  }

  const m = await message.channel.send("Loading Image...");

  let image = await canvacord.Canvas.ohno(avatar);
  let attachment = new Discord.MessageAttachment(image, "oh-no.png");

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
  name: "ohno",
  description: "Get oh no image from avatar",
  usage: "ohno [message]"
};
