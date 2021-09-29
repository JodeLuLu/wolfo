import {
  Collection,
  Message,
  MessageEmbed,
  PartialMessage,
  RateLimitData,
  Snowflake,
} from "discord.js";
import { Client } from "discord.js";
import { consola } from "../..";
import { Apodo, Bans, Members, Messages, Roles } from "../Classes/logger";
import { NewMember } from "../Classes/MemberUtil";
import { RateLimited, richPresence } from "./clientUtil";
import { interactionUtil } from "./interactionUtil";
import { messageUtil } from "./messageUtil";

export function eventsCentral(client: Client) {
  try {
    // WolfyBot
    client.on("ready", () => {
      richPresence(client);
    });

    client.on("rateLimit", (ratelimit: RateLimitData) => {
      RateLimited(ratelimit, client);
    });

    // Mensajes
    client.on("messageCreate", (message) => {
      messageUtil(message);
    });
    client.on("messageDelete", async (message: Message) => {
      if (message.partial) await message.fetch();
      const a = new Messages(message);
      a.deleted();
    });
    client.on("messageUpdate", (viejo: Message, nuevo: Message) => {
      new Messages(nuevo, viejo).edited();
    });
    client.on(
      `messageDeleteBulk`,
      (messages: Collection<Snowflake, Message>) => {
        new Messages(null, null, null, messages).BulkDelete();
      }
    );
    client.on(`interactionCreate`, (interaction) => {
      interactionUtil(interaction);
    });

    // Member
    client.on("guildMemberUpdate", (viejo, nuevo) => {
      new Roles(nuevo, viejo).quitado();
      new Roles(nuevo, viejo).puesto();
      new Apodo(viejo, nuevo).cambiado();
    });
    client.on("guildMemberAdd", (miembro) => {
      new Members(miembro).entrante();
    });

    client.on("guildMemberRemove", (miembro) => {
      new Members(miembro).saliente();
    });

    client.on("debug", (log) => {
      consola.log(log);
    });

    client.on("guildBanAdd", (ban) => {
      new Bans(ban).banned();
    });

    client.on("guildBanRemove", (ban) => {
      new Bans(ban).unbanned();
    });
  } catch (e) {}
}
