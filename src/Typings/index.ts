import { Collection } from 'discord.js'
import { BaseCommand } from '../Util/Classes/BaseCommand'
import Captain from 'captainjs'

declare module 'discord.js' {
    interface Client {
        commands: Collection<string, BaseCommand>
        uploadText: object | string
    }

    

    interface Channel {
        readonly lastMessage: Message | null;
       send(
          content: APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions,
        ): Promise<Message>;
       send(options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
       send(options: MessageOptions | APIMessage): Promise<Message | Message[]>;
       send(content: StringResolvable, options: (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
       send(content: StringResolvable, options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
       send(content: StringResolvable, options: MessageOptions): Promise<Message | Message[]>;
        
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string
            MONGO_URI: string
        }

        interface Global {
            prettyConsole: Captain.Console
        }
    }
}