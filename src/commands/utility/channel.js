const { MessageEmbed } = require("discord.js");
const fetch = require("node-superfetch");

exports.run = async (
  client,
  message,
  args,
  color,
  prefix,
  ytdl,
  YouTube,
  play,
  chunk,
  handleVideo,
  youtube
) => {
  let name = args.join(" ");
  if (!name) return message.channel.send("Unknown channel name.");

  const channel = await fetch
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${client.config.yt}&maxResults=1&type=channel`
    )
    .catch(() => message.channel.send("Unknown channel error."));

  if (!channel.body.items[0])
    return message.channel.send("No channel result. Try again.");

  const data = await fetch
    .get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${client.config.yt}`
    )
    .catch(() => message.channel.send("Unknown channel data error."));

  const a = await youtube.searchChannels(name, 10);
  const b = await youtube.getChannelByID(a[0].id);

  const embed = new MessageEmbed()
    .setAuthor(
      channel.body.items[0].snippet.channelTitle + " Channel",
      channel.body.items[0].snippet.thumbnails.medium.url
    )
    .setColor(color)
    .setTitle(
      parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString() +
        " Subscribers"
    )
    .setDescription(b.description)
    .setImage(channel.body.items[0].snippet.thumbnails.high.url)
    .addField(
      `Total Views`,
      parseInt(data.body.items[0].statistics.viewCount).toLocaleString(),
      true
    )
    .addField(
      `Total Videos`,
      parseInt(data.body.items[0].statistics.videoCount).toLocaleString(),
      true
    )
    .addField(
      `Created At`,
      new Date(channel.body.items[0].snippet.publishedAt).toDateString(),
      true
    )
    .setFooter("Available on youtube");

  message.channel.send(embed);
};

exports.conf = {
  aliases: ["chl"],
  cooldown: "5"
};

exports.help = {
  name: "channel",
  description: "Get channel info",
  usage: "channel [channel name]"
};
