import {
    ValidatorService,
    ListValidatorsRequestSchema,
    ListValidatorsResponseSchema,
} from "./gen/com/stakewiz/api/v1/validators_pb";
import { createConnectTransport } from "@connectrpc/connect-web";
import { Client, createClient } from "@connectrpc/connect";
import { GenService } from "@bufbuild/protobuf/codegenv1";

export type ValidatorServiceClient = Client<GenService<{
    listValidators: {
        methodKind: 'unary',
        input: typeof ListValidatorsRequestSchema,
        output: typeof ListValidatorsResponseSchema,
    }
}>>;

export function createValidatorServiceClient(): ValidatorServiceClient {
    return createClient(
        ValidatorService,
        createConnectTransport({
            // baseUrl: "https://api.vsx.dev/",
            baseUrl: "http://localhost:8787/",
        }),
    );
}