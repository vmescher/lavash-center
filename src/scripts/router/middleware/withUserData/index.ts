import {Middleware} from '@scripts/router/middleware/types';
import useUsersStore from '@scripts/store/users';

const withUserData: Middleware = ({next}) => {
	const usersStore = useUsersStore();

	if (usersStore.isLoggedIn) {
		next();
	} else {
		usersStore
			.requestUserData()
			.finally(() => next())
	}
};

export default withUserData;
