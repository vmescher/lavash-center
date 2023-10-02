export type Address = {
	id: number;
	address: string;
}

export type SaveAddressesPayload = {
	addresses: string[];
}

export type FindAddressesPayload = {
	query: string;
}
