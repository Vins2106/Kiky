const { ShardingManager } = require("discord.js");
const config = require("./config.json");

const manager = new ShardingManager("./kiky.js", {
  token: config.token,
  totalShards: 1
});

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launch #${shard.id}`))