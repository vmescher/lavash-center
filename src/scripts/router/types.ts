export enum RouteNames {
	MAIN_PAGE = 'MainView',
	PERSONAL_CABINET_PAGE = 'CabinetView',
	PROFILE_PAGE = 'ProfileView',
	HISTORY_PAGE = 'HistoryView',
	AUTH_PAGE = 'AuthView',
	REGISTER_PAGE = 'RegisterView',
}

export enum LayoutNames {
	MAIN_LAYOUT = 'MainLayout',
}

export type BaseLayouts = (typeof LayoutNames)[keyof typeof LayoutNames];
