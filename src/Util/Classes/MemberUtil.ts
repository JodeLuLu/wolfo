import { GuildMember } from "discord.js";

export class NewMember {
    member: GuildMember;
    constructor(member: GuildMember) {
        this.member = member;
    }

    welcomeMessage() {
        this.member.user.send(`**Bienvenido al servidor de ${this.member.guild.name}** ✅\n\n- Si quieres ver todo el servidor; Por favor verificate en el canal <#831921256143519744>, y da click en la reación, una ves verificado podrás ver todos los canales\n\n- El link del archivo de Minecraft esta en <#822541632221872189>\n\nAqui te dejo una invitación permanente al servidor de Discord:\ndiscord.gg/4S87rW94UT`).catch(a => {})
    }
}