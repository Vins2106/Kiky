const Client = require("discord.js");
const Discord = require("discord.js");
const client = new Discord.Client({
  disableMentions: "everyone",
  fetchAllMembers: true
});

const { Util } = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
require("dotenv").config();

const Enmap = require("enmap");

let games = {
  hangman: new Enmap({ name: "hangman" }),
  pokemon: new Enmap({ name: "pokemon" }),
  tictactoe: new Enmap({ name: "tictactoe" })
};

client.config = require("./config.json");

const youtube = new YouTube(client.config.yt);
const queue = new Map();
const db = require("quick.db");

const jointocreatemap = new Map();

client.on("voiceStateUpdate", (oldState, newState) => {
  let config;
  let ch = db.get(`voice.${newState.guild.id}`);

  let oldparentname = "unknown";
  let oldchannelname = "unknown";
  let oldchanelid = "unknown";
  if (
    oldState &&
    oldState.channel &&
    oldState.channel.parent &&
    oldState.channel.parent.name
  )
    oldparentname = oldState.channel.parent.name;
  if (oldState && oldState.channel && oldState.channel.name)
    oldchannelname = oldState.channel.name;
  if (oldState && oldState.channelID) oldchanelid = oldState.channelID;
  let newparentname = "unknown";
  let newchannelname = "unknown";
  let newchanelid = "unknown";
  if (
    newState &&
    newState.channel &&
    newState.channel.parent &&
    newState.channel.parent.name
  )
    newparentname = newState.channel.parent.name;
  if (newState && newState.channel && newState.channel.name)
    newchannelname = newState.channel.name;
  if (newState && newState.channelID) newchanelid = newState.channelID;
  if (oldState.channelID) {
    if (typeof oldState.channel.parent !== "undefined")
      oldchannelname = `${oldparentname}\n\t**${oldchannelname}**\n*${oldchanelid}*`;
    else oldchannelname = `-\n\t**${oldparentname}**\n*${oldchanelid}*`;
  }
  if (newState.channelID) {
    if (typeof newState.channel.parent !== "undefined")
      newchannelname = `${newparentname}\n\t**${newchannelname}**\n*${newchanelid}*`;
    else newchannelname = `-\n\t**${newchannelname}**\n*${newchanelid}*`;
  }
  if (!oldState.channelID && newState.channelID) {
    if (newState.channelID !== ch) return;
    jointocreatechannel(newState);
  }

  if (oldState.channelID && !newState.channelID) {
    if (
      jointocreatemap.get(
        `tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`
      )
    ) {
      var vc = oldState.guild.channels.cache.get(
        jointocreatemap.get(
          `tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`
        )
      );

      if (vc.members.size < 1) {
        jointocreatemap.delete(
          `tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`
        );

        db.delete(`voicem.${newState.member.user.id}`);

        return vc.delete();
      } else {
      }
    }
  }

  if (oldState.channelID && newState.channelID) {
    if (oldState.channelID !== newState.channelID) {
      if (newState.channelID === ch) jointocreatechannel(oldState);

      if (
        jointocreatemap.get(
          `tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`
        )
      ) {
        var vc = oldState.guild.channels.cache.get(
          jointocreatemap.get(
            `tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`
          )
        );

        if (vc.members.size < 1) {
          jointocreatemap.delete(
            `tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`
          );

          db.delete(`voicem.${newState.member.user.id}`);

          return vc.delete();
        } else {
        }
      }
    }
  }
});
async function jointocreatechannel(user) {
  let name = db.get(`voicename.${user.member.user.id}`);
  if (name === null || name === undefined)
    name = `${user.member.user.username}'s Channels`;

  await user.guild.channels
    .create(name, {
      type: "voice",
      parent: user.channel.parent.id
    })
    .then(async vc => {
      user.setChannel(vc);
      db.set(`voicem.${user.member.user.id}`, vc.id);

      jointocreatemap.set(`tempvoicechannel_${vc.guild.id}_${vc.id}`, vc.id);

      await vc.overwritePermissions([
        {
          id: user.id,
          allow: ["MANAGE_CHANNELS"]
        },
        {
          id: user.guild.id,
          allow: ["VIEW_CHANNEL"]
        }
      ]);
    });
}

client.on("guildMemberAdd", async member => {
  let nick = db.get(`autonick.${member.guild.id}`);
  let auto = db.get(`autorole.${member.guild.id}`);
  if (nick === null || nick === undefined) return;
  if (auto === null || auto === undefined) return;

  const rol = member.guild.roles.cache.get(auto);

  member.roles.add(rol);
  member.setNickname(`${nick} ${member.user.username}`);

  const serverstats = new db.table("ServerStats");

  let totusers = await serverstats.fetch(`Statss_${member.guild.id}`, {
    target: ".totusers"
  });
  let membcount = await serverstats.fetch(`Statss_${member.guild.id}`, {
    target: ".membcount"
  });
  let botcount = await serverstats.fetch(`Statss_${member.guild.id}`, {
    target: ".botcount"
  });
  let categ = await serverstats.fetch(`Statss_${member.guild.id}`, {
    target: ".categid"
  });
  if (
    totusers === undefined ||
    membcount === undefined ||
    botcount === undefined
  )
    return;

  const a = member.guild.memberCount;
  const b = member.guild.members.cache.filter(x => x.user.bot).size;
  const c = a - b;

  member.guild.channels.get(totusers).edit({ name: `Total Users : ${a}` });
  member.guild.channels.get(membcount).edit({ name: `Human Users : ${c}` });
  member.guild.channels.get(botcount).edit({ name: `Bot Users : ${b}` });
});

