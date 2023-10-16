import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { ViewportNames } from '@scripts/hooks/useViewportHandler/types';
import { VIEWPORT_SIZES } from '@scripts/consts/utils';


export const useViewportHandler = () => {
	const windowWidth = ref<number>(window.innerWidth);

	const handleResize = () => {
		windowWidth.value = window.screen.width;
	};

	const isViewport = computed(() => (viewportName: ViewportNames) => {
		switch (viewportName) {
			case 'mobile':
				return windowWidth.value <= VIEWPORT_SIZES.mobile;
			case 'mobile-xl':
				return (
					windowWidth.value <= VIEWPORT_SIZES['mobile-xl'] &&
					windowWidth.value > VIEWPORT_SIZES.mobile
				);
			case 'tablet':
				return (
					windowWidth.value <= VIEWPORT_SIZES.tablet &&
					windowWidth.value > VIEWPORT_SIZES['mobile-xl']
				);
			case 'tablet-xl':
				return (
					windowWidth.value <= VIEWPORT_SIZES['tablet-xl'] &&
					windowWidth.value > VIEWPORT_SIZES.tablet
				);
			case 'laptop':
				return (
					windowWidth.value <= VIEWPORT_SIZES.laptop &&
					windowWidth.value > VIEWPORT_SIZES['tablet-xl']
				);
			case 'laptop-xl':
				return (
					windowWidth.value <= VIEWPORT_SIZES['laptop-xl'] &&
					windowWidth.value > VIEWPORT_SIZES.laptop
				);
			case 'laptop-xxl':
				return (
					windowWidth.value <= VIEWPORT_SIZES['laptop-xxl'] &&
					windowWidth.value > VIEWPORT_SIZES['laptop-xl']
				);
			case 'container':
				return (
					windowWidth.value <= VIEWPORT_SIZES.container &&
					windowWidth.value > VIEWPORT_SIZES['laptop-xxl']
				);
			case 'pc':
				return windowWidth.value > VIEWPORT_SIZES.container;
			default:
				return false;
		}
	});

	const viewportUntil = computed(() => (viewportName: ViewportNames) => {
		switch (viewportName) {
			case 'mobile':
				return windowWidth.value <= VIEWPORT_SIZES.mobile;
			case 'mobile-xl':
				return windowWidth.value <= VIEWPORT_SIZES['mobile-xl'];
			case 'tablet':
				return windowWidth.value <= VIEWPORT_SIZES.tablet;
			case 'tablet-xl':
				return windowWidth.value <= VIEWPORT_SIZES['tablet-xl'];
			case 'laptop':
				return windowWidth.value <= VIEWPORT_SIZES.laptop;
			case 'laptop-xl':
				return windowWidth.value <= VIEWPORT_SIZES['laptop-xl'];
			case 'laptop-xxl':
				return windowWidth.value <= VIEWPORT_SIZES['laptop-xxl'];
			case 'container':
				return windowWidth.value <= VIEWPORT_SIZES.container;
			case 'pc':
				return false;
			default:
				return false;
		}
	});

	onMounted(() => {
		window.addEventListener('resize', handleResize);
		try {
			window.screen.orientation.addEventListener('change', handleResize);
		} catch (e) {
			console.log('Orientation change is not supported');
		}
	});

	onBeforeUnmount(() => {
		window.removeEventListener('resize', handleResize);
		try {
			window.screen.orientation.removeEventListener('change', handleResize);
		} catch (e) {
			console.log('Orientation change is not supported');
		}
	});

	return {
		isViewport,
		viewportUntil,
	};
};
