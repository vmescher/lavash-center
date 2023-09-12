export type User = {
	id: number;
	active: boolean;
	name: string;
	surname: string;
	email: string;
	phone: string;
};

export type RegisterPayload = Pick<User, 'name' | 'phone'>;

export type UpdatePayload = Omit<User, 'id' | 'active'>;

export type AuthPayload = Pick<User, 'phone'>;
