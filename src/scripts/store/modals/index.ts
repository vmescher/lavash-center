import {defineStore} from 'pinia';

type ModalsState = {
	modalsRegister: Set<string>;
	openedModals: Set<string>;
	bodyLocked: boolean;
};

const useModalsStore = defineStore('modals', {
	state: (): ModalsState => ({
		modalsRegister: new Set(),
		openedModals: new Set(),
		bodyLocked: false,
	}),
	actions: {
		registerModal(modalName: string) {
			if (this.modalsRegister.has(modalName)) {
				throw new Error(`${modalName} : has already been registered`);
			}

			this.modalsRegister.add(modalName);
		},
		openModal(modalName: string) {
			if (!this.modalsRegister.has(modalName)) {
				throw new Error(`${modalName} : has not been registered`);
			}

			if (this.openedModals.has(modalName)) {
				console.error(`${modalName} : has already been opened`);
				return;
			}

			this.openedModals.add(modalName);

			if (!this.bodyLocked) {
				this._lockBody();
			}
		},
		closeModal(modalName: string) {
			if (!this.modalsRegister.has(modalName)) {
				throw new Error(`${modalName} : has not been registered`);
			}

			if (!this.openedModals.has(modalName)) {
				console.error(`${modalName} : has not been opened`);
				return;
			}

			this.openedModals.delete(modalName);

			if (!this.hasActiveModals && this.bodyLocked) {
				this._unlockBody();
			}
		},
		_lockBody() {
			const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
			document.body.style.setProperty('--scrollbar-compensate', `${scrollbarWidth}px`);
			document.body.classList.add('modal-lock');
			this.bodyLocked = true;
		},
		_unlockBody() {
			document.body.style.removeProperty('--scrollbar-compensate');
			document.body.classList.remove('modal-lock');
			this.bodyLocked = false;
		},
	},
	getters: {
		isModalOpened(): (modalName: string) => boolean {
			return (modalName) => this.openedModals.has(modalName);
		},
		hasActiveModals(): boolean {
			return this.openedModals.size > 0;
		},
	},
});

export default useModalsStore;
