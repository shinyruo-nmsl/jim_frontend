/* eslint-disable react-refresh/only-export-components */
interface BlogArticle {
    id: number
    category: string;
    link: string;
    title: string;
}

export async function generateStaticParams() {
    const articles: BlogArticle[] = await fetch(`${process.env.NEXT_APP_BASE_API}/getBlogArticles`).then(res => res.json());

    return articles.map(article => ({
        params: {
            category: article.category,
            id: article.id.toString()
        }
    }));
}

export default async function BlogArticlePage({ params }: { params: BlogArticle }) {
    const article: BlogArticle = await fetch(`${process.env.NEXT_APP_BASE_API}/getBlogArticleByID/${params.id}`).then(res => res.json());
    const markdown = await fetch(article.link).then(res => res.text());

    return (
        <div>
            <h1>{article.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: markdown }} />
        </div>
    );
}