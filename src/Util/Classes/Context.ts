import { config } from "../../config"
import { Message, MessageEmbed, Client } from "discord.js"



type options = 'boterror' | 'error' | 'info' | 'good' | undefined

export class TempContext {
    message: Message
    client: Client
    config: typeof config
    args: string[]
    flags: string[]
    constructor(Temp: Client, message: Message) {
        this.message = message
        this.client = Temp
        this.config = config
        this.args = []
        this.flags = []
    }

    get channel() {
        return this.message.channel;
    }
    get guild() {
        return this.message.guild;
    }
    get user() {
        return this.message.author;
    }
    get member() {
        return this.message.member;
    }

    get author() {
        return this.message.author;
    }

    

    send(content: any, adds?: any) {

        if (typeof content === "object") return this.message.channel.send({embeds: [content]});
        if (!adds) return this.message.channel.send(`${content}`);
        return this.message.channel.send({content: `${content}`, embeds: [adds]});
    }

    reply(content: any, adds?: any) {
        
        if (typeof content === "object") return this.message.reply({embeds: [content]});
        if (!adds) return this.message.reply(`${content}`);
        return this.message.reply({content: `${content}`, embeds: [adds]});
    }
}
