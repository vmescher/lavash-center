import {mapActions, mapState} from 'pinia';
import usersStore from '@scripts/store/users';

export const useUsersStore = {
	computed: {
		...mapState(usersStore, {
			isLoggedIn: 'isLoggedIn',
			isAdmin: 'isAdmin',
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
			requestUpdateUserData: 'requestUpdateUserData',
			requestUpdatePassword: 'requestUpdatePassword',
			requestRecoveryPassword: 'requestRecoveryPassword',
			requestResetPassword: 'requestResetPassword',
		}),
	},
};
