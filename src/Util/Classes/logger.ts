import {
  GuildBan,
  MessageActionRow,
  MessageButton,
  PartialGuildMember,
} from "discord.js";
import {
  Collection,
  GuildMember,
  Message,
  MessageEmbed,
  Snowflake,
  User,
} from "discord.js";
import { uploadText } from "../Functions/util";
import { TimeStamp } from "./time";
const superagent = require("superagent");

/**
 * @class  Messages La clase de eventos que dará el valor de mensajes borrados; editados y bulkdeleteados.
 * @argument {Message} message Valor del mensaje, este es el mensaje editado 1 o mensaje borrado.
 * @argument {Message} message2 Valor del mensaje, solo se acepta en el evento del mensaje editado.
 * @argument {Collection<Snowflake, Message>} messages Colleción de mensajes bulkdeleteados.
 */
export class Messages {
  message: Message;
  message2: Message;
  author: User;
  messages: Collection<Snowflake, Message>;

  constructor(
    message: Message,
    message2?: Message,
    author?: User,
    messages?: Collection<Snowflake, Message>
  ) {
    this.message = message;
    this.message2 = message2;
    this.author = author;
    this.messages = messages;
  }

  /**
   * #function Registra los mensajes borrados.
   * @param {Message} message Valor del mensaje, este es el mensaje borrado sacado de los eventos.
   * @returns {Promise<Message>} Envía el mensaje al canal de logs del mensaje borrado.
   * @example
   * new Messages(messageDeleted).deleted();
   */

  async deleted() {
    if (this.message.partial) await this.message.fetch();

    if (this.message.attachments.first()) {
      var mapita = this.message.attachments.map((mapita) => mapita);
      mapita.forEach((m) => {
        superagent
          .get(
            `https://api.imgbb.com/1/upload?key=${[
              process.env.IMAGES_API,
            ]}&image=${m.proxyURL}`
          )
          .then((x) => {
            const w = new MessageEmbed()
              .setAuthor(
                `${this.message.author.tag} | Imagen eliminada`,
                this.message.author.displayAvatarURL({ dynamic: true })
              )
              .setColor(`BLUE`)
              .setImage(`${x.body.data.url}`)
              .setDescription(
                `> **Mensaje**\n\n**ID del mensaje:** ${
                  this.message.id
                }\n**Autor del mensaje:** ${this.message.author} (${
                  this.message.author.id
                })\n**Canal:**${this.message.channel} (${
                  this.message.channel.id
                })\n**Creación del mensaje:** <t:${new TimeStamp(
                  this.message.createdTimestamp
                ).OutDecimals()}:R>\nBot: **${
                  this.message.author.bot ? "Sí" : "No"
                }**\n\n> **Fotografía**\n\n**Nombre de la fotografía:** ${
                  m.name
                }\n**Link de la fotografía**: [Link](${
                  m.url
                })\n**Tamaño de la fotografía**: ${m.height} x ${
                  m.width
                } pixeles\n**ID de la imagen:** ${
                  m.id
                }\n**Link permanente:** [PermaLink](${x.body.data.url})`
              )
              .setTimestamp();

            this.message.client.channels.cache
              .find((x) => x.name.includes(`mensajes`))
              .send({ embeds: [w] })
              .catch(() => {});

            return this;
          });
      });
    }

    if (this.message.embeds) {
      this.message.embeds.forEach((x) => {
        const b = new MessageEmbed()
          .setAuthor(
            `${this.message.author.tag} | Embed eliminado`,
            this.message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            `**Embed eliminado**\n\n**Canal:** ${this.message.channel} (${
              this.message.channel.id
            })\n**Autor:** ${this.message.author} (${
              this.message.author.id
            })\n**Creado:** <t:${new TimeStamp(
              this.message.createdTimestamp
            ).OutDecimals()}:R>\n**ID del mensaje:** ${
              this.message.id
            }\nBot: **${this.message.author.bot ? "Sí" : "No"}**\n**Embed:**`
          )
          .setColor(`DARK_BLUE`)
          .setAuthor(`${this.message.author.tag}`);

        this.message.client.channels.cache
          .find((x) => x.name.includes(`mensajes`))
          .send({ embeds: [b, x] })
          .catch(() => {});

        return this;
      });
    }

    if (this.message.stickers.size > 0) {
      this.message.stickers.forEach(async (x) => {
        await x.fetch();
        await x.fetchPack();
        await x.fetchUser();

        const w = new MessageEmbed()
          .setDescription(
            `> **Mensaje**\n\n**ID del mensaje:** ${
              this.message.id
            }\n**Autor del mensaje:** ${this.message.author} (${
              this.message.author.id
            })\n**Canal:**${this.message.channel} (${
              this.message.channel.id
            })\n**Creación del mensaje:** <t:${new TimeStamp(
              this.message.createdTimestamp
            ).OutDecimals()}:R>\nBot: **${
              this.message.author.bot ? "Sí" : "No"
            }**\n\n> **Sticker**\n\n**Nombre:** ${
              x.name ?? "No encontrado."
            }\n**Formato:** ${x.format ?? "No encontrado."}\n**Tags:** ${
              x.tags ?? "No tiene."
            }\n**Descripción:** ${
              x.description ?? "No tiene."
            }\n**Id del pack:** ${
              x.packId ?? "No tiene."
            }\n**Creador de la sticker:** ${x.user} (${
              x.user.id
            })\n**Disponible:** ${
              x.available ? "Sí" : "No"
            }\n**Link de la sticker:** [Link de la sticker](${x.url})`
          )
          .setImage(x.url)
          .setColor(0x005f1d91)
          .setAuthor(
            `${this.message.author.tag} | Sticker eliminada`,
            this.message.author.displayAvatarURL({ dynamic: true })
          );

        this.message.client.channels.cache
          .find((x) => x.name.includes(`mensajes`))
          .send({ embeds: [w] });

        return this;
      });
    }

    if (this.message.content == null || this.message.content.length == 0)
      return;

    const a = new MessageEmbed()
      .setAuthor(
        `${this.message.author.tag} | Mensaje eliminado`,
        this.message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `**Canal:** ${this.message.channel} (${
          this.message.channel.id
        })\n**Autor**: ${this.message.author} (${
          this.message.author.id
        })\n**Creado:** <t:${new TimeStamp(
          this.message.createdTimestamp
        ).OutDecimals()}:R>\n**ID del mensaje:** ${this.message.id}\nBot: **${
          this.message.author.bot ? "Sí" : "No"
        }**\n\n**Contenido:**\n\`\`\`${this.message.content}\`\`\``
      )
      .setColor(0x00b30b0b);

    this.message.client.channels.cache
      .find((x) => x.name.includes(`mensajes`))
      .send({ embeds: [a] })
      .catch(() => {});

    return this;
  }

