export const getFormattedPrice = {
	computed: {
		getFormattedPrice() {
			return (value: number, minDigits = 0): string => value.toLocaleString('ru-RU', {
				style: 'currency',
				currency: 'RUB',
				minimumFractionDigits: minDigits,
				maximumFractionDigits: 2,
			})
		}
	},
};
