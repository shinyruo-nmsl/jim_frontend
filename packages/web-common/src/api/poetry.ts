import { Poetry } from "proj-service";
import { request } from "@web/util/http";

export function fetchGetPoetriesByAuthorAndKeyWords(
  query: Poetry.AuthorAndKeyWordsPaginationQuery
) {
  return request<Poetry.PoetryPagination>({
    method: "get",
    url: Poetry.URL.GET_POETRIES_BY_AUTHOR_AND_KEYWORDS,
    params: { ...query },
  });
}