const token = client.config.token;
const prefix = client.config.prefix;
const fs = require("fs");
const { Collection } = require("discord.js");
const cooldowns = new Collection();

client.login(token);

client.on("ready", () => {
  console.log(`
${client.user.tag} Ready to use!
${client.users.cache.size} user's
`);
  client.user.setStatus("idle");
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.helps = new Discord.Collection();

fs.readdir("./src/commands/", (err, categories) => {
  if (err) console.log(err);
  categories.forEach(category => {
    let moduleConf = require(`./src/commands/${category}/module.json`);
    moduleConf.path = `./src/commands/${category}`;
    moduleConf.cmds = [];
    moduleConf.usage = [];
    moduleConf.names = [];
    client.helps.set(category, moduleConf);
    if (!moduleConf) return;
    fs.readdir(`./src/commands/${category}`, (err, files) => {
      if (err) console.log(err);
      let commands = new Array();
      files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let prop = require(`./src/commands/${category}/${file}`);
        let cmdName = file.split(".")[0];
        client.commands.set(prop.help.name, prop);
        prop.conf.aliases.forEach(alias => {
          client.aliases.set(alias, prop.help.name);
        });
        client.helps.get(category).cmds.push(prop.help);
        client.helps.get(category).usage.push(prop.help.how);
        client.helps.get(category).names.push(prop.help.another);
      });
    });
  });
});

client.on("message", async message => {
  if (message.author.bot) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  let msg = message.content.toLowerCase();

  if (msg == `<@${client.user.id}>` || msg == `<@!${client.user.id}>`) {
    message.channel.send(
      `Hi **${message.author.username}**, The current prefix is: **\`${prefix}\`**`
    );
  }

  let AFKdata = JSON.parse(fs.readFileSync("./src/database/afk.json", "utf8"));

  if (message.author.id in AFKdata && cmd !== "afk") {
    delete AFKdata[message.author.id];
    fs.writeFile("./src/database/afk.json", JSON.stringify(AFKdata), err => {
      if (err) console.log(err);
    });

    message.channel.send(
      `Welcome back **${message.author.tag}**, i've remove you from afk.`
    );
  }

  var AFKcheck = user => {
    return user.id in AFKdata;
  };

  const AFKandMentioned = message.mentions.users.filter(AFKcheck);

  if (AFKandMentioned.size) {
    var reason = AFKandMentioned.map(user => {
      return AFKdata[user.id];
    });

    message.channel.send(
      `**${message.author.tag}**, They is afk, reason: **${reason}**.`
    );
  }
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") {
    return message.channel.send("Hey, please use on server :)");
  }

  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  const searchString = args.join(" ");
  const url = args.join(" ");
  const serverQueue = queue.get(message.guild.id);

  if (cmd.length === 0) return;

  //eeeeeee

  let AFKdata = JSON.parse(fs.readFileSync("./src/database/afk.json", "utf8"));

  const color = "GREEN";

  let commandFile =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!commandFile) return;
  if (!cooldowns.has(commandFile.help.name)) {
    cooldowns.set(commandFile.help.name, new Collection());
  }
  const member = message.member;
  const now = Date.now();
  const timestamps = cooldowns.get(commandFile.help.name);
  const cooldownAmount = (commandFile.conf.cooldown || 5) * 1000;

  if (!timestamps.has(member.id)) {
    timestamps.set(member.id, now);
  } else {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send({
        embed: {
          color: color,
          description: `Error: (Ratelimit) <@${
            message.author.id
          }>, please wait \`${timeLeft.toFixed(1)}s\``
        }
      });
    }

    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
  }

  try {
    let commands =
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    commands.run(
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
    );
    message.channel.startTyping();
    if (!commands) return;
  } catch (e) {
    message.channel.send({
      embed: {
        color: color,
        description: "Sorry, i do not have this command"
      }
    });
  } finally {
    message.channel.stopTyping(true);
  }
});

process.on("unhandledRejection", (reason, promise) => {
  try {
    console.error(
      "Unhandled Rejection at: ",
      promise,
      "reason: ",
      reason.stack || reason
    );
  } catch {
    console.error(reason);
  }
});

process.on("uncaughtException", err => {
  console.error(`Caught exception: ${err}`);
  process.exit(1);
});

function chunk(array, chunkSize) {
  const temp = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    temp.push(array.slice(i, i + chunkSize));
  }
  return temp;
}

