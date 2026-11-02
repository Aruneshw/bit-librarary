import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
// Compile the actual policy module and its allowlist for Node's native test runner.
const directory = await mkdtemp(join(tmpdir(), 'bithub-auth-test-'));
for (const [source, target] of [['../src/lib/adminEmails.ts', 'adminEmails'], ['../src/lib/auth/access.ts', 'access']]) {
  const text = await readFile(new URL(source, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  await writeFile(join(directory, `${target}.mjs`), outputText.replace("'../adminEmails'", "'./adminEmails.mjs'"));
}
const { canAdminister, canAccessCampus } = await import(pathToFileURL(join(directory, 'access.mjs')));
after(() => rm(directory, { recursive: true, force: true }));
const student = { email: 'builder@bitsathy.ac.in', email_confirmed_at: '2026-01-01', app_metadata: {}, user_metadata: {} };
test('confirmed campus students can use the app but cannot administer it', () => {
  assert.equal(canAccessCampus(student), true); assert.equal(canAdminister(student), false);
});
test('user-editable metadata cannot grant an admin role', () => {
  assert.equal(canAdminister({ ...student, user_metadata: { role: 'admin' } }), false);
  assert.equal(canAdminister({ ...student, app_metadata: { role: 'admin' } }), true);
});
test('unconfirmed accounts cannot acquire campus or administrator access', () => {
  const user = { ...student, email: 'admin@bitsathy.ac.in', email_confirmed_at: null, app_metadata: { role: 'admin' } };
  assert.equal(canAccessCampus(user), false); assert.equal(canAdminister(user), false);
});
test('outside accounts are denied except existing confirmed administrator emails', () => {
  assert.equal(canAccessCampus({ ...student, email: 'outside@example.com' }), false);
  assert.equal(canAccessCampus({ ...student, email: 'aruneshownsty1@gmail.com' }), true);
  assert.equal(canAdminister({ ...student, email: 'aruneshownsty1@gmail.com' }), true);
});
