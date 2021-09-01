import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Client, Collection } from "discord.js";
import { consola } from "../..";
import { BaseCommand } from "../../Util/Classes/BaseCommand";
import { TempContext } from "../../Util/Classes/Context";
import fs from "fs"
import { limitedCommand } from "../../Util/assets/limitedSlashCommand";


export default class NameCommand extends BaseCommand {
constructor(client: Client) {
super(client, {
name: "shupdate",
description: "Reinicia los slash commands o sube nuevos slash commands",
dev: true

      })
  }


async run(base: TempContext) {


      const rest = new REST({version: "9"}).setToken(process.env.TOKEN);
      
      
      (async () => {
        try {
          base.reply(`Estoy escaneando posibles (/ commands) y subiendolos a la API espera...`)
        
          await rest.put(
              Routes.applicationGuildCommands(`${base.client.user.id}`, `699200033131724870`),
              {body: limitedCommand}
          );
        
          base.reply(`El escaneo de / comandos se ha llevado satisfactoriamente y se han subido 5 comandos en total al servidor.\n\n**https://discord.com/oauth2/authorize?client_id=${base.client.user.id}&scope=applications.commands** Aqui tienes el link para que los actulices bb hermoso precioso`)
        } catch (error) {
          base.reply(`No se pueden subir los comandos a la API debido a que ha pasado un error de mientras que intentaba hacerlo, el codigo de error es:\n\n\`${error}\``)
        }
      })();

}}