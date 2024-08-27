
import { fetchGetBlogArticles } from './api'
import { BlogArticle } from '@web/type/blog'
import { MobileContent, PCContent } from './content'

async function BlogHomePage() {
    const articles = await fetchGetBlogArticles()

    const groupedArticles = articles.reduce((acc: { category: string, articles: BlogArticle[] }[], article) => {
        const category = article.category
        if (!acc.some((group) => group.category === category)) {
            acc.push({ category, articles: [] })
        } else {
            acc.find((group) => group.category === category)?.articles.push(article)
        }
        return acc

    }, [])



    return (
        <div>
            <h1>Blog</h1>
            <div className='tb:hidden'><MobileContent data={groupedArticles} /></div>
            <div className='md:hidden'> <PCContent data={groupedArticles} /></div>
        </div>
    );
}





export default BlogHomePage;
