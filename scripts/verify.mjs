import { spawnSync } from 'node:child_process';

const pnpmCommand = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

const checks = [
  { name: 'format', command: pnpmCommand, args: ['format:check'] },
  { name: 'lint', command: pnpmCommand, args: ['lint'] },
  { name: 'typecheck', command: pnpmCommand, args: ['typecheck'] },
  { name: 'test', command: pnpmCommand, args: ['test'] },
  { name: 'build', command: pnpmCommand, args: ['build'] },
  { name: 'git diff', command: 'git', args: ['diff', '--check'] },
];

const results = [];

for (const check of checks) {
  process.stdout.write(`\n==> ${check.name}\n`);

  const result = spawnSync(check.command, check.args, {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
  });

  const passed = result.status === 0;
  results.push({ name: check.name, passed });

  if (result.error) {
    process.stderr.write(`${result.error.message}\n`);
  }
}

process.stdout.write('\nVerification summary\n');

for (const result of results) {
  process.stdout.write(`${result.passed ? 'PASS' : 'FAIL'}  ${result.name}\n`);
}

if (results.some((result) => !result.passed)) {
  process.exitCode = 1;
}
