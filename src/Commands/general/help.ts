import {
  Client,
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
} from "discord.js";
import { BaseCommand } from "../../Util/Classes/BaseCommand";
import { TempContext } from "../../Util/Classes/Context";

export default class NameCommand extends BaseCommand {
  constructor(client: Client) {
    super(client, {
      name: "help",
      description: "Muestra la ayuda del bot",
      category: "general",
      aliases: ["ayuda", "jelp", "eheklp", "wolfo", "h"],
      dev: true,
    });
  }

  async run(base: TempContext) {
    const embed = new MessageEmbed()
      .setAuthor(`Ayuda del bot.`)
      .setDescription(
        `**¡Bievenido a la ayuda del bot!**\nPor favor selecciona una opcion del menú de abajo para poder continuar.`
      );
    const menu = new MessageSelectMenu()
      .setCustomId("a")
      .addOptions([
        {
          value: "info",
          label: "¿Qué hago yo?",
          description:
            "Muestra lo que hago en el servidor y mis funciones principales.",
          emoji: "🤔",
        },
        {
          value: "specs",
          label: "Mis especificaciones",
          description:
            "Muestra donde estoy hosteado, y los recursos de mi sistema.",
          emoji: "💻",
        },
      ])
      .setPlaceholder(`Elige una opcion.`);

    const a = new MessageActionRow().addComponents(menu);

    base.channel.send({ content: ".", embeds: [embed], components: [a] });
  }
}
