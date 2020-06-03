const AntiSpam = require("discord-anti-spam");
const Discord = require("discord.js");

module.exports = {

  version: require("./package.json").version,

  checkspam(client){
  if (!client.client)
    return console.log(
      "[anti-raid]{type: error} ⚠️: make sure check your code(made by. Name boy and Οㄗ│Captaiℵ)"
    );

  client.on("ready", () => console.log(`[anti-raid]☑️: successfully active anti-raid(made by. Name boy and Οㄗ│Captaiℵ)`));
  
const antiSpam = new AntiSpam({
  warnThreshold: client.warn||3,
  kickThreshold: client.kick||7,
  banThreshold: client.ban||7,
  maxInterval: client.interval||2000,
  warnMessage: "{@user}, Please stop spamming.",
  kickMessage: "**{user_tag}** has been kicked for spamming.",
  banMessage: "**{user_tag}** has been banned for spamming.",
  maxDuplicatesWarning: client.maxwarn||7,
  maxDuplicatesKick: client.maxkick||10,
  maxDuplicatesBan: client.maxban||12,
  exemptPermissions: client.permission||["ADMINISTRATOR", "MANAGE_MESSAGES"], 
  ignoreBots: client.bot||false,
  verbose: client.verbose||true,
  ignoredUsers: client.ignoreduser||[]
});
    
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
      let version = parseInt(Discord.version.split(".")[0], 10) < 12 ? "v11" : "v12";
      if (
        bannedWords.some(word => message.content.toLowerCase().includes(word))
      ) {
        await message.delete();
        await message.channel
          .send(`${message.author}`, {embed:{ title: `Dont send invite links here!`, color: 0xff0000}})
          .then(sentMessage => {
           if(version === "v11"){
            sentMessage.delete(5000);
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
