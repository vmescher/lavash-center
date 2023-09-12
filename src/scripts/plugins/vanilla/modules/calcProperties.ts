import ResizeController from '@scripts/utils/resizeController';

function calcAppHeight() {
	const doc = document.documentElement;
	doc.style.setProperty('--app-height', `${window.innerHeight}px`);
}

export default function calcAppProperties() {
	ResizeController.add('app', calcAppHeight);
	calcAppHeight();
}
