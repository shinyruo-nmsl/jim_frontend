import { BlogArticle } from "@web/type/blog";

export async function fetchGetBlogArticles(): Promise<BlogArticle[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_API}/blog/getBlogArticles`
  ).then((res) => res.json());
}

export async function fetchGetBlogArticleByID(
  id: string
): Promise<BlogArticle> {
  return fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_API}/blog/getBlogArticleByID?id=${id}`
  ).then((res) => res.json());
}
