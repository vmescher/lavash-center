export type BaseResponse<T> = {
	data: T;
	error: null;
	success: boolean;
};

export type ErrorResponse = {
	code: number;
	message: string;
	success: false;
	time: number;
};

export type Pagination = {
	total: number;
	limit: number;
	offset: number;
}
