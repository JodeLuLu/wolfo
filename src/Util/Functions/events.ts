import { Collection, Message, MessageEmbed, PartialMessage, RateLimitData, Snowflake } from "discord.js";
import { Client } from "discord.js";
import { Messages, Roles } from "../Classes/logger";
import { NewMember } from "../Classes/MemberUtil";
import { TimeStamp } from "../Classes/time";
import { RateLimited, richPresence } from "./clientUtil";

export function eventsCentral(client: Client) {

    // WolfyBot
    client.on("ready", () => {richPresence(client)});

    client.on("rateLimit", (ratelimit: RateLimitData) => {RateLimited(ratelimit, client)});
    // Mensajes
    client.on("messageDelete", async (message: Message) => {if (message.partial) await message.fetch(); const a = new Messages(message); a.deleted()});
    client.on("messageUpdate", (viejo: Message, nuevo: Message) => {new Messages(nuevo, viejo).edited()});
    client.on("messageDeleteBulk", (messages: Collection<Snowflake, Message>) => {new Messages(null, null, null, messages).BulkDelete()});

    // Member
    client.on("guildMemberUpdate", (viejo, nuevo) => {new Roles(nuevo, viejo).quitado(); new Roles(nuevo, viejo).puesto();});
    client.on("guildMemberAdd", (miembro) => {const a = new NewMember(miembro); a.putRoles(); a.welcomeMessage()});
}