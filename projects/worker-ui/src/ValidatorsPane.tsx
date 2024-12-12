import { Validator } from './gen/com/stakewiz/api/v1/validators_pb';
import { listValidators } from './gen/com/stakewiz/api/v1/validators-ValidatorService_connectquery';
import { useQuery } from '@connectrpc/connect-query';
import { Avatar, AvatarImage } from './components/ui/avatar';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Spinner } from './ui/components/spinner';

export const ValidatorsPane = () => {
    const { isLoading, isError, error, data } = useQuery(listValidators);

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
    return (
        <Table>
            <TableCaption>List of validators</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="">#</TableHead>
                    <TableHead className=""></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>IP Country</TableHead>
                    <TableHead className="text-right">Activated Stake</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.validator.map((validator, index) => (
                    <TableRow key={validator.identity}>
                        <TableCell className='text-muted-foreground'>{index}</TableCell>
                        <TableCell className="font-medium">
                            <Avatar>
                                <AvatarImage src={validator.image} alt={validator.name} />
                            </Avatar>
                        </TableCell>
                        <TableCell>{validator.name || validator.identity}</TableCell>
                        <TableCell>{validator.ipCountry}</TableCell>
                        <TableCell>{validator.stakeRatio}</TableCell>
                        <TableCell className="text-right">{validator.activatedStake}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

};

interface ValidatorListItemProps {
    validator: Validator
}

export const ValidatorListItem = ({ validator }: ValidatorListItemProps) => {
    return (
        <div>
            {validator.name}
        </div>
    );
};