function play(guild, song, message) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.textChannel.send({
      embed: {
        color: "GREEN",
        description: `Queue ended! leave voice channel...`
      }
    });

    const db = require("quick.db");
    db.delete(`myvoice.${serverQueue.guild}`);

    serverQueue.voiceChannel.leave();
    return queue.delete(guild.id);
  }

  const pl = ytdl(song.url);

  const dispatcher = serverQueue.connection
    .play(pl)
    .on("finish", () => {
      const shiffed = serverQueue.songs.shift();
      if (serverQueue.loop === true) {
        serverQueue.songs.push(shiffed);
      }
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolume(serverQueue.volume / 100);

  const { MessageEmbed } = require("discord.js");

  const embeds = new MessageEmbed()
    .setAuthor(
      client.user.username + " Music Manager",
      client.user.displayAvatarURL()
    )
    .setColor("GREEN")
    .setDescription(
      `Now playing **${song.title}**\n(\`${song.time.hours}h : ${song.time.minutes}m : ${song.time.seconds}s\`)`
    )
    .setImage(song.image.medium.url)
    .setFooter(song.url + `\n\nOnly song request user can react`);

  db.set(`myvoice.${serverQueue.guild}`, serverQueue.voiceChannel.id);
  db.set(`user.${serverQueue.guild}`, song.user);
  const m = serverQueue.textChannel.send(embeds).then(m => {
    m.react("⏸️");
    m.react("⏯️");
    m.react("⏹");
    m.react("🔁");
    m.react("🗑️");

    const filter = (reaction, user) =>
      user.id !== serverQueue.textChannel.client.user.id;
    var collector = m.createReactionCollector(filter, {
      time: song.duration > 0 ? song.duration * 1000 : 600000
    });

    collector.on("collect", (reaction, user) => {
      if (!serverQueue) return;
      const member = message.guild.member(user);

      if (!message.member.voice.channel) {
        return reaction.users.remove(user);
      }

      if (message.member.voice.channel.id !== serverQueue.voiceChannel.id) {
        return reaction.users.remove(user);
      }

      switch (reaction.emoji.name) {
        case "⏸️":
          reaction.users.remove(user);
          if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return serverQueue.textChannel.send({
              embed: {
                color: "GREEN",
                description: `${user}` + " **Succesfully pause server queue!**"
              }
            });
          }
          break;

        case "⏯️":
          reaction.users.remove(user);
          if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return serverQueue.textChannel.send({
              embed: {
                color: "GREEN",
                description:
                  `${user}` + " **Succesfully resume the server queue!**"
              }
            });
          }
          break;

        case "🗑️":
          reaction.users.remove(user);
          m.delete();
          serverQueue.textChannel.send(`${user}` + " Delete Player");
          break;

        case "🔁":
          reaction.users.remove(user);
          if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return serverQueue.textChannel.send({
              embed: {
                color: "GREEN",
                description:
                  `${user}` +
                  ` loop **${
                    serverQueue.loop === true ? "enabled" : "disabled"
                  }** for the music`
              }
            });
          }
          break;

        case "⏹":
          reaction.users.remove(user);
          serverQueue.songs = [];
          serverQueue.connection.dispatcher.end(
            "[runCmd] Stop command has been used"
          );
          serverQueue.textChannel.send(`${user}` + " Delete queue");
          break;
      }
    });

    collector.on("end", () => {
      m.reactions.removeAll();
      if (m && !m.deleted) {
        m.delete({ timeout: 3000 });
      }
    });
  });
}

async function handleVideo(video, message, voiceChannel, playlist = false) {
  const serverQueue = queue.get(message.guild.id);
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`,
    image: video.thumbnails,
    time: video.duration,
    user: message.author.id,
    check: message.member.voice.channel.id
  };

  if (!serverQueue) {
    const queueConstruct = {
      c: message.guild,
      guild: message.guild.id,
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 100,
      playing: true,
      loop: false
    };
    queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    var connection = await voiceChannel.join();
    queueConstruct.connection = connection;
    play(message.guild, queueConstruct.songs[0], message);
    connection.voice.setSelfDeaf(true);
  } else {
    serverQueue.songs.push(song);
    if (playlist) return;
    else
      return message.channel.send({
        embed: {
          color: "GREEN",
          description: `**Succefully** added **${song.title}** to server queue!`
        }
      });
  }
  return;
}

client.on("message", async message => {
  if (message.author.bot) return;

  const msg = message.content;
  const db = require("quick.db");
  const channel = db.get(`chatting.${message.guild.id}`);
  const fetch = require("node-fetch");
  const tr = require("google-translate-api");
  const translate = require("translate");

  const time = ["1000", "2000", "3000"];

  const random = time[Math.floor(Math.random() * time.length)];

  if (message.channel.id == channel) {
    message.channel.startTyping();

    const text = await fetch(`
http://api.brainshop.ai/get?bid=153852&key=dfJVP7Jdd8TVZPdE&uid=${
      message.author.id
    }&msg=${encodeURIComponent(msg)}`)
      .then(res => res.json())
      .then(data => {
        setTimeout(function() {
          message.channel.send(data.cnt).then(() => {
            message.channel.stopTyping();
          });
          console.log(random);
        }, random);
      });
  }
});

//test
