import {MaskOptions} from 'maska';

type MaskType = 'phoneMask' | 'decimalMask' | 'integerMask';

const phoneMask: MaskOptions = {
	mask: '+7 (###) ###-##-##',
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

export {phoneMask, decimalMask, integerMask};
export type {MaskType};
