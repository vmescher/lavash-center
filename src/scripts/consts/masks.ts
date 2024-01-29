import {MaskInputOptions, MaskOptions} from 'maska';

type MaskType = 'phoneMask' | 'decimalMask' | 'integerMask' | 'priceMask';

const priceMask = {
	mask: '0.99',
	tokens: {
		'0': {
			pattern: /\d/,
			multiple: true,
		},
		'9': {
			pattern: /\d/,
			optional: true,
		},
	},
}

const phoneMask: MaskInputOptions = {
	mask: '+# (###) ###-##-##',
	preProcess: (value: string) => {
		if (value.startsWith('9') || value.startsWith('+9')) {
			return value.replace(/^9|^\+\d/, '79');
		}
		return value.replace(/^\d|^\+\d/, '7');
	},
	eager: true,
};


const decimalMask: MaskOptions = {
	mask: '0.9',
	eager: true,
	tokens: {
		'0': {
			pattern: /\d/,
			multiple: true,
		},
		'9': {
			pattern: /\d/,
			optional: true,
			multiple: true,
		},
	},
};

const integerMask: MaskOptions = {
	mask: '0',
	tokens: {
		'0': {
			pattern: /\d/,
			multiple: true,
		},
	},
};

export {phoneMask, decimalMask, integerMask, priceMask};
export type {MaskType};
