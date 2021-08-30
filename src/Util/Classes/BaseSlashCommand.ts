import { Client, Collection, CommandInteraction, MessageComponentInteraction, MessageEmbed, PermissionResolvable, PermissionString} from "discord.js";
import { config } from "../../config";
import { SlashContext } from "./slashContext";

interface options {
    name: string
    description: string
    dev?: boolean
    staff?: boolean
    guildOnly?: boolean
    nsfw?: boolean
    aliases?: string[]
    status?: boolean
    category?: string
    cooldown?: number
    botPermissions?: PermissionString[]
    memberPermissions?: PermissionString[]
    usage?(prefix: string): string
    example?(prefix: string): string
}



/**
 * @class BaseCommand
 * @param {string} name El nombre del slash command.
 * @param {boolean} dev Especifica si el slash command puede ser usado solo por desarrolladores del bot
 * @param {boolean} staff Especifica si el slash command es solo para los miembros del staff.
 * @param {boolean} guildOnly Muestra si el slash command es solo para servidores..
 * @param {boolean} nsfw Especifica si el slash command es solo para canales nsfw.
 * @param {string[]} aliases Los complementos del slash command.
 * @param {boolean} status Da a conocer si el slash command esta en mantenimiento o no.
 * @param {string} category La categoría del slash command.
 * @param {number} cooldown El cooldown del slash command.
 * @param {string} description La descripción del slash command.
 * @param {string[]} botPermissions Los permisos que requiere en bot para que el slash command funcione.
 * @param {string[]} memberPermissions Los permisos que requiere el ejecutor para que el slash command funcione.
 * @param {string} usage El uso del slash command.
 * @param {string} example Ejemeplo del uso del slash command. 
 */



export class BaseSlashCommand {
    bot: Client
    name: string
    description: string
    dev: boolean
    staff: boolean
    nsfw: boolean
    aliases: string[]
    status: boolean
    category: string
    cooldown: number
    cooldowns: Collection<string, number>
    botPermissions: PermissionString[]
    memberPermissions: PermissionString[]
    usage: any
    example: any
    devs: typeof config.owners
    constructor(client: Client, options: options) {
        this.bot = client
        this.name = options.name
        this.description = options.description
        this.dev = options.dev || false
        
        this.nsfw = options.nsfw || false
        this.aliases = options.aliases || []
        this.status = options.status || false
        this.category = options.category || "bot"
        this.cooldown = options.cooldown || 2
        this.cooldowns = new Collection()
        this.usage = options.usage || (prefix => `\`${prefix}${options.name}\``)
        this.example = options.example || (prefix => `\`${prefix}${options.name}\``)
        this.botPermissions = options.botPermissions || []
        this.memberPermissions = options.memberPermissions || []
    }

    canRun(int, isDev: boolean) {
        const e = new MessageEmbed()
        .setColor(0x00ff0000)
        .setTimestamp();

        int.member.fetch();

    if (this.dev === true && !int.member.roles.cache.has(`849279339777884160`) || !int.member.roles.cache.has(`872904749182230528`)) return int.reply({embeds: [e.setDescription(`**Este comando es exclusivo para programadores del bot.**`)], ephemeral: true});
    if (this.nsfw === true && !int.channel.nsfw) return int.reply({embeds: [e.setDescription(`**Este comando es exclusivo para canales nsfw.**`)], ephemeral: true});
    
    if (this.checkCooldown(int) && !int.member.roles.cache.has(`849279339777884160`) || !int.member.roles.cache.has(`872904749182230528`)) {
        const now = Date.now()
        const time = this.cooldowns.get(int.member.id)
        const timeLeft = (time - now) / 1000
        return int.reply({embeds: [e.setDescription(`**Hey, tranquilizate, podrás ejecutar este comando de nuevo en ${timeLeft.toFixed(1)} segundos.**`)], aphemeral: true});
    }
    if (this.status === true && !int.member.roles.cache.has(`849279339777884160`) || !int.member.roles.cache.has(`872904749182230528`)) return int.reply({embeds: [e.setDescription(`**Este comando esta en mantenimiento. Por lo cuál no puede ser usado por los miembros.**`)], ephemeral: true});
    if (int.guild && this.botPermissions[0] && !this.botPermissions.some((x) => int.guild.me.permissions.has(x) as PermissionResolvable)) {
        return int.reply({embeds: [e.setDescription(`**No tengo los permisos de ${this.botPermissions.map(x => this.parsePermission(x)).join(', ')}**`)], ephemeral: true});
    }
    if (int.guild && this.memberPermissions[0] && !this.memberPermissions.some((x) => int.member.permissions.has(x as PermissionResolvable)) && !isDev) {
        return int.reply({embeds: [e.setDescription(`**No tienes los permisos de ${this.memberPermissions.map(x => this.parsePermission(x)).join(', ')} para poder ejecutar este comando**`)], ephemeral: true});
    }

    return false;


    }

    


    checkCooldown(int: CommandInteraction) {
        if (this.cooldowns.has(int.member.id)) return true;
        this.cooldowns.set(int.member.id, Date.now() + (this.cooldown * 1000))
        setTimeout(() => {
            this.cooldowns.delete(int.member.id)
        }, this.cooldown * 1000);
        return false;
    }

    parsePermission(permission: string) {
        return permission.toLocaleLowerCase()
        .replace(/ _/g, ' ')
        .replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
    }

    run(ctx: SlashContext) { }
}