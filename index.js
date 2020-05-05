const Discord = require("discord.js");
const client = new Discord.Client();
const AntiSpam = require("discord-anti-spam");
const antiSpam = new AntiSpam({
  warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
  kickThreshold: 7, // Amount of messages sent in a row that will cause a ban.
  banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
  maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
  warnMessage: "{@user}, Please stop spamming.", // Message that will be sent in chat upon warning a user.
  kickMessage: "**{user_tag}** has been kicked for spamming.", // Message that will be sent in chat upon kicking a user.
  banMessage: "**{user_tag}** has been banned for spamming.", // Message that will be sent in chat upon banning a user.
  maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
  maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
  maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
  exemptPermissions: ["ADMINISTRATOR"], // Bypass users with any of these permissions.
  ignoreBots: true, // Ignore bot messages.
  verbose: true, // Extended Logs from module.
  ignoredUsers: [] // Array of User IDs that get ignored.
  // And many more options... See the documentation.
});

async function apiPost(op) {
  if (!op.token)
    return console.log(
      "[anti-raid]{type: error} ⚠️: make sure your give me bot token or invite bot token(made by. Name boy and Οㄗ│Captaiℵ)"
    );
  if (!op.prefix)
    return console.log(
      "[anti-raid]{type: error} ⚠️: make sure your give me bot prefix(made by. Name boy and Οㄗ│Captaiℵ)"
    );
      if (!op.stats)
    return console.log(
      "[anti-raid]{type: error} ⚠️: make sure your give me bot status(made by. Name boy and Οㄗ│Captaiℵ)"
    );
  client.on("ready", () => console.log(`[anti-raid]☑️: successfully bot online bot name: ${client.user.tag}(made by. Name boy and Οㄗ│Captaiℵ)`));
  client.on("ready", () => {
      let io = op.stats.replace("{guilds}", client.guilds.size).replace("{users}", client.users.size);
      client.user.setActivity(io);
  });
  client.on("message", message => antiSpam.message(message));

  // This is for all links

  client.on("message", message => {
    if (message.channel.id === "") return; // Maybe You Wanna Ignore A Channel
    if (message.channel.id === "") return; // Same here you need to just enter the channel id
    if (message.content.includes("https://")) {      
    if (message.author.hasPermission('MEMBERS_DELETE')) return;
      message.delete();
    }
    if (message.content.includes("http://")) {
        if (message.author.hasPermission('MEMBERS_DELETE')) return;
      message.delete();
    }
    if (message.content.includes("www.")) { 
        if (message.author.hasPermission('MEMBERS_DELETE')) return;
      message.delete();
    }
  });

  // This is the same as up but more for disocrd invite links

  client.on("message", async message => {
      
   if (message.author.hasPermission('MEMBERS_DELETE')) return;
    const bannedWords = [
      `discord.gg`,
      `.gg/`,
      `.gg /`,
      `. gg /`,
      `. gg/`,
      `discord .gg /`,
      `discord.gg /`,
      `discord .gg/`,
      `discord .gg`,
      `discord . gg`,
      `discord. gg`,
      `discord gg`,
      `discordgg`,
      `discord gg /`
    ];
    try {
      if (
        bannedWords.some(word => message.content.toLowerCase().includes(word))
      ) {
        if (message.author.id === "") return; // This is to ignore a user maybe you
        if (message.channel.id === "") return; //ignore channel
        if (message.channel.id === "") return; //ignore channel
        await message.delete();
        await message.channel
          .send(`${message.author}`, {embed:{ title: `Dont send invite links here!`, color: 0xff0000}})
          .then(sentMessage => {
            sentMessage.delete({ timeout: 5000, reason: "send link" }); // Message will delete in 5 sec
          });
      }
    } catch (e) {
      console.log(e);
    }
  });

  // This is a ban command, you can remove it if you want.

  client.on("message", message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(op.prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(op.prefix.length);

    let args = message.content.split(" ").slice(1);

    if (command == "ban") {
      if (!message.channel.guild)
        return message.reply("** This command only for servers**");

      if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
        return message.reply("**You Don't Have ` BAN_MEMBERS ` Permission**");
      if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS"))
        return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
      let user = message.mentions.users.first();
      if (message.mentions.users.size < 1)
        return message.reply("**Mention Someone**");
      if (!message.guild.member(user).bannable)
        return message.reply("**I Cant BAN Someone With Higher Role Than Me**");

      message.guild.member(user).ban(7, user);

      const banembed = new Discord.MessageEmbed()
        .setAuthor(`BANNED!`, user.displayAvatarURL())
        .setColor("RANDOM")
        .setTimestamp()
        .addField("**User:**", "**[ " + `${user.tag}` + " ]**")
        .addField("**By:**", "**[ " + `${message.author.tag}` + " ]**");
      message.channel.send({
        embed: banembed
      });
    } else if(command === "setstatus"){
        if(!args[0]) return message.reply("please give me stats type");
        if(!args[1]) return message.reply("please give me stats");
        let stats = args.splice(1).join(' ');
        let ww = args[0];
        client.user.setActivity(stats, {type: ww })
        }
  });

  // Enter your bot token here and done.

  client.login(op.token);
}

module.exports = apiPost;
