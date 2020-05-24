const AntiSpam = require("discord-anti-spam");
const Discord = require("discord.js");
const antiSpam = new AntiSpam({
  warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
  kickThreshold: 7, // Amount of messages sent in a row that will cause a ban.
  banThreshold: 10, // Amount of messages sent in a row that will cause a ban.
  maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
  warnMessage: "{@user}, Please stop spamming.", // Message that will be sent in chat upon warning a user.
  kickMessage: "**{user_tag}** has been kicked for spamming.", // Message that will be sent in chat upon kicking a user.
  banMessage: "**{user_tag}** has been banned for spamming.", // Message that will be sent in chat upon banning a user.
  maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
  maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
  maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
  exemptPermissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"], // Bypass users with any of these permissions.
  ignoreBots: false, // Ignore bot messages.
  verbose: true, // Extended Logs from module.
  ignoredUsers: [] // Array of User IDs that get ignored.
  // And many more options... See the documentation.
});

module.exports = {

  version: require("./package.json").version,

  checkspam(client){
  if (!client)
    return console.log(
      "[anti-raid]{type: error} ⚠️: make sure check your code(made by. Name boy and Οㄗ│Captaiℵ)"
    );

  client.on("ready", () => console.log(`[anti-raid]☑️: successfully active anti-raid(made by. Name boy and Οㄗ│Captaiℵ)`));
  
  client.on("message", message => antiSpam.message(message));

  // This is for all links

  client.on("message", message => {
    if (message.content.includes("https://")) {      
      if (!message.member.hasPermission("MANAGE_MESSAGES")){
   message.delete();
}
    }
    if (message.content.includes("http://")) {
          if (!message.member.hasPermission("MANAGE_MESSAGES")){
   message.delete();
} }
    if (message.content.includes("www.")) { 
       if (!message.member.hasPermission("MANAGE_MESSAGES")){
   message.delete();
}
    }
  });

  // This is the same as up but more for disocrd invite links

  client.on("message", async message => {
      
         if (!message.member.hasPermission("MANAGE_MESSAGES")){
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
let version = parseInt(Discord.version.split(".")[0], 10) < 12 ? "v11" : "v12";
           if(version === "v11"){
            sentMessags.delete(5000);
           } else {
            sentMessage.delete({ timeout: 5000, reason: "send link" });
           }
     });
      }
    } catch (e) {
      console.log(e);
    }
}
  });

}
}
