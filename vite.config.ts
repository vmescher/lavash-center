import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {join, resolve} from 'path';
import {vitePluginDeploy} from './config/plugins/deploy/vite-plugin-deploy';
import eslintPlugin from 'vite-plugin-eslint';

import autoprefixer from 'autoprefixer';
import postcssShort from 'postcss-short';
import sortMediaQueries from 'postcss-sort-media-queries';

import {
	BASE_PORT,
	SOURCE_DIR,
	OUTPUT_DIR,
	FTP_OPTIONS,
} from './project.config';

export default defineConfig(({mode}) => {
	const IS_DEV = mode === 'development';
	const IS_PRODUCTION = mode === 'production';
	const IS_DEPLOY = mode === 'deploy';

	let BASE_URL = '';

	if (IS_PRODUCTION || IS_DEPLOY) {
		BASE_URL = '/local/layout/dist/';
	}

	return {
		base: BASE_URL,
		server: {
			port: BASE_PORT,
		},
		root: SOURCE_DIR,
		envDir: '../',
		build: {
			manifest: IS_DEPLOY || IS_PRODUCTION,
			cssMinify: 'lightningcss',
			outDir: OUTPUT_DIR,
			rollupOptions: {
				input: {
					index: resolve(SOURCE_DIR, 'index.html'),
				},
				output: {
					chunkFileNames: 'scripts/[name]-chunk-[hash].js',
					entryFileNames: 'scripts/index-[hash].js',
					assetFileNames: ({name}) => {
						if (/\.css$/.test(name ?? '')) {
							return 'styles/[name]-[hash][extname]';
						}
						if (/.(woff2|woff)$/.test(name ?? '')) {
							return 'fonts/[name][extname]';
						}
						if (/.(ico|jpg|png|webp|avif|svg)$/.test(name ?? '')) {
							return 'img/[name][extname]';
						}
						if (/.(mp4)$/.test(name ?? '')) {
							return 'videos/[name][extname]';
						}
						return 'assets/[name][extname]';
					},
				},
			},
		},
		css: {
			devSourcemap: true,
			preprocessorOptions: {
				sass: {
					additionalData: `
					@import "@styles/base/nested"\n
					$isDev: ${IS_DEV}\n`,
				},
			},
			postcss: {
				plugins: [autoprefixer(), postcssShort(), ...(IS_DEV ? [] : [sortMediaQueries()])],
			},
		},
		resolve: {
			alias: {
				vue: 'vue/dist/vue.esm-bundler.js',
				'@': SOURCE_DIR,
				'@components': join(SOURCE_DIR, 'components'),
				'@scripts': join(SOURCE_DIR, 'scripts'),
				'@styles': join(SOURCE_DIR, 'styles'),
				'@img': join(SOURCE_DIR, 'assets/img'),
				'@fonts': join(SOURCE_DIR, 'assets/fonts'),
			},
		},
		plugins: [
			vue(),
			eslintPlugin({
				lintOnStart: !IS_DEV,
				include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'],
			}),
			...(IS_DEPLOY
				? [
					vitePluginDeploy({
						outDir: FTP_OPTIONS.serverPath,
						sftp: true,
						connectionOptions: {
							host: FTP_OPTIONS.host,
							username: FTP_OPTIONS.user,
							password: FTP_OPTIONS.password,
						},
					}),
				]
				: []),
		],
	};
});
