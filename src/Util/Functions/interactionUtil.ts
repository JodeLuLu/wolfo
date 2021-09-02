import { Interaction, MessageEmbed } from "discord.js";
import { SlashContext } from "../Classes/slashContext";

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
}
