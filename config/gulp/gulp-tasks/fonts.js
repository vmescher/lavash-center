import {writeFileSync, appendFileSync} from 'node:fs';
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';
import {searchDirectory} from '../../helpers/index.js';

const otfToTtf = () => {
	// Ищем файлы шрифтов .otf
	return (
		app.gulp
			.src(`${app.paths.assets.fonts}/**/*.otf`, {})
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'FONTS',
						message: 'Error: <%= error.message %>',
					})
				)
			)
			// Конвертируем в .ttf
			.pipe(
				fonter({
					formats: ['woff', 'ttf'],
				})
			)
			// Выгружаем в исходную папку
			.pipe(app.gulp.dest(`${app.paths.assets.fonts}`))
	);
};
const ttfToWoff = () => {
	// Ищем файлы шрифтов .ttf
	return (
		app.gulp
			.src(`${app.paths.assets.fonts}/**/*.ttf`)
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'FONTS',
						message: 'Error: <%= error.message %>',
					})
				)
			)
			// Конвертируем в .woff2
			.pipe(ttf2woff2())
			// Выгружаем в исходную папку
			.pipe(app.gulp.dest(`${app.paths.assets.fonts}`))
	);
};

// Собирает только woff и woff2
const moveFonts = () => {
	return app.gulp
		.src(`${app.paths.assets.fonts}/**/*.{woff,woff2}`)
		.pipe(app.plugins.flatten())
		.pipe(app.gulp.dest(app.paths.public.fonts));
};

const fontsStyle = () => {
	// Создаем файл стилей для шрифтов
	const fontsStyleFile = `${app.paths.assets.fonts}/fonts.sass`;
	writeFileSync(fontsStyleFile, '');

	const fontStyles = {
		italic: 'italic',
	};

	const fontWeights = {
		thin: 100,
		extraLight: 200,
		light: 300,
		normal: 400,
		regular: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
		ultrabold: 800,
		extrabold: 800,
		black: 900,
		heavy: 900,
		extrablack: 950,
	};

	// Проверяем существуют ли файлы шрифтов
	const fontsFiles = searchDirectory(app.paths.public.fonts, false).filter((item) =>
		item.match(/\.(woff2|woff)$/gi)
	);

	fontsFiles.forEach((fontFileName) => {
		if (fontFileName.match(/\.woff$/gi)) return;

		const clearFontName = fontFileName.replaceAll(
			/\.woff2|\.woff|\W|\s|\t|\r|\n|\f|\v|_/gi,
			''
		);

		let fontName = Object.keys(fontStyles)
			.concat(Object.keys(fontWeights))
			.reduce((resultFontName, currentValue) => {
				const re = new RegExp(`${currentValue}`, 'i');
				return resultFontName.replace(re, '');
			}, clearFontName)
			.trim();

		fontName = fontName[0].toUpperCase() + fontName.slice(1);

		let fontWeight = 400;
		let fontStyle = 'normal';

		for (let weightName in fontWeights) {
			let re = new RegExp(`${weightName}`, 'i');
			if (fontFileName.match(re)) {
				fontWeight = fontWeights[weightName];
				break;
			}
		}

		for (let styleName in fontStyles) {
			let re = new RegExp(`${styleName}`, 'i');
			if (fontFileName.match(re)) {
				fontStyle = fontWeights[styleName];
				break;
			}
		}

		const woffName = fontFileName.replace(/woff2/i, 'woff');
		const hasWoff = fontsFiles.includes(woffName);

		appendFileSync(
			fontsStyleFile,
			`@font-face\n\tfont-family: ${fontName}\n\tfont-display: swap\n\tsrc: url("/fonts/${fontFileName}") format("woff2"), ${
				hasWoff ? `url("/fonts/${woffName}") format("woff")` : ''
			}\n\tfont-weight: ${fontWeight}\n\tfont-style: ${fontStyle}\n\r\n`,
			(err) => {
				if (err) {
					throw Error(err);
				}
			}
		);
	});

	return app.gulp.src(app.paths.assetsDir);
};

export {otfToTtf, ttfToWoff, moveFonts, fontsStyle};
