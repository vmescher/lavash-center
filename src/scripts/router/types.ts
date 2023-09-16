export enum RouteNames {
	MAIN_PAGE = 'MainView',
	CONTACTS_PAGE = 'ContactsView',
	ORDER_PAGE = 'OrderView',
	PERSONAL_CABINET_PAGE = 'CabinetView',
	PROFILE_PAGE = 'ProfileView',
	HISTORY_PAGE = 'HistoryView',
	AUTH_PAGE = 'AuthView',
	REGISTER_PAGE = 'RegisterView',
}

export type BaseRoutes = (typeof RouteNames)[keyof typeof RouteNames];

export enum LayoutNames {
	MAIN_LAYOUT = 'MainLayout',
	SIMPLE_LAYOUT = 'SimpleLayout',
}

export type BaseLayouts = (typeof LayoutNames)[keyof typeof LayoutNames];
