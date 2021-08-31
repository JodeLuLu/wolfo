import { Client, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { BaseCommand } from "../../Util/Classes/BaseCommand";
import { TempContext } from "../../Util/Classes/Context";


export default class NameCommand extends BaseCommand {
constructor(client: Client) {
super(client, {
name: "veri",
description: "Sistema de verificacion",
staff: true
      })
  }


async run(base: TempContext) {
const embed = new MessageEmbed()
.setAuthor(`Verificación`)
.setDescription(`**Verificacion**\nComo ves, solo puedes ver 3 canales, **para poder ver los demás canales te tienes que verificar dando click al boton de abajo**`)
.setColor(`GREEN`);

const reglas = new MessageButton()
.setLabel(`📚」・reglas`)
.setStyle("LINK")
.setURL(`https://discord.com/channels/699200033131724870/820639236289331220`);

const veri = new MessageButton()
.setLabel(`Click aqui para verificarte`)
.setEmoji(`✅`)
.setStyle("PRIMARY")
.setCustomId(`verificacion`);

const a = new MessageActionRow()
.addComponents(reglas)
.addComponents(veri);

base.channel.send({embeds: [embed], components: [a]});
}}