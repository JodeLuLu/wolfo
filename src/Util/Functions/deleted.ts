import { Message } from "discord.js";

export function pingsChannel(message: Message) {
    
    
    if (message.channel.id == "871503059329646622") {
        if (message.member.roles.cache.has(`713831778636398712`) || message.author.id == "845797782832939008") {return;} else {
        if (message.content.startsWith(`!actualizaciones`) || message.content.startsWith(`!noticias`) || message.content.startsWith(`!eventos`) || message.content.startsWith(`!alianzas`) || message.content.startsWith(`!nsfw`)) {         
            setTimeout(() => {
                message.delete()
            }, 8000);
        } else {
            message.delete();
        }
    }
    }
}

export function FhotBlocker(message: Message) {
    if (message.channel.nsfw) return;
    if (message.content.startsWith("u!fhot") || message.content.startsWith("u!flewd")) {
        message.delete();
        setTimeout(() => {
            message.channel.messages.fetch().then(x => x.map(x => x).filter(x => x.author.id == "809946357535997952")[0].delete())
        }, 500);
        message.channel.send("El fhot no esta permitido en el servidor fuera de canales NSFW." + "" + `${message.author}`).then(x => x.delete({timeout: 5000}))
    }
}