import { fetchGetBlogArticles } from "./api";
import { BlogArticle } from "@web/type/blog";
import { MobileContent, PCContent } from "./content";

async function BlogHomePage() {
  const articles = await fetchGetBlogArticles();

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

  console.log(groupedArticles);

  return (
    <div>
      <div className="tb:hidden">
        <MobileContent data={groupedArticles} />
      </div>
      <div className="md:hidden">
        <PCContent data={groupedArticles} />
      </div>
    </div>
  );
}

export default BlogHomePage;
