import test from 'node:test';
import assert from 'node:assert/strict';
import { safeNextPath, demoAllowed } from '../src/lib/auth/redirect.ts';
test('post-login redirects only target app paths', () => {
  for (const value of ['https://evil.example','//evil.example','/\\evil.example','/%5cevil.example','/%2f/evil.example','/auth/callback','/hub/../api/auth/bypass','/hub/%2e%2e/auth/callback','/api/auth/bypass','/hub\r\nLocation: evil',null]) assert.equal(safeNextPath(value),'/hub');
  assert.equal(safeNextPath('/dashboard'),'/dashboard');
  assert.equal(safeNextPath('/subject/known-id?unit=1'),'/subject/known-id?unit=1');
});
test('production never silently enables the demo', () => {
  assert.equal(demoAllowed('production', undefined),false);
  assert.equal(demoAllowed('production', 'false'),false);
  assert.equal(demoAllowed('production', 'true'),true);
  assert.equal(demoAllowed('development', undefined),true);
});
