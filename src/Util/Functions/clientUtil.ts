import { MessageEmbed, RateLimitData } from "discord.js";
import { Client } from "discord.js";
import { TimeStamp } from "../Classes/time";

export async function richPresence(client: Client) {

    const c = await client.guilds.cache.get(`699200033131724870`).roles.fetch(`871542385975386112`).then(x => x.members.size)

    const personalizados  = [`${client.guilds.cache.get(`699200033131724870`).memberCount} usuarios en el servidor.`, ` ${c} usuarios nuevos en el servidor.`, `Autoroles de usuarios.`, `Usuarios en 🚫」・cuarentena`];
    const personalizado = personalizados[Math.floor(Math.random() * personalizados.length)];
    
    
    setInterval(() => {
        client.user.setPresence({status: `idle`, activities: [{name: `${personalizado}`, type: "WATCHING"}]})
    }, 10000)

    // Logging
    const a = new MessageEmbed()
    .setAuthor(`Bot encendido/reiniciado`)
    .setColor(0x00FF00)
    .setDescription(`**Ping:** ${client.ws.ping}ms\n**Uptime:** <t:${new TimeStamp(client.readyTimestamp).OutDecimals()}:R>\n**Comandos:** Cargados correctamente ✅`);
    
    setTimeout(() => {
    client.channels.cache.get(`871853951455223818`);
    }, 10000);
}

export function RateLimited(ratelimit: RateLimitData, client: Client) {
    const b = new MessageEmbed()
    .setAuthor(`He sido ratelimiteado`)
    .setColor(0x00c6cc0c)
    .setDescription(`**Limite permitido:** ${ratelimit.limit}\n **Metodo:** ${ratelimit.method}\n**Directorio en el servidor:** ${ratelimit.path}\n**Timeout:** ${ratelimit.timeout}\n**Diferencia de tiempo:**`)
    .setTimestamp();

    client.channels.cache.get(`871853951455223818`);
}