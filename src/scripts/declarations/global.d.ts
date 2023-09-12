declare global {
	interface HTMLElement {
		_clickOutside?: (event: MouseEvent) => void;
	}
}
