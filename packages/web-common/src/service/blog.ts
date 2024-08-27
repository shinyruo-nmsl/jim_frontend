import { useState } from "react";
import { BlogArticle, BlogArticleForm, BlogCategory } from "@web/type/blog";
import * as API from "@web/api/blog";

export function useBlogAdmin() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  const getCategory = async () => {
    const categories = await API.fetchGetBlogCategories();
    setCategories(categories);
  };

  const addCategory = async (category: string) => {
    await API.fetchAddBlogCategory(category);
    getCategory();
  };

  const getArticles = async () => {
    const articles = await API.fetchGetBlogArticles();
    setArticles(articles);
  };

  const addArticle = async (article: BlogArticleForm) => {
    await API.fetchAddBlogArticle(article);
    getArticles();
  };

  const updateArticle = async (article: BlogArticle) => {
    await API.fetchUpdateBlogArticle(article);
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
