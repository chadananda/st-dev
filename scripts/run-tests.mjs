// Runs the test suite and prints a summary line the quality gate can read.
// Deps: node builtins.
//
// gate.mjs parses failures out of `npm test` with a vitest-shaped regex
// (/Tests\s+(?:(\d+) failed[^\n]*?)?(\d+) passed/). node's built-in runner reports
// "# pass N" / "# fail N" instead, so the gate saw 0 passed, 0 failed and scored a
// green check on a suite it could not read — the same way it scored green on the
// cypress command that was exiting 127. Translating the counts is what makes the
// tests check a real bar rather than decoration.

import { spawn } from 'node:child_process';

const child = spawn(process.execPath, ['--test', ...process.argv.slice(2)], {
  stdio: ['inherit', 'pipe', 'inherit'],
});

let out = '';
child.stdout.on('data', (chunk) => { out += chunk; process.stdout.write(chunk); });

child.on('close', (code) => {
  // The spec reporter prints "\u2139 pass 11"; the TAP reporter prints "# pass 11".
  const num = (label) => {
    const m = out.match(new RegExp(`^(?:#|\\u2139) ${label} (\\d+)\\s*$`, 'm'));
    return m ? Number(m[1]) : 0;
  };
  const pass = num('pass');
  const fail = num('fail');
  console.log(`\nTests  ${fail} failed | ${pass} passed`);
  // Preserve a non-zero exit even if the counts could not be read.
  process.exit(fail > 0 ? 1 : code ?? 0);
});
