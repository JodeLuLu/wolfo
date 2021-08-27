import { Client, Message, MessageEmbed } from "discord.js";
import { BaseCommand } from "../../Util/CLasses/BaseCommand";
import { TempContext } from "../../Util/Classes/Context";
import { TimeStamp } from "../../Util/Classes/time";
import { parseQuery } from "../../Util/Functions/messageUtil";


export default class NameCommand extends BaseCommand {
constructor(client: Client) {
super(client, {
name: "created",
description: "Muestra cuando se creo una cuenta",
category: "server",
aliases: ["cr", "a"]
      })
  }


async run(base: TempContext) {

  


  if (base.flags.includes("all") || base.flags.includes("complete")) {
  var usuario = base.message.mentions.users.first() || base.client.users.cache.get(base.args[0]);
  if (!base.args[0] || usuario == undefined) var usuario = base.author;

  const b = new TimeStamp(usuario.createdTimestamp).relative();

  var segundos = b[0], minutos = b[1], horas = b[2], dias = b[3], semanas = b[4] ,meses = b[5],años = b[6];
  if (!segundos.includes(`segundos`)) segundos = null;
  if (!minutos.includes(`minutos`)) minutos = null;
  if (!horas.includes(`horas`)) horas = null;
  if (!dias.includes(`días`)) dias = null;
  if (!semanas.includes(`semanas`)) semanas = null;
  if (!meses.includes(`meses`)) meses = null;
  if (!años.includes(`años`)) años = null;

  var embed = new MessageEmbed()
  .setColor(0xFFB200)
  .setTitle(`${usuario.tag} | Creación de la cuenta`);

  if (segundos != null) embed.addField(`Segundos`, segundos);
  if (minutos != null) embed.addField(`Minutos`, minutos);
  if (horas != null) embed.addField(`Horas`, horas);
  if (dias != null) embed.addField(`Días`, dias);
  if (semanas != null) embed.addField(`Semanas`, semanas);
  if (meses != null) embed.addField(`Meses`, meses);
  if (años != null) embed.addField(`Años`, años);
  embed.setTimestamp();

  if (base.flags.includes("sexo")) return base.send("ola")

  base.send(embed);

  } else {
    var usuario = base.message.mentions.users.first() || base.client.users.cache.get(base.args[0]);
    if (!base.args[0] || usuario == undefined) var usuario = base.author;

    const b = new TimeStamp(usuario.createdTimestamp).variable();
    var tiempo = b;
    

    if (b.includes("segundo") ||b.includes("segundos") || b.includes("minuto") || b.includes("minutos") || 
    b.includes("hora") || b.includes("horas") || b.includes("día") || b.includes("días") || b.includes("semana") || b.includes("semanas")) var sospechosa = true
    else var sospechosa = false;

    const embed = new MessageEmbed()
    .setAuthor(`${usuario.tag}`, usuario.displayAvatarURL())
    .setDescription(`Cuenta creada **${tiempo}** y el usuario lleva desde **${new TimeStamp(base.guild.members.cache.get(`${usuario.id}`).joinedTimestamp).variable()}** en el servidor.\nSospechosa: ${sospechosa ? "✅" : "❌"}`)
    .setColor(sospechosa ? "RED" : "GREEN");

    base.send(embed);
  }

}}