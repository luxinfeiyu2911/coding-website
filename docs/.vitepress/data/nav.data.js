import fs from 'fs';
import path from 'path';

// 获取当前文件所在的目录
const postsDir = '_posts';
const postsDirPath = path.resolve(__dirname, '../../', postsDir);
// 忽略目录
const ignoreDirs = ['images', 'image', 'assets', '.vuepress'];

// 获取所有顶级目录的名称和路径
function generateNav(dirPath) {
    const directories = fs.readdirSync(dirPath, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory() && !ignoreDirs.includes(dirent.name))
        .map(dirent => {
            const fullPath = path.join(dirPath, dirent.name);
            const relativePath = path.relative(postsDirPath, fullPath).replace(/\\/g, '/');
            const items = generateNavItems(fullPath); // 获取下级目录
            // 如果 items 为 null，则不添加 items 字段
            const navEntry = {
                text: cleanDirectoryName(dirent.name),
                path: `/${postsDir}/${relativePath}/` // 确保路径以 /_posts/ 开头
            };
            if (items) {
                navEntry.items = items;
            } else {
                navEntry.link = `/${postsDir}/${relativePath}/`;
            }
            return navEntry;
        });

    return directories.length > 0 ? directories : null; // 如果顶级目录为空，返回 null
}

// 获取下级目录
function generateNavItems(dirPath) {
    const items = fs.readdirSync(dirPath, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory() && !ignoreDirs.includes(dirent.name))
        .map(dirent => {
            const fullPath = path.join(dirPath, dirent.name);
            const relativePath = path.relative(postsDirPath, fullPath).replace(/\\/g, '/');
            const link = getFirstMdFile(fullPath); // 获取第一个 .md 文件或 index.md
            // 如果 items 为 null，则不添加 items 字段
            return {
                text: cleanDirectoryName(dirent.name),
                path: `/${postsDir}/${relativePath}/`, // 确保路径以 /_posts/ 开头
                link: link || null
            };
        });

    return items.length > 0 ? items : null; // 如果下级目录为空，返回 null
}

// 获取第一个 .md 文件或 index.md
function getFirstMdFile(dirPath) {
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.md'));
    if (files.length > 0) {
        // 按名称升序排序
        files.sort();
        const firstMdFile = files[0];
        const relativePath = path.relative(postsDirPath, path.join(dirPath, firstMdFile)).replace(/\\/g, '/');
        return `/${postsDir}/${relativePath.replace('.md', '')}`; // 去掉 .md 后缀并确保路径以 /_posts/ 开头
    } else {
        // 如果没有 .md 文件，尝试找到 index.md
        const indexPath = path.join(dirPath, 'index.md');
        // if (fs.existsSync(indexPath)) {
        //     const relativePath = path.relative(postsDirPath, indexPath).replace(/\\/g, '/');
        //     return `/${postsDir}/${relativePath.replace('.md', '')}`; // 去掉 .md 后缀并确保路径以 /_posts/ 开头
        // }
        const relativePath = path.relative(postsDirPath, indexPath).replace(/\\/g, '/');
        return `/${postsDir}/${relativePath.replace('.md', '')}`; // 去掉 .md 后缀并确保路径以 /_posts/ 开头
    }
    return null; // 如果没有 .md 文件或 index.md，返回 null
}

// 清理目录名称，去掉“数字. ”前缀
function cleanDirectoryName(name) {
    const pattern = /^\d+\.\s+/;
    return pattern.test(name) ? name.replace(pattern, '') : name;
}

// 获取所有顶级子目录
export const navs = generateNav(postsDirPath);