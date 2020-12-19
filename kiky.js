// what are you doing here? you have discord? if have, contact me or add friend: Vins#0894

const Client = require("discord.js");
const Discord = require("discord.js");
const client = new Discord.Client({
  disableMentions: "everyone",
  fetchAllMembers: true
});

const bodyParser = require("body-parser")

const urlencodedParser = bodyParser.urlencoded({extended: false})

const ws = require("ws")
const Sequelize = require('sequelize');

const { Util } = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
require("dotenv").config();

const Enmap = require("enmap");
client.config = {
  prefix: ".",
  yt: process.env.YT,
  token: process.env.token,
  dbl: process.env.dbl,
  status: 10000,
  mongo: process.env.mongo,
  owner: process.env.owner
}
  const color = "GREEN";

const youtube = new YouTube(client.config.yt)

const db = require("quick.db");


client.on("message", async message => {
  let recent = new Set(); // new Set();

  // Ignore the bot.
  if (message.author.bot || message.author === client.user) return;

  // If the user has an exp. cooldown, ignore it.
  if (recent.has(message.author.id)) return; 

  // Get the leveling database.
  // This is global leveling. If you want the leveling per server, do this:
  // let userprof = db.get(`leveling.${message.guild.id}.${message.author.id}`);
  let userprof = db.get(`leveling.${message.author.id}`);

  // If the user doesn't have any leveling stats at all, set it up.
  if (!userprof)
    return db.set(`leveling.${message.author.id}`, { xp: 0, level: 0 });

  // Give them an EXP.
  await db.add(`leveling.${message.author.id}.xp`, client.gainedXp());

  // Notice them if the user has leveled/ranked up.
  if (client.getLevel(userprof.xp) > userprof.level) {
    await db.add(`leveling.${message.author.id}.level`, 1);
    userprof.level = client.getLevel(userprof.xp);
    
    let disable = db.get(`lvlx.${message.guild.id}`)
    if (!disable) {
         let log = db.get(`lvllog.${message.guild.id}`)
    if (!log) {
          let lvlmsg = db.get(`levelmsg.${message.guild.id}`)
    if (!lvlmsg) lvlmsg = "**{usertag}** reached level **{level}!** Contratulations!" 
    lvlmsg.replace(/{user}/g, message.author.username).replace(/{usertag}/g, message.author.tag).replace(/{level}/g, userprof.level)
    
    message.channel.send(lvlmsg.replace(/{user}/g, message.author.username).replace(/{usertag}/g, message.author.tag).replace(/{level}/g, userprof.level));
    } else {
          let lvlmsg = db.get(`levelmsg.${message.guild.id}`)
    if (!lvlmsg) lvlmsg = "**{usertag}** reached level **{level}!** Contratulations!" 
    lvlmsg.replace(/{user}/g, message.author.username).replace(/{usertag}/g, message.author.tag).replace(/{level}/g, userprof.level)
    
    client.channels.cache.get(log).send(lvlmsg.replace(/{user}/g, message.author.username).replace(/{usertag}/g, message.author.tag).replace(/{level}/g, userprof.level));
    } 
    } else {
      return;
    }
    
  }

  // Generate a random timer. (2)
  let randomTimer = getRandomInt(60000, 75000); // Around 60 - 75 seconds. You can change it.

  // Add the user into the Set()
  recent.add(message.author.id);

  // Remove the user when it's time to stop the cooldown.
  client.setTimeout(() => {
    recent.delete(message.author.id);
  }, randomTimer);

  // Generate a random timer.
});
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const moment = require("moment");

client.getLevel = xp => {
  return Math.floor(0.177 * Math.sqrt(xp)) + 1;
};

client.getLevelBounds = level => {
  // Example: getLevelBounds(1)
  // Results: lowerBound: 1, upperBound: 32
  const lowerBound = Math.ceil(((level - 1) / 0.177) ** 2);
  const upperBound = Math.ceil((level / 0.177) ** 2);
  return { lowerBound, upperBound };
};

client.gainedXp = () => {
  // Generates a random XP amount. From range 3 - 9.
  return Math.ceil(Math.random() * 9) + 3;
};

const jointocreatemap = new Map();

