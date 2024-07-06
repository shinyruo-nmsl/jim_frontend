import { request } from "@/util/http";
import { Poetry } from "proj-service";

export function fetchGetPoetriesByAuthorAndKeyWords(
  query: Poetry.AuthorAndKeyWordsPaginationQuery
) {
  return request<Poetry.PoetryPagination>({
    method: "get",
    url: "/poetry/getPoetriesByAuthorAndKeyWords",
    params: { ...query },
  });
}
