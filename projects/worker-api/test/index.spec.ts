// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// NOTE: https://api.vsx.dev baseUrl is not interpreted by the test as the
// server is the worker itself, the test would still function if it was
// example.com or any other domain.

describe('Worker', () => {
    describe.only('GET /healthz', () => {
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
    describe('/com.stakewiz.api.v1.ValidatorService/ListValidators', () => {
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
    describe('/com.stakewiz.api.v1.EpochService/GetCurrentEpoch', () => {
        it('responds OK from /com.stakewiz.api.v1.EpochService/GetCurrentEpoch endpoint (integration style)', async () => {
            const request = new Request('https://api.vsx.dev/com.stakewiz.api.v1.EpochService/GetCurrentEpoch', {
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
    describe.only('/com.stakewiz.api.v1.EpochService/GetHistoricalEpoch', () => {
        it('responds OK from /com.stakewiz.api.v1.EpochService/GetHistoricalEpoch endpoint (integration style)', async () => {
            const request = new Request('https://api.vsx.dev/com.stakewiz.api.v1.EpochService/GetHistoricalEpoch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ epoch: 340 }),
            });

            const ctx = createExecutionContext();
            const response = await worker.fetch(request, env, ctx);
            await waitOnExecutionContext(ctx);

            expect(response.status).toBe(200);
        });
    });
    describe('/com.stakewiz.api.v1.EpochService/ListHistoricalEpochs', () => {
        it('responds OK from /com.stakewiz.api.v1.EpochService/ListHistoricalEpochs endpoint (integration style)', async () => {
            const request = new Request('https://api.vsx.dev/com.stakewiz.api.v1.EpochService/ListHistoricalEpochs', {
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