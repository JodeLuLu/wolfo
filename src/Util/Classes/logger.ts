import { MessageButton, PartialGuildMember } from "discord.js";
import { Collection, GuildMember, Message, MessageEmbed, Role, Snowflake, User, Util, WebhookClient } from "discord.js";
import { uploadText } from "../Functions/uploadTo";
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

                    this.message.guild.channels.cache.get(`867045061014323230`)
                })
            })
        }

        
            if (this.message.embeds) {
                 this.message.embeds.forEach(x => {
                     const b = new MessageEmbed()
                     .setAuthor(`${this.message.author.tag} | Embed eliminado`, this.message.author.displayAvatarURL({dynamic: true}))
                     .setDescription(`**Embed eliminado**\n\n**Canal:** ${this.message.channel} (${this.message.channel.id})\n**Autor:** ${this.message.author} (${this.message.author.id})\n**Creado:** <t:${new TimeStamp(this.message.createdTimestamp).OutDecimals()}:R>\n**ID del mensaje:** ${this.message.id}\nBot: **${bott}**\n**Embed:**`)
                     .setColor(0x005f1d91);

                    return this.message.guild.channels.cache.get(`867045061014323230`)
                })
            }
        

        if (this.message.content == null || this.message.content.length == 0) return;

        const a = new MessageEmbed()
        .setAuthor(`${this.message.author.tag} | Mensaje eliminado`, this.message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`**Canal:** ${this.message.channel} (${this.message.channel.id})\n**Autor**: ${this.message.author} (${this.message.author.id})\n**Creado:** <t:${new TimeStamp(this.message.createdTimestamp).OutDecimals()}:R>\n**ID del mensaje:** ${this.message.id}\nBot: **${bott}**\n\n**Contenido:**\n\`\`\`${this.message.content}\`\`\``)
        .setColor(0x00b30b0b)

        return this.message.guild.channels.cache.get(`867045061014323230`)       
    }

    async edited() {
        if (this.message.partial) await this.message.fetch();

        if (this.message.author.bot == true) var bott = "Si";
        if (this.message.author.bot == false) bott = "No";
        if (this.message.author.bot == null) bott = "Sin datos";

        

        if (this.message.content.length == 0) return;

        const a = new MessageEmbed()
        .setAuthor(`${this.message.author.tag} | Mensaje editado`, this.message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`**Canal:** ${this.message.channel} (${this.message.channel.id})\n**Autor**: ${this.message.author} (${this.message.author.id})\n**Creado:** <t:${new TimeStamp(this.message.createdTimestamp).OutDecimals()}:R>\n**Editado:** <t:${new TimeStamp(Date.now()).OutDecimals()}:R>\n**ID del mensaje**: ${this.message.id}\n**Bot:** ${bott}\n**Mensaje antes**:\n\`\`\`${this.message2}\`\`\`\n**Mensaje después:**\n\`\`\`${this.message}\`\`\``)
        .setColor(0x00d17a08);

        const b = new MessageButton()
        .setStyle("LINK")
        .setURL(`https://discord.com/channels/${this.message.guild.id}/${this.message.channel.id}/${this.message.id}`)
        .setLabel("Ir al mensaje");

        return this.message.guild.channels.cache.get(`867045061014323230`)
    }

    async BulkDelete() {
        const c = new MessageEmbed()
        .setAuthor(`${this.messages.size} Mensajes purgueados.`)
        .setDescription(`**Canal:** ${this.messages.first().channel}\n**Cantidad de mensajes:** ${this.messages.size}\n**Mensajes:**\n\`\`\`${this.messages.map(x => `${x.author.username} (${x.author.id}): ${x.content || `Embed o imagen`}`).join("\n")}\`\`\``)
        .setColor(0x005f1d91)

        this.messages.first().guild.channels.cache.get(`867045061014323230`)
            const a = new MessageEmbed()
            .setAuthor(`${this.messages.size} Mensajes purgueados`)
            .setDescription(`**Canal:** ${this.messages.first().channel}\n**Cantidad de mensajes:** ${this.messages.size}\n **Mensajes**:\n[Los mensajes se encuentran en este link ya que no caben aqui.](${await uploadText(`${this.messages.map(x => `${x.author.username} (${x.author.id}): ${x.content || `Embed o imagen`}`).join("\n")}`)})`)
            .setColor(0x005f1d91);

            return this.messages.first().guild.channels.cache.get(`867045061014323230`)
        }
    }


export class Roles {
    received: GuildMember
    before: GuildMember | PartialGuildMember
    reason: string

    constructor(received: GuildMember, before: GuildMember | PartialGuildMember , reason?: string) {
        this.received = received;
        this.before = before;
        this.reason = reason;
    }

    async quitado() {
        if (this.before.roles.cache.size > this.received.roles.cache.size) {
            this.before.roles.cache.forEach(async rol => {
                if (!this.received.roles.cache.has(rol.id)) {
                    if (rol.mentionable == true) var mencionable = "Si";
                    if (rol.mentionable == false) var mencionable = "No";
                    

                    const embed = new MessageEmbed()
                    .setAuthor(`${this.received.user.tag} | Rol removido`, this.received.user.displayAvatarURL({dynamic: true}))
                    .setDescription(`**Usuario:** ${this.received} (${this.received.id})\n**Nombre:** ${rol.name} (${rol.id})\n**Cantidad de usuarios con este rol**: ${rol.members.size}\n**Mencionable**: ${mencionable}\n **Posicion:** ${rol.rawPosition}/${this.received.guild.roles.highest.position}\n\n**Rol:**\n${rol}`)
                    .setColor(0x00b30b0b);

                    return this.received.guild.channels.cache.get(`867045164542590976`)
                }
            })
        }
    }

    async puesto() {
        if (this.before.roles.cache.size < this.received.roles.cache.size) {
            this.received.roles.cache.forEach(async rol => {
                if (!this.before.roles.cache.has(rol.id)) { 
                    
                    if (rol.mentionable == true) var mencionable = "Si";
                    if (rol.mentionable == false) var mencionable = "No";
                    

                    const embed = new MessageEmbed()
                    .setAuthor(`${this.received.user.tag} | Rol agregado`, this.received.user.displayAvatarURL({dynamic: true}))
                    .setDescription(`**Usuario:** ${this.received} (${this.received.id})\n**Nombre:** ${rol.name} (${rol.id})\n**Cantidad de usuarios con este rol**: ${rol.members.size}\n**Mencionable**: ${mencionable}\n **Posicion:** ${rol.rawPosition}/${this.received.guild.roles.highest.position}\n\n**Rol:**\n${rol}`)
                    .setColor(0x000c912d);

                    return this.received.guild.channels.cache.get(`867045164542590976`)
            }})
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

   async cambiado () {
       const embed = new MessageEmbed()
       .setAuthor(`${this.before.user.tag} | Apodo cambiado.`, this.before.user.displayAvatarURL({dynamic: true}))
       .setDescription(`Apodo anterior:\n\`\`\`${this.before.nickname}\`\`\`\n\nApodo nuevo:\n\`\`\`\`\`\`${this.after.nickname}`)

       return this.before.guild.channels.cache.get(`873313370177142795`)
   }
    }