import { Interaction, MessageComponentInteraction, MessageEmbed } from "discord.js";

export async  function verificaction (interaccion) {

   if (interaccion.customId == "verificacion") { 

   const embed = new MessageEmbed().setColor(`DARK_RED`).setDescription(`**No he podido verificarte**\nNo he podido verificarte debido a ya tienes un rol de verificado, por lo cuál detecto que ya estas verificado`).setAuthor(`❌ No he podido verificarte.`);

   if (interaccion.guild.members.cache.get(`${interaccion.member.id}`).roles.cache.has(`820639213208862740`)) return interaccion.reply({content: `${interaccion.member}`, embeds: [embed],ephemeral: true})
   else {
      const embed = new MessageEmbed().setColor(`DARK_GREEN`).setDescription(`**He verificado tu cuenta**\nEn 5 segundos te daré acceso al servidor; En cuanto temgas acceso podrás ver todos los canales.`).setAuthor(`✅ He verificado tu cuenta.`);
      interaccion.reply({content: `${interaccion.member}`, embeds: [embed],ephemeral: true})

   setTimeout(() => {const a = ["871542385975386112", "820639213208862740", "871506101164703765", "871502962143395932", "871502816236175371", "871501359218851850", "851129161367420938", "821724207816769597"]; Promise.all(a.map(x => interaccion.guild.members.cache.get(`${interaccion.member.id}`).roles.add(`${x}`, `Roles al pasar la verificación`)));}, 10000)
   
    }
  } 
} 