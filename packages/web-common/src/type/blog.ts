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
