/* eslint-disable react-refresh/only-export-components */
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStarryNight from 'rehype-starry-night'
import rehypeImgSize from 'rehype-img-size';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import { unified } from 'unified'
import 'github-markdown-css'
import { fetchGetBlogArticleByID, fetchGetBlogArticles } from "@/app/blog/api";


export async function generateStaticParams() {
    const articles = await fetchGetBlogArticles()

    return articles.map(article => ({
        id: article.id.toString()
    }));
}

export default async function BlogArticlePage({ params }: { params: { id: string } }) {
    const article = await fetchGetBlogArticleByID(params.id);
    const markdownText = await fetch(article.link).then(res => res.text());
    const file = await unified()
        .use(remarkParse, { fragment: true })
        .use(remarkRehype)
        .use(remarkToc)
        .use(remarkGfm)
        .use(rehypeImgSize)
        .use(rehypeStarryNight)
        // .use(rehypeSanitize)
        // .use(rehypeHighlight)
        .use(rehypeStringify).process(markdownText);


    return (

        <div className='markdown-body max-w-999 !mx-auto px-20 :md:px-10' dangerouslySetInnerHTML={{ __html: String(file) }} />

    );
}
