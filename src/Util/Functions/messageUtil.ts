import { Message } from "discord.js";
import { TempContext } from "../Classes/Context";
import { config } from "../../config";
import { parseQuery } from "./util";

export function messageUtil(msg: Message) {
  msgUtil(msg);

  if (msg.author.bot) return;
  if (!msg.content.startsWith(config.prefix)) return;

  const message = new TempContext(msg.client, msg);

  message.args = msg.content.slice(config.prefix.length).trim().split(/ +/g);

  const args = message.args,
    command = args.shift().toLowerCase();

  const { query, flags } = parseQuery(args);
  message.flags = flags;

  let cmd =
    message.client.commands.get(command) ||
    message.client.commands.find(
      (c) => c.aliases && c.aliases.includes(command)
    );
  if (!cmd) return;
  if (cmd.canRun(msg, false)) return;

  cmd.run(message);
}

export function msgUtil(message: Message) {
  (function pingsChannel() {
    if (message.channel.id == "871503059329646622") {
      if (message.author.id == "845797782832939008") {
        setTimeout(() => {
          message.delete();
        }, 8000);
      } else {
        message.delete();
      }
    }
  })();

  (function fHotBlocker() {
    if (message.channel.nsfw) return;
    if (
      message.content.startsWith("u!fhot") ||
      message.content.startsWith("u!flewd")
    ) {
      message.delete();
      setTimeout(() => {
        message.channel.messages.fetch().then((x) =>
          x
            .map((x) => x)
            .filter((x) => x.author.id == "809946357535997952")[0]
            .delete()
        );
      }, 500);
      message.channel
        .send(
          "El fhot no esta permitido en el servidor fuera de canales NSFW." +
            "" +
            `${message.author}`
        )
        .then((x) => setTimeout(() => x.delete(), 5000));
    }
  })();

  (function HelperMC() {
    if (message.author.bot) return;
    if (
      message.content.toLowerCase().includes(`64`) ||
      message.content.toLowerCase().includes(`32`) ||
      message.content.toLowerCase().includes(`minecraft`)
    ) {
      if (!message.content.toLocaleLowerCase().includes(`link`)) return;

      if (!message.member.roles.cache.has(`820639213208862740`))
        return message.reply(
          `Veo que no te has verificado en el servidor. Por favor ve a <#831921256143519744> y completala.\nDespués de esto ve al canal <#822541632221872189> y ahí esta el canal.`
        );
      message.reply(
        `El link de descarga se encuentra en <#822541632221872189>. uwu`
      );
    }
  })();
}
