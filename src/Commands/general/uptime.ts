import { Client } from "discord.js";
import { BaseCommand } from "../../Util/Classes/BaseCommand";
import { TempContext } from "../../Util/Classes/Context";
import { TimeStamp } from "../../Util/Classes/time";


export default class NameCommand extends BaseCommand {
constructor(client: Client) {
super(client, {
name: "uptime",
description: "Muestra cuanto tiempo lleva encendido el bot",
category: "general",
aliases: ["upt", "status"]
      })
  }


async run(base: TempContext) {
    base.send(`>>> **Llevo encendido desde el día <t:${new TimeStamp(base.client.readyTimestamp).OutDecimals()}>**\n**Llevo desde ${new TimeStamp(base.client.readyTimestamp).variable()} encendido**`);
}}