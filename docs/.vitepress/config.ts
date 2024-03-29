import {sidebars,nav} from "./baseConfig"
import MarkdownIt from "markdown-it"
import mdContainer from 'markdown-it-container'
import path from 'path'
import fs from 'fs'
import { docRoot } from '@wmcomponent/build-utils'
// import tag from '../plugins/tag'
import { highlight } from './utils/height'

const localMd = MarkdownIt()

module.exports = {
    title: 'Hello VitePress',
    description: 'Just playing around.',
    base:"/",
    dest: './dist',
    head: [
        // 添加图标
        // ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    plugins: [
        '@vuepress/active-header-links',   // 页面滚动时自动激活侧边栏链接的插件
        '@vuepress/back-to-top',          // 返回顶部插件
        '@vuepress/medium-zoom',          // 图片预览插件
        '@vuepress/nprogress',        //页面顶部进度条
    ],
    themeConfig: {
        // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
        // lastUpdated: 'Last Updated', // string | boolean
        // 启动页面丝滑滚动
        smoothScroll: true,
        // 导航栏配置
        // nav:[
        //     {text: '我的个人网站', link: 'https://www.cooldream.fun/home' },
        //     {text: '掘金', link: 'https://juejin.cn/user/1855631359481847/posts'},
        //     {text: 'Github', link: 'https://github.com/Jack-Star-T'}
        // ],
        nav,
        // 侧边栏配置
        sidebar:sidebars,
    },
    markdown:{
        config:(md: MarkdownIt) => {
            md.use(mdContainer, 'demo', {
                validate(params) {
                    return params.trim().match(/^demo\s+(.*)$/);
                },
            
                render(tokens, idx) {
                    var m = tokens[idx].info.trim().match(/^demo\s+(.*)$/);
                    if (tokens[idx].nesting === 1) {
                        const description = m && m.length > 1 ? m[1] : ''
                        const sourceFileToken = tokens[idx + 2]
                        
                        let source = ''
                        const sourceFile = sourceFileToken.children?.[0].content ?? ''
                
                        if (sourceFileToken.type === 'inline') {
                            source = fs.readFileSync(
                            path.resolve(docRoot, 'examples', `${sourceFile}.vue`),
                            'utf-8'
                            )
                        }

                        return `<Demo :demos="demos" source="${encodeURIComponent(highlight(source, 'vue')
                        )}" path="${sourceFile}" raw-source="${encodeURIComponent(
                            source
                          )}" description="${encodeURIComponent(localMd.render(description))}">`
                    } else {
                        // closing tag
                        return '</Demo>';
                    }
                }
            })
        }
    }
    
}