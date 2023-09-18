import {Middleware} from '@scripts/router/middleware/types';
import useUsersStore from '@scripts/store/users';
import {RouteNames} from '@scripts/router/types';

const isLoggedIn: Middleware = ({from, next, abort}) => {
	const usersStore = useUsersStore();

	if (usersStore.isLoggedIn) {
		next();
	} else {
		usersStore
			.requestUserData()
			.then(() => {
				next();
			})
			.catch(() => {
				from.meta.loginFailed = true;
				abort({name: RouteNames.MAIN_PAGE});
			});
	}
};

export default isLoggedIn;
