import { fetchGetBlogArticlesNoCache } from "./api";
import { BlogArticle } from "@web/type/blog";
import { MobileContent, PCContent } from "./content";

async function BlogHomePage() {
    const articles = await fetchGetBlogArticlesNoCache();

    const groupedArticles = articles.reduce(
        (acc: { category: string; articles: BlogArticle[] }[], article) => {
            const category = article.category;
            if (!acc.some((group) => group.category === category)) {
                acc.push({ category, articles: [article] });
            } else {
                acc
                    .find((group) => group.category === category)
                    ?.articles.push(article);
            }
            return acc;
        },
        []
    );


    return (
        <div className="h-full max-w-999 mx-auto">
            <div className="tb:hidden h-full">
                <MobileContent data={groupedArticles} />
            </div>
            <div className="md:hidden h-full">
                <PCContent data={groupedArticles} />
            </div>
        </div>
    );
}

export default BlogHomePage;
