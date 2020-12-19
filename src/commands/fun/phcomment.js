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
  let a = message.mentions.users.first() || message.author;

  let av = a.username;

  let b = args.join(" ");
  if (!b) return message.channel.send(`Please give some word`)
  
  const img = a.displayAvatarURL({ format: "png" });

  const m = await message.channel.send("Loading Image...");

  let avatar = message.author.displayAvatarURL({
    dynamic: false,
    format: "png"
  });
  let image = await canvacord.Canvas.phub({
    username: av,
    message: b,
    image: img
  });
  let attachment = new Discord.MessageAttachment(image, "phc.png");

  setTimeout(function() {
    message.channel.send(attachment).then(() => {
      m.delete();
    });
  });
};

exports.conf = {
  aliases: ["phc"],
  cooldown: "5"
};

exports.help = {
  name: "phcomment",
  description: "Get phcomment image from avatar",
  usage: "phcomment [message]"
};
