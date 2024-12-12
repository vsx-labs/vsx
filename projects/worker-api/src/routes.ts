import { Code, ConnectError, HandlerContext, type ConnectRouter } from '@connectrpc/connect';
import { EpochService } from './gen/com/stakewiz/api/v1/epoch_pb';
import { ValidatorService } from './gen/com/stakewiz/api/v1/validators_pb';
import { kStore } from './store-context';
import { fetchEpochHistory, fetchEpochInfo, fetchHistoricalEpochInfo, fetchValidators } from './stakewiz';

function getStore(ctx: HandlerContext): KVNamespace {
	const store = ctx.values.get(kStore);
	if (!store) {
		console.error('kv store not found');
		throw new ConnectError('Internal Error', Code.Internal);
	}
	return store;
}

export default (router: ConnectRouter) => {
	router.service(EpochService, {
		getCurrentEpoch: ({ }, _ctx) => {
			return fetchEpochInfo();
		},
		getHistoricalEpoch: ({ epoch }, _ctx) => {
			return fetchHistoricalEpochInfo(epoch);
		},
		listHistoricalEpochs: async ({ }, _ctx) => {
			const epoch = await fetchEpochHistory();
			return { epoch };
		},
	});
	router.service(ValidatorService, {
		listValidators: async ({ }, _ctx) => {
			const validator = await fetchValidators();
			return { validator };
		},
	});
};
