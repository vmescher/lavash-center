import {App} from 'vue';

// Store
import {createPinia} from 'pinia';

// Router
// import router from '@scripts/router';

// Plugins
import VueAwesomePaginate from 'vue-awesome-paginate';
import {setupCalendar} from 'v-calendar';

import Toast from 'vue-toastification';

// Directives
import useDirectives from '@scripts/directives';
import toastOptions from '@scripts/consts/toastOptions';

export default function registerPlugins(AppInstance: App) {
	AppInstance.use(createPinia())
		.use(Toast, toastOptions)
		.use(VueAwesomePaginate)
		.use(setupCalendar, {});
	useDirectives(AppInstance);
}
