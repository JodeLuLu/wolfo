import { Collection } from "discord.js";
import { BaseCommand } from "../Util/Classes/BaseCommand";
import Captain from "captainjs";
import { BaseSlashCommand } from "../Util/Classes/BaseSlashCommand";

declare module "discord.js" {
  interface Client {
    commands: Collection<string, BaseCommand>;
    slashCommands: Collection<string, BaseSlashCommand>;
    joinManager: Collection<number, number>;
    uploadText: object | string;
  }

  interface Channel {
    send(options: string | MessagePayload | MessageOptions): Promise<Message>;
    nsfw: boolean;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      MONGO_URI: string;
    }

    interface Global {
      prettyConsole: Captain.Console;
    }
  }
}
