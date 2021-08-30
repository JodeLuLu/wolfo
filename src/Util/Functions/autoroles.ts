import { Message } from "discord.js";

export function pings(message: Message) {

    if (message.channel.id === "871503059329646622") {
        if (message.content == "!actualizaciones") {
            message.reply("Comando obsoleto, utiliza `/actualizaciones`").then(x => setTimeout(() => {x.delete()}, 8000))
       
        }

        if (message.content == "!noticias") {
           message.reply("Comando obsoleto, utiliza `/noticias`").then(x => setTimeout(() => {x.delete()}, 8000))
            }

            if (message.content == "!eventos") {
                message.reply("Comando obsoleto, utiliza `/eventos`").then(x => setTimeout(() => {x.delete()}, 8000))
                }

                if (message.content == "!alianzas") {
                    message.reply("Comando obsoleto, utiliza `/alianzas`").then(x => setTimeout(() => {x.delete()}, 8000))
                    }

                    if (message.content == "!nsfw") {
                        message.reply("Comando obsoleto, utiliza `/nsfw`").then(x => setTimeout(() => {x.delete()}, 8000))
                        }

                
    }
    
}