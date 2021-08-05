import { Collection, Message, MessageEmbed, Snowflake } from "discord.js";
import { Client } from "discord.js";
import { Messages, Roles } from "../Classes/logger";
import { TimeStamp } from "../Classes/time";

export function eventsCentral(client: Client) {

    // WolfyBot
    client.on("ready", () => {


        const statuses = [
            `logs del servidor.`,
            `Autoroles del servidor`,
            `Usuarios nuevos`,
            `Todos los furrys en ${client.guilds.cache.get(`699200033131724870`).name}`,
            `Usuarios poniendo sus autoroles`
        ], status = statuses[Math.floor(Math.random() * statuses.length)]
    
        setInterval(() => {
        client.user.setPresence({ status: "idle", activity: { name: status, type: "WATCHING" } })
        }, 5000)

        // Logging
        const a = new MessageEmbed()
        .setAuthor(`Bot encendido/reiniciado`)
        .setColor(0x00FF00)
        .setDescription(`**Ping:** ${client.ws.ping}ms\n**Uptime:** <t:${new TimeStamp(client.readyTimestamp).OutDecimals()}:R>\n**Comandos:** Cargados correctamente ✅`);
        
        setTimeout(() => {
        client.channels.cache.get(`871853951455223818`).send(a);
        }, 10000);
    })

    // Mensajes
    client.on("messageDelete", (message: Message) => new Messages(message).deleted());
    client.on("messageUpdate", (viejo: Message, nuevo: Message) => new Messages(nuevo, viejo).edited());
    client.on("messageDeleteBulk", (messages: Collection<Snowflake, Message>) => new Messages(null, null, null, messages).BulkDelete());

    // Member
    client.on("guildMemberUpdate", (viejo, nuevo) => {new Roles(nuevo, viejo).quitado(); new Roles(nuevo, viejo).puesto();});
}