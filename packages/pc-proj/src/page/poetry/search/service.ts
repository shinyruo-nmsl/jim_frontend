import { Poetry } from "proj-service";
import { WebUtil } from "web-common";

const {
  Http: { request },
} = WebUtil;

export function fetchGetPoetriesByAuthorAndKeyWords(
  query: Poetry.AuthorAndKeyWordsPaginationQuery
) {
  return request<Poetry.PoetryPagination>({
    method: "get",
    url: "/poetry/getPoetriesByAuthorAndKeyWords",
    params: { ...query },
  });
}
