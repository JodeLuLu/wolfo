import { Collection } from "discord.js";
import { BaseCommand } from "../Util/Classes/BaseCommand";
import Captain from "captainjs";
import { BaseSlashCommand } from "../Util/Classes/BaseSlashCommand";

export interface postulationData {
  see_the_require: boolean;
  timeInAnswer: number;
  answers_of_questions: postulationQuestions;
}

export interface postulationQuestions {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: string;
  question9: string;
}
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
