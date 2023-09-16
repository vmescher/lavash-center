import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import middlewarePipeline from '@scripts/router/middleware/middlewarePipeline';
import {Middleware} from '@scripts/router/middleware/types';
import {RouteNames} from "@scripts/router/types";

// import isLoggedIn from '@scripts/router/middleware/isLoggedIn';
// import isLogouted from '@scripts/router/middleware/isLogouted';
// import { LayoutNames, RouteNames } from '@scripts/router/types';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: RouteNames.MAIN_PAGE,
		component: () => import('@components/views/MainView.vue'),
		meta: {
			name: 'Каталог | Лаваш-Центр',
			middleware: [],
		},
	},
	{
		path: '/contacts/',
		name: RouteNames.CONTACTS_PAGE,
		component: () => import('@components/views/ContactsView.vue'),
		meta: {
			name: 'Контакты | Лаваш-Центр',
			middleware: [],
		}
	},
	{
		path: '/order/',
		name: RouteNames.ORDER_PAGE,
		component: () => import('@components/views/OrderView.vue'),
		meta: {
			name: 'Оформление заказа | Лаваш-Центр',
			middleware: [],
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
			middleware: [],
		},
		children: [
			{
				path: 'profile/',
				name: RouteNames.PROFILE_PAGE,
				component: () => import('@components/personal-cabinet/views/ProfileView.vue'),
				meta: {
					name: 'Личные данные | Лаваш-Центр',
					middleware: [],
				}
			},
			{
				path: 'orders/',
				name: RouteNames.HISTORY_PAGE,
				component: () => import('@components/personal-cabinet/views/HistoryView.vue'),
				meta: {
					name: 'Мои заказы | Лаваш-Центр',
					middleware: [],
				}
			}
		]
	}
	// {
	// 	path: '/auth/',
	// 	name: RouteNames.AUTH_PAGE,
	// 	component: () => import('@/views/AuthView.vue'),
	// 	meta: {
	// 		name: 'Авторизация',
	// 		layout: LayoutNames.AUTH_LAYOUT,
	// 		middleware: [isLogouted],
	// 	},
	// },
	// {
	// 	path: '/register/',
	// 	name: RouteNames.REGISTER_PAGE,
	// 	component: () => import('@/views/RegisterView.vue'),
	// 	meta: {
	// 		name: 'Регистрация',
	// 		layout: LayoutNames.AUTH_LAYOUT,
	// 		middleware: [isLogouted],
	// 	},
	// },
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
