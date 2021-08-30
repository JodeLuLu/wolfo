import * as fs from "fs/promises"
import * as path from "path"
import { Client } from 'discord.js'

export function handlers(TempoClient: Client) {
    (async function handleCommands(dir = "../../Commands") {
        let files = await fs.readdir(path.join(__dirname, dir));
        for (let file of files) {
            let stat = await fs.lstat(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                handleCommands(path.join(dir, file));
            } else {
                if (file.endsWith(".ts")) {
                    let { default: Class } = await import(path.join(__dirname, dir, file));
                    try {
                        let CommandClass = new Class(TempoClient)
                        TempoClient.commands.set(CommandClass.name, CommandClass);
                    } catch (err) {
                        console.error(err)
                    }
                }
            }
        }
    }
    )();

    (async function handleSlashCommands(dir = "../../Slash") {
        let files = await fs.readdir(path.join(__dirname, dir));
        for (let file of files) {
            let stat = await fs.lstat(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                handleSlashCommands(path.join(dir, file));
            } else {
                if (file.endsWith(".ts")) {
                    let { default: Class } = await import(path.join(__dirname, dir, file));
                    try {
                        let slashClass = new Class(TempoClient)
                        TempoClient.slashCommands.set(slashClass.name, slashClass);
                    } catch (err) {
                        console.error(err)
                    }
                }
            }
        }
    }
    )();
    

    
}