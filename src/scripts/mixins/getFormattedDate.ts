export const getFormattedDate = {
	computed: {
		getFormattedDate() {
			return (date: string, dateOnly = true): string => {
				const dateObj = new Date(date);
				return dateObj.toLocaleDateString('ru-RU', {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
					hour: dateOnly ? undefined : 'numeric',
					minute: dateOnly ? undefined : 'numeric',
				});
			}
		}
	},
};
