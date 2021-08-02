import node from "node-superfetch"

export async function uploadText(text: string) {
const { body } = await node.post("https://paste.mod.gg/documents").send(text);
return `https://paste.mod.gg/${body.key}`
}