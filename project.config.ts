import {basename, resolve} from 'path';
import {loadEnv} from 'vite';

const PROJECT_ENV = loadEnv('', process.cwd());
const PROJECT_NAME = PROJECT_ENV.VITE_APP_NAME ?? basename(__dirname);
const PROJECT_TITLE = PROJECT_ENV.VITE_APP_TITLE ?? PROJECT_NAME;

const SOURCE_DIR = resolve(__dirname, 'src');
const OUTPUT_DIR = resolve(__dirname, 'dist');

const BASE_PORT = 8080;

const FTP_OPTIONS = {
	host: 'vh74715.rdock.ru',
	user: 'vh74715',
	password: 'NnCPhC4XwPXb',
	serverPath: `/var/www/vh74715/data/www/vh74715.rdock.ru/local/layout/dist/`,
};

export {SOURCE_DIR, OUTPUT_DIR, BASE_PORT, FTP_OPTIONS, PROJECT_NAME, PROJECT_TITLE};
