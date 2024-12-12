import { Box, ProgressBar } from '@primer/react';
import { Loading } from './Loading';
import { getCurrentEpoch } from './gen/com/stakewiz/api/v1/epoch-EpochService_connectquery';
import { useQuery } from '@connectrpc/connect-query';
import { Epoch } from './gen/com/stakewiz/api/v1/epoch_pb';
import { Blankslate } from '@primer/react/experimental';
import { PackageIcon } from '@primer/octicons-react';

export const EpochPane = () => {
    const { isLoading, isError, error, data } = useQuery(getCurrentEpoch);

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

    const epoch: Epoch = data!;
    // const epochData: { id: number, epoch: Epoch } = { id: 0, epoch };

    const progress = (Number(epoch.elapsedSeconds) / Number(epoch.durationSeconds)) * 100

    return (
        <Box sx={{ border: '0px solid rgba(0,0,0,0.08)' }}>
            <Blankslate>
                <Blankslate.Visual>
                    <PackageIcon size="medium" />
                </Blankslate.Visual>
                <Blankslate.Heading>Epoch #{epoch.epoch}</Blankslate.Heading>
                <Blankslate.Description>
                    <div className="full-width">
                        <ProgressBar animated={true} progress={progress}></ProgressBar>
                    </div>
                </Blankslate.Description>
            </Blankslate>
        </Box>
    );

};