client.on("voiceStateUpdate", async (oldState, newState) => {
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
      var vc = client.channels.cache.get(
        jointocreatemap.get(
          `tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`
        )
      ) || await client.channels.fetch(
              jointocreatemap.get(
          `tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`
        )
      );

      if (vc.members.size < 1) {
        jointocreatemap.delete(
          `tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`
        );

        db.delete(`voicem.${newState.member.user.id}`);
                  let awokaowkoaw = await db.delete(`voicelimit.${newState.member.voice.id}`)
          if(!awokaowkoaw) return;
        
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
          let awokaowkoaw = await db.delete(`voicelimit.${newState.member.voice.id}`)
          if(!awokaowkoaw) return;
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
  if (!nick) return;
  if (auto === null || auto === undefined) return;

  const rol = member.guild.roles.cache.get(auto);

  member.roles.add(rol);
  member.setNickname(`${nick} ${member.user.username}`);
  
  
//   Welcomer
  let chlid = db.get(`joinchl.${member.guild.id}`)
  if (!chlid) return;
  
  let channel = client.channels.cache.get(chlid) || await client.channels.fetch(chlid);
  

  let joinmsgold = db.get(`joinmsg.${member.guild.id}`);
  if (!joinmsgold) return;
  
  let joinmsg = joinmsgold.replace(/{usertag}/g, member.user.tag).replace(/{user}/g, `<@${member.user.id}>`).replace(/{guild}/g, member.guild.name).replace(/{memberCount}/g, member.guild.memberCount)
  
  let joinbg = db.get(`joinbg.${member.guild.id}`)
  if (!joinbg) joinbg = 'https://2.bp.blogspot.com/-DQnJ9idYfYk/Vh5cgqVETbI/AAAAAAAAAOQ/9vRw3rlScng/s1600/22940_anime_scenery.jpg%22'
  
  let joinimgmsg = db.get(`joinimgmsg.${member.guild.id}`)
  if (!joinimgmsg) joinimgmsg = "Welcome"
  
  const Canvas = require("canvas");

  let user = member.user;
  
  const canvas = Canvas.createCanvas(500, 225)
  const ctx = canvas.getContext("2d");
  const background = await Canvas.loadImage(joinbg);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  let colors;
  let yellow = "#a1ff00"
  let white = "#ffffff"
  let black = "#080000"
  
  ctx.strokeStyle = yellow
  ctx.strokeRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = black
  var size1 = 40
  var size2 = 30
  var size3 = 30

  var name = client.users.cache.get(user.id).tag
  do {
    ctx.font = `${size1 -= 5}px sans-serif`
  } while (ctx.measureText(name).width > canvas.width - 255)
  ctx.fillText(name, 200, 65)
  var joined = joinimgmsg;
  do {
    ctx.font = `${size3 -= 1}px sans`
  } while (ctx.measureText(joined).width > canvas.width - 255)
  ctx.fillText(joined, 200, 145)


  ctx.beginPath()
  ctx.arc(100, 100, 75, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.clip()


  const avatar = await Canvas.loadImage(user.displayAvatarURL({format: "jpg"}))
  ctx.drawImage(avatar, 25, 25, 150, 150)

  const final = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")

  let joindm = db.get(`joindm.${member.guild.id}`)
  if (!joindm) {
    return channel.send(`${joinmsg}`, final);
  } else {
    member.user.send(`${joinmsg}`, final)
  }
});

const token = client.config.token;
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
  
  
  let shardid = client.ws.shards.map(x => x.id);
  let shardtotal = client.ws.totalShards
  
  let files = require("./src/database/status.json")
  
  setInterval(function() {
    
    let randomStatus = files[Math.floor(Math.random() * files.length)];
    
    let statusName = randomStatus.name.replace(/{users}/g, client.users.cache.size.toLocaleString()).replace(/{guilds}/g, client.guilds.cache.size.toLocaleString()).replace(/{channels}/g, client.channels.cache.size.toLocaleString()).replace(/{prefix}/g, client.config.prefix)
    
    client.user.setActivity(statusName, {type: randomStatus.type});
    
  }, client.config.status)
});

async function setStatus(file) {
  
  
  client.user.setActivity()
}

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
  
  
  let prefix = db.get(`prefix.${message.guild.id}`)
