import type {CreateAxiosDefaults} from 'axios';

const API_URL = '/api/';

const GLOBAL_OPTIONS: CreateAxiosDefaults = {
	baseURL: API_URL,
	timeout: 10000,
};

export {API_URL, GLOBAL_OPTIONS};
