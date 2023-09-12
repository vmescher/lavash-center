import {Directive} from 'vue';

interface ClickOutsideHTMLElement extends HTMLElement {
	_clickOutside?: (event: MouseEvent) => void;
}

/**
 * @description
 * Директива для обработки клика вне элемента
 * @example
 * <div v-click-outside="onClickOutside"></div>
 * @param {HTMLElement} el
 * @param {Object} binding
 * @param {Function} binding.value
 */
const clickOutside: Directive<ClickOutsideHTMLElement> = {
	beforeMount: (el, binding) => {
		const element = el;

		const onClick = (event: MouseEvent) => {
			if (!element.contains(event.target as Node) && typeof binding.value === 'function') {
				binding.value(event);
			}
		};

		element._clickOutside = onClick;

		document.addEventListener('click', element._clickOutside, false);
	},
	unmounted: (el) => {
		const element = el;
		if (!element._clickOutside) return;
		document.removeEventListener('click', element._clickOutside, false);
		delete element._clickOutside;
	},
};

export default clickOutside;
