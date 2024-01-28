import {decimalMask, integerMask, MaskType, phoneMask, priceMask} from '@scripts/consts/masks';

export const getMask = {
	computed: {
		getMask() {
			return (maskName: MaskType) => {
				switch (maskName) {
					case 'phoneMask':
						return phoneMask;
					case 'decimalMask':
						return decimalMask;
					case 'integerMask':
						return integerMask;
					case "priceMask":
						return priceMask;
					default:
						return null;
				}
			};
		},
	},
};
