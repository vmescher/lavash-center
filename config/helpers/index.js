import { readdirSync, statSync } from 'node:fs';
import { join } from 'path';
var searchDirectory = function (dir, includePath, excludeDir) {
    if (includePath === void 0) { includePath = true; }
    if (excludeDir === void 0) { excludeDir = ''; }
    var files = readdirSync(dir);
    var result = [];
    files.forEach(function (file) {
        var filePath = join(dir, file);
        var fileStat = statSync(filePath);
        if (fileStat.isDirectory() && file !== excludeDir) {
            result = result.concat(searchDirectory(filePath, includePath, excludeDir));
        }
        else if (fileStat.isFile()) {
            result.push(includePath ? filePath : file);
        }
    });
    return result;
};
var getAllPages = function (pagesDir) {
    var pages = searchDirectory(pagesDir);
    return pages
        .filter(function (file) { return file.match(/\.(html|pug)$/); })
        .reduce(function (acc, page) {
        var name = page
            .replace(pagesDir, '')
            .replace(/\.(html|pug)$/, '')
            .replace(/^\//, '');
        acc[name] = page;
        return acc;
    }, {});
};
export { getAllPages, searchDirectory };
