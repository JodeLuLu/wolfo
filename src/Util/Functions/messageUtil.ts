import { Message } from "discord.js";

export function pingsChannel(message: Message) {
    if (message.channel.id == "871503059329646622") {
        if (message.author.id == "845797782832939008") {         
            setTimeout(() => {
                message.delete()
            }, 8000);
        } else {
            message.delete();
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
        message.channel.send("El fhot no esta permitido en el servidor fuera de canales NSFW." + "" + `${message.author}`).then(x => x.delete())
    }
}

export function HelperMC(message: Message) {
    if (message.author.bot) return;
    if (message.content.toLowerCase().includes(`link`) && message.content.toLowerCase().includes(`64 bits`) || message.content.toLowerCase().includes(`32 bits`)) return message.reply(`El link de descarga se encuentra en <#822541632221872189>. uwu`)
}

export async function parseEval(input) {
    const isPromise = input instanceof Promise && typeof input.then === "function" && typeof input.catch === "function";
    if (isPromise) {
        input = await input;
        return {
            evaled: input,
            type: `Promise<${parseType(input)}>`
        }
    }
    return {
        evaled: input,
        type: parseType(input)
    }
}

export function parseType(input) {
    if (input instanceof Buffer) {
        let length = Math.round(input.length / 1024 / 1024);
        let ic = "MB";
        
        if (!length) {
            length = Math.round(input.length / 1024);
            ic = "KB";
        }
        
        if (!length) {
            length = Math.round(input.length);
            ic = "Bytes";
        }
        return `Buffer (${length} ${ic})`;
    }
    return input === null || input === undefined ? "void" : input.constructor.name;
}

export function parseQuery(queries) {
    const query = [];
    const flags = [];
    
    for (const args of queries) {
        if (args.startsWith("--")) {
            flags.push(args.slice(2).toLowerCase());
        } else {
            query.push(args);
        }
    }
    return { query, flags }
}