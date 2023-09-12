interface IResizeTargets {
	[key: string]: () => void;
}

class ResizeController {
	// eslint-disable-next-line no-use-before-define
	private static instance: ResizeController;

	protected targets: IResizeTargets = {};

	protected observer: ResizeObserver | null = null;

	private constructor() {
		this.init();
	}

	public static getInstance(): ResizeController {
		if (!ResizeController.instance) {
			ResizeController.instance = new ResizeController();
		}

		return ResizeController.instance;
	}

	private init() {
		this.observer = new ResizeObserver(() => this.observerCallback());
		this.observer.observe(document.body);
	}

	private observerCallback() {
		Object.values(this.targets).forEach((callback) => callback());
	}

	public add(target: string, callback: () => void) {
		if (this.targets[target]) {
			console.error('Слушатель с таким ключом уже зарегистрирован. Используй removeTarget(key)');
		}

		this.targets[target] = callback;
	}

	public has(target: string) {
		return !!this.targets[target];
	}

	public remove(target: string) {
		if (!this.targets[target]) {
			console.error('Слушателя с таким ключом не существует');
		} else {
			delete this.targets[target];
		}
	}
}

export default ResizeController.getInstance();
