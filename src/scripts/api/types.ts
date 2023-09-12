export type BaseResponse<T> = {
	data: T;
	error: null;
	success: boolean;
};

export type ErrorResponse = {
	data: null;
	error: {
		code: number;
		message: string;
	};
	success: boolean;
};