if (prefix === undefined) prefix = client.config.prefix;
if (prefix === null) prefix = client.config.prefix;
  
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  let msg = message.content.toLowerCase();

  if (msg == `<@${client.user.id}>` || msg == `<@!${client.user.id}>`) {
    
    const tagEmbed = new Discord.MessageEmbed()
    .setAuthor(client.user.username + "", client.user.displayAvatarURL())
    .setDescription(`The current \`prefix\` for **${message.guild.name}** is **\`${prefix}\`**`)
    .setColor(color)
    .addField("Why me?", `
    **- multi porpose
    - easy to use
    - 24/7 online
    - make server custom command/reaction
    - and other, to read the guide, use \`${prefix}guide\`**
    `)
    .addField(`Use full links`, `
    **website: https://kiky.glitch.me
    invite: https://kiky.glitch.me/invite
    commands: https://kiky.glitch.me/commands
    leaderboard: https://kiky.glitch.me/leaderboard
    github: https://kiky.glitch.me/github**
    `)
    .setFooter(`To start the economy, use ${prefix}login`)
    
    message.channel.send(tagEmbed)
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

  let custom = require("./custom.js")
  
  
const { APIMessage, Structures } = require("discord.js");

class Message extends Structures.get("Message") {
    async inlineReply(content, options) {
        const mentionRepliedUser = typeof ((options || content || {}).allowedMentions || {}).repliedUser === "undefined" ? true : ((options || content).allowedMentions).repliedUser;
        delete ((options || content || {}).allowedMentions || {}).repliedUser;

        const apiMessage = content instanceof APIMessage ? content.resolveData() : APIMessage.create(this.channel, content, options).resolveData();
        Object.assign(apiMessage.data, { message_reference: { message_id: this.id } });
    
        if (!apiMessage.data.allowed_mentions || Object.keys(apiMessage.data.allowed_mentions).length === 0)
            apiMessage.data.allowed_mentions = { parse: ["users", "roles", "everyone"] };
        if (typeof apiMessage.data.allowed_mentions.replied_user === "undefined")
            Object.assign(apiMessage.data.allowed_mentions, { replied_user: mentionRepliedUser });

        if (Array.isArray(apiMessage.data.content)) {
            return Promise.all(apiMessage.split().map(x => {
                x.data.allowed_mentions = apiMessage.data.allowed_mentions;
                return x;
            }).map(this.inlineReply.bind(this)));
        }

        const { data, files } = await apiMessage.resolveFiles();
        return this.client.api.channels[this.channel.id].messages
            .post({ data, files })
            .then(d => this.client.actions.MessageCreate.handle(d).message);
    }
}

Structures.extend("Message", () => Message);


client.on("message", async message => {
  if (message.author.bot) return;
  
  
  if (message.channel.type == "dm") {
    const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username + " Warning!", client.user.displayAvatarURL())
    .setColor("RED")
    .setDescription(`Hey **${message.author.username}**, you should use on server, (warning)`)
    
    return message.channel.send(embed);
  }
  
              custom.findOne({ Guild: message.guild.id, Command: message.content.toLowerCase() },async (err, data) => {
        if (err) throw err;
        if (data) return message.inlineReply(data.Content);
        else return;
      });
  
  let prefix = db.get(`prefix.${message.guild.id}`)
if (prefix === undefined) prefix = client.config.prefix;
if (prefix === null) prefix = client.config.prefix;
  
  if (!message.content.startsWith(prefix)) return;
  
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  

  
  


  if (cmd.length === 0) return;

  //eeeeeee

  let AFKdata = JSON.parse(fs.readFileSync("./src/database/afk.json", "utf8"));


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

  

const { CanvasRenderService } = require('chartjs-node-canvas')
  
  try {
    let commands =
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    commands.run(
      client,
      message,
      args,
      color,
      prefix,
      ytdl,
      YouTube,
      youtube
    );
    message.channel.startTyping();
    if (!commands) return;
  } catch (e) {
    message.channel.stopTyping(true)
  } finally {
    
    let cmdsname = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
    
    db.add(`command.${cmdsname.help.name}`, 1)
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

// Website

const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var scopes = [
  "identify",
  "guilds.join",
  "guilds"/*email', 'connections', (it is currently broken) / 'guilds', 'guilds.join'*/
];
var prompt = "consent";

passport.use(
  new Strategy(
    {
      clientID: "771007705103597610",
      clientSecret: "MO-DeI38q5ktJqEtndTAFfiz15QZlVCe",
      callbackURL: "https://kiky.glitch.me/callback",
      scope: scopes,
      prompt: prompt
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        return done(null, profile);
      });
    }
  )
);
app.use(express.static("public"));



app.get(
  "/login",
  passport.authenticate("discord", { scope: scopes, prompt: prompt }),
  function(req, res) {}
);
app.get(
  "/callback",
  passport.authenticate("discord", { failureRedirect: "/" }),
  function(req, res) {
    res.redirect("/");
  } // auth success
);

app.get("/invite", (request, response) => {
  response.redirect(
    "https://discord.com/oauth2/authorize?client_id=771007705103597610&scope=bot&permissions=2138566015"
  );
});

app.get("/github", (request, response) => {
  response.redirect("https://github.com/VincentsSaerang/Kiky");
});

app.get("/account", function(req, res) {
  res.render("account.ejs", {
    req: req,
    res: res,
    client: client,
    db: db
  });
});

app.get("/commands", function(req, res) {
  res.render("commands.ejs", {
    req: req,
    res: res,
    client: client
  });
});

let aaa = client.helps.array()

for (const ppp of aaa) {
app.get(`/commands/${ppp.name}`, function(req, res) {
  res.render(`${ppp.name}.ejs`, {
    req: req,
    res: res,
    client: client
  });
});  
}

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/")
});

