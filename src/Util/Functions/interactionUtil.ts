import { Interaction, MessageEmbed, version } from "discord.js";
import { SlashContext } from "../Classes/slashContext";
import os from "os";
import typescript from "typescript";
import { VERSION } from "ts-node";
import { db } from "../..";

export function interactionUtil(Interaction: Interaction) {
  intUtil(Interaction);
  if (!Interaction.isCommand()) return;

  const interaction = new SlashContext(Interaction.client, Interaction);

  interaction.options = Interaction.options.data;
  const options = interaction.options;

  const command = Interaction.commandName;
  let cmd = Interaction.client.slashCommands.get(command) || null;

  if (!cmd) return Interaction.reply("No se encontró el comando.");
  if (cmd.canRun(Interaction, false)) return;
  return cmd.run(interaction);
}

export function intUtil(Interaction) {
  (async function verification() {
    if (Interaction.customId == "verificacion") {
      const embed = new MessageEmbed()
        .setColor(`DARK_RED`)
        .setDescription(
          `**No he podido verificarte**\nNo he podido verificarte debido a ya tienes un rol de verificado, por lo cuál detecto que ya estas verificado`
        )
        .setAuthor(`❌ No he podido verificarte.`);

      await Interaction.guild.members.fetch(`${Interaction.member.id}`);

      if (
        Interaction.guild.members.cache
          .get(`${Interaction.member.id}`)
          .roles.cache.has(`820639213208862740`)
      )
        return Interaction.reply({
          content: `${Interaction.member}`,
          embeds: [embed],
          ephemeral: true,
        });
      else {
        const embed = new MessageEmbed()
          .setColor(`DARK_GREEN`)
          .setDescription(
            `**He verificado tu cuenta**\nEn 5 segundos te daré acceso al servidor; En cuanto temgas acceso podrás ver todos los canales.`
          )
          .setAuthor(`✅ He verificado tu cuenta.`);
        Interaction.reply({
          content: `${Interaction.member}`,
          embeds: [embed],
          ephemeral: true,
        });

        setTimeout(() => {
          const a = [
            "871542385975386112",
            "820639213208862740",
            "871506101164703765",
            "871502962143395932",
            "871502816236175371",
            "871501359218851850",
            "851129161367420938",
          ];
          Promise.all(
            a.map((x) =>
              Interaction.guild.members.cache
                .get(`${Interaction.member.id}`)
                .roles.add(`${x}`, `Roles al pasar la verificación`)
            )
          );
        }, 10000);
      }
    }
  })();

  (function help() {
    if (!Interaction.isSelectMenu()) return;

    if (Interaction.values[0] == "info") {
      const info = new MessageEmbed()
        .setAuthor(`¿Qué hago yo?`)
        .setDescription(
          `> Me encargo principalmente de registrar cosas que pasan en el servidor, y darlas a conocer, como los mensajes borrados, editados, etc;\n\n> Soy el encargado de dar los anuncios de <#867835428275355708>\n\n> Igualmente me encargo de todo el modulo de verificación en el servidor.`
        )
        .setColor(`NAVY`);

      Interaction.update({ embeds: [info] });
    } else if (Interaction.values[0] == "specs") {
      const specs = new MessageEmbed()
        .setAuthor(`Mis especificaciones`)
        .setDescription(
          `> Mi procesador: ${
            os.cpus()[0].model
          }\n> Mi creador: <@852588734104469535>\n> Mi codigo fuente: [link](https://github.com/Chere3/wolfo/tree/stable)\n\n> **Typescript ${
            typescript.version
          }**\n> **Discord.js ${version}**\n> **ts-node ${VERSION}**\n> **node.js ${
            process.version
          }**`
        );

      Interaction.update({ embeds: [specs] });
    }
  })();

  (async function postulaciones() {
    if (!Interaction.isButton()) return;

    if (Interaction.customId == "requisite") {
      const embed = new MessageEmbed()
        .setAuthor(
          `Requisitos para ser staff en el servidor`,
          Interaction.guild.iconURL()
        )
        .setDescription(
          `- Tener más de 13/14 años. \n- Tener mano dura.\n- Persona objetiva.\n- Llevar más de 2 semanas en el servidor.\n- Que tú cuenta de discord tenga más de 1 mes de creada.\n- Saber utilizar bots.\n- Tener más de 1000 mensajes en el servidor.\n\n**Al seleccionar esto, estas de acuerdo en la recopilacion de tus datos para estadisticas y la seguridad del servidor.**`
        )
        .setColor(Interaction.guild.me.displayColor);

      db.push(`users/${Interaction.user.id}`, {
        see_the_require: true,
      });

      Interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (Interaction.customId == "questions") {
      const a = await Interaction.user
        .send(
          `¡Hola! Bienvenido a las postulaciones del servidor. Por favor contesta las preguntas preguntas con seriedad.Para contestar cada pregunta tienes \`2 minutos\`. Empezaremos con algo sencillo\n\n> __***Cuántos años tienes?***__`
        )
        .catch(() => {
          return Interaction.reply({
            content: `${Interaction.member} por favor activa tus MDS para poder enviarte el cuestionario por mensajes privados. Cuando los actives por favor sigue con el cuestionario que se te dio por mensajes privados.`,
            ephemeral: true,
          });
        });

      Interaction.reply({
        content: `${Interaction.member} Revisa tus mensajes privados. Ahí contestarás algunas preguntas <:blobAww:866082488714395659>`,
        ephemeral: true,
      });

      const filter = (m) => m.author.bot === false;
      const awaiter1 = await a.channel.awaitMessages({
        filter,
        max: 1,
        time: 120000,
      });

      if (!awaiter1.size) {
        return Interaction.member.send(
          `__**El tiempo limite para las preguntas ha caducado.**__`
        );
      }

      const b = await Interaction.member.send(
        `> __***¿Por qué quieres ser parte del staff del servidor?***__`
      );
      const awaiter2 = await b.channel.awaitMessages({
        filter,
        max: 1,
        time: 120000,
      });

      if (!awaiter2.size) {
        return Interaction.member.send(
          `__**El tiempo limite para las preguntas ha caducado.**__`
        );
      }

      const c = await Interaction.member.send(
        `> __***¿Eres activo en el servidor?***__\n\n||Revisaremos la cantidad de mensajes que tienes en el servidor||`
      );
      const awaiter3 = await c.channel.awaitMessages({
        filter,
        max: 1,
        time: 120000,
      });

      if (!awaiter3.size) {
        return Interaction.member.send(
          `__**El tiempo limite para las preguntas ha caducado.**__`
        );
      }

      const d = await Interaction.member.send(
        `> __***¿Cuánto tiempo llevas en el servidor?***__\n\n||Tu tiempo de estancia en el servidor igualmente será revisada||`
      );
      const awaiter4 = await d.channel.awaitMessages({
        filter,
        max: 1,
        time: 120000,
      });

      if (!awaiter4.size) {
        return Interaction.member.send(
          `__**El tiempo limite para las preguntas ha caducado.**__`
        );
      }

      const e = await Interaction.member.send(
        `> __**¿Estarías dispuesto a moderar contenido NSFW en el servidor?**__`
      );
      const awaiter5 = await e.channel.awaitMessages({
        filter,
        max: 1,
        time: 120000,
      });

      if (!awaiter5.size) {
        return Interaction.member.send(
          `__**El tiempo limite para las preguntas ha caducado.**__`
        );
      }

      const f = await Interaction.member.send(
        `> __**¿Por qué te debemos de elegir a ti y no a las otras ${Math.floor(
          Math.random() * 100
        )} personas que se postularon?**__`
      );
      const awaiter6 = await f.channel.awaitMessages({
        filter,
        max: 1,
        time: 120000,
      });

      if (!awaiter6.size) {
        return Interaction.member.send(
          `__**El tiempo limite para las preguntas ha caducado.**__`
        );
      }

      const g = await Interaction.member.send(
        `> __**Menciona los comandos básicos de moderación**__`
      );
      const awaiter7 = await g.channel.awaitMessages({
        filter,
        max: 1,
        time: 120000,
      });

      if (!awaiter7.size) {
        return Interaction.member.send(
          `__**El tiempo limite para las preguntas ha caducado.**__`
        );
      }

      const h = await Interaction.member.send(
        `> __**Si wolfy, se llegará a pelear por general con un moderador, ¿que harías?**__`
      );

      const awaiter8 = await h.channel.awaitMessages({
        filter,
        max: 1,
        time: 120000,
      });

      if (!awaiter8.size) {
        return Interaction.member.send(
          `__**El tiempo limite para las preguntas ha caducado.**__`
        );
      }

      const i = await Interaction.member.send(
        `> __**Si un usuario enviará gore en general, ¿que harías?**__`
      );

      const awaiter9 = await i.channel.awaitMessages({
        filter,
        max: 1,
        time: 120000,
      });

      if (!awaiter9.size) {
        return Interaction.member.send(
          `__**El tiempo limite para las preguntas ha caducado.**__`
        );
      }

      const j = await Interaction.member.send(
        `**¡Gracias!**\n\nTus respuestas sido puestas en la cola, y pronto se revisarán. Suerte!\n\n\n***Al completar esta encuesta estas de acuerdo con el almacenamiento de todos tus datos, sean privados o no, estos datos solo tendrá acceso el STAFF, el cambio de estos terminos de distribucion de datos puede ser en cualquier momento; E igualmente estos terminos de servicio necesarios para su funcionamiento***`
      );

      db.push(`/${Interaction.member.id}`, {
        answers_of_questions: {
          question1: awaiter1.first().content,
          question2: awaiter2.first().content,
          question3: awaiter3.first().content,
          question4: awaiter4.first().content,
          question5: awaiter5.first().content,
          question6: awaiter6.first().content,
          question7: awaiter7.first().content,
          question8: awaiter8.first().content,
          question9: awaiter9.first().content,
        },
      });
    }
  })();
}
