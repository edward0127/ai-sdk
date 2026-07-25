import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { generateSchemas } from '../scripts/generate-schemas.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('recursive definitions retain concrete inferred tool input types', async () => {
  const tempDir = mkdtempSync(resolve(root, '.generator-test-'));
  const manifestPath = resolve(tempDir, 'manifest.json');
  const generatedPath = resolve(tempDir, 'schemas.generated.ts');
  const assertionPath = resolve(tempDir, 'type-assertion.ts');

  try {
    writeFileSync(manifestPath, JSON.stringify({
      tools: [{
        name: 'nitro_compose_flow',
        inputSchema: {
          type: 'object',
          $defs: {
            flowStep: {
              type: 'object',
              properties: {
                type: { type: 'string', enum: ['email', 'split'] },
                subject: { type: 'string' },
                yes: {
                  type: 'array',
                  items: { $ref: '#/$defs/flowStep' },
                },
              },
              required: ['type'],
              additionalProperties: false,
            },
          },
          properties: {
            steps: {
              type: 'array',
              items: { $ref: '#/$defs/flowStep' },
            },
          },
          required: ['steps'],
          additionalProperties: false,
        },
      }],
    }));

    generateSchemas({
      manifestPath,
      outPath: generatedPath,
    });

    const generated = readFileSync(generatedPath, 'utf8');
    assert.match(generated, /type NitroComposeFlowFlowStep = \{/);
    assert.match(
      generated,
      /const NitroComposeFlowFlowStepSchema: z\.ZodType<NitroComposeFlowFlowStep>/,
    );

    writeFileSync(assertionPath, `
      import { z } from 'zod';
      import { nitrosendToolSchemas } from './schemas.generated.js';

      type FlowInput = z.infer<typeof nitrosendToolSchemas.nitro_compose_flow>;
      type FlowStep = FlowInput['steps'][number];

      const nested: FlowStep = {
        type: 'split',
        yes: [{ type: 'email', subject: 'Welcome' }],
      };
      const stepType: 'email' | 'split' = nested.type;
      const childType: 'email' | 'split' | undefined = nested.yes?.[0]?.type;

      // @ts-expect-error unsupported step types must not pass inferred input typing
      const invalid: FlowStep = { type: 'sms' };

      void stepType;
      void childType;
      void invalid;
    `);

    const typecheck = spawnSync(process.execPath, [
      resolve(root, 'node_modules/typescript/bin/tsc'),
      '--noEmit',
      '--strict',
      '--skipLibCheck',
      '--target', 'ES2022',
      '--module', 'Node16',
      '--moduleResolution', 'Node16',
      assertionPath,
    ], {
      cwd: root,
      encoding: 'utf8',
    });
    assert.equal(
      typecheck.status,
      0,
      `${typecheck.stdout}\n${typecheck.stderr}`,
    );

    const generatedModule = await import(pathToFileURL(generatedPath).href);
    const parsed = generatedModule.nitrosendToolSchemas.nitro_compose_flow.parse({
      steps: [{
        type: 'split',
        yes: [{ type: 'email', subject: 'Welcome' }],
      }],
    });
    assert.equal(parsed.steps[0].yes[0].subject, 'Welcome');
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});
