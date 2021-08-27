import { TempContext } from "../../Util/Classes/Context"
import { BaseCommand } from "../../Util/Classes/BaseCommand"
import { Client } from 'discord.js'
import {MessageEmbed } from 'discord.js';


export default class PingCommand extends BaseCommand {
    constructor(client: Client) {
        super(client, {
            name: `ping`,
            description: `Test the bot`,
            guildOnly: false,
        })
    }

    async run(msg: TempContext) {
        const a = await msg.send(`> **Midiendo el ping.**`);
        a.edit(`> **Ping del bot: ${msg.client.ws.ping}ms**\n> **Ping de mensajes: ${a.createdTimestamp - msg.message.createdTimestamp}ms**`)
    }
}