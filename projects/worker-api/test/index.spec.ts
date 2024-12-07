// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';
import { IncomingRequestCfProperties } from '@cloudflare/workers-types/experimental';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
// const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;


describe('Worker', () => {
    it('responds with Hello World! (unit style)', async () => {
        const request = new Request('https://api.vsx.dev/healthz');
        // Create an empty context to pass to `worker.fetch()`.
        const ctx = createExecutionContext();
        const response = await worker.fetch(request, env, ctx);
        // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
        await waitOnExecutionContext(ctx);
        expect(await response.text()).toMatchInlineSnapshot(`"OK"`);
    });

    it('responds with Hello World! (integration style)', async () => {
        const response = await SELF.fetch('https://api.vsx.dev/healthz');
        expect(await response.text()).toMatchInlineSnapshot(`"OK"`);
    });
});