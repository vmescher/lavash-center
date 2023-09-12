import {readdirSync, statSync} from 'node:fs';
import {join} from 'path';

const searchDirectory = (dir: string, includePath = true, excludeDir = ''): string[] => {
	const files = readdirSync(dir);
	let result: string[] = [];

	files.forEach((file) => {
		const filePath = join(dir, file);
		const fileStat = statSync(filePath);

		if (fileStat.isDirectory() && file !== excludeDir) {
			result = result.concat(searchDirectory(filePath, includePath, excludeDir));
		} else if (fileStat.isFile()) {
			result.push(includePath ? filePath : file);
		}
	});

	return result;
};

const getAllPages = (pagesDir: string): Record<string, string> => {
	const pages = searchDirectory(pagesDir);

	return pages
		.filter((file) => file.match(/\.(html|pug)$/))
		.reduce((acc, page) => {
			const name = page
				.replace(pagesDir, '')
				.replace(/\.(html|pug)$/, '')
				.replace(/^\//, '');
			acc[name] = page;
			return acc;
		}, {});
};

export {getAllPages, searchDirectory};
