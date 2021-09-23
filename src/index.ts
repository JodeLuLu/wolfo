import { Collection, Client, Message } from "discord.js";
import { config } from "./config";
import { handlers } from "./Util/Functions/handlers";
import Captain from "captainjs";
import "./Typings";

import { eventsCentral } from "./Util/Functions/events";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

export const consola = new Captain.Console({
  use_colors: true,
  debug: false,
  format: "§8[§d%time%§8] [%prefix%§8] §7%message%",
  log_prefix: "§aLog",
  warn_prefix: "§eWarn",
  error_prefix: "§cError",
  info_prefix: "§bInfo",
  debug_prefix: "§bDebug",
});

export const TempoClient = new Client({
  partials: ["CHANNEL", "USER", "REACTION", "MESSAGE", "GUILD_MEMBER"],
  intents: [
    "GUILDS",
    "GUILD_BANS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_INTEGRATIONS",
    "GUILD_INVITES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "GUILD_PRESENCES",
    "GUILD_VOICE_STATES",
    "GUILD_WEBHOOKS",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
  ],
});

// Eventos por que con clases que flojera hacer todo así

process.on("uncaughtException", (err) => {
  console.error(err && err.stack);
});

process.on(`unhandledRejection`, (err) => {
  consola.error(err && err);
});

eventsCentral(TempoClient);

TempoClient.commands = new Collection();
TempoClient.slashCommands = new Collection();
TempoClient.joinManager = new Collection();

export var db = new JsonDB(
  new Config("./src/Util/assets/postulationsData", true, true, "/")
);

handlers(TempoClient);

TempoClient.login(config.auth.token);
