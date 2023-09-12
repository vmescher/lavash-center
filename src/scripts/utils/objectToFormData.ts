import {
	isArrayOrObject,
	isBoolean,
	isDate,
	isFile,
	isNull,
	isUndefined,
} from '@scripts/utils/helpers';

function getKey(key: string, parentKey: string): string {
	return parentKey ? `${parentKey}[${key}]` : key;
}

type Param = [string, string | File];
type Params = Array<Param>;

/**
 * Формирует Массив параметров из объекта
 * @param {Object} data
 * @param {String} parentKey
 * @returns {Params}
 */
function getParams(data: Record<string, unknown> | unknown[], parentKey = ''): Params {
	const result: Params = [];

	Object.entries(data).forEach(([key, value]) => {
		if (isArrayOrObject(value)) {
			result.push(...getParams(value, getKey(key, parentKey)));
		} else if (isBoolean(value)) {
			result.push([getKey(key, parentKey), encodeURIComponent(value ? 'Y' : 'N')]);
		} else if (isDate(value)) {
			result.push([getKey(key, parentKey), encodeURIComponent(value.toISOString())]);
		} else if (isFile(value)) {
			result.push([getKey(key, parentKey), value]);
		} else if (!isNull(value) && !isUndefined(value)) {
			result.push([getKey(key, parentKey), encodeURIComponent(value as string)]);
		}
	});

	return result;
}

/**
 * Формирует QueryString из объекта
 * @param {Object} data
 * @returns {String}
 */
export function queryString(data: Record<string, unknown>): string {
	return `?${getParams(data)
		.map((arr) => arr.join('='))
		.join('&')}`;
}

/**
 * Формирует FormData из объекта
 * @param {Object} data
 * @returns {FormData}
 */
export function objectToFormData(data: Record<string, unknown>): FormData {
	const params = getParams(data);
	const fd = new FormData();

	params.forEach(([key, value]) => {
		if (typeof value === 'string') {
			fd.append(`${key}`, decodeURIComponent(value));
		} else {
			fd.append(`${key}`, value);
		}
	});

	return fd;
}
