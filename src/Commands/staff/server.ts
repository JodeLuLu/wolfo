import { Client } from "discord.js";
import { BaseCommand } from "../../Util/CLasses/BaseCommand";
import { TempContext } from "../../Util/Classes/Context";


export default class NameCommand extends BaseCommand {
constructor(client: Client) {
super(client, {
name: "server",
description: "diego",
category: "dev",
aliases: ["update"],
staff: true,
guildOnly: true,
usage: (prefix: "prefix") => "COMANDO",
example: (prefix: "prefix") => "COMANDO"
      })
  }


async run(base: TempContext) {

    const suggest =  base.args.join(" ");

    if (!base.args) return base.reply(`Debes de poner el cambio`)

    base.client.channels.cache.get(`867835428275355708`).send(`> **${suggest}**\n\n<@&871501359218851850>\nSi no quieres recibir pings de este rol, puedes ir a <#871503059329646622> y quitar este rol de tu perfil con el comando de \`/rol actualizaciones\`.`).then(x => x.crosspost())
    await base.channel.send(`✅ Se ha enviado el cambio del servidor.`)

}}