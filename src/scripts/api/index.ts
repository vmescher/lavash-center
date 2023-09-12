import axios, {AxiosInstance} from 'axios';
import {GLOBAL_OPTIONS} from '@scripts/api/consts';
import {BaseResponse} from '@scripts/api/types';

export const BaseAxios = axios.create({
	...GLOBAL_OPTIONS,
});

/**
 * Базовый класс, содержит общие методы для работы с API, которые можно переопределить в дочерних классах при необходимости (например, для добавления заголовков) или добавить новые методы.
 * @class
 * @abstract
 * @property {string} endpoint Конечная точка API
 * @property {AxiosInstance} http Экземпляр axios
 * @example
 * ``` ts
 * class UsersApi extends BaseAPI {
 * 	 protected endpoint = 'users';
 * 	 create()
 * 	 read()
 * 	 update()
 * 	 delete()
 * }
 * 	```
 */
export default abstract class BaseAPI {
	protected abstract endpoint: string;

	protected http: AxiosInstance = BaseAxios;

	public create?(data: unknown): Promise<BaseResponse<unknown>>;

	public read?(identifier?: string, data?: unknown): Promise<BaseResponse<unknown>>;

	public update?(data: unknown, identifier?: string): Promise<BaseResponse<unknown>>;

	public delete?(identifier: string | number): Promise<BaseResponse<unknown>>;
}
