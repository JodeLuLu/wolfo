import { config } from "../../config"
import { Message, MessageEmbed, Client } from "discord.js"



type options = 'boterror' | 'error' | 'info' | 'good' | undefined

export class TempContext {
    message: Message
    client: Client
    config: typeof config
    args: string[]
    constructor(Temp: Client, message: Message) {
        this.message = message
        this.client = Temp
        this.config = config
        this.args = []
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

    send(content: any, adds?: any) {
        return this.channel.send({content: `${content}`, embeds: [adds]}).catch((e) => { console.log(e) });
    }

    embedRes(text, option: options = null, color = 'RANDOM') {
        const e = new MessageEmbed()
            .setTimestamp()

        switch (option) {
            case 'error':
                e.setColor(0x00FF0000)
                    .setDescription(`❌ | ${text}`)
                break;
            case 'info':
                e.setColor(0x3498db)
                    .setDescription(`<:info:779042723650207755> | ${text}`)
                break;
            case 'boterror':
                e.setColor(0x00FF0000)
                    .setDescription(`❌ | Se ha encontrado un error la ejecución del comando:\n \`\`\`js\n${text}\`\`\``)
                    .setFooter(`Reporta el error al staff si es necesario`)
                break;
            case 'good':
                e.setColor(0x2ecc71)
                    .setDescription(`👍 | ${text}`)
                break;
            default:
                e.setColor(0x0)
                    .setDescription(text)
                break;
        }

        return this.send(e)
    }
}
