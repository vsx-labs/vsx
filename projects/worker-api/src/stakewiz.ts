import { Code, ConnectError } from '@connectrpc/connect';
import { Validator, ValidatorSchema } from './gen/com/stakewiz/api/v1/validators_pb';
import { fromJson, JsonValue } from "@bufbuild/protobuf";

export async function fetchValidatorsUpstream(): Promise<Validator[]> {
    try {
        const response = await fetch('https://api.stakewiz.com/validators');

        if (!response.ok) {
            const errorData = await response.json().catch(() => null); // Try to get JSON error, otherwise null
            const errorMessage = errorData || response.statusText;
            throw new ConnectError(JSON.stringify(errorMessage), Code.Internal, {
                status: String(response.status),
            }, undefined);
        }

        const results: JsonValue = await response.json();
        if (!Array.isArray(results)) {
            throw new ConnectError('Invalid JSON return type (wanted list)', Code.Internal, {
                status: String(response.status),
            }, undefined);
        }
        const validators: Validator[] = [];
        for (const result of results) {
            try {
                const validator = fromJson(ValidatorSchema, result, {
                    ignoreUnknownFields: true,
                });
                validators.push(validator);
            } catch (e) {
                console.error('Error parsing validator:', e, result);
            }
        }
        return validators;
    } catch (e) {
        throw new ConnectError('Invalid URL', Code.InvalidArgument, undefined, undefined, e);
    }
}
