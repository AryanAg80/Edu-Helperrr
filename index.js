require("dotenv").config();

const { Intents, Client, Collection, RoleManager } = require("discord.js");
const allIntents = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
]
const client = new Client({ intents: allIntents, partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION', 'USER'] });


const Features = require("./SRC/Features/load-features");
const cmds = require("./SRC/Commands/load-commands");
const slash = require("./SRC/Global-slash-Cmds/load-slash");
const SLASH = require("./SRC/utils/slash");
const mongo = require("./SRC/utils/mongo");

client.on("ready", async () => {
    console.log("Bot is online and ready to roll!!");
    await mongo();
});

Features(client);
cmds(client);
slash(client);
SLASH(client);

client.login(process.env.Token);