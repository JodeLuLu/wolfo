import { Collection, Client, Message } from "discord.js"
import { config } from './config'
import { handlers } from './Util/Functions/handlers'
import Captain from 'captainjs'
import './Typings'
import { Messages } from "./Util/Classes/logger"
import { uploadText } from "./Util/Functions/uploadTo"
import { eventsCentral } from "./Util/Functions/events"

global.prettyConsole = new Captain.Console({
    "use_colors": true,
    "debug": false,
    "format": "§8[§d%time%§8] [%prefix%§8] §7%message%",
    "log_prefix": "§aLog",
    "warn_prefix": "§eWarn",
    "error_prefix": "§cError",
    "info_prefix": "§bInfo",
    "debug_prefix": "§bDebug"
});

export const TempoClient = new Client({partials: ["CHANNEL", "USER", "REACTION", "MESSAGE", "GUILD_MEMBER"], intents: ["GUILDS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "GUILD_PRESENCES", "GUILD_VOICE_STATES", "GUILD_WEBHOOKS"]})

// Eventos por que con clases que flojera hacer todo así

eventsCentral(TempoClient);

TempoClient.uploadText = uploadText
TempoClient.commands = new Collection();
handlers(TempoClient)
TempoClient.login(config.auth.token)