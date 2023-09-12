import {Directive} from 'vue';
import ResizeController from '@scripts/utils/resizeController';

const sizeObserve: Directive<HTMLElement, string> = {
	mounted: (el, binding) => {
		const doc = document.documentElement;
		const element = el;
		const {value} = binding;

		const callback = () => {
			doc.style.setProperty(`--${value}-height`, `${element.offsetHeight}px`);
		};

		callback();
		ResizeController.add(value, callback);
	},
	unmounted: (_el, binding) => {
		const {value} = binding;
		ResizeController.remove(value);
	},
};

export default sizeObserve;
