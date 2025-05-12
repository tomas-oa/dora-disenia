import type { Maybe } from "./maybe";

export const EMAIL_REGEX = /*#__PURE__*/ /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * `printf` or `console.log("%s", 1)` equivalente for browsers. Node.js has `util.format()`.
 * @example
 * const formatted = FORMAT("hello %s!", user["name"]);
 * @see https://github.com/tmpfs/format-util/blob/master/format.js
 */
export function FORMAT(fmt: string, ...args: any[]): string {
  const re = /(%?)(%([ojdsO]))/g;
  if (args.length) {
    fmt = fmt.replace(re, (match, escaped, _, flag) => {
      let arg = args.shift();
      switch (flag) {
        case "O": {
          arg = JSON.stringify(arg, null, 2);
          break;
        }
        case "o": {
          arg = JSON.stringify(arg);
          break;
        }
        case "s": {
          arg = `${arg}`;
          break;
        }
        case "d": {
          arg = Number(arg);
          break;
        }
        case "j": {
          arg = JSON.stringify(arg);
          break;
        }
      }
      if (!escaped) {
        return arg;
      }
      args.unshift(arg);
      return match;
    });
  }

  // arguments remain after formatting
  if (args.length) {
    fmt += ` ${args.join(" ")}`;
  }

  // update escaped %% values
  fmt = fmt.replace(/%{2,2}/g, "%");

  return `${fmt}`;
}

/**
 * URL Safe (TODO: be sure)
 * @see https://jasonwatmore.com/vanilla-js-slugify-a-string-in-javascript
 */
export function SLUGIFY(str: string): string {
  return (
    str
      .normalize("NFD") // Normalize to decompose accents
      // biome-ignore lint/suspicious/noMisleadingCharacterClass: not sure
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace invalid characters with hyphens
      .replace(/^-+|-+$/g, "") // Remove leading and trailing hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
  );
}

/** ChatGPT made this. */
export function HUMANIZE(string: string): string {
  return string
    .replace(/[_\-·]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
}

/** Safe filename */
// export function FILENAMEFY(string: string): string {
//   return filenamify(SLUGIFY(string));
// }

export function PAD(n: string | number, places = 2) {
  return String(n).padStart(places, "0");
}

// https://stackoverflow.com/a/9436948
export function IS_STRING(something: unknown): something is string {
  return typeof something === "string" || something instanceof String;
}

/** Made by ChatGPT */
export function STRING_DIFF(prev: string, next: string): string {
  // Split the strings into lines
  const lines1 = next.split("\n");
  const lines2 = prev.split("\n");

  // Compare the lines in each string
  const result = lines1.map((line, index) => {
    // If the lines are the same, return nothing
    if (line === lines2[index]) {
      return "";
    }

    // If the line only exists in the first string, return it with a minus sign
    if (!lines2[index]) {
      return `- ${line}`;
    }

    // If the line only exists in the second string, return it with a plus sign
    if (!line) {
      return `+ ${lines2[index]}`;
    }

    // If the line exists in both strings but is different, return both versions
    return `- ${line}\n+ ${lines2[index]}`;
  });

  // Join the results back into a single string and return it
  return result
    .filter((line) => line.trim().length > 0) // remove empty lines
    .join("\n");
}

/** TODO: Not very safe, it can still throw. */
export function STRINGIFY_SAFE(obj: any, space?: string | number | undefined) {
  if (!obj) {
    return "{}";
  }
  return JSON.stringify(obj, STRINGIFY_SAFE_FN, space);
}

function STRINGIFY_SAFE_FN(key: string, value: any) {
  if (value instanceof Set) {
    return [...value];
  } else if (value instanceof Map) {
    return Object.fromEntries(value);
  } else {
    return value;
  }
}

export function TITLE_CASE(string: string): string {
  return string
    .split(" ")
    .map((word) => (word[0] || "").toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Truncate a string to a certain length and add an ellipsis (added as adicional characters).
 */
export function TRUNCATE(
  str: string,
  len: number,
  ellipsis: Maybe<string> = "...",
) {
  if (str.length <= len) {
    return str;
  } else if (ellipsis) {
    return str.slice(0, len) + ellipsis;
  } else {
    return str.slice(0, len);
  }
}

/**
 * Remove break lines and extra spaces.
 */
export function STRING_INLINE(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/**
 * Remove accents, ñ and special chars.
 * TODO: it removes whitespace too. Prevent it?
 * https://ricardometring.com/javascript-replace-special-characters
 */
export function STRING_NORMALIZE(
  string: string,
  { keepWhitespace = false } = {},
): string {
  // https://tonsky.me/blog/unicode/#:~:text=are%20four%20forms%3A-,NFD,-tries%20to%20explode
  if (keepWhitespace) {
    // biome-ignore lint/suspicious/noMisleadingCharacterClass: not sure
    return string
      .normalize("NFD")
      .replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, "");
  } else {
    // biome-ignore lint/suspicious/noMisleadingCharacterClass: not sure
    return string
      .normalize("NFD")
      .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, "");
  }
}

/** Valid UUID */
export const UUID_ZERO = "00000000-0000-0000-0000-000000000000";

export const UUID_REGEX =
  /*#__PURE__*/ /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function BASE64_ENCODE(str: string): string {
  return Buffer.from(str).toString("base64");
}
export function BASE64_DECODE(str: string): string {
  return Buffer.from(str, "base64").toString("utf-8");
}
