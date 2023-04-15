require("dotenv").config();

const { Client, GatewayIntentBits  } = require("discord.js");

const intent = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.MessageContent
]

const client = new Client({ intents: intent });

const features = require("./Features/Load-features");
const cmds = require("./Commands/load-commands");
const { Mongo } = require("./mongo");
cmds(client);
features(client);


client.on("ready", async () => {
    console.log("Bot is alive");
    await Mongo().then(() => {
        console.log("Mongo connected!!");
    })
});


client.login(process.env.token);
