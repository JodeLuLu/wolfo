import {Client, CommandInteraction} from "discord.js";
import { SlashContext } from "./slashContext";


/**
 * @class El operador y encargado de dar fin a los slash commands del bot este dará y subirá los slash commands.
 * @argument {Client} Client La instancia del cliente se usará para poder subir los slash commands y sus descripciones al servidor.
 * @argument {Interaction} Interaccion Encargada de dar respues a a los slash commands en un evento dedidcado a eso.
 */

export class SlashCommands {

    // Interface
    client: Client
    interaction: CommandInteraction
    // Interface



    constructor(client?: Client, interaccion?) {
        this.client = client;
        this.interaction = interaccion;
    }

    
    SlashUtil() {


        if (!this.interaction.isCommand()) return;

        if (this.interaction.options.data[0].name == "nsfw") {
            if (this.interaction.member.roles.cache.has(`880673188906926091`)) {
              this.interaction.member.roles.remove(`880673188906926091`, "El usuario se lo quito con el comando")
              this.interaction.reply(`${this.interaction.member} Te he quitado el rol de NSFW, ahora no podrás ver canales del servidor.`)
          } else {
              this.interaction.member.roles.add(`880673188906926091`, "El usuario se lo puso con el comando")
              this.interaction.reply(`${this.interaction.member} Te he agregado el rol de NSFW, ahora podrás ver canales NSFW del servidor.`)
          } 
        } else if (this.interaction.options.data[0].name == "actualizaciones") {
            if (this.interaction.member.roles.cache.has(`871501359218851850`)) {
                this.interaction.member.roles.remove(`871501359218851850`, "El usuario se lo quito con el comando")
                this.interaction.reply(`${this.interaction.member} Te he quitado el rol de actualizaciones, ahora no recibirás pings del canal de <#867835428275355708>`)
            } else {
                this.interaction.member.roles.add(`871501359218851850`, "El usuario se lo puso con el comando")
                this.interaction.reply(`${this.interaction.member} Te he agregado el rol de actualizaciones, ahora recibirás pings del canal de <#867835428275355708>`)
            } 
        } else if (this.interaction.options.data[0].name == "noticias") {
            if (this.interaction.member.roles.cache.has(`871502816236175371`)) {
                this.interaction.member.roles.remove(`871502816236175371`, "El usuario se lo quito con el comando")
                this.interaction.reply(`${this.interaction.member} Te he quitado el rol de noticias, ahora no verás el canal de <#820639237519048724>`)
            } else {
                this.interaction.member.roles.add(`871502816236175371`, "El usuario se lo puso con el comando")
                this.interaction.reply(`${this.interaction.member} Te he agregado el rol de noticias, ahora verás el canal de <#820639237519048724>`)
            } 
        } else if (this.interaction.options.data[0].name == "eventos") {
            if (this.interaction.member.roles.cache.has(`871502962143395932`)) {
                this.interaction.member.roles.remove(`871502962143395932`, "El usuario se lo quito con el comando")
                this.interaction.reply(`${this.interaction.member} Te he quitado el rol de eventos, ahora no recibiras pings del canal de <#873601823204839494>`)
            } else {
                this.interaction.member.roles.add(`871502962143395932`, "El usuario se lo puso con el comando")
                this.interaction.reply(`${this.interaction.member} Te he agregado el rol de eventos, ahora recibiras pings del canal de <#873601823204839494>`)
            }
        } else if (this.interaction.options.data[0].name == "alianzas") {
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