import { MessageButton } from "discord-buttons";
import { Collection, GuildMember, Message, MessageEmbed, Role, Snowflake, User, Util, WebhookClient } from "discord.js";
import { TimeStamp } from "./time";
const superagent = require("superagent");



export class Messages {
    message: Message;
    message2: Message;
    author: User;
    messages: Collection<Snowflake, Message>;

    constructor(message: Message, message2?: Message, author?: User, messages?: Collection<Snowflake, Message>) {
        this.message = message;
        this.message2 = message2;
        this.author = author;
        this.messages = messages;
    }

    async deleted() {
        
        if (this.message.partial) await this.message.fetch();

        if (this.message.author.bot == true) var bott = "Si";
        if (this.message.author.bot == false) bott = "No";
        if (this.message.author.bot == null) bott = "Sin datos";
        
        if (this.message.attachments.first()) {
            var mapita = this.message.attachments.map(mapita => mapita);
            mapita.forEach(m => {
                superagent
                .get(`https://api.imgbb.com/1/upload?key=${[process.env.IMAGES_API]}&image=${m.proxyURL}`)
                .then(x => {
                    const w = new MessageEmbed()
                    .setAuthor(`${this.message.author.tag} | Imagen eliminada`, this.message.author.displayAvatarURL({dynamic: true}))
                    .setColor(`BLUE`)
                    .setImage(`${x.body.data.url}`)
                    .setDescription(`> **Mensaje**\n\n**ID del mensaje:** ${this.message.id}\n**Autor del mensaje:** ${this.message.author} (${this.message.author.id})\n**Canal:**${this.message.channel} (${this.message.channel.id})\n**Creación del mensaje:** <t:${new TimeStamp(this.message.createdTimestamp).OutDecimals()}:R>\nBot: **${bott}**\n\n> **Fotografía**\n\n**Nombre de la fotografía:** ${m.name}\n**Link de la fotografía**: [Link](${m.url})\n**Tamaño de la fotografía**: ${m.height} x ${m.width} pixeles\n**ID de la imagen:** ${m.id}\n**Link permanente:** [PermaLink](${x.body.data.url})`)
                    .setTimestamp();

                    this.message.guild.channels.cache.get(`867130572807471115`).send(w).catch(() => {})
                })
            })
        }

        
            if (this.message.embeds) {
                 this.message.embeds.forEach(x => {
                     const b = new MessageEmbed()
                     .setAuthor(`${this.message.author.tag} | Embed eliminado`, this.message.author.displayAvatarURL({dynamic: true}))
                     .setDescription(`**Embed eliminado**\n\n**Canal:** ${this.message.channel} (${this.message.channel.id})\n**Autor:** ${this.message.author} (${this.message.author.id})\n**Creado:** <t:${new TimeStamp(this.message.createdTimestamp).OutDecimals()}:R>\n**ID del mensaje:** ${this.message.id}\nBot: **${bott}**\n**Embed:**`)
                     .setColor(0x005f1d91);

                    return this.message.guild.channels.cache.get(`867130572807471115`).send({embed: b}).then(() => this.message.guild.channels.cache.get(`867130572807471115`).send({embed: x})).catch(() => {})
                })
            }
        

        if (this.message.content == null || this.message.content.length == 0) return;

        if (Date.now() - this.message.createdTimestamp >= 20000) {
        const a = new MessageEmbed()
        .setAuthor(`${this.message.author.tag} | Mensaje eliminado`, this.message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`**Canal:** ${this.message.channel} (${this.message.channel.id})\n**Autor**: ${this.message.author} (${this.message.author.id})\n**Creado:** <t:${new TimeStamp(this.message.createdTimestamp).OutDecimals()}:R>\n**ID del mensaje:** ${this.message.id}\nBot: **${bott}**\n\n**Contenido:**\n\`\`\`${this.message.content}\`\`\``)
        .setColor(0x00b30b0b)
        return await this.message.guild.channels.cache.get(`867130572807471115`).send(a).catch(() => {})
        }

        const a = new MessageEmbed()
        .setAuthor(`${this.message.author.tag} | Mensaje eliminado`, this.message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`**Canal:** ${this.message.channel} (${this.message.channel.id})\n**Autor**: ${this.message.author} (${this.message.author.id})\n**Creado:** <t:${new TimeStamp(this.message.createdTimestamp).OutDecimals()}:R>\n**ID del mensaje:** ${this.message.id}\nBot: **${bott}**\n\n**Contenido:**\n\`\`\`${this.message.content}\`\`\``)
        .setColor(0x00b30b0b)

        return this.message.guild.channels.cache.get(`867130572807471115`).send(a).catch(() => {})        
    }

