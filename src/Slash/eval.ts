import { BitField, Client, MessageEmbed, Util } from "discord.js";
import { BaseSlashCommand } from "../Util/Classes/BaseSlashCommand";
import { SlashContext } from "../Util/Classes/slashContext"; 
import { TimeStamp } from "../Util/Classes/time";
import discord from "discord.js"

import { NewMember } from "../Util/Classes/MemberUtil";
import node from "node-superfetch"
import { parseEval, parseQuery, parseType } from "../Util/Functions/messageUtil";


export default class NameCommand extends BaseSlashCommand {
constructor(client: Client) {
super(client, {
name: "code",
description: "Calcula una expresion con este comando.",
category: "dev"
      })
  }


async run(base: SlashContext) {
    // constants

    const interaction = base.interaction;
    const time = TimeStamp
    const bit = BitField
    const Discord = discord
    const util = Util
    const newer = NewMember
    const mEmbed = MessageEmbed
    const a = interaction
    const getFlags = parseQuery

    async function send(text: object | number |string) {return await interaction.channel.send({content: `${text}`});}
        async function messages(id: string) {return interaction.channel.messages.fetch(id);}
        async function channels(id: string) {return await interaction.guild.channels.cache.get(id);}
        async function members(id?: string |number) {if (!id) return interaction.guild.members.cache.map(x => x); return await interaction.guild.members.cache.get(String(id));}
        async function auto(code: any) {await setInterval(() => {code}, 10000)}
        function alea(valores: string[]) {return valores[Math.floor(Math.random() * valores.length)]};

        

        let input = `${base.options[0].value}`;
        const embed = new MessageEmbed()
    .setAuthor(`🧠 Calculado.`);
    try {
        
        


        let { evaled, type } = await parseEval(eval(`${input}`));
        let depth = 0;
        
        
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled, { depth });
        let output = evaled.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        
        
        if (output.length > 6000) {
            const { body } = await node.post("https://paste.mod.gg/documents").send(output);
            embed.setDescription(`https://paste.mod.gg/${body.key}.js`);} else if (input.includes("TOKEN") || input.includes("process.env")) {
                embed.setDescription( "```diff\n- Esto es privado```");
        
            } else {
            embed.setDescription("```js\n" + output + "```");
            }

        embed.setFooter(`Tipo: ${type} | Ping: ${base.client.ws.ping}ms`)
        embed.setColor(0x002c2f33)

        return base.interaction.reply({embeds: [embed]})

        } catch (error) {
            if (error.length > 1024) {
                const { body } = await node.post("https://paste.mod.gg/documents").send(error);
                embed.setDescription(`https://paste.mod.gg/${body.key}.ts`);
            } else {
                embed.setDescription("```js\n" + error + "```");
            }
            embed.setFooter(`Tipo: ${parseType(error)} | Ping: ${base.client.ws.ping}ms`);
            return base.interaction.reply({embeds: [embed]})
        }
}}