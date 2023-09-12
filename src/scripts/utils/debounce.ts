function debounce<T extends (..._args: unknown[]) => void>(callback: T, timeout = 500) {
	let bouncer: ReturnType<typeof setTimeout> | null = null;

	return (...args: Parameters<T>): void => {
		if (bouncer) clearTimeout(bouncer);
		bouncer = setTimeout(() => callback(...args), timeout);
	};
}

export default debounce;
