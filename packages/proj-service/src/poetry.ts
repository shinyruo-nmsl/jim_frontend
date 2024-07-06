import { useState } from "react";
import { Model } from "proj-type";

export interface AuthorAndKeyWordsQuery {
  keyword1: string;
  keyword2: string;
  author?: string;
}

export type AuthorAndKeyWordsPaginationQuery = AuthorAndKeyWordsQuery &
  Model.PaginationQuery;

export type PoetryPagination = Model.Pagination<{
  id: number;
  title: string;
  author: string;
  content: string;
}>;

export function usePoetry(
  searchApi: (
    query: AuthorAndKeyWordsPaginationQuery
  ) => Promise<PoetryPagination>,
  initLimit = 5
) {
  const [query, setQuery] = useState<AuthorAndKeyWordsQuery>({
    keyword1: "",
    keyword2: "",
  });

  const [pageNo, setPageNo] = useState(0);
  const [limit, setLimit] = useState(initLimit);

  const [poetryPagination, setPoetryPagination] = useState<PoetryPagination>({
    total: 0,
    data: [],
  });

  const changeQuery = (key: keyof AuthorAndKeyWordsQuery, value: string) => {
    setQuery({ ...query, [key]: value });
  };

  const search = async () => {
    if (!query.keyword1 && !query.keyword2) {
      throw new Error("请输入关键词");
    }
    setPageNo(0);
    const data = await searchApi({
      pageNo,
      limit,
      ...query,
    });
    setPoetryPagination(data);
  };

  const changePage = async (no: number, size: number) => {
    setPageNo(no);
    setLimit(size);
    const data = await searchApi({
      pageNo: no,
      limit: size,
      ...query,
    });
    setPoetryPagination(data);
  };

  return {
    query,
    changeQuery,
    limit,
    pageNo,
    poetryPagination,
    search,
    changePage,
  };
}

export function splitPoetryContentByKeyWords(
  content: string,
  keyword1: string,
  keyword2: string
) {
  if (!keyword1 && !keyword2) {
    return content.split("");
  }

  let chunks: string[];

  if (!keyword1 || !keyword2) {
    chunks = content.split(keyword1 || keyword2);
  } else {
    chunks = content.split(getPoetryContentPattern(keyword1, keyword2));
  }

  const helper = (content: string, keyword1: string, keyword2: string) => {
    if (!keyword1)
      return {
        chunks: [keyword2],
        len: keyword2.length,
      };

    if (!keyword2)
      return {
        chunks: [keyword1],
        len: keyword1.length,
      };

    let start: string;
    let end: string;
    if (content.startsWith(keyword1)) {
      [start, end] = [keyword1, keyword2];
    } else {
      [end, start] = [keyword1, keyword2];
    }
    const endIndex = content.indexOf(end);
    return {
      chunks: [start, content.slice(start.length, endIndex), end],
      len: endIndex + end.length,
    };
  };

  return chunks.reduce(
    ({ result, index }: { result: string[]; index: number }, cur) => {
      if (index + cur.length === content.length) {
        return { result: [...result, cur], index: index + cur.length };
      }

      const regxRes = helper(
        content.slice(index + cur.length),
        keyword1,
        keyword2
      );

      return {
        result: [...result, cur, ...regxRes.chunks],
        index: index + cur.length + regxRes.len,
      };
    },
    { result: [], index: 0 }
  ).result;
}

const getPoetryContentPattern = (keyword1: string, keyword2: string) => {
  return new RegExp(
    `${keyword1}[^。]*${keyword2}|${keyword2}[^。]*${keyword1}`
  );
};

export const isFitPoetryContentPattern = (
  text: string,
  keyword1: string,
  keyword2: string
) => {
  return getPoetryContentPattern(keyword1, keyword2).test(text);
};
