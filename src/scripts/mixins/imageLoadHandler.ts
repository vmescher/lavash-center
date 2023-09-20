import {ComponentOptionsMixin} from "vue";

export const imageLoadHandler : ComponentOptionsMixin = {
	data() {
		return {
			imageLoadError: false as boolean
		};
	},
	methods: {
		imageErrorHandler() {
			this.imageLoadError = true;
		}
	}
};
