import { Collection, Message, Snowflake } from "discord.js";
import { Client } from "discord.js";
import { Messages } from "../Classes/logger";

export function eventsCentral(client: Client) {
    client.on("messageDelete", (message: Message) => new Messages(message).deleted());
    client.on("messageUpdate", (viejo: Message, nuevo: Message) => new Messages(nuevo, viejo).edited());
    client.on("messageDeleteBulk", (messages: Collection<Snowflake, Message>) => new Messages(null, null, null, messages).BulkDelete());
}