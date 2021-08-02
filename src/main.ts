import { Collection, Client, Message } from "discord.js"
import { config } from './config'
import { handlers } from './Util/Functions/handlers'
import Captain from 'captainjs'
import './Typings'
import { Messages } from "./Util/Classes/logger"
import { uploadText } from "./Util/Functions/uploadTo"

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

export const TempoClient = new Client({partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"], disableMentions: "everyone"})

require("discord-buttons")(TempoClient);

// Eventos por que con clases que flojera hacer todo así

TempoClient.on("messageDelete", (message: Message) => new Messages(message).deleted())
TempoClient.on("messageUpdate", (viejo: Message, nuevo: Message) => new Messages(nuevo, viejo).edited())

TempoClient.uploadText = uploadText
TempoClient.commands = new Collection();
handlers(TempoClient)
TempoClient.login(config.auth.token)