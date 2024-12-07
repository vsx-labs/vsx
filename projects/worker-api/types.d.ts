import { KVNamespace } from "@cloudflare/workers-types/experimental";

// Ambient type declarations

declare module "cloudflare:test" {
    interface ProvidedEnv {
        NAMESPACE: KVNamespace;
        STORE: KVNamespace;
    }
    // // ...or if you have an existing `Env` type...
    // interface ProvidedEnv extends Env { }
}
