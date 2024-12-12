import { getCurrentEpoch } from './gen/com/stakewiz/api/v1/epoch-EpochService_connectquery';
import { useQuery } from '@connectrpc/connect-query';
import { Epoch, EpochSchema } from './gen/com/stakewiz/api/v1/epoch_pb';
import { Spinner } from './ui/components/spinner';
import { ProgressWithValue } from './ui/components/progress-with-value';
import { toJsonString } from '@bufbuild/protobuf';


export const EpochPane = () => {
    const { isLoading, isError, error, data } = useQuery(getCurrentEpoch);

    if (isLoading) {
        return (
            <Spinner />
        );
    }

    if (isError) {
        return (
            <code>{error.code}: {error.message}</code>
        );

    }

    const epoch: Epoch = data!;
    // const epochData: { id: number, epoch: Epoch } = { id: 0, epoch };

    const progress = Math.round((Number(epoch.elapsedSeconds) / Number(epoch.durationSeconds)) * 100);

    return (
        <div className='text-sm'>
            <div className='p-2 text-lg'>Epoch #{epoch.epoch}</div>
            <div className="p-2">
                <ProgressWithValue value={progress}></ProgressWithValue>
            </div>
            <pre className='m-2 p-2 mt-5 border'>
                <code>
                    {toJsonString(EpochSchema, epoch, {
                        prettySpaces: 2
                    })}
                </code>
            </pre>
        </div>
    );

};
