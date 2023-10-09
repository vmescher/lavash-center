export const getFormattedPrice = {
	computed: {
		getFormattedPrice() {
			return (value: number): string => value.toLocaleString('ru-RU', {
				style: 'currency',
				currency: 'RUB',
				minimumFractionDigits: 0,
				maximumFractionDigits: 2,
			})
		}
	},
};
