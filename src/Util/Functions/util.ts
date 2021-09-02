import node from "node-superfetch";

export async function parseEval(input) {
  const isPromise =
    input instanceof Promise &&
    typeof input.then === "function" &&
    typeof input.catch === "function";
  if (isPromise) {
    input = await input;
    return {
      evaled: input,
      type: `Promise<${parseType(input)}>`,
    };
  }
  return {
    evaled: input,
    type: parseType(input),
  };
}

export function parseType(input) {
  if (input instanceof Buffer) {
    let length = Math.round(input.length / 1024 / 1024);
    let ic = "MB";

    if (!length) {
      length = Math.round(input.length / 1024);
      ic = "KB";
    }

    if (!length) {
      length = Math.round(input.length);
      ic = "Bytes";
    }
    return `Buffer (${length} ${ic})`;
  }
  return input === null || input === undefined
    ? "void"
    : input.constructor.name;
}

export function parseQuery(queries) {
  const query = [];
  const flags = [];

  for (const args of queries) {
    if (args.startsWith("--")) {
      flags.push(args.slice(2).toLowerCase());
    } else {
      query.push(args);
    }
  }
  return { query, flags };
}

export async function uploadText(text: string) {
  const { body } = await node.post("https://paste.mod.gg/documents").send(text);
  return `https://paste.mod.gg/${body.key}`;
}
