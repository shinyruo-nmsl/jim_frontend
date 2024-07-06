export type PaginationQuery = {
  limit: number;
  pageNo: number;
};

export interface Pagination<T> {
  data: T[];
  total: number;
}

export type Opiton<T> = {
  label: string;
  value: T;
};
