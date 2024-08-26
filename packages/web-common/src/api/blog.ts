import { request } from "@web/util/http";
import { Blog } from "proj-service";

export function fetchGetBlogCategories() {
  return request<Blog.BlogCategory[]>({
    method: "get",
    url: Blog.URL.GET_BLOG_CATEGORIES,
  });
}

export async function fetchAddBlogCategory(category: Blog.BlogCategory) {
  await request({
    method: "post",
    url: Blog.URL.ADD_BLOG_CATEGORY,
    data: category,
  });
}

export function fetchGetBlogArticles() {
  return request<Blog.BlogArticle[]>({
    method: "get",
    url: Blog.URL.GET_BLOG_ARTICLES,
  });
}

export async function fetchAddBlogArticle(article: Blog.BlogArticleForm) {
  await request({
    method: "post",
    url: Blog.URL.ADD_BLOG_ARTICLE,
    data: article,
  });
}

export async function fetchUpdateBlogArticle(article: Blog.BlogArticle) {
  await request({
    method: "post",
    url: Blog.URL.UPDATE_BLOG_ARTICLE,
    data: article,
  });
}
