import {Middleware} from '@scripts/router/middleware/types';
import {RouteNames} from "@scripts/router/types";
import useUsersStore from "@scripts/store/users";

const userOnly: Middleware = ({next, abort}) => {
	const usersStore = useUsersStore();

	if (!usersStore.isAdmin) {
		next();
	} else {
		abort({name: RouteNames.PROFILE_PAGE});
	}
};

export default userOnly;