  /**
   * @function edited Registra los mensajes editados en el servidor.
   * @param {Message} message Valor del mensaje, este es el mensaje editado sacado de los eventos.
   * @returns {Promise<Message>} Envía el mensaje al canal de logs del mensaje editado.
   * @example
   * new Messages(messageEdited, messageOld).edited();
   */

  async edited() {
    if (this.message.partial) await this.message.fetch();

    if (this.message.author.bot == true) var bott = "Si";
    if (this.message.author.bot == false) bott = "No";
    if (this.message.author.bot == null) bott = "Sin datos";

    if (this.message.content.length == 0) return;
    if (this.message.content == this.message2.content) return;

    const a = new MessageEmbed()
      .setAuthor(
        `${this.message.author.tag} | Mensaje editado`,
        this.message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `**Canal:** ${this.message.channel} (${
          this.message.channel.id
        })\n**Autor**: ${this.message.author} (${
          this.message.author.id
        })\n**Creado:** <t:${new TimeStamp(
          this.message.createdTimestamp
        ).OutDecimals()}:R>\n**Editado:** <t:${new TimeStamp(
          Date.now()
        ).OutDecimals()}:R>\n**ID del mensaje**: ${
          this.message.id
        }\n**Bot:** ${bott}\n**Mensaje antes**:\n\`\`\`${
          this.message2
        }\`\`\`\n**Mensaje después:**\n\`\`\`${this.message}\`\`\``
      )
      .setColor(0x00d17a08);

    const b = new MessageButton()
      .setStyle("LINK")
      .setURL(
        `https://discord.com/channels/${this.message.guild.id}/${this.message.channel.id}/${this.message.id}`
      )
      .setLabel("Ir al mensaje");

    const c = new MessageActionRow().addComponents(b);

    this.message.client.channels.cache
      .find((x) => x.name.includes(`mensajes`))
      .send({ embeds: [a], components: [c] })
      .catch(() => {});

    return this;
  }

