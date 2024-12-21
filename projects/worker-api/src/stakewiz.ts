import { Code, ConnectError } from '@connectrpc/connect';
import { Validator, ValidatorSchema } from './gen/com/stakewiz/api/v1/validators_pb';
import { Epoch, EpochSchema, HistoricalEpoch, HistoricalEpochSchema } from './gen/com/stakewiz/api/v1/epoch_pb';
import { fromJson, JsonValue } from "@bufbuild/protobuf";

export async function fetchValidators(): Promise<Validator[]> {
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


export async function fetchValidator(voteIdentity: string): Promise<Validator> {
    try {
        const response = await fetch(`https://api.stakewiz.com/validator/${voteIdentity}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => null); // Try to get JSON error, otherwise null
            const errorMessage = errorData || response.statusText;
            throw new ConnectError(JSON.stringify(errorMessage), Code.Internal, {
                status: String(response.status),
            }, undefined);
        }

        const result: JsonValue = await response.json();
        try {
            const validator = fromJson(ValidatorSchema, result, {
                ignoreUnknownFields: true,
            });
            return validator;
        } catch (e) {
            throw new ConnectError('Invalid Epoch Payload', Code.InvalidArgument, undefined, undefined, e);
        }
    } catch (e) {
        throw new ConnectError('Invalid URL', Code.InvalidArgument, undefined, undefined, e);
    }
}

export async function fetchEpochInfo(): Promise<Epoch> {
    try {
        const response = await fetch('https://api.stakewiz.com/epoch_info');

        if (!response.ok) {
            const errorData = await response.json().catch(() => null); // Try to get JSON error, otherwise null
            const errorMessage = errorData || response.statusText;
            throw new ConnectError(JSON.stringify(errorMessage), Code.Internal, {
                status: String(response.status),
            }, undefined);
        }

        const result: JsonValue = await response.json();
        try {
            const epoch = fromJson(EpochSchema, result, {
                ignoreUnknownFields: true,
            });
            return epoch;
        } catch (e) {
            throw new ConnectError('Invalid Epoch Payload', Code.InvalidArgument, undefined, undefined, e);
        }
    } catch (e) {
        throw new ConnectError('Invalid URL', Code.InvalidArgument, undefined, undefined, e);
    }
}


export async function fetchHistoricalEpochInfo(epoch: number): Promise<HistoricalEpoch> {
    try {
        const response = await fetch(`https://api.stakewiz.com/epoch_history/${epoch}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => null); // Try to get JSON error, otherwise null
            const errorMessage = errorData || response.statusText;
            throw new ConnectError(JSON.stringify(errorMessage), Code.Internal, {
                status: String(response.status),
            }, undefined);
        }

        const result: JsonValue = await response.json();
        try {
            const epoch = fromJson(HistoricalEpochSchema, result, {
                ignoreUnknownFields: true,
            });
            return epoch;
        } catch (e) {
            throw new ConnectError('Invalid Epoch Payload', Code.InvalidArgument, undefined, undefined, e);
        }
    } catch (e) {
        throw new ConnectError('Invalid URL', Code.InvalidArgument, undefined, undefined, e);
    }
}

export async function fetchEpochHistory(): Promise<HistoricalEpoch[]> {
    try {
        const response = await fetch('https://api.stakewiz.com/all_epochs_history');

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
        const epochs: HistoricalEpoch[] = [];
        for (const result of results) {
            try {
                const epoch = fromJson(HistoricalEpochSchema, result, {
                    ignoreUnknownFields: true,
                });
                epochs.push(epoch);
            } catch (e) {
                console.error('Error parsing validator:', e, result);
            }
        }
        return epochs;
    } catch (e) {
        throw new ConnectError('Invalid URL', Code.InvalidArgument, undefined, undefined, e);
    }
}