
// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Hello World worker', () => {
    it('responds with Hello World! (unit style)', async () => {
        const request = new IncomingRequest('http://example.com');
        // Create an empty context to pass to `worker.fetch()`.
        const ctx = createExecutionContext();
        const response = await worker.fetch(request, env, ctx);
        // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
        await waitOnExecutionContext(ctx);
        expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
    });

    it('responds with Hello World! (integration style)', async () => {
        const response = await SELF.fetch('https://example.com');
        expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
    });
});
// import assert from 'node:assert';
// import { Miniflare } from 'miniflare';
import { ValidatorService } from './gen/com/stakewiz/api/v1/validators_pb';
import { createConnectTransport } from '@connectrpc/connect-node';
import { Client, createClient } from '@connectrpc/connect';

describe('ValidatorService', () => {
    let mf: Miniflare;
    let client: Client<typeof ValidatorService>;

    beforeEach(async () => {
        mf = new Miniflare({
            scriptPath: './dist/index.js',
            modules: true,
            kvNamespaces: ['STORE'],
            compatibilityDate: '2023-10-02', // REQUIRED for using ReadableStream
        });
        const baseUrl = (await mf.ready).toString().slice(0, -1);
        const transport = createConnectTransport({
            baseUrl: baseUrl,
            httpVersion: '1.1',
            useBinaryFormat: true,
        });
        client = createClient(ValidatorService, transport);
    });

    afterEach(() => mf.dispose());

    test('should be defined', async () => {
        assert(client);
        const result = client.listValidators({}, {});
        // assert.ok(result);
    });
});