  /**
   * @function BulkDelete Registra los mensajes masivamente eliminados del servidor.
   * @param {Collection<Snowflake, Message>} message Colección de los mensajes eliminados sacados del evento.
   * @returns {Promise<Message>} Envía el mensaje al canal de logs de los mensajes eliminados.
   * @example
   * new Messages(null, null, null, Messages).BulkDelete();
   */

  async BulkDelete() {
    if (this.messages.map((x) => x).filter((x) => x.embeds[0]).length >= 1) {
      this.messages
        .map((x) => x)
        .filter((x) => x.embeds[0])
        .forEach(async (x) => {
          x.embeds
            .map((x) => x)
            .forEach(async (m) => {
              const a = new MessageEmbed()
                .setAuthor(
                  `Embed eliminado en bulkDelete`,
                  x.author.displayAvatarURL()
                )
                .setDescription(
                  `\n**Canal:** ${x.channel} (${x.channel.id})\n**Autor:** ${
                    x.author
                  } (${x.author.id})\n**Creado:** <t:${new TimeStamp(
                    x.createdTimestamp
                  ).OutDecimals()}:R>\n**ID del mensaje:** ${x.id}\nBot: **${
                    x.author.bot ? "Si" : "No"
                  }**\n**Embed:**`
                )
                .setColor(0x005f1d91);
              this.messages
                .first()
                .client.channels.cache.find((x) => x.name.includes(`mensajes`))
                .send({ embeds: [a, m] })
                .catch(() => {});
            });
        });
    }

    const c = new MessageEmbed()
      .setAuthor(`${this.messages.size} Mensajes purgueados.`)
      .setDescription(
        `**Canal:** ${
          this.messages.first().channel
        }\n**Cantidad de mensajes:** ${
          this.messages.size
        }\n**Mensajes:**\n\`\`\`${this.messages
          .map(
            (x) =>
              `${x.author.username} (${x.author.id}): ${
                x.content || `Embed o imagen`
              }`
          )
          .join("\n")}\`\`\``
      )
      .setColor(0x005f1d91);

    this.messages
      .first()
      .client.channels.cache.find((x) => x.name.includes(`mensajes`))
      .send({ embeds: [c] })
      .catch(() => {})
      .catch(async () => {
        const a = new MessageEmbed()
          .setAuthor(`${this.messages.size} Mensajes purgueados`)
          .setDescription(
            `**Canal:** ${
              this.messages.first().channel
            }\n**Cantidad de mensajes:** ${
              this.messages.size
            }\n **Mensajes**:\n[Los mensajes se encuentran en este link ya que no caben aqui.](${await uploadText(
              `${this.messages
                .map(
                  (x) =>
                    `${x.author.username} (${x.author.id}): ${
                      x.content || `Embed o imagen`
                    }`
                )
                .join("\n")}`
            )})`
          )
          .setColor(0x005f1d91);

        this.messages
          .first()
          .client.channels.cache.find((x) => x.name.includes(`mensajes`))
          .send({ embeds: [a] })
          .catch(() => {});

        return this;
      });
  }
}

/**
 * @class Esta clase sirve para registrar los logs de roles y sus parecidos.
 * @argument {GuildMember} after El usuario después del cambio del evento.
 * @argument {GuildMember | PartialGuildMember} before El usuario antes del cambio en el evento.
 * @argument {string} reason Razón del cambio que se registrará.
 */
export class Roles {
  received: GuildMember;
  before: GuildMember | PartialGuildMember;
  reason: string;

  constructor(
    received: GuildMember,
    before: GuildMember | PartialGuildMember,
    reason?: string
  ) {
    this.received = received;
    this.before = before;
    this.reason = reason;
  }

  /**
   * @function Quitado Registra los roles quitados del usuario.
   * @param {GuildMember} after El usuario después del cambio del evento.
   * @param {GuildMember | PartialGuildMember} before El usuario antes del cambio en el evento.
   * @returns {Promise<Message>} Envía el mensaje al canal de logs de los roles quitados.
   * @example
   * new Roles(after, before).quitado();
   */

  async quitado() {
    const auditLogs = (
      await this.received.guild.fetchAuditLogs({ type: "MEMBER_ROLE_UPDATE" })
    ).entries;
    const auditlog = auditLogs.find(
      (x: any) => x.target.id == this.received.user.id
    );

    if (this.before.roles.cache.size > this.received.roles.cache.size) {
      this.before.roles.cache.forEach(async (rol) => {
        if (!this.received.roles.cache.has(rol.id)) {
          if (rol.mentionable == true) var mencionable = "Si";
          if (rol.mentionable == false) var mencionable = "No";

          const embed = new MessageEmbed()
            .setAuthor(
              `${this.received.user.tag} | Rol removido`,
              this.received.user.displayAvatarURL({ dynamic: true })
            )
            .setDescription(
              `**Usuario:** ${this.received} (${this.received.id})\n**Nombre:** ${rol.name} (${rol.id})\n**Cantidad de usuarios con este rol**: ${rol.members.size}\n**Mencionable**: ${mencionable}\n **Posicion:** ${rol.rawPosition}/${this.received.guild.roles.highest.position}\n\n**Rol:**\n${rol}`
            )
            .setColor(0x00b30b0b);

          if (auditlog.executor.id) {
            embed.setFooter(
              `Removido por ${auditlog.executor.tag}`,
              auditlog.executor.displayAvatarURL()
            );
          }

          this.received.guild.channels.cache
            .find((x) => x.name.includes(`roles`))
            .send({ embeds: [embed] })
            .catch(() => {});

          return this;
        }
      });
    }
  }

  /**
   * @function Agregado Registra los roles agregados al usuario.
   * @param {GuildMember} after El usuario después del cambio del evento.
   * @param {GuildMember | PartialGuildMember} before El usuario antes del cambio en el evento.
   * @returns {Promise<Message>} Envía el mensaje al canal de logs de los roles agregados.
   * @example
   * new Roles(after, before).puesto();
   */

  async puesto() {
    const auditLogs = (
      await this.received.guild.fetchAuditLogs({ type: "MEMBER_ROLE_UPDATE" })
    ).entries;
    const auditLog = auditLogs.find(
      (x: any) => x.target.id == this.received.user.id
    );
    if (this.before.roles.cache.size < this.received.roles.cache.size) {
      this.received.roles.cache.forEach(async (rol) => {
        if (!this.before.roles.cache.has(rol.id)) {
          if (rol.mentionable == true) var mencionable = "Si";
          if (rol.mentionable == false) var mencionable = "No";

          const embed = new MessageEmbed()
            .setAuthor(
              `${this.received.user.tag} | Rol agregado`,
              this.received.user.displayAvatarURL({ dynamic: true })
            )
            .setDescription(
              `**Usuario:** ${this.received} (${this.received.id})\n**Nombre:** ${rol.name} (${rol.id})\n**Cantidad de usuarios con este rol**: ${rol.members.size}\n**Mencionable**: ${mencionable}\n **Posicion:** ${rol.rawPosition}/${this.received.guild.roles.highest.position}\n\n**Rol:**\n${rol}`
            )
            .setColor(0x000c912d);

          if (auditLog.executor.id) {
            embed.setFooter(
              `Agregado por ${auditLog.executor.tag}`,
              auditLog.executor.displayAvatarURL()
            );
          }

          this.received.guild.channels.cache
            .find((x) => x.name.includes(`roles`))
            .send({ embeds: [embed] })
            .catch(() => {});
        }
      });
    }

    return this;
  }
}

/**
 * @class Clase destinada a registrar los cambios de apodo de un miembro.
 * @argument {GuildMember | PartialGuildMember} before Usuario antes del cambio en el evento.
 * @argument {GuildMember} after Usuario después del cambio en el evento.
 */
export class Apodo {
  before: GuildMember | PartialGuildMember;
  after: GuildMember;

  // Check if the user changed their nickname
  constructor(before: GuildMember | PartialGuildMember, after: GuildMember) {
    this.before = before;
    this.after = after;
  }

  /**
   * @function Cambiado Registra el cambio de apodo del usuario.
   * @param {GuildMember} after El usuario después del cambio del evento.
   * @param {GuildMember | PartialGuildMember} before El usuario antes del cambio en el evento.
   * @returns {Promise<Message>} Envía el mensaje al canal de logs de los cambios de apodo.
   * @example
   * new Apodo(before, after).cambiado();
   */

