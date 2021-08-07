import { Collection } from 'discord.js'
import { BaseCommand } from '../Util/Classes/BaseCommand'
import Captain from 'captainjs'

declare module 'discord.js' {
    interface Client {
        commands: Collection<string, BaseCommand>
        uploadText: object | string
    }

    

    interface Channel {
        send(options: string | MessagePayload | MessageOptions): Promise<Message>;
        
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