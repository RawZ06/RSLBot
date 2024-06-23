import {executeCommand} from "./commands";
import 'dotenv/config'
const token = process.env.TOKEN;

// Require the necessary discord.js classes
import {ActivityType, Client, Events, GatewayIntentBits, Partials} from 'discord.js';

// Create a new client instance
const client = new Client({
    'intents': [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages
    ],
    'partials': [Partials.Channel]
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// When the client receives a message, run this code
client.on("messageCreate", (message) => {
    if (message.content.startsWith("!")) {
        executeCommand(message, message.content.slice(1));
    }
});

// Log in to Discord with your client's token
client.login(token);