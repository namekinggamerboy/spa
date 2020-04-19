const Discord = require("discord.js");
const client = new Discord.Client();
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
    warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
    kickThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
    kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
    banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
    maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
    exemptPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
    ignoreBots: true, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredUsers: [], // Array of User IDs that get ignored.
    // And many more options... See the documentation.
});

async function apiPost(token, prefix) { 

if(!token) return console.log("[spam-api]{type: error} ⚠️: make sure your give me bot token or invite bot token"); 
if(!prefix) return console.log("[spam-api]{type: error} ⚠️: make sure your give me bot prefix"); 
 
client.on('ready', () => console.log(`Logged in as ${client.user.tag}.`));
 
client.on('message', (message) => antiSpam.message(message)); 


client.on('ready', () => {
    console.log(`Logging as ${client.user.tag}`);
  });


  // This is for all links

  client.on("message", (message) => {
    if (message.channel.id === '') return; // Maybe You Wanna Ignore A Channel
	  if (message.channel.id === '') return; // Same here you need to just enter the channel id
    if (message.content.includes("https://")) {
      message.delete();
    
    }
    if (message.content.includes("http://")) {
      message.delete();
   
    }
    if (message.content.includes("www.")) {
      message.delete();
   
    }
  });
  

  // This is the same as up but more for disocrd invite links


  client.on(`message`, async message => {
    const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
    try {
        if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
            if (message.author.id === "") return; // This is to ignore a user maybe you
		 if (message.channel.id === '') return; //ignore channel
		if (message.channel.id === '') return; //ignore channel
            await message.delete();
            await message.channel.send(`${message.author}, Dont send invite links here!`).then(sentMessage => {   
       sentMessage.delete(5000); // Message will delete in 5 sec
});
  
	}
    } catch (e) {
        console.log(e);
    }
});


// This is a ban command, you can remove it if you want.

 
client.on('message', message => {

    if (message.author.x5bz) return;
if (!message.content.startsWith(prefix)) return;
        
let command = message.content.split(" ")[0];
command = command.slice(prefix.length);

let args = message.content.split(" ").slice(1);

if (command == "ban") {
             if(!message.channel.guild) return message.reply('** This command only for servers**');
       
if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**You Don't Have ` BAN_MEMBERS ` Permission**");
if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
let user = message.mentions.users.first();
if (message.mentions.users.size < 1) return message.reply("**Mention Someone**");
if (!message.guild.member(user)
.bannable) return message.reply("**I Cant BAN Someone With Higher Role Than Me**");

message.guild.member(user).ban(7, user);

const banembed = new Discord.RichEmbed()
.setAuthor(`BANNED!`, user.displayAvatarURL)
.setColor("RANDOM")
.setTimestamp()
.addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
.addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
message.channel.send({
  embed : banembed
})
}
});


// Enter your bot token here and done.

client.login(token);
}
module.exports = apiPost;
