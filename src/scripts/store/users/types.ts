import {User} from '@scripts/api/users/types';

export type UsersState = {
	isLoggedIn: boolean;
	userData: User | null;
};
