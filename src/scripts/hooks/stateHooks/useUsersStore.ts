import {mapActions, mapState} from 'pinia';
import usersStore from '@scripts/store/users';

export const useUsersStore = {
	computed: {
		...mapState(usersStore, {
			isLoggedIn: 'isLoggedIn',
			getUserData: 'userData',
			getUserId: 'getUserId',
		}),
	},
	methods: {
		...mapActions(usersStore, {
			requestLogIn: 'requestLogIn',
			requestLogOut: 'requestLogOut',
			requestRegister: 'requestRegister',
			requestUserData: 'requestUserData',
		}),
	},
};
