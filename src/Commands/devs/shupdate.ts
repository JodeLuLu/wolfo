import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Client } from "discord.js";
import { consola } from "../..";
import { BaseCommand } from "../../Util/CLasses/BaseCommand";
import { TempContext } from "../../Util/Classes/Context";


export default class NameCommand extends BaseCommand {
constructor(client: Client) {
super(client, {
name: "shupdate",
description: "Reinicia los slash commands o sube nuevos slash commands",
dev: true

      })
  }


async run(base: TempContext) {

    const commands = [{
        name: "nsfw",
        description: "Te da/quita acceso a los canales NSFW del servidor." 
      }, 
      {
        name: "actualizaciones",
        description: "Te da/quita el rol de actualizaciones para recibir/no recibir pings de él."
      },
      {
        name: "noticias",
        description: "Te da/quita el rol de noticias para acceder a las noticias de wolfy."
      }, 
      {
        name: "alianzas",
        description: "Te da/quita el rol de alianzas del servidor para recibir/no recibir pings de él."
      }, 
      {
        name: "eventos",
        description: "Te da/quita el rol de eventos del servidor para recibir/no recibir pings de él."
      }];
      
      const rest = new REST({version: "9"}).setToken(process.env.TOKEN);
      
      
      (async () => {
        
      
        try {
          base.send(`Estoy escaneando posibles (/ commands) y subiendolos a la API espera...`)
        
          await rest.put(
              Routes.applicationCommands(`845797782832939008`),
              {body: commands}
          );
        
          consola.log(`El escaneo de / comandos se ha llevado satisfactoriamente y se han subido 5 comandos en total al servidor.`)
        } catch (error) {
          consola.error(error);
        }
      })();

}}