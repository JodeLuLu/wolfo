import { Client } from "discord.js";
import { BaseSlashCommand } from "../Util/Classes/BaseSlashCommand";
import { SlashContext } from "../Util/Classes/slashContext";


export default class PingSlash extends BaseSlashCommand {
constructor(client: Client) {
super(client, {
name: "rol",
description: "Comando para obtener roles",
staff: false,
cooldown: 10
      })
  }


async run(base: SlashContext) {

  if (base.options[0].name == "nsfw") {
    if (base.interaction.member.roles.cache.has(`880673188906926091`)) {
      base.interaction.member.roles.remove(`880673188906926091`, "El usuario se lo quito con el comando")
      base.interaction.reply(`${base.interaction.member} Te he quitado el rol de NSFW, ahora no podrás ver canales del servidor.`)
  } else {
      base.interaction.member.roles.add(`880673188906926091`, "El usuario se lo puso con el comando")
      base.interaction.reply(`${base.interaction.member} Te he agregado el rol de NSFW, ahora podrás ver canales NSFW del servidor.`)
  } 
} else if (base.options[0].name == "actualizaciones") {
    if (base.interaction.member.roles.cache.has(`871501359218851850`)) {
        base.interaction.member.roles.remove(`871501359218851850`, "El usuario se lo quito con el comando")
        base.interaction.reply(`${base.interaction.member} Te he quitado el rol de actualizaciones, ahora no recibirás pings del canal de <#867835428275355708>`)
    } else {
        base.interaction.member.roles.add(`871501359218851850`, "El usuario se lo puso con el comando")
        base.interaction.reply(`${base.interaction.member} Te he agregado el rol de actualizaciones, ahora recibirás pings del canal de <#867835428275355708>`)
    } 
} else if (base.options[0].name == "noticias") {
    if (base.interaction.member.roles.cache.has(`871502816236175371`)) {
        base.interaction.member.roles.remove(`871502816236175371`, "El usuario se lo quito con el comando")
        base.interaction.reply(`${base.interaction.member} Te he quitado el rol de noticias, ahora no verás el canal de <#820639237519048724>`)
    } else {
        base.interaction.member.roles.add(`871502816236175371`, "El usuario se lo puso con el comando")
        base.interaction.reply(`${base.interaction.member} Te he agregado el rol de noticias, ahora verás el canal de <#820639237519048724>`)
    } 
} else if (base.options[0].name == "eventos") {
    if (base.interaction.member.roles.cache.has(`871502962143395932`)) {
        base.interaction.member.roles.remove(`871502962143395932`, "El usuario se lo quito con el comando")
        base.interaction.reply(`${base.interaction.member} Te he quitado el rol de eventos, ahora no recibiras pings del canal de <#873601823204839494>`)
    } else {
        base.interaction.member.roles.add(`871502962143395932`, "El usuario se lo puso con el comando")
        base.interaction.reply(`${base.interaction.member} Te he agregado el rol de eventos, ahora recibiras pings del canal de <#873601823204839494>`)
    }
} else if (base.options[0].name == "alianzas") {
    if (base.interaction.member.roles.cache.has(`871506101164703765`)) {
        base.interaction.member.roles.remove(`871506101164703765`, "El usuario se lo quito con el comando")
        base.interaction.reply(`${base.interaction.member} Te he quitado el rol de alianzas, ahora no recibiras pings del canal de <#844617663727927297>`)
    } else {
        base.interaction.member.roles.add(`871506101164703765`, "El usuario se lo puso con el comando")
        base.interaction.reply(`${base.interaction.member} Te he agregado el rol de alianzas, ahora recibiras pings del canal de <#844617663727927297>`)
    }
}

}}