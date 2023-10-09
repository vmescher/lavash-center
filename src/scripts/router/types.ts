export enum RouteNames {
	MAIN_PAGE = 'MainView',
	RECOVERY_PASS_PAGE = 'RecoveryPassView',
	REGISTER_CONFIRM_PAGE = 'RegisterConfirmView',
	CONTACTS_PAGE = 'ContactsView',
	ORDER_PAGE = 'OrderView',
	PERSONAL_CABINET_PAGE = 'CabinetView',
	PROFILE_PAGE = 'ProfileView',
	HISTORY_PAGE = 'HistoryView',
	ORDERS_PAGE = 'OrdersView',
	ORDER_EDIT_PAGE = 'OrderEditView',
	ORDER_DETAIL_PAGE = 'OrderDetailView',
}

export type BaseRoutes = (typeof RouteNames)[keyof typeof RouteNames];

export enum LayoutNames {
	MAIN_LAYOUT = 'MainLayout',
	SIMPLE_LAYOUT = 'SimpleLayout',
}

export type BaseLayouts = 'MainLayout' | 'SimpleLayout';
