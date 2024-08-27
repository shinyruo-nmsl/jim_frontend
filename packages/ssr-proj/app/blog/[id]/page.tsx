/* eslint-disable react-refresh/only-export-components */
import { fetchGetBlogArticleByID, fetchGetBlogArticles } from "@/app/blog/api";

export async function generateStaticParams() {
    const articles = await fetchGetBlogArticles()

    return articles.map(article => ({
        id: article.id.toString()
    }));
}

export default async function BlogArticlePage({ params }: { params: { id: string } }) {
    const article = await fetchGetBlogArticleByID(params.id);
    const markdown = await fetch(article.link).then(res => res.text());

    return (
        <div>
            <h1>{article.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: markdown }} />
        </div>
    );
}