app.get("/", (req, res) => {
  res.render("index.ejs", {
    req: req,
    client: client,
    res: res
  });
  console.log(req.user)
});

app.get("/leaderboard", (req, res) => {
  res.render("leaderboard.ejs", {
    req: req,
    client: client,
    res: res,
    db: db
  });
});

const render = async (req, res, template, data = {}) => {
    const application = await client.fetchApplication();
    const owner = await client.users.fetch(client.config.owner); // DO NOT REMOVE !!!
    res.render("manage.ejs", {
      client: client,
      db: db,
      req: req,
      res: res
    })
};


const authOnly = (req, res, next) => {
  if(req.isAuthenticated()) return next();
  else return res.redirect('/');
};

app.get("/manage/:id", authOnly, async (req, res) => {
  if (!req.user) return res.redirect("/login")
  
    if(!client.guilds.cache.get(req.params.id)) return res.status(200).redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot&guild_id=${req.params.id}`);
    if(!client.guilds.cache.get(req.params.id).members.cache.get(req.user.id).hasPermission("ADMINISTRATOR")) return res.status(200).redirect('/');
  res.render("manage.ejs", {
    guild: client.guilds.cache.get(req.params.id),
    client: client,
    req: req,
    res: res,
    db: db
  })
});


app.get("/dashboard", async (req, res) => {
  res.render("dashboard.ejs", {
    client: client,
    db: db,
    req: req,
    res: res
  })
})


app.post("/manage/:id", urlencodedParser, async (req, res) => {
  
  var x = req.body.prefix;
  if (!x) x = client.config.prefix;

  var id = req.body.guild;
  
  db.set(`prefix.${req.params.id}`, x)
  console.log(`Prefix for: ${req.params.id} has been change to ${x}`)
  res.redirect("/dashboard")
})

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

let count = 0;
setInterval(
  () =>
    require("node-fetch")(process.env.url)
      .then(() => console.log(`[${++count}] Kept ${process.env.url} alive.`))
      .catch(e => console.log(e)),
  5 * 60 * 1000
);

client.setGuild = function(guildid) {
    if(!guildid) return "no guild id provided";
    if(typeof guildid !== "string") return "provided guild id isnt a string";
    const Guild = new db.set(`prefix.${guildid}`, client.config.prefix)
    return "saved guild to database";
}
// Custom Commands


const mongoose = require("mongoose")

mongoose.connect(client.config.mongo, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

//  Bad Word

client.on('message', async message => {
  
if (message.author.bot) return;

  const db = require("quick.db")
  
  let user = message.author;
  
  let cek = db.get(`check.${user.id}`)
  if (cek) {
    
    let random = Math.floor(Math.random() * 5);
    db.add(`balance.${message.author.id}.wallet`, random)
    
  } else {
    return;
  }
  

let x = db.get(`cmd.${message.guild.id}`)

if (!x) return;

 if(!message.member.hasPermission("ADMINISTRATOR")) {
   
    var i;
    for(i = 0;i < x.length; i++) {
      
      if (message.content.toLowerCase().includes(x[i].toLowerCase())) {
      message.delete()
      return message.channel.send(`__${message.author.tag}__, sorry your message include a badword`).then(x => x.delete({timeout: 5000}))
      }
    }
 }

})

client.on("error", error => console.log(`error :v`))