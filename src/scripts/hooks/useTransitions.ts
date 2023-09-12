import {defineAsyncComponent} from 'vue';

export const useTransitions = {
	components: {
		FadeTransition: defineAsyncComponent(
			() => import('@components/utils/transitions/FadeTransition.vue')
		),
	},
};
