import { TempContext } from "../../Util/Classes/Context"
import { BaseCommand } from "../../Util/Classes/BaseCommand"
import { BitField, Client, Message, MessageEmbed, Util } from 'discord.js'
import discord from "discord.js"
import node from 'node-superfetch'
import { MessageButton } from "discord-buttons"
import { uploadText } from "../../Util/Functions/uploadTo"
import { TimeStamp } from "../../Util/Classes/time"


export default class PingCommand extends BaseCommand {
    constructor(client: Client) {
        super(client, {
            name: `eval`,
            description: `Eval`,
            dev: true, 
            cooldown: 10,
            usage: (prefix: "j!") => "eval <codigo>",
            example: (prefix: "j!") => "eval message.author",
        })
    }

    
    
    async run(base: TempContext) {

        // Constants

        const message = base.message
        const time = TimeStamp
        const uploadTex = uploadText
        const bit = BitField
        const Discord = discord
        const util = Util;

        function send(text: object | number |string) {
            return message.channel.send(text);  
        }

        function messages(id: string) {
            return message.channel.messages.fetch(id);

        }

        function channels(id: string) {
            return message.guild.channels.cache.get(id);

        }

        const { query, flags } = parseQuery(base.args);
    
    if (!query.length) return;
    
    let input = query.join(" ");
    
    const embed = new MessageEmbed()
    .setTitle("Eval~");
    if (input.length > 2048) {
        const { body } = await node.post("https://paste.mod.gg/documents").send(input);
        embed.setDescription(`:inbox_tray: **Entrada:**\nhttps://paste.mod.gg/${body.key}.js`);
    } else {
        embed.setDescription(":inbox_tray: **Entrada:**\n" + "```js\n" + input + "```");
    }
    
    try {
        if (flags.includes("async")) {
            input = `(async () => { ${input} })()`;
        }
        
        let { evaled, type } = await parseEval(eval(input));
        
        let depth = 0;
        
        if (flags.some(input => input.includes("depth"))) {
            depth = flags.find(number => number.includes("depth")).split("=")[1];
            depth = parseInt(`${depth}`, 10);
        }
        
        if (flags.includes("silent")) return;
        
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled, { depth });
        
        let output = evaled.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        
        if (output.length > 1024) {
            const { body } = await node.post("https://paste.mod.gg/documents").send(output);
            embed.addField(":outbox_tray: **Output:**", `https://paste.mod.gg/${body.key}.js`);
        } else if (input.includes("TOKEN") || input.includes("process.env")) {
            embed.addField(":outbox_tray: **Salida:**", "```diff\n- Esto es privado```");
        } else {
            embed.addField(":outbox_tray: **Salida:**", "```js\n" + output + "```");
        }
        embed.addField(":label: Tipo:", "```ts\n" + "\u200B" + type + "```", true);
        embed.addField(`:robot: Ping:`, "```ts\n" + "\u200B" + Math.floor(base.client.ws.ping) + "ms" + "```", true);
        embed.setColor(0x002c2f33)

        const button = new MessageButton()
        .setStyle(4)
        .setID("1")
        .setLabel("Presiona para eliminar el mensaje");
        
        const one = await base.channel.send("⠀", {embed: embed, component: button})
        const filtro = (x) => x.clicker.user.id === base.message.author.id;
        const collector = await one.awaitButtons(filtro, {max: 5000, maxButtons: 1})

        if (!collector.size) {
            return button.setDisabled()
        }

        one.delete()

    } catch(error) {
        if (error.length > 1024) {
            const { body } = await node.post("https://paste.mod.gg/documents").send(error);
            embed.addField(":outbox_tray: **Entrada:**", `https://paste.mod.gg/${body.key}.ts`);
        } else {
            embed.addField(":outbox_tray: **Salida:**", "```js\n" + error + "```");
        }
        embed.addField(":label: Tipo:", "```ts\n" + parseType(error) + "```");

        const button = new MessageButton()
        .setStyle(4)
        .setID("1")
        .setLabel("Presiona para eliminar el mensaje");

        const one = await base.channel.send("⠀", {embed: embed, component: button})
        
        const filtro = (x) => x.clicker.user.id === base.message.author.id;
        const collector = await one.awaitButtons(filtro, {max: 5000, maxButtons: 1})

        if (!collector.size) {
            return button.setDisabled()
        }

        one.delete()


        
        
    }
    }
}

async function parseEval(input) {
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

function parseType(input) {
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

function parseQuery(queries) {
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

