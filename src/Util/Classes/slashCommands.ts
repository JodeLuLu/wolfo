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

        const interaction = new SlashContext(this.interaction.client, this.interaction);

        interaction.options = this.interaction.options.data;
        const options = interaction.options;

        const command = this.interaction.commandName;
        let cmd = this.interaction.client.slashCommands.get(command) || null;
        
        if (!cmd) return this.interaction.reply("No se encontró el comando.");
        if (cmd.canRun(this.interaction, false)) return;
        return cmd.run(interaction);


     
        

    }



}