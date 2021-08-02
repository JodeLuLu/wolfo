import { Message } from "discord.js";

export function pings(message: Message) {

    if (message.channel.id === "871503059329646622") {
        if (message.content == "!actualizaciones") {
        if (message.member.roles.cache.has(`871501359218851850`)) {
            message.member.roles.remove(`871501359218851850`)
            message.channel.send("Te he quitado el rol de actualizaciones. Ahora no recibirás pings de <#867835428275355708>").then(x => x.delete({timeout: 5000}))
        } else {
            message.member.roles.add(`871501359218851850`)
            message.channel.send("Te he puesto el rol de actualizaciones. Ahora recibirás pings de <#867835428275355708>").then(x => x.delete({timeout: 5000}));
        }
        }

        if (message.content == "!noticias") {
            if (message.member.roles.cache.has(`871502816236175371`)) {
                message.member.roles.remove(`871502816236175371`)
                message.channel.send("Te he quitado el rol de noticias. Ahora no recibirás pings de <#820639237519048724>").then(x => x.delete({timeout: 5000}))
            } else {
                message.member.roles.add(`871502816236175371`)
                message.channel.send("Te he puesto el rol de noticias. Ahora recibirás pings de <#820639237519048724>").then(x => x.delete({timeout: 5000}));
            }
            }

            if (message.content == "!eventos") {
                if (message.member.roles.cache.has(`871502962143395932`)) {
                    message.member.roles.remove(`871502962143395932`)
                    message.channel.send("Te he quitado el rol de eventos. Ahora no recibirás pings de eventos en el servidor.").then(x => x.delete({timeout: 5000}))
                } else {
                    message.member.roles.add(`871502962143395932`)
                    message.channel.send("Te he puesto el rol de eventos. Ahora recibirás pings de eventos en el servidor.").then(x => x.delete({timeout: 5000}));
                }
                }

                if (message.content == "!alianzas") {
                    if (message.member.roles.cache.has(`871506101164703765`)) {
                        message.member.roles.remove(`871506101164703765`)
                        message.channel.send("Te he quitado el rol de alianzas. Ahora no recibirás pings de alianzas en el servidor.").then(x => x.delete({timeout: 5000}))
                    } else {
                        message.member.roles.add(`871506101164703765`)
                        message.channel.send("Te he puesto el rol de alianzas. Ahora recibirás pings de alianzas en el servidor.").then(x => x.delete({timeout: 5000}));
                    }
                    }

                    if (message.content == "!nsfw") {
                        if (message.member.roles.cache.has(`871102104331255848`)) {
                            message.member.roles.remove(`871102104331255848`)
                            message.channel.send("Te he quitado el rol de canales nsfw. Ahora no recibirás pings de canales nsfw en el servidor.").then(x => x.delete({timeout: 5000}))
                        } else {
                            message.member.roles.add(`871102104331255848`)
                            message.channel.send("Te he puesto el rol de canales nsfw. Ahora recibirás pings de canales nsfw en el servidor.").then(x => x.delete({timeout: 5000}));
                        }
                        }

                
    }
    
}