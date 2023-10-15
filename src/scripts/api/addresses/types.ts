export type Address = {
	id: number;
	address: string | null;
}

export type SaveAddressesPayload = {
	addresses: string[];
}

export type FindAddressesPayload = {
	query: string;
}
