import { TempContext } from "../../Util/Classes/Context";
import { BaseCommand } from "../../Util/Classes/BaseCommand";
import {
  BitField,
  Client,
  Message,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Util,
} from "discord.js";
import discord from "discord.js";
import node from "node-superfetch";
import { chunkString, getChunk, uploadText } from "../../Util/Functions/util";
import { TimeStamp } from "../../Util/Classes/time";
import { NewMember } from "../../Util/Classes/MemberUtil";
import { parseEval, parseQuery, parseType } from "../../Util/Functions/util";
import { db } from "../..";

export default class PingCommand extends BaseCommand {
  constructor(client: Client) {
    super(client, {
      name: `eval`,
      description: `Eval`,
      dev: true,
      cooldown: 10,
      usage: (prefix: "j!") => "eval <codigo>",
      example: (prefix: "j!") => "eval message.author",
    });
  }

  async run(base: TempContext) {
    // Constants

    const message = base.message;
    const time = TimeStamp;
    const uploadTex = uploadText;
    const bit = BitField;
    const Discord = discord;
    const util = Util;
    const newer = NewMember;
    const membed = MessageEmbed;
    const getFlags = parseQuery;
    const postuData = db;
    const divideString = chunkString;
    const SplitString = getChunk;

    async function send(text: object | number | string) {
      return await message.channel.send({ content: `${text}` });
    }
    async function messages(id: string) {
      return message.channel.messages.fetch(id);
    }
    async function channels(id: string) {
      return await message.guild.channels.cache.get(id);
    }
    async function members(id?: string | number) {
      if (!id) return message.guild.members.cache.map((x) => x);
      return await message.guild.members.cache.get(String(id));
    }
    async function auto(code: any) {
      await setInterval(() => {
        code;
      }, 10000);
    }
    function alea(valores: string[]) {
      return valores[Math.floor(Math.random() * valores.length)];
    }

    const { query, flags } = parseQuery(base.args);

    if (!query.length) return;
    let input = query.join(" ");

    const embed = new MessageEmbed().setAuthor(`🧠 Calculado.`);
    try {
      if (flags.includes("async")) {
        input = `(async () => { ${input} })()`;
      }

      if (flags.includes("delete")) base.message.delete();
      let { evaled, type } = await parseEval(eval(input));
      let depth = 0;

      if (flags.some((input) => input.includes("depth"))) {
        depth = flags.find((number) => number.includes("depth")).split("=")[1];
        depth = parseInt(`${depth}`, 10);
      }

      if (flags.includes("silent")) return;
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled, { depth });
      let output = evaled
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));

      if (output.length > 6000) {
        const { body } = await node
          .post("https://paste.mod.gg/documents")
          .send(output);
        embed.setDescription(`https://paste.mod.gg/${body.key}.js`);
      } else if (input.includes("TOKEN") || input.includes("process.env")) {
        embed.setDescription("```diff\n- Esto es privado```");
      } else {
        embed.setDescription("```js\n" + output + "```");
      }

      embed.setFooter(`Tipo: ${type} | Ping: ${base.client.ws.ping}ms`);
      embed.setColor(0x002c2f33);

      return base.send(embed);
    } catch (error) {
      if (error.length > 1024) {
        const { body } = await node
          .post("https://paste.mod.gg/documents")
          .send(error);
        embed.setDescription(`https://paste.mod.gg/${body.key}.ts`);
      } else {
        embed.setDescription("```js\n" + error + "```");
      }
      embed.setFooter(
        `Tipo: ${parseType(error)} | Ping: ${base.client.ws.ping}ms`
      );
      return base.send(embed);
    }
  }
}
