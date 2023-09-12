import {Middleware} from '@scripts/router/middleware/types';
import {BaseLayouts} from '@scripts/router/types';

export {};

import 'vue-router';

declare module 'vue-router' {
	interface RouteMeta {
		name: string;
		layout?: BaseLayouts;
		middleware?: Array<Middleware>;
	}
}
