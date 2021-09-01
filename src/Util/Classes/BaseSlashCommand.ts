import { Client, Collection, CommandInteraction, MessageComponentInteraction, MessageEmbed, PermissionResolvable, PermissionString} from "discord.js";
import { config } from "../../config";
import { SlashContext } from "./slashContext";

interface options {
    name: string
    description: string
    dev?: boolean
    staff?: boolean
    nsfw?: boolean
    aliases?: string[]
    category?: string
    cooldown?: number
    botPermissions?: PermissionString[]
    memberPermissions?: PermissionString[]
}



/**
 * @class BaseCommand
 * @param {string} name El nombre del slash command.
 * @param {string} description La descripción del slash command.
 * @param {boolean} dev Especifica si solo desarrolladores pueden usar este comando.
 * @param {boolean} staff Especifica si solo staff pueden usar este comando.
 * @param {boolean} nsfw Especifica si el slash command es solo para canales nsfw.
 * @param {string} category La categoría del slash command.
 * @param {number} cooldown El cooldown del slash command.
 */



export class BaseSlashCommand {
    bot: Client
    name: string
    description: string
    staff: boolean
    dev: boolean
    nsfw: boolean
    category: string
    cooldown: number
    cooldowns: Collection<string, number>
    devs: typeof config.owners
    constructor(client: Client, options: options) {
        this.bot = client
        this.name = options.name
        this.description = options.description
        this.staff = options.staff || false
        this.dev = options.dev || false
        this.nsfw = options.nsfw || false
        this.category = options.category || "bot"
        this.cooldown = options.cooldown || 2
        this.cooldowns = new Collection()
    }

    canRun(int: CommandInteraction, isDev: boolean) {
        const e = new MessageEmbed()
        .setColor(0x00ff0000)
        .setAuthor(`No puedo ejecutar este comando.`, this.bot.user.displayAvatarURL())
        .setTimestamp();

        
            int.guild.members.fetch(`${int.member.id}`).then((x) => {
                if (this.dev == true) {if (!x.roles.cache.has(`849279339777884160`)) {if (!x.roles.cache.has(`872904749182230528`)) {return int.reply({embeds: [e.setDescription(`Lo siento pero debes de tener el rol de\n<@&849279339777884160> para poder ejecutar este comando.`)], ephemeral: true});}}};
                if (this.staff == true) {if (!x.roles.cache.has(`867293184216662086`)) {if (!x.roles.cache.has(`821724207816769597`)) {return int.reply({embeds: [e.setDescription(`Lo siento pero debes de ser\n<@&821724207816769597> para poder ejecutar este comando.`)], ephemeral: true});}}};
                if (this.nsfw == true) {if (!int.channel.nsfw) {return int.reply({embeds: [e.setDescription(`Lo siento pero debes de estar en un canal\nnsfw para poder ejecutar este comando.`)], ephemeral: true});}};;
                if (this.checkCooldown(int)) {
                    if (!x.roles.cache.has(`849279339777884160`)) {if (!x.roles.cache.has(`872904749182230528`)) {
                        const now = Date.now();
                        const time = this.cooldowns.get(int.member.id);
                        const timeLeft = (time - now) / 1000;
                        return int.reply({embeds: [e.setDescription(`Lo siento pero debes esperar\n${timeLeft.toFixed(0)} segundos para poder ejecutar este comando.`)], ephemeral: true});
                    }}
                }

            })

            return false;
    }

    


    checkCooldown(int: CommandInteraction) {
        if (this.cooldowns.has(int.member.id)) return true;
        this.cooldowns.set(int.member.id, Date.now() + (this.cooldown * 1000))
        setTimeout(() => {
            this.cooldowns.delete(int.member.id)
        }, this.cooldown * 1000);
        return false;
    };

    parsePermission(permission: string) {
        return permission.toLocaleLowerCase()
        .replace(/ _/g, ' ')
        .replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
    }

    run(ctx: SlashContext) { }
};