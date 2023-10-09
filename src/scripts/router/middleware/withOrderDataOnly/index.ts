import {Middleware} from '@scripts/router/middleware/types';
import useUsersStore from '@scripts/store/users';
import useOrdersStore from "@scripts/store/orders";
import {RouteNames} from "@scripts/router/types";

const withOrderDataOnly: Middleware = ({next, to, abort}) => {
	const ordersStore = useOrdersStore();
	const usersStore = useUsersStore();

	if (usersStore.isAdmin) {
		ordersStore.requestManagerOrder(to.params.id).then(() => next()).catch(() => abort({name: RouteNames.PROFILE_PAGE}));
	} else {
		ordersStore.requestOrder(to.params.id).then(() => next()).catch(() => abort({name: RouteNames.PROFILE_PAGE}));
	}
};

export default withOrderDataOnly;
