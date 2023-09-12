import {Component, createApp, defineAsyncComponent} from 'vue';
import registerPlugins from '@scripts/plugins/app';
import RootComponent from '@components/RootComponent.vue';

import {useBaseStore} from '@scripts/hooks/stateHooks/useBaseStore';
import {useTransitions} from '@scripts/hooks/useTransitions';
import {useModalsStore} from '@scripts/hooks/stateHooks/useModalsStore';
import {useViewportHandler} from '@scripts/hooks/useViewportHandler';

const APP_DATA: Component = {
	mixins: [useBaseStore, useTransitions, useModalsStore, useViewportHandler],
	components: {
		RootComponent,

		// Base components
		BaseLoader: defineAsyncComponent(() => import('@components/utils/ui/BaseLoader.vue')),
		BaseTabs: defineAsyncComponent(() => import('@components/utils/ui/BaseTabs.vue')),
		BasePagination: defineAsyncComponent(() => import('@components/utils/ui/BasePagination.vue')),
		BaseTooltip: defineAsyncComponent(() => import('@components/utils/ui/BaseTooltip.vue')),
		BaseAccordion: defineAsyncComponent(() => import('@components/utils/ui/BaseAccordion.vue')),
		BaseGallery: defineAsyncComponent(() => import('@components/utils/ui/BaseGallery.vue')),

		// Modal components
		BaseModal: defineAsyncComponent(() => import('@components/utils/modals/BaseModal.vue')),

		// Form components
		InputText: defineAsyncComponent(() => import('@components/utils/form/InputText.vue')),
		InputCheckbox: defineAsyncComponent(() => import('@components/utils/form/InputCheckbox.vue')),
		InputRadio: defineAsyncComponent(() => import('@components/utils/form/InputRadio.vue')),
		InputSwitch: defineAsyncComponent(() => import('@components/utils/form/InputSwitch.vue')),
		InputSearch: defineAsyncComponent(() => import('@components/utils/form/InputSearch.vue')),
		InputDate: defineAsyncComponent(() => import('@components/utils/form/InputDate.vue')),
		InputFile: defineAsyncComponent(() => import('@components/utils/form/InputFile.vue')),
		InputRange: defineAsyncComponent(() => import('@components/utils/form/InputRange.vue')),

		// Select components
		ExampleSelect: defineAsyncComponent(() => import('@components/selects/ExampleSelect.vue')),

		// Slider components
		ContentSlider: defineAsyncComponent(() => import('@components/sliders/ContentSlider.vue')),
	},
	data() {
		return {
			firstLoaderShown: false,
			secondLoaderShown: false,
			value: null,
		};
	},
	methods: {
		loaderTestShow(loaderNum: 'firstLoaderShown' | 'secondLoaderShown') {
			this[loaderNum] = true;
			setTimeout(() => {
				this[loaderNum] = false;
			}, 2000);
		},
	},
};

const APP = createApp(APP_DATA);
registerPlugins(APP);

export default APP;
