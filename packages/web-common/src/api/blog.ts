import { request } from "@web/util/http";
import { BlogArticle, BlogArticleForm, BlogCategory } from "@web/type/blog";

export function fetchGetBlogCategories() {
  return request<BlogCategory[]>({
    method: "get",
    url: "/blog/getBlogCategories",
  });
}

export async function fetchAddBlogCategory(category: string) {
  await request({
    method: "post",
    url: "/blog/addBlogCategory",
    data: { name: category },
  });
}

export function fetchGetBlogArticles() {
  return request<BlogArticle[]>({
    method: "get",
    url: "/blog/getBlogArticles",
  });
}

export async function fetchAddBlogArticle(article: BlogArticleForm) {
  await request({
    method: "post",
    url: "/blog/addBlogArticle",
    data: article,
  });
}

export async function fetchUpdateBlogArticle(article: BlogArticle) {
  await request({
    method: "post",
    url: "/blog/updateBlogArticle",
    data: article,
  });
}
