export type User = {
	id: number;
	name: string;
	lastName: string;
	email: string;
	phone: string;
	workCompany: string;
	role: 'client' | 'admin' | 'manager';
};

export type RegisterPayload = Pick<User, 'name' | 'phone' | 'lastName' | 'email'> & {
	password: string;
	confirmPassword: string;
};

export type UpdatePayload = Partial<Pick<User, 'name' | 'lastName' | 'phone' | 'workCompany'>>;

export type AuthPayload = Pick<User, 'email'> & {
	password: string;
};

export type RecoveryPasswordPayload = Pick<User, 'email'>;

export type RecoveryPasswordConfirmPayload = {
	password: string;
	confirmPassword: string;
	token: string;
}

export type UpdatePasswordPayload = {
	currentPassword: string;
	password: string;
	confirmPassword: string;
}
