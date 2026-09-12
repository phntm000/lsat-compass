#!/usr/bin/env node
/**
 * npm run validate — content QA gate.
 * Runs the content validation suite (structural + referential + coverage).
 * Fails the build on invalid content.
 */
import { spawnSync } from 'node:child_process';

const r = spawnSync('npx', ['vitest', 'run', 'tests/content.test.ts'], {
  stdio: 'inherit',
  shell: true,
});
process.exit(r.status ?? 1);
