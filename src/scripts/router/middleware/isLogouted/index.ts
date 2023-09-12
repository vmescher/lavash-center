import {Middleware} from '@scripts/router/middleware/types';
import useUsersStore from '@scripts/store/users';
import {RouteNames} from '@scripts/router/types';

const isLogouted: Middleware = ({from, next, abort}) => {
	if (
		from.meta.loginFailed ||
		[RouteNames.REGISTER_PAGE, RouteNames.AUTH_PAGE].includes(from.name as RouteNames)
	) {
		next();
		return;
	}

	const usersStore = useUsersStore();
	if (usersStore.isLoggedIn) {
		abort({name: RouteNames.MAIN_PAGE});
	} else {
		usersStore
			.requestUserData()
			.then(() => {
				abort({name: RouteNames.MAIN_PAGE});
			})
			.catch(() => {
				next();
			});
	}
};

export default isLogouted;
