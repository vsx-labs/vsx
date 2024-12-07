import { KVNamespace } from "@cloudflare/workers-types/experimental";

// Ambient type declarations

declare module "cloudflare:test" {
    interface ProvidedEnv {
        NAMESPACE: KVNamespace;
        STORE: KVNamespace;
    }
}