  async cambiado() {
    const auditLogs = (
      await this.after.guild.fetchAuditLogs({ type: "MEMBER_UPDATE" })
    ).entries;
    const auditLog = auditLogs.find((x: any) => x.target.id == this.after.id);

    if (this.before.nickname == this.after.nickname) return;
    const embed = new MessageEmbed()
      .setAuthor(
        `${this.before.user.tag} | Apodo cambiado.`,
        this.before.user.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `**Apodo anterior:** ${
          this.before.nickname || `Sin apodo.`
        }\n**Apodo nuevo:** ${
          this.after.nickname || `Sin apodo.`
        }\n**Apodos:**\n\`\`\`${this.before.nickname || " "} => ${
          this.after.nickname || " "
        }\`\`\``
      )
      .setColor(0x005f1d91);

    if (auditLog.executor.id) {
      embed.setFooter(
        `Cambiado por ${auditLog.executor.tag}`,
        auditLog.executor.displayAvatarURL()
      );
    }

    this.before.guild.channels.cache
      .find((x) => x.name.includes(`miembros`))
      .send({ embeds: [embed] })
      .catch(() => {});

    return this;
  }
}

/**
 * @class Clase destinada al cambio de los miembros como entrada y salida y se encarga de registrarlos.
 * @argument {GuildMember} member Parametro que da el evento para los miembros.
 */

export class Members {
  member: GuildMember | PartialGuildMember;

  // Constructor
  constructor(member: GuildMember | PartialGuildMember) {
    this.member = member;
  }

  /**
   * @function welcome Da la bienvenida a un usuario nuevo al servidor.
   * @param {GuildMember} member El usuario del evento de entrada.
   * @returns {Promise<Message>} Envía el mensaje al canal de bievenidas.
   * @example
   * new Member(member).welcome();
   */

  welcome() {
    const embed = new MessageEmbed()
      .setAuthor(
        `¡Bienvenido al servidor! ${this.member.user.tag}`,
        this.member.user.displayAvatarURL()
      )
      .setDescription(
        `> Pasate por <#851151999856279632> para poder personalizar tu perfil\n\n> Revisa <#820639237519048724> para no perderte de ninguna novedad.\n\n> Y revisa <#892521430707761162> para tener acceso a canales exclusivos.`
      )
      .setColor(0x000c912d)
      .setImage(
        "https://cdn.discordapp.com/banners/699200033131724870/9f23bca48f762c56b3c4c99ae8f0e9a1.png?size=2048"
      )
      .setFooter(
        `Contigo somos ${this.member.guild.memberCount} miembros. ¡Gracias!`
      );

    this.member.guild.channels.cache
      .find((x) => x.name.includes(`bienvenidas`))
      .send({ content: `${this.member.user}`, embeds: [embed] });

    return this;
  }

  /**
   *
   * @function goodbye
   * @param {GuildMember} member El usuario del evento de salida.
   * @returns {Promise<Message>} Envía el mensaje al canal de bievenidas.
   */

  goodbye() {
    const embed = new MessageEmbed()
      .setAuthor(
        `¡Adiós! ${this.member.user.tag}`,
        this.member.user.displayAvatarURL()
      )
      .setDescription(`${this.member.user.tag} Ha dejado el servidor.`)
      .setColor(`DARK_RED`);

    this.member.guild.channels.cache
      .find((x) => x.name.includes(`despedidas`))
      .send({ embeds: [embed] });

    return this;
  }

  /**
   * @function entrante Registra la entrada de un usuario.
   * @param {GuildMember} member El usuario del evento de entrada.
   * @returns {Promise<Message>} Envía el mensaje al canal de logs de los usuarios entrantes.
   * @example
   * new Members(member).entrante();
   */

  entrante() {
    const embed = new MessageEmbed()
      .setAuthor(`${this.member.user.tag} | Ha entrado en el servidor`)
      .setThumbnail(this.member.user.displayAvatarURL())
      .setDescription(
        `**Usuario:** ${this.member} (${
          this.member.id
        })\n**Creada hace:**<t:${new TimeStamp(
          `${this.member.user.createdTimestamp}`
        ).OutDecimals()}:R> (dinamica)\n **Creada hace:** ${new TimeStamp(
          this.member.user.createdTimestamp
        ).variable()} (estatico)`
      )
      .setColor(0x000c912d);

    this.member.client.channels.cache
      .find((x) => x.name.includes(`miembros`))
      .send({ embeds: [embed] })
      .catch(() => {});

    return this;
  }

  /**
   * @function saliente Registra la salida de un usuario.
   * @param {GuildMember} member El usuario del evento de salida.
   * @returns {Promise<Message>} Envía el mensaje al canal de logs de los usuarios salientes.
   * @example
   * new Members(member).saliente();
   */

