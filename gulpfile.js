// Импорт основного модуля
import gulp from 'gulp';
// Импорт общих плагинов
import plugins from './config/gulp/gulp-plugins.js';

const paths = {
	assets: {
		fonts: './src/assets/fonts',
		svgicons: `./src/assets/icons/**/*.svg`,
	},
	public: {
		fonts: './src/public/fonts',
		images: './src/public/img',
	},
	assetsDir: './src/assets',
	publicDir: './src/public',
	buildDir: './dist',
};

// Передаем значения в глобальную переменную
global.app = {
	gulp,
	plugins,
	paths,
};

// Импорт задач
import {sprite} from './config/gulp/gulp-tasks/sprite.js';
import {otfToTtf, ttfToWoff, moveFonts, fontsStyle} from './config/gulp/gulp-tasks/fonts.js';

const fonts = gulp.series(otfToTtf, ttfToWoff, moveFonts, fontsStyle);

// Экспорт задач
export {fonts, sprite};
