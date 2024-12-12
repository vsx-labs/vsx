import { Loading } from './Loading';
import { getCurrentEpoch } from './gen/com/stakewiz/api/v1/epoch-EpochService_connectquery';
import { useQuery } from '@connectrpc/connect-query';
import { Epoch } from './gen/com/stakewiz/api/v1/epoch_pb';
import { Progress } from './components/ui/progress';


export const EpochPane = () => {
    const { isLoading, isError, error, data } = useQuery(getCurrentEpoch);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (isError) {
        return (
            <code>{error.code}: {error.message}</code>
        );

    }

    const epoch: Epoch = data!;
    // const epochData: { id: number, epoch: Epoch } = { id: 0, epoch };

    const progress = (Number(epoch.elapsedSeconds) / Number(epoch.durationSeconds)) * 100

    return (
        <>
            <div>Epoch #{epoch.epoch}</div><div className="full-width">
                <Progress value={progress}></Progress>
            </div>
        </>
    );

};
