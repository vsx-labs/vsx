// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

describe('Worker', () => {
    describe('GET /healthz', () => {
        it('responds OK from /healthz endpoint (unit style)', async () => {
            const request = new Request('https://api.vsx.dev/healthz');
            // Create an empty context to pass to `worker.fetch()`.
            const ctx = createExecutionContext();
            const response = await worker.fetch(request, env, ctx);
            // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
            await waitOnExecutionContext(ctx);
            expect(await response.text()).toMatchInlineSnapshot(`"OK"`);
        });

        it('responds OK from /healthz endpoint (integration style)', async () => {
            const response = await SELF.fetch('https://api.vsx.dev/healthz');
            expect(await response.text()).toMatchInlineSnapshot(`"OK"`);
        });
    });
    describe.skip('GET /com.stakewiz.api.v1.ValidatorService/ListValidators', () => {
        it('responds OK from /com.stakewiz.api.v1.ValidatorService/ListValidators endpoint (integration style)', async () => {
            const request = new Request('https://api.vsx.dev/com.stakewiz.api.v1.ValidatorService/ListValidators', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({}),
            });

            const ctx = createExecutionContext();
            const response = await worker.fetch(request, env, ctx);
            await waitOnExecutionContext(ctx);

            expect(response.status).toBe(200);
        });
    });
});