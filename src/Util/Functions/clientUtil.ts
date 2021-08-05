import { MessageEmbed, RateLimitData } from "discord.js";
import { Client } from "discord.js";
import { TimeStamp } from "../Classes/time";

export function richPresence(client: Client) {
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
}

export function RateLimited(ratelimit: RateLimitData, client: Client) {
    const b = new MessageEmbed()
    .setAuthor(`He sido ratelimiteado`)
    .setColor(0x00c6cc0c)
    .setDescription(`**Limite permitido:** ${ratelimit.limit}\n **Metodo:** ${ratelimit.method}\n**Directorio en el servidor:** ${ratelimit.path}\n**Timeout:** ${ratelimit.timeout}\n**Diferencia de tiempo:** ${ratelimit.timeDifference}`)
    .setTimestamp();

    client.channels.cache.get(`871853951455223818`).send(b);
}