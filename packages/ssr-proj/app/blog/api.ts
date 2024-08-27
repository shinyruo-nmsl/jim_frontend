import { BlogArticle } from "@web/type/blog";
import { headers } from "next/headers";

export async function tt() {
  if (typeof window !== "undefined") {
    return navigator;
  }
  return headers();
}

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
