import { useState } from "react";

export enum URL {
  GET_BLOG_CATEGORIES = "/blog/getBlogCategories",
  ADD_BLOG_CATEGORY = "/blog/addBlogCategory",
  GET_BLOG_ARTICLES = "/blog/getBlogArticles",
  ADD_BLOG_ARTICLE = "/blog/addBlogArticle",
  UPDATE_BLOG_ARTICLE = "/blog/updateBlogArticle",
}

export interface BlogCategory {
  id: number;
  name: string;
}

export interface BlogArticle {
  id: number;
  category: string;
  link: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export type BlogArticleForm = Omit<
  BlogArticle,
  "id" | "createdAt" | "updatedAt"
>;

export interface BlogAdminApi {
  getCategoryApi: () => Promise<BlogCategory[]>;
  addCategoryApi: (category: BlogCategory) => Promise<void>;
  getArticlesApi: () => Promise<BlogArticle[]>;
  addArticleApi: (article: BlogArticleForm) => Promise<void>;
  updateArticleApi: (article: BlogArticle) => Promise<void>;
}

export function useBlogAdmin(API: BlogAdminApi) {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  const getCategory = async () => {
    const categories = await API.getCategoryApi();
    setCategories(categories);
  };

  const addCategory = async (category: BlogCategory) => {
    await API.addCategoryApi(category);
    getCategory();
  };

  const getArticles = async () => {
    const articles = await API.getArticlesApi();
    setArticles(articles);
  };

  const addArticle = async (article: BlogArticleForm) => {
    await API.addArticleApi(article);
    getArticles();
  };

  const updateArticle = async (article: BlogArticle) => {
    await API.updateArticleApi(article);
    getArticles();
  };

  return {
    categories,
    articles,
    getCategory,
    addCategory,
    getArticles,
    addArticle,
    updateArticle,
  };
}
