import {ViewportNames} from '@scripts/hooks/useViewportHandler/types';

const IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'avif', 'ico'];

const VIEWPORT_SIZES: Record<ViewportNames, number> = {
	mobile: 320,
	'mobile-xl': 480,
	tablet: 768,
	'tablet-xl': 992,
	laptop: 1024,
	'laptop-xl': 1280,
	'laptop-xxl': 1440,
	container: 1315,
	pc: 1600,
};

export {IMAGE_TYPES, VIEWPORT_SIZES};
