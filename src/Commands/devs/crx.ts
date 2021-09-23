import { Client } from "discord.js";
import { db } from "../..";
import { BaseCommand } from "../../Util/Classes/BaseCommand";
import { TempContext } from "../../Util/Classes/Context";

export default class NameCommand extends BaseCommand {
  constructor(client: Client) {
    super(client, {
      name: "crx",
      description: "Test",
    });
  }

  async run(base: TempContext) {}
}
