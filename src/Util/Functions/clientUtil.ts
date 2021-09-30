import { MessageEmbed, RateLimitData } from "discord.js";
import { Client } from "discord.js";
import { consola } from "../..";
import { TimeStamp } from "../Classes/time";

export async function richPresence(client: Client) {
  consola.log(`Estoy listo.`);

  client.user.setPresence({
    status: "dnd",
    activities: [
      { name: "https://github.com/Chere3/wolfo/tree/main", type: "LISTENING" },
    ],
  });

  // Logging
  const a = new MessageEmbed()
    .setAuthor(`Bot encendido/reiniciado`)
    .setColor(0x00ff00)
    .setDescription(
      `**Ping:** ${client.ws.ping}ms\n**Uptime:** <t:${new TimeStamp(
        client.readyTimestamp
      ).OutDecimals()}:R>\n**Comandos:** Cargados correctamente ✅`
    );

  setTimeout(() => {
    client.channels.cache.get(`871853951455223818`);
  }, 10000);
}

export function RateLimited(ratelimit: RateLimitData, client: Client) {
  const b = new MessageEmbed()
    .setAuthor(`He sido ratelimiteado`)
    .setColor(0x00c6cc0c)
    .setDescription(
      `**Limite permitido:** ${ratelimit.limit}\n **Metodo:** ${ratelimit.method}\n**Directorio en el servidor:** ${ratelimit.path}\n**Timeout:** ${ratelimit.timeout}\n**Diferencia de tiempo:**`
    )
    .setTimestamp();

  client.channels.cache.get(`871853951455223818`);
}
