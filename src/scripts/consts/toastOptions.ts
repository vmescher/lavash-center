import {TYPE, PluginOptions} from 'vue-toastification';

const toastOptions: PluginOptions = {
	timeout: 100000,
	hideProgressBar: true,
	toastClassName: 'toast',
	bodyClassName: 'toast__body',
	closeButtonClassName: 'toast__close',
	toastDefaults: {
		[TYPE.ERROR]: {
			toastClassName: 'toast toast--error',
		},
		[TYPE.SUCCESS]: {
			toastClassName: 'toast toast--success',
		},
		[TYPE.INFO]: {
			toastClassName: 'toast toast--info',
		},
		[TYPE.WARNING]: {
			toastClassName: 'toast toast--warning',
		},
	},
};

export default toastOptions;
