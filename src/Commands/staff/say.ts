import { Client } from "discord.js";
import { BaseCommand } from "../../Util/CLasses/BaseCommand";
import { TempContext } from "../../Util/Classes/Context";


export default class SayCommand extends BaseCommand {
constructor(client: Client) {
super(client, {
name: "say",
description: "Utilidad perfecta para anuncios del servidor",
category: "Categoría",
aliases: ["Dar a conocer", "announce"],
staff: true
      })
  }


async run(base: TempContext) {

    const args = base.args.join(" ");

    base.message.delete();
    base.channel.send(args);
}}