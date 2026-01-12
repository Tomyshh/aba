import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const messagesDir = path.join(root, "messages");
const locales = ["fr", "en", "he"];

function readJson(p) {
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw);
}

function flatten(obj, prefix = "", out = new Set()) {
  for (const [k, v] of Object.entries(obj ?? {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) flatten(v, key, out);
    else out.add(key);
  }
  return out;
}

const all = new Map();
for (const l of locales) {
  const file = path.join(messagesDir, `${l}.json`);
  if (!fs.existsSync(file)) {
    console.error(`Missing file: ${file}`);
    process.exit(1);
  }
  all.set(l, flatten(readJson(file)));
}

const union = new Set();
for (const set of all.values()) for (const k of set) union.add(k);

let ok = true;
for (const l of locales) {
  const set = all.get(l);
  const missing = [...union].filter((k) => !set.has(k));
  if (missing.length) {
    ok = false;
    console.error(`\nLocale "${l}" is missing ${missing.length} keys:`);
    for (const k of missing) console.error(`- ${k}`);
  }
}

if (!ok) process.exit(1);
console.log(`OK: ${union.size} keys present in ${locales.join(", ")}.`);


