import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import middlewarePipeline from '@scripts/router/middleware/middlewarePipeline';
import {Middleware} from '@scripts/router/middleware/types';
import {RouteNames} from "@scripts/router/types";
import useModalsStore from "@scripts/store/modals";
import isLoggedIn from "@scripts/router/middleware/isLoggedIn";
import withUserData from "@scripts/router/middleware/withUserData";

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: RouteNames.MAIN_PAGE,
		component: () => import('@components/views/MainView.vue'),
		meta: {
			name: 'Каталог | Лаваш-Центр',
			middleware: [withUserData],
		},
	},
	{
		path: '/recovery-password/',
		name: RouteNames.RECOVERY_PASS_PAGE,
		redirect: to => ({ name: RouteNames.MAIN_PAGE, query: { passToken: to.query.token } })
	},
	{
		path: '/register-confirm/',
		name: RouteNames.REGISTER_CONFIRM_PAGE,
		redirect: () => ({ name: RouteNames.MAIN_PAGE })
	},
	{
		path: '/contacts/',
		name: RouteNames.CONTACTS_PAGE,
		component: () => import('@components/views/ContactsView.vue'),
		meta: {
			name: 'Контакты | Лаваш-Центр',
			middleware: [withUserData],
		}
	},
	{
		path: '/order/',
		name: RouteNames.ORDER_PAGE,
		component: () => import('@components/views/OrderView.vue'),
		meta: {
			name: 'Оформление заказа | Лаваш-Центр',
			middleware: [isLoggedIn],
			layout: 'SimpleLayout'
		}
	},
	{
		path: '/personal-cabinet/',
		name: RouteNames.PERSONAL_CABINET_PAGE,
		component: () => import('@components/views/CabinetView.vue'),
		redirect: {name: RouteNames.PROFILE_PAGE},
		meta: {
			name: 'Личный кабинет | Лаваш-Центр',
			middleware: [isLoggedIn],
		},
		children: [
			{
				path: 'profile/',
				name: RouteNames.PROFILE_PAGE,
				component: () => import('@components/personal-cabinet/views/ProfileView.vue'),
				meta: {
					name: 'Личные данные | Лаваш-Центр',
					middleware: [isLoggedIn],
				}
			},
			{
				path: 'history/',
				name: RouteNames.HISTORY_PAGE,
				component: () => import('@components/personal-cabinet/views/HistoryView.vue'),
				meta: {
					name: 'Мои заказы | Лаваш-Центр',
					middleware: [isLoggedIn],
				}
			},
			{
				path: 'orders/',
				name: RouteNames.ORDERS_PAGE,
				component: () => import('@components/personal-cabinet/views/OrdersView.vue'),
				meta: {
					name: 'Заказы | Лаваш-Центр',
					middleware: [isLoggedIn],
				}
			}
		]
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeResolve((to, _, next) => {
	if (to.meta.name) {
		document.title = to.meta.name;
	}
	next();
});

router.afterEach((to, from) => {
	if (from.meta.loginFailed) {
		from.meta.loginFailed = false;
		const modalsStore = useModalsStore();
		modalsStore.openModal('auth-modal')
	}
})

router.beforeEach((to, from, next) => {
	const additionalMiddleware: Array<Middleware> = to.meta.middleware || [];
	const middlewares = [...additionalMiddleware];

	const context = {
		to,
		from,
		next,
		abort: next,
	};

	if (middlewares.length === 0) {
		next();
	} else {
		middlewares[0]({
			...context,
			next: middlewarePipeline(context, middlewares, 1),
		});
	}
});
export default router;
