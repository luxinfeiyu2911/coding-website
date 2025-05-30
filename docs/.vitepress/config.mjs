import {defineConfig} from 'vitepress'
import {groupIconMdPlugin, groupIconVitePlugin} from 'vitepress-plugin-group-icons'

import {navs} from './data/nav.data.js'
import {sidebars} from './data/sidebar.data.js'

const baseURL = '/coding-website/';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: baseURL,
    // outDir: '../dist',
    title: `鹿心肺语的知识库`,
    description: `Coding one more time`,
    // sitemap: {
    //     hostname: 'https://example.com'
    // },
    head: [
        ['link', {rel: 'icon', href: '/assets/image/logo.png'}],
    ],

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        // siteTitle: "鹿心肺语の知识库",
        logo: '/assets/image/logo.png',
        outline: {
            level: [2, 6],
            label: '文章目录'
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        lastUpdated: {
            text: '最后更新时间'
        },
        search: {
            provider: 'local'
        },

        nav: [...navs],

        sidebar: sidebars,

        socialLinks: [
            {icon: 'juejin', link: 'https://juejin.cn/user/3030678257798120'},
            {icon: 'github', link: 'https://github.com/luxinfeiyu2911'}
        ],


        footer: {
            message: ``,
            copyright: `版权所有 © 2023年 ~ ` + new Date().getFullYear() + `年 <a style="text-decoration: none;" href="` + baseURL + `" target="_self">叩叮壹刻 · 鹿心肺语</a>. 保留所有权利。`,
        },
    },

    markdown: {
        lineNumbers: true,
        math: true,
        config(md) {
            md.use(groupIconMdPlugin)
        },
    },

    vite: {
        plugins: [
            groupIconVitePlugin()
        ],
    }

})

// <!--                <span style="display: inline-flex;align-items: center;justify-content: center;gap: 0 4px;">-->
// <!--                    <svg t="1737945854626" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="35208" width="18" height="18"><path d="M778.24 163.84c-76.8-40.96-165.888-61.44-269.312-61.44s-192.512 20.48-269.312 61.44h-133.12l23.552 337.92c8.192 113.664 67.584 217.088 162.816 280.576l215.04 144.384 215.04-144.384c96.256-63.488 155.648-166.912 163.84-280.576l23.552-337.92H778.24z m47.104 333.824c-7.168 94.208-56.32 181.248-135.168 233.472l-181.248 120.832L327.68 731.136c-78.848-53.248-129.024-139.264-135.168-233.472L173.056 225.28h136.192v-26.624c58.368-23.552 124.928-34.816 199.68-34.816s141.312 12.288 199.68 34.816V225.28H844.8l-19.456 272.384z" fill="#0649D0" p-id="35209"></path><path d="M685.056 328.704v-46.08H455.68c2.048-4.096 6.144-9.216 11.264-15.36 5.12-7.168 9.216-12.288 11.264-15.36L419.84 240.64c-31.744 46.08-75.776 87.04-133.12 123.904 4.096 4.096 10.24 11.264 18.432 21.504l17.408 17.408c23.552-15.36 45.056-31.744 63.488-50.176 26.624 25.6 49.152 43.008 67.584 51.2-46.08 15.36-104.448 27.648-175.104 35.84 2.048 5.12 6.144 13.312 9.216 24.576 4.096 11.264 6.144 19.456 7.168 24.576l39.936-7.168v218.112H389.12V680.96h238.592v19.456h54.272V481.28H348.16c60.416-12.288 114.688-27.648 163.84-46.08 49.152 19.456 118.784 34.816 210.944 46.08 5.12-17.408 10.24-34.816 17.408-51.2-62.464-4.096-116.736-12.288-161.792-24.576 38.912-20.48 74.752-46.08 106.496-76.8z m-150.528 194.56h94.208v41.984h-94.208v-41.984z m0 78.848h94.208v41.984h-94.208v-41.984z m-144.384-78.848h94.208v41.984H390.144v-41.984z m0 78.848h94.208v41.984H390.144v-41.984zM424.96 326.656h182.272c-26.624 22.528-57.344 41.984-94.208 57.344-31.744-15.36-61.44-34.816-88.064-57.344z" fill="#0649D0" p-id="35210"></path></svg>-->
// <!--                    <a style="text-decoration: none;" href="https://beian.miit.gov.cn" target="_blank">陕ICP备2024021689号-1</a>-->
// <!--                </span>-->
// <!--                    <div style="display: flex;align-items: center;justify-content: center;gap: 0 4px;">-->
// <!--                        <img src="/assets/image/gongan.png" alt="gongan" width="18" height="18">-->
// <!--                        <a style="text-decoration: none;" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=12011202000677" target="_blank">津公网安备12011202000677号</a>-->
// <!--                    </div>-->