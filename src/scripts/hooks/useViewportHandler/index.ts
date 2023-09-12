import {ComponentOptionsMixin} from 'vue';
import {ViewportNames} from '@scripts/hooks/useViewportHandler/types';
import {VIEWPORT_SIZES} from '@scripts/consts/utils';

export const useViewportHandler: ComponentOptionsMixin = {
	data() {
		return {
			windowWidth: window.innerWidth,
		};
	},
	mounted() {
		window.addEventListener('resize', this.handleResize);
		try {
			window.screen.orientation.addEventListener('change', this.handleResize);
		} catch (e) {
			console.log('Orientation change is not supported');
		}
	},
	beforeUnmount() {
		window.removeEventListener('resize', this.handleResize);
		try {
			window.screen.orientation.removeEventListener('change', this.handleResize);
		} catch (e) {
			console.log('Orientation change is not supported');
		}
	},
	computed: {
		isViewport() {
			return (viewportName: ViewportNames) => {
				switch (viewportName) {
					case 'mobile':
						return this.windowWidth <= VIEWPORT_SIZES.mobile;
					case 'mobile-xl':
						return (
							this.windowWidth <= VIEWPORT_SIZES['mobile-xl'] &&
							this.windowWidth > VIEWPORT_SIZES.mobile
						);
					case 'tablet':
						return (
							this.windowWidth <= VIEWPORT_SIZES.tablet &&
							this.windowWidth > VIEWPORT_SIZES['mobile-xl']
						);
					case 'tablet-xl':
						return (
							this.windowWidth <= VIEWPORT_SIZES['tablet-xl'] &&
							this.windowWidth > VIEWPORT_SIZES.tablet
						);
					case 'laptop':
						return (
							this.windowWidth <= VIEWPORT_SIZES.laptop &&
							this.windowWidth > VIEWPORT_SIZES['tablet-xl']
						);
					case 'laptop-xl':
						return (
							this.windowWidth <= VIEWPORT_SIZES['laptop-xl'] &&
							this.windowWidth > VIEWPORT_SIZES.laptop
						);
					case 'laptop-xxl':
						return (
							this.windowWidth <= VIEWPORT_SIZES['laptop-xxl'] &&
							this.windowWidth > VIEWPORT_SIZES['laptop-xl']
						);
					case 'container':
						return (
							this.windowWidth <= VIEWPORT_SIZES.container &&
							this.windowWidth > VIEWPORT_SIZES['laptop-xxl']
						);
					case 'pc':
						return this.windowWidth > VIEWPORT_SIZES.container;
					default:
						return false;
				}
			};
		},
		viewportUntil() {
			return (viewportName: ViewportNames) => {
				switch (viewportName) {
					case 'mobile':
						return this.windowWidth <= VIEWPORT_SIZES.mobile;
					case 'mobile-xl':
						return this.windowWidth <= VIEWPORT_SIZES['mobile-xl'];
					case 'tablet':
						return this.windowWidth <= VIEWPORT_SIZES.tablet;
					case 'tablet-xl':
						return this.windowWidth <= VIEWPORT_SIZES['tablet-xl'];
					case 'laptop':
						return this.windowWidth <= VIEWPORT_SIZES.laptop;
					case 'laptop-xl':
						return this.windowWidth <= VIEWPORT_SIZES['laptop-xl'];
					case 'laptop-xxl':
						return this.windowWidth <= VIEWPORT_SIZES['laptop-xxl'];
					case 'container':
						return this.windowWidth <= VIEWPORT_SIZES.container;
					case 'pc':
						return false;
					default:
						return false;
				}
			};
		},
	},
	methods: {
		handleResize() {
			this.windowWidth = window.screen.width;
		},
	},
};