    async edited() {
        if (this.message.partial) await this.message.fetch();

        if (this.message.author.bot == true) var bott = "Si";
        if (this.message.author.bot == false) bott = "No";
        if (this.message.author.bot == null) bott = "Sin datos";

        const a = new MessageEmbed()
        .setAuthor(`${this.message.author.tag} | Mensaje editado`, this.message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`**Canal:** ${this.message.channel} (${this.message.channel.id})\n**Autor**: ${this.message.author} (${this.message.author.id})\n**Creado:** <t:${new TimeStamp(this.message.createdTimestamp).OutDecimals()}:R>\n**Editado:** <t:${new TimeStamp(Date.now()).OutDecimals()}:R>\n**ID del mensaje**: ${this.message.id}\n**Bot:** ${bott}\n**Mensaje antes**:\n\`\`\`${this.message2}\`\`\`\n**Mensaje después:**\n\`\`\`${this.message}\`\`\``)
        .setColor(0x00d17a08);

        const b = new MessageButton()
        .setStyle("url")
        .setURL(`https://discord.com/channels/${this.message.guild.id}/${this.message.channel.id}/${this.message.id}`)
        .setLabel("Ir al mensaje");

        return this.message.guild.channels.cache.get(`867130572807471115`).send("⠀", {embed: a, component: b})
    }

    

}

export class Roles {
    role: Role
    received: GuildMember
    before: GuildMember
    reason: string

    constructor(received: GuildMember, before: GuildMember, role: Role, reason: string) {
        this.received = received;
        this.before = before;
        this.role = role;
        this.reason = reason;
    }

    async quitado() {
        if (this.before.roles.cache.size > this.received.roles.cache.size) {
            this.before.roles.cache.forEach(rol => {
                if (!this.received.roles.cache.has(rol.id)) {
                    const embed = new MessageEmbed()
                    .setAuthor(`${this.received.user.tag} | Rol removido`, this.received.user.displayAvatarURL())
                    .setColor(`RED`)
                    .setDescription(`${rol}`)
                    .setFooter(`ID ROL: ${rol.id} | ID USUARIO: ${this.received.id}`)
                    .setTimestamp();

                   
                }
            })
        }
    }

    async puesto() {
        if (this.before.roles.cache.size < this.received.roles.cache.size) {
            this.received.roles.cache.forEach(rol => {
                if (!this.before.roles.cache.has(rol.id)) {
                    const embed = new MessageEmbed()
                    .setAuthor(`${this.received.user.tag} | Rol puesto`, this.received.user.displayAvatarURL())
                    .setColor(`PURPLE`)
                    .setDescription(`${rol}`)
                    .setFooter(`ID ROL: ${rol.id} | ID USUARIO: ${this.received.id}`)
                    .setTimestamp();

                    
                }
            })
        }
    }
}

export class Apodo {
    before: GuildMember
    after: GuildMember

    // Check if the user changed their nickname
    constructor(before: GuildMember, after: GuildMember) {
        this.before = before;
        this.after = after;
    }

    async cambiado() {
        if (this.before.nickname === this.after.nickname) return;
        const embed = new MessageEmbed()
        .setAuthor(`${this.after.user.tag} | Apodo cambiado`, this.after.user.displayAvatarURL())
        .setColor(`PURPLE`)
        .addField(`Anterior apodo:`, `${this.before.nickname || "`Ninguno.`"}`)
        .addField(`Nuevo apodo:`, `${this.after.nickname || "`Ninguno.`"}`)
        .setFooter(`${this.before.nickname || " "} => ${this.after.nickname || " "} | Usuario: ${this.after.id}`)
        .setTimestamp();

        

        
    }
}

export class Sanción {
    sancionated: User
    moderator: User
    reason: string
    deleted: Message
    match: string

    constructor(sancionated: User, moderator: User, reason: string, deleted: Message, match: string) {
        this.sancionated = sancionated;
        this.moderator = moderator;
        this.reason = reason;
        this.deleted = deleted;
        this.match = match;
    }

    


    async groseria() {
        const time = new MessageEmbed()
        .setAuthor(`${this.reason} | ${this.sancionated.tag}`, this.sancionated.displayAvatarURL())
        .addField(`Usuario sancionado:`, this.sancionated, true)
        .addField(`Moderador:`, this.moderator, true)
        .addField(`Grosería:`, this.match, true)
        .addField(`Mensaje:`, this.deleted.content, true)
        .setColor(0x009825c2)
        .setTimestamp();

        
    }

    async racismo() {
        const time = new MessageEmbed()
        .setAuthor(`${this.reason} | ${this.sancionated.tag}`, this.sancionated.displayAvatarURL())
        .addField(`Usuario sancionado:`, this.sancionated, true)
        .addField(`Moderador:`, this.moderator, true)
        .addField(`Insulto racista:`, this.match, true)
        .addField(`Mensaje:`, this.deleted.content, true)
        .setColor(0x009825c2)
        .setTimestamp();

        
    }

    async acoso() {
        const time = new MessageEmbed()
        .setAuthor(`${this.reason} | ${this.sancionated.tag}`, this.sancionated.displayAvatarURL())
        .addField(`Usuario sancionado:`, this.sancionated, true)
        .addField(`Moderador:`, this.moderator, true)
        .addField(`Matcher:`, this.match, true)
        .addField(`Mensaje:`, this.deleted.content, true)
        .setColor(`BLACK`)
        .setTimestamp();

    }



}