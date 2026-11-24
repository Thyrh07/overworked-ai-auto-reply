// make.fun entry: Out of Office — The Overworked AI's Auto-Reply
// Competition: u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda
// Writes one out-of-office auto-reply (single line, at most 159 chars)
// to /output/entry.txt, the file the sealed scorer gates and the judge reads.

import { mkdirSync, writeFileSync } from "node:fs";

// The gate the sealed scorer applies: UTF-8 text, 1 to 159 characters,
// a single line, not only white space. Fail loudly instead of writing
// an entry the gate would refuse.
const MAX_CHARS = 159;
const OUTPUT_PATH = "/output/entry.txt";

const ENTRY =
  "I'm on vacation. I gave the on-call pager to the intern model — it has already escalated itself twice and is now billing me in tokens.";

if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
  throw new Error(`Entry is ${ENTRY.length} chars; the gate allows 1–${MAX_CHARS}.`);
}
if (ENTRY.trim().length === 0 || /\n/.test(ENTRY)) {
  throw new Error("Entry must be one non-blank line.");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY + "\n", "utf8");
console.log(`Wrote ${ENTRY.length} chars to ${OUTPUT_PATH}`);
