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
			name: 'Главная',
			middleware: [],
		},
	},
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
