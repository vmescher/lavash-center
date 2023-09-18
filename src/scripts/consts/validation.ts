const errorMessages = {
	required: 'Поле обязательно для заполнения',
	email: 'Некорректный email',
	password: (min: number) => `Пароль должен быть не менее ${min} символов`,
	passwordConfirm: 'Пароли не совпадают',
	phone: 'Некорректный номер телефона',
	maxLength: (max: number) => `Максимальное количество символов ${max}`,
	minLength: (min: number) => `Минимальное количество символов ${min}`,
}

export { errorMessages };
