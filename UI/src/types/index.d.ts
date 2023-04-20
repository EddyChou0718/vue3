export type DataType = {
  id: string,
  username: string,
  locked: number | boolean,
  enable: number | boolean,
};

export type PaginationType = {
  first_result?: number,
  max_results?: number,
  total?: number,
};

export type TableHeaderType = {
  title: string,
  key: string,
  sortable: boolean,
};
