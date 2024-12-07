import { Code, ConnectError, HandlerContext, type ConnectRouter } from '@connectrpc/connect';
import { ValidatorService } from './gen/com/stakewiz/api/v1/validators_pb';
import { kStore } from './store-context';
import { fetchValidatorsUpstream } from './stakewiz';

function getStore(ctx: HandlerContext): KVNamespace {
	const store = ctx.values.get(kStore);
	if (!store) {
		console.error('kv store not found');
		throw new ConnectError('Internal Error', Code.Internal);
	}
	return store;
}

export default (router: ConnectRouter) => {
	router.service(ValidatorService, {
		listValidators: async ({ }, _ctx) => {
			const validator = await fetchValidatorsUpstream();
			return { validator };
		},
	});
};
