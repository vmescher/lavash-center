/**
 * Оборачивает на контентных страницах все таблицы и видео в div с классом table-wrap и video-wrap соответственно
 * @returns {void}
 */
export default function initMediaAutoWrapper() {
	const videos = document.querySelectorAll('.standard-block iframe:not([class])');
	const tables = document.querySelectorAll('.standard-block table:not([class])');

	function wrap(element: Element, wrapElement: HTMLElement) {
		const elParent = element.parentNode;
		if (!elParent) return;

		elParent.insertBefore(wrapElement, element);
		wrapElement.appendChild(element);
	}

	[...Array.from(tables), ...Array.from(videos)].forEach((elem) => {
		const wrapper = document.createElement('div');

		if (elem.nodeName === 'TABLE') {
			wrapper.classList.add('table-wrap');
		} else {
			wrapper.classList.add('video-wrap');
		}

		wrap(elem, wrapper);
	});
}
