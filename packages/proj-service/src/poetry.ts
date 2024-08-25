import { useState } from "react";
import { Model } from "proj-type";

export enum URL {
  GET_POETRIES_BY_AUTHOR_AND_KEYWORDS = "/poetry/getPoetriesByAuthorAndKeywords",
}

export interface AuthorAndKeyWordsQuery {
  keyword1: string;
  keyword2: string;
  author?: string;
}

export type AuthorAndKeyWordsPaginationQuery = AuthorAndKeyWordsQuery &
  Model.PaginationQuery;

export type PoetryData = {
  id: number;
  title: string;
  author: string;
  content: string;
};

export type PoetryPagination = Model.Pagination<PoetryData>;

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

  const hasMore = poetryPagination.total > (pageNo + 1) * limit;

  const changeQuery = (key: keyof AuthorAndKeyWordsQuery, value: string) => {
    setQuery({ ...query, [key]: value });
  };

  const search = async () => {
    if (!query.keyword1 && !query.keyword2) {
      throw new Error("请输入关键词");
    }
    setPageNo(0);
    const data = await searchApi({
      pageNo: 0,
      limit,
      ...query,
    });
    setPoetryPagination(data);
    return data;
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
    return data;
  };

  return {
    query,
    changeQuery,
    limit,
    pageNo,
    poetryPagination,
    hasMore,
    search,
    changePage,
  };
}

export function fomatPoetryContent(
  content: string,
  keyword1: string,
  keyword2: string
) {
  const parghs = content.split("。").filter(Boolean);
  return parghs.reduce((acc: string[][], graph) => {
    const chunks = splitPoetryContentByKeyWords(graph, keyword1, keyword2);
    const _gragh = chunks.reduce((total: string[][], chunk) => {
      if (chunk.includes("，")) {
        const strs = chunk.split("，");
        if (total.length) {
          const last = total[total.length - 1];
          last.push(`${strs[0]}，`);
          return [
            ...total,
            ...strs
              .slice(1)
              .map((s, index) =>
                index === strs.length - 2 ? [s] : [`${s}，`]
              ),
          ];
        } else {
          return [
            ...strs.map((s, index) =>
              index === strs.length - 1 ? [s] : [`${s}，`]
            ),
          ];
        }
      } else {
        if (total.length) {
          total[total.length - 1].push(chunk);
          return total;
        } else {
          return [...total, [chunk]];
        }
      }
    }, []);

    if (_gragh.length > 0) {
      return acc.concat([
        ..._gragh.slice(0, _gragh.length - 1),
        [..._gragh[_gragh.length - 1], "。"],
      ]);
    }
    return acc;
  }, []);
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
