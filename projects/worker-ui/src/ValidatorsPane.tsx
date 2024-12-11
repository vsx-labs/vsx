import { Box } from '@primer/react';
import { Loading } from './Loading';
import { Validator } from './gen/com/stakewiz/api/v1/validators_pb';
import { listValidators } from './gen/com/stakewiz/api/v1/validators-ValidatorService_connectquery';
import { useQuery } from '@connectrpc/connect-query';

export const ValidatorsPane = () => {
    const { isLoading, isError, error, data } = useQuery(listValidators);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (isError) {
        return (
            <Box>
                <code>{error.code}: {error.message}</code>
            </Box>
        );

    }
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 3,
            }}
        >
            {data!.validator.map(v => <ValidatorListItem key={v.identity} validator={v}></ValidatorListItem>)}
        </Box>
    );

};

interface ValidatorListItemProps {
    validator: Validator
}

export const ValidatorListItem = ({ validator }: ValidatorListItemProps) => {
    return (
        <Box
            sx={{
                p: 3,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'border.default',
            }}
        >
            {validator.name}
        </Box>
    );

};