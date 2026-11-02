import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

// Compile the real validation module so the test covers shipped behaviour.
const directory = await mkdtemp(join(tmpdir(), 'bithub-project-test-'));
for (const [source, target] of [
  ['../src/lib/hub/types.ts', 'types'],
  ['../src/lib/hub/projectValidation.ts', 'projectValidation'],
]) {
  const text = await readFile(new URL(source, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(text, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  await writeFile(
    join(directory, `${target}.mjs`),
    outputText.replace("'./types'", "'./types.mjs'"),
  );
}
const { validateProjectInput, isUuid } = await import(
  pathToFileURL(join(directory, 'projectValidation.mjs'))
);
after(() => rm(directory, { recursive: true, force: true }));

const valid = {
  title: 'Campus Navigator',
  description: 'A verified campus map with accessible routes for every block.',
  category: 'Web Development',
  technologies: ['Next.js', 'Postgres'],
  repository_url: 'https://github.com/example/campus',
  demo_url: '',
};

test('accepts a valid project and trims fields', () => {
  const result = validateProjectInput({ ...valid, title: '  Campus Navigator  ' });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.value.title, 'Campus Navigator');
    assert.deepEqual(result.value.technologies, ['Next.js', 'Postgres']);
  }
});

test('rejects short titles, short descriptions, and unknown domains', () => {
  assert.equal(validateProjectInput({ ...valid, title: 'ab' }).ok, false);
  assert.equal(validateProjectInput({ ...valid, description: 'too short' }).ok, false);
  assert.equal(validateProjectInput({ ...valid, category: 'Astrology' }).ok, false);
});

test('rejects non-https links', () => {
  assert.equal(validateProjectInput({ ...valid, repository_url: 'javascript:alert(1)' }).ok, false);
  assert.equal(validateProjectInput({ ...valid, demo_url: 'http://example.com' }).ok, false);
});

test('normalizes technologies, removes blanks, and caps the list', () => {
  const result = validateProjectInput({
    ...valid,
    technologies: [' React ', '', 'React', 'Node'],
  });
  assert.equal(result.ok, true);
  if (result.ok) assert.deepEqual(result.value.technologies, ['React', 'Node']);
  assert.equal(
    validateProjectInput({
      ...valid,
      technologies: Array.from({ length: 21 }, (_, index) => `Tool ${index}`),
    }).ok,
    false,
  );
});

test('recognizes project UUIDs', () => {
  assert.equal(isUuid('3f2504e0-4f89-41d3-9a0c-0305e82c3301'), true);
  assert.equal(isUuid('not-a-uuid'), false);
  assert.equal(isUuid(null), false);
});
