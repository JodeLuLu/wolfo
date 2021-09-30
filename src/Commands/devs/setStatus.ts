import { ActivityType } from "discord-api-types";
import { Client } from "discord.js";
import { BaseCommand } from "../../Util/Classes/BaseCommand";
import { TempContext } from "../../Util/Classes/Context";

export default class NameCommand extends BaseCommand {
  constructor(client: Client) {
    super(client, {
      name: "setstatus",
      description: "Cambia el estado del bot con un simple comando.",
      category: "dev",
      aliases: ["setestado", "estado"],
      dev: true,
    });
  }

  async run(base: TempContext) {
    const status = base.args.join(" ");

    if (!status) return base.send("Debes especificar un estado.");
    base.client.user.setActivity(status);
  }
}
