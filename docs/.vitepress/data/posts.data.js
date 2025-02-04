import {createContentLoader} from 'vitepress'

const data = []

export {data}

export default createContentLoader('_posts/**/*.md', {
    excerpt: true,
    transform(raw) {
        return raw
            .map(({url, frontmatter, excerpt}) => ({
                title: frontmatter.title,
                url,
                excerpt,
                date: formatDate(frontmatter.date)
            }))
            .sort((a, b) => b.date.time - a.date.time)
    }
})

// export default createContentLoader('_posts/**/*.md',)

function formatDate(raw) {
    const date = new Date(raw)
    date.setUTCHours(12)
    return {
        time: +date,
        string: date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }
}