import fs from 'fs';
import path from 'path';

// 获取当前文件所在的目录
const postsDir = '_posts';
const postsDirPath = path.resolve(__dirname, '../../', postsDir);
// 忽略目录
const ignoreDirs = ['images', 'image', 'assets', '.vuepress'];

// 生成侧边栏导航菜单
function generateSidebar(dirPath) {
    const sidebar = {};
    const directories = fs.readdirSync(dirPath, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory() && !ignoreDirs.includes(dirent.name))
        .forEach(dirent => {
            const fullPath = path.join(dirPath, dirent.name);
            const subDirectories = fs.readdirSync(fullPath, {withFileTypes: true})
                .filter(subDirentry => subDirentry.isDirectory() && !ignoreDirs.includes(subDirentry.name));

            subDirectories.forEach(subDirentry => {
                const subFullPath = path.join(fullPath, subDirentry.name);
                const mdFiles = fs.readdirSync(subFullPath)
                    .filter(file => file.endsWith('.md'));

                if (mdFiles.length > 1) { // 只有当有多个 .md 文件时才生成侧边栏
                    const relativePath = path.relative(postsDirPath, subFullPath).replace(/\\/g, '/');
                    sidebar[`/${postsDir}/${relativePath}/`] = [
                        {
                            text: subDirentry.name,
                            items: generateSidebarItems(subFullPath)
                        }
                    ];
                }
            });
        });

    return sidebar;
}

// 递归生成下级目录或文件的侧边栏导航菜单
function generateSidebarItems(dirPath) {
    const items = fs.readdirSync(dirPath, {withFileTypes: true})
        .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md'))
        .map(dirent => {
            const fullPath = path.join(dirPath, dirent.name);
            const relativePath = path.relative(postsDirPath, fullPath).replace(/\\/g, '/');
            const link = `/${postsDir}/${relativePath.replace('.md', '')}`;
            return {
                text: path.basename(dirent.name, '.md'),
                link
            };
        });

    return items;
}

// // 生成侧边栏导航菜单
// function generateSidebar(dirPath) {
//     const sidebar = {};
//     const directories = fs.readdirSync(dirPath, {withFileTypes: true})
//         .filter(dirent => dirent.isDirectory() && !ignoreDirs.includes(dirent.name))
//         .forEach(dirent => {
//             const fullPath = path.join(dirPath, dirent.name);
//             const subDirectories = fs.readdirSync(fullPath, {withFileTypes: true})
//                 .filter(subDirentry => subDirentry.isDirectory() && !ignoreDirs.includes(subDirentry.name));
//
//             subDirectories.forEach(subDirentry => {
//                 const subFullPath = path.join(fullPath, subDirentry.name);
//                 const mdFiles = fs.readdirSync(subFullPath)
//                     .filter(file => file.endsWith('.md'));
//
//                 if (mdFiles.length > 1) { // 只有当有多个 .md 文件时才生成侧边栏
//                     const relativePath = path.relative(postsDirPath, subFullPath).replace(/\\/g, '/');
//                     sidebar[`/${postsDir}/${relativePath}/`] = generateSidebarItems(subFullPath);
//                 }
//             });
//         });
//
//     return sidebar;
// }
//
// // 递归生成下级目录或文件的侧边栏导航菜单
// function generateSidebarItems(dirPath) {
//     const items = fs.readdirSync(dirPath, {withFileTypes: true})
//         .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md'))
//         .map(dirent => {
//             const fullPath = path.join(dirPath, dirent.name);
//             const relativePath = path.relative(postsDirPath, fullPath).replace(/\\/g, '/');
//             const link = `/${postsDir}/${relativePath.replace('.md', '')}`;
//             return {
//                 text: path.basename(dirent.name, '.md'),
//                 link
//             };
//         });
//
//     return items;
// }

// 生成顶级导航菜单
export const sidebars = generateSidebar(postsDirPath);