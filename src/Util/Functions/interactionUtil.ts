import { Interaction, MessageEmbed, version } from "discord.js";
import { SlashContext } from "../Classes/slashContext";
import os from "os";
import typescript from "typescript";
import { VERSION } from "ts-node";
import { db } from "../..";
import { TimeStamp } from "../Classes/time";
import { chunkString } from "./util";
import { postulationData } from "../../Typings";

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
    const logChannel = Interaction.guild.channels.cache.find(`logs`);

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

      if (db.exists(`/${Interaction.member.id}/answers_of_questions`)) {
        Interaction.reply({
          content:
            "> Una vez que te has postulado, ya no puedes ver los requisitos para ser staff.",
          ephemeral: true,
        });

        return logChannel.send(
          `> ${Interaction.member} Ha tratado de ver los requisitos, pero no se los he mostrado debido a que ya hizo el cuestionario para ser staff.`
        );
      } else if (
        db.exists(`/${Interaction.member.id}/see_the_require`) &&
        db.getData(`/${Interaction.member.id}/see_the_require`) == true
      ) {
        logChannel.send(
          `> **${Interaction.member}** Ha tratado de ver los requisitos, pero no se los he mostrado debido a que ya los consulto antes.`
        );
        return Interaction.reply({
          content: "> No puedes ver los requisitos por segunda vez.",
          ephemeral: true,
        });
      }

      db.push(`users/${Interaction.user.id}`, {
        see_the_require: true,
      });

      logChannel.send(
        `> **${Interaction.member}** Ha visto los requisitos para la postulación de staff.`
      );
      Interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (Interaction.customId == "questions") {
      if (db.exists(`/${Interaction.member.id}/answers_of_questions`)) {
        logChannel.send(
          `> ${Interaction.member} Ha tratado de postularse, cuando ya lo hizo anteriormente.`
        );
        return Interaction.reply({
          content: `Ya te has postulado anteriormente, por lo cuál ya no puedes hacerlo.`,
          ephemeral: true,
        });
      }
      const startTime = Date.now();
      const a = await Interaction.user
        .send(
          `¡Hola! Bienvenido a las postulaciones del servidor. Por favor contesta las preguntas preguntas con seriedad.Para contestar cada pregunta tienes \`2 minutos\`. Empezaremos con algo sencillo\n\n> __***Cuántos años tienes?***__`
        )
        .catch(() => {
          logChannel.send(
            `> Ha tratado de hacer el cuestionario, pero debido a que tenía los MDS cerrados, no he podido hacerlo.`
          );

          return Interaction.reply({
            content: `${Interaction.member} por favor activa tus MDS para poder enviarte el cuestionario por mensajes privados. Cuando los actives por favor sigue con el cuestionario que se te dio por mensajes privados.`,
            ephemeral: true,
          });
        });

      Interaction.reply({
        content: `${Interaction.member} Revisa tus mensajes privados. Ahí contestarás algunas preguntas <:blobAww:866082488714395659>`,
        ephemeral: true,
      });

      logChannel.send(
        `> ${Interaction.member} ha empezado el cuestionario para ser staff.`
      );

      const filter = (m) => m.author.bot === false;
      const awaiter1 = await a.channel.awaitMessages({
        filter,
        max: 1,
        time: 120000,
      });

      if (!awaiter1.size) {
        logChannel.send(
          `> ${Interaction.member} Estaba haciendo el cuestionario para ser staff. Pero cuando estaba haciendo el cuestionario, **se le acabo el tiempo en la pregunta 1**.`
        );
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
        logChannel.send(
          `> ${Interaction.member} Estaba haciendo el cuestionario para ser staff. Pero cuando estaba haciendo el cuestionario, **se le acabo el tiempo en la pregunta 2**.`
        );
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
        logChannel.send(
          `> ${Interaction.member} Estaba haciendo el cuestionario para ser staff. Pero cuando estaba haciendo el cuestionario, **se le acabo el tiempo en la pregunta 3**.`
        );
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
        logChannel.send(
          `> ${Interaction.member} Estaba haciendo el cuestionario para ser staff. Pero cuando estaba haciendo el cuestionario, **se le acabo el tiempo en la pregunta 4**.`
        );
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
        logChannel.send(
          `> ${Interaction.member} Estaba haciendo el cuestionario para ser staff. Pero cuando estaba haciendo el cuestionario, **se le acabo el tiempo en la pregunta 5**.`
        );
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
        logChannel.send(
          `> ${Interaction.member} Estaba haciendo el cuestionario para ser staff. Pero cuando estaba haciendo el cuestionario, **se le acabo el tiempo en la pregunta 6**.`
        );

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
        logChannel.send(
          `> ${Interaction.member} Estaba haciendo el cuestionario para ser staff. Pero cuando estaba haciendo el cuestionario, **se le acabo el tiempo en la pregunta 7**.`
        );
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
        logChannel.send(
          `> ${Interaction.member} Estaba haciendo el cuestionario para ser staff. Pero cuando estaba haciendo el cuestionario, **se le acabo el tiempo en la pregunta 8**.`
        );

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
        logChannel.send(
          `> ${Interaction.member} Estaba haciendo el cuestionario para ser staff. Pero cuando estaba haciendo el cuestionario, **se le acabo el tiempo en la pregunta 9**.`
        );

        return Interaction.member.send(
          `__**El tiempo limite para las preguntas ha caducado.**__`
        );
      }

      const j = await Interaction.member.send(
        `**¡Gracias!**\n\nTus respuestas sido puestas en la cola, y pronto se revisarán. Suerte!\n\n\n***Al completar esta encuesta estas de acuerdo con el almacenamiento de todos tus datos, sean privados o no, estos datos solo tendrá acceso el STAFF, el cambio de estos terminos de distribucion de datos puede ser en cualquier momento; E igualmente estos terminos de servicio necesarios para su funcionamiento***`
      );

      if (db.exists(`/${Interaction.member.id}/see_the_require`)) {
        db.push(`/${Interaction.member.id}`, {
          see_the_require: true,
          timeInAnswer: startTime,
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
      } else {
        db.push(`/${Interaction.member.id}`, {
          see_the_require: false,
          timeInAnswer: startTime,
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

      const info: postulationData = await db.getData(
        `/${Interaction.member.id}`
      );
      const questions = `- ¿Cuantos años tienes?\n${info.answers_of_questions.question1}\n\n- ¿Por qué quieres ser parte del staff del servidor?\n${info.answers_of_questions.question2}\n\n- ¿Eres activo en el servidor?\n${info.answers_of_questions.question3}\n\n- ¿Cuánto tiempo llevas en el servidor?\n${info.answers_of_questions.question4}\n\n- ¿Estarías dispuesto a moderar contenido NSFW en el servidor?\n${info.answers_of_questions.question5}\n\n- ¿Por qué te debemos de elegir a ti y no a las <numero random> personas que se postularon?\n${info.answers_of_questions.question6}\n\n- Menciona los comandos básicos de moderación\n${info.answers_of_questions.question7}\n\n- Si wolfy se peleará en general, ¿que harías?\n${info.answers_of_questions.question8}\n\n- Si un usuario enviará en general, ¿que harías?\n${info.answers_of_questions.question9}`;

      const embed = new MessageEmbed()
        .setAuthor(
          `Nueva postulación de ${
            Interaction.member.nickname +
              "#" +
              Interaction.user.discriminator || Interaction.user.username
          }`
        )
        .setDescription(
          `**Usuario**: ${Interaction.member} (${
            Interaction.member.id
          })\n**Lleva en el servidor desde:** <t:${new TimeStamp(
            Interaction.member.joinedTimestamp
          ).OutDecimals()}:d> <t:${new TimeStamp(
            Interaction.member.joinedTimestamp
          ).OutDecimals()}:t> **<t:${new TimeStamp(
            Interaction.member.joinedTimestamp
          ).OutDecimals()}:R>**\n**Creo su cuenta desde:** <t:${new TimeStamp(
            Interaction.user.createdTimestamp
          ).OutDecimals()}:d> <t:${new TimeStamp(
            Interaction.user.createdTimestamp
          ).OutDecimals()}:t> **<t:${new TimeStamp(
            Interaction.user.createdTimestamp
          ).OutDecimals()}:R>**\n\n**Vió los requisitos?:** ${
            info.see_the_require ? "Sí" : "No"
          }\n**¿Cuánto tiempo tardo en llenar el formulario?**: ${new TimeStamp(
            info.timeInAnswer
          )
            .variable()
            .slice(4)}\n**Respuestas:**\n\`\`\`${questions}\`\`\``
        )
        .setColor("GREEN")
        .setThumbnail(Interaction.member.user.avatarURL());

      Interaction.guild.channels.cache
        .find((x) => x.name.includes(`logs`))
        .send({ embeds: [embed] })
        .catch(async () => {
          const a = chunkString(`${questions}`, 4090);
          a.map(async (x) => {
            await embed.setDescription(`Respuestas:\`\`\`${x}\`\`\``);
            await Interaction.guild.channels.cache
              .get(`883814515156844594`)
              .send({ embeds: [embed] });
          });
        });
    }
  })();
}
