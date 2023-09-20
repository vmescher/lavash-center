export const imageLoadHandler = {
	data() {
		return {
			imageLoadError: false,
		};
	},
	methods: {
		imageErrorHandler() {
			this.imageLoadError = true;
		}
	}
};
