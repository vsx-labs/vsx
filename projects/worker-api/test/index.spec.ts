// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import { JsonValue } from "@bufbuild/protobuf";
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

    describe.only('grpc-web endpoints', () => {
        type GrpcWebTestCase = {
            endpoint: string;
            request: JsonValue;
        };
        const testCases: GrpcWebTestCase[] = [
            {
                endpoint: '/com.stakewiz.api.v1.ValidatorService/ListValidators',
                request: {},
            },
            {
                endpoint: '/com.stakewiz.api.v1.EpochService/GetCurrentEpoch',
                request: {},
            },
            {
                endpoint: '/com.stakewiz.api.v1.EpochService/GetHistoricalEpoch',
                request: { epoch: 340 },
            },
            {
                endpoint: '/com.stakewiz.api.v1.EpochService/ListHistoricalEpochs',
                request: {},
            },
        ];
        testCases.forEach(tc => {
            it(`responds OK from ${tc.endpoint} endpoint (integration style)`, async () => {
                const request = new Request(`https://api.vsx.dev${tc.endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tc.request),
                });

                const ctx = createExecutionContext();
                const response = await worker.fetch(request, env, ctx);
                await waitOnExecutionContext(ctx);

                expect(response.status).toBe(200);
            });
        });
    });
});