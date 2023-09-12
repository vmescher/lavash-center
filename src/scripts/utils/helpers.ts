import isBoolean from 'lodash/isBoolean';
import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import isNaN from 'lodash/isNaN';
import isNull from 'lodash/isNull';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import isDate from 'lodash/isDate';
import isEqual from 'lodash/isEqual';

function isFile(value: unknown): value is File {
	return value instanceof File;
}

function isArrayOrObject(value: unknown): value is Record<string, unknown> | unknown[] {
	return isPlainObject(value) || isArray(value);
}

export {
	isArray,
	isArrayOrObject,
	isPlainObject,
	isFunction,
	isEqual,
	isNaN,
	isDate,
	isFile,
	isBoolean,
	isNull,
	isUndefined,
};
