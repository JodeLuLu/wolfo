import {
  Client,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from "discord.js";
import { BaseCommand } from "../../Util/Classes/BaseCommand";
import { TempContext } from "../../Util/Classes/Context";

export default class NameCommand extends BaseCommand {
  constructor(client: Client) {
    super(client, {
      name: "postulation",
      description: "a",
    });
  }

  async run(base: TempContext) {
    const embed = new MessageEmbed()
      .setAuthor(`Postulaciones del servidor`, base.guild.iconURL())
      .setColor(base.guild.me.displayHexColor)
      .setDescription(
        `Bienvenidos a las postulaciones del servidor, por favor consulta los **requisitos** de la postulación para poder ver, si cumples con los requisitos por favor haz las preguntas.`
      )
      .setTimestamp();

    const requisitos = new MessageButton()
      .setLabel(`Requisitos`)
      .setStyle("SECONDARY")
      .setCustomId(`requisite`);

    const preguntas = new MessageButton()
      .setLabel(`¡Quiero postularme!`)
      .setStyle("PRIMARY")
      .setCustomId(`questions`);

    const buttons = new MessageActionRow().addComponents([
      preguntas,
      requisitos,
    ]);

    base.channel.send({ embeds: [embed], components: [buttons] });
  }
}