  async saliente() {
    const embed = new MessageEmbed()
      .setAuthor(`${this.member.user.tag} | Ha salido del servidor`)
      .setThumbnail(this.member.user.displayAvatarURL())
      .setDescription(
        `**Usuario:** ${this.member} (${
          this.member.id
        })\n**Creada hace:** ${new TimeStamp(
          this.member.user.createdTimestamp
        ).variable()}\n**Miembro desde:** ${new TimeStamp(
          this.member.joinedTimestamp
        ).variable()}\n**Roles:**\n ${this.member.roles.cache
          .map((x) => `${x}`)
          .join(" ,")}`
      )
      .setColor(`DARK_RED`);

    this.member.client.channels.cache
      .find((x) => x.name.includes(`miembros`))
      .send({ embeds: [embed] })
      .catch(() => {});

    return this;
  }
}

/**
 * @class Esta clase se encarga de registrar los miembros baneados y desbaneados del servidor.
 * @argument {GuildMember} member El miembro baneado/desbenado
 */

export class Bans {
  ban: GuildBan;

  // Constructor de los baneos
  constructor(ban: GuildBan) {
    this.ban = ban;
  }

  /**
   * @function Banned registra la persona baneada del servidor y lo manda a los logs.
   * @param {GuildBan} banned Los datos conjuntos del baneo.
   * @returns {Promise<Message>} Envía el mensaje al canal de logs de los baneos.
   * @example
   * // Ejemplo del baneo del servidor.
   * new Bans(ban).Banned();
   */

  async banned() {
    await this.ban.fetch();
    const banlogs = (
      await (
        await this.ban.client.guilds.fetch(`699200033131724870`)
      ).fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    ).entries;
    const log = banlogs.find((x: any) => x.target.id == this.ban.user.id);

    const embed = new MessageEmbed()
      .setAuthor(`${this.ban.user.tag} | Ha sido baneado del servidor`)
      .setThumbnail(this.ban.user.displayAvatarURL())
      .setDescription(
        `**Usuario**: ${this.ban.user} (${
          this.ban.user.id
        })\n**Cuenta del baneado creada hace:** <t:${new TimeStamp(
          this.ban.user.createdTimestamp
        ).OutDecimals()}:R>\n**Baneado hace:** <t:${new TimeStamp(
          Date.now()
        ).OutDecimals()}:R>\n **Razón del baneo:**${
          this.ban.reason ?? "No se ha dado razon"
        }\n**Roles del usuario:**\n\n`
      )
      .setColor(`RED`);

    if (log.executor.tag) {
      embed.setFooter(
        `Baneado por ${log.executor.tag}`,
        log.executor.displayAvatarURL()
      );
    }

    this.ban.client.channels.cache
      .find((x) => x.name.includes(`miembros`))
      .send({ embeds: [embed] })
      .catch(() => {});

    return this;
  }

  /**
   * @function Unbanned registra la persona desbaneada del servidor y lo manda a los logs.
   * @param {GuildBan} UnbanData Los datos conjuntos del desbaneo.
   * @returns {Promise<Message>} Envía el mensaje al canal de logs de los desbaneos.
   * @example
   * // Ejemplo del desbaneo del servidor.
   * new Bans(ban).Unbanned();
   */

  async unbanned() {
    const banlogs = (
      await (
        await this.ban.client.guilds.fetch(`699200033131724870`)
      ).fetchAuditLogs({ type: "MEMBER_BAN_REMOVE" })
    ).entries;
    const log = banlogs.find((x: any) => x.target.id == this.ban.user.id);

    const embed = new MessageEmbed()
      .setAuthor(`${this.ban.user.tag} | Ha sido desbaneado del servidor`)
      .setThumbnail(this.ban.user.displayAvatarURL())
      .setDescription(
        `**Usuario**: ${this.ban.user} (${
          this.ban.user.id
        })\n**Cuenta del desbaneado creada hace:** ${new TimeStamp(
          this.ban.user.createdTimestamp
        ).variable()}\n**Desbaneado hace:** <t:${new TimeStamp(
          Date.now()
        ).OutDecimals()}:R>\n **Razón del desbaneo:** ${
          this.ban.reason ?? "No se ha dado razon"
        }`
      )
      .setColor(`GREEN`);

    if (log.executor) {
      embed.setFooter(
        `Desbaneado por ${log.executor.tag}`,
        log.executor.displayAvatarURL()
      );
    }

    this.ban.client.channels.cache
      .find((x) => x.name.includes(`miembros`))
      .send({ embeds: [embed] })
      .catch(() => {});

    return this;
  }
}
