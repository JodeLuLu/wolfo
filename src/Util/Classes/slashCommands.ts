import {Client} from "discord.js";
import {REST} from "@discordjs/rest";
import { consola } from "../..";
import { Routes } from "discord-api-types";


/**
 * @class El operador y encargado de dar fin a los slash commands del bot este dará y subirá los slash commands.
 * @argument {Client} Client La instancia del cliente se usará para poder subir los slash commands y sus descripciones al servidor.
 * @argument {Interaction} Interaccion Encargada de dar respues a a los slash commands en un evento dedidcado a eso.
 */

export class SlashCommands {

    // Interface
    client: Client
    interaction
    // Interface



    constructor(client?: Client, interaccion?) {
        this.client = client;
        this.interaction = interaccion;
    }

    
    responseToSlashCommands() {
        if (!this.interaction.isCommand()) return;
        
        if (this.interaction.commandName == "nsfw") {
            return this.interaction.reply({content: "Lo sentimos pero este comando se encuentra desabilitado debido a que todos los canales NSFW del servidor, se encuentran cerrados temporalmente", ephemeral: true});
        } else if (this.interaction.commandName == "actualizaciones") {
            if (this.interaction.member.roles.cache.has(`871501359218851850`)) {
                this.interaction.member.roles.remove(`871501359218851850`, "El usuario se lo quito con el comando")
                this.interaction.reply(`${this.interaction.member} Te he quitado el rol de actualizaciones, ahora no recibirás pings del canal de <#867835428275355708>`)
            } else {
                this.interaction.member.roles.add(`871501359218851850`, "El usuario se lo puso con el comando")
                this.interaction.reply(`${this.interaction.member} Te he agregado el rol de actualizaciones, ahora recibirás pings del canal de <#867835428275355708>`)
            } 
        } else if (this.interaction.commandName == "noticias") {
            if (this.interaction.member.roles.cache.has(`871502816236175371`)) {
                this.interaction.member.roles.remove(`871502816236175371`, "El usuario se lo quito con el comando")
                this.interaction.reply(`${this.interaction.member} Te he quitado el rol de noticias, ahora no verás el canal de <#820639237519048724>`)
            } else {
                this.interaction.member.roles.add(`871502816236175371`, "El usuario se lo puso con el comando")
                this.interaction.reply(`${this.interaction.member} Te he agregado el rol de noticias, ahora verás el canal de <#820639237519048724>`)
            } 
        } else if (this.interaction.commandName == "eventos") {
            if (this.interaction.member.roles.cache.has(`871502962143395932`)) {
                this.interaction.member.roles.remove(`871502962143395932`, "El usuario se lo quito con el comando")
                this.interaction.reply(`${this.interaction.member} Te he quitado el rol de eventos, ahora no recibiras pings del canal de <#873601823204839494>`)
            } else {
                this.interaction.member.roles.add(`871502962143395932`, "El usuario se lo puso con el comando")
                this.interaction.reply(`${this.interaction.member} Te he agregado el rol de eventos, ahora recibiras pings del canal de <#873601823204839494>`)
            }
        } else if (this.interaction.commandName == "alianzas") {
            if (this.interaction.member.roles.cache.has(`871506101164703765`)) {
                this.interaction.member.roles.remove(`871506101164703765`, "El usuario se lo quito con el comando")
                this.interaction.reply(`${this.interaction.member} Te he quitado el rol de alianzas, ahora no recibiras pings del canal de <#844617663727927297>`)
            } else {
                this.interaction.member.roles.add(`871506101164703765`, "El usuario se lo puso con el comando")
                this.interaction.reply(`${this.interaction.member} Te he agregado el rol de alianzas, ahora recibiras pings del canal de <#844617663727927297>`)
            }
        }
    }



}