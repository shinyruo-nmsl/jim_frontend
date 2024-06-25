import { Table, TableProps, Pagination as PaginationComp } from "antd";
import { useEffect, useState } from "react";
import { Model } from "proj-type";

import "./index.less";

interface AsyncProps<T> {
  tableProps?: TableProps<T>;
  paginationData: Model.Pagination<T>;
  pageNo: number;
  limit: number;
  onChangeTable: (no: number, size: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
function PaginationTableAsync<T extends Record<any, any>>(
  props: AsyncProps<T>
) {
  const {
    tableProps = {},
    paginationData,
    pageNo,
    limit,
    onChangeTable,
  } = props;

  const dataSource = paginationData.data;
  const total = paginationData.total;

  useEffect(() => {
    if (dataSource.length < 1 && pageNo > 0) {
      onChangeTable(pageNo - 1, limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);

  return (
    <div className="pagination-table">
      <Table {...tableProps} dataSource={dataSource} pagination={false}></Table>
      <PaginationComp
        current={pageNo + 1}
        pageSize={limit}
        total={total}
        onChange={(no, size) => onChangeTable(no - 1, size)}
      ></PaginationComp>
    </div>
  );
}

interface SyncProps<T> {
  tableProps?: TableProps<T>;
  data: T[];
  onChangeTable: (no: number, size: number) => void;
}

function PaginationTableSync<T extends Record<any, any>>(props: SyncProps<T>) {
  const { tableProps = {}, data, onChangeTable } = props;

  const [pageNo, setPageNo] = useState(0);
  const [limit, setLimit] = useState(20);

  const dataSource = data.slice(pageNo * limit, limit);
  const total = data.length;

  const handleTableChange = (no: number, size: number) => {
    if (size !== limit) {
      setPageNo(0);
    } else {
      setPageNo(no);
    }
    setLimit(size);
    onChangeTable(no, size);
  };

  useEffect(() => {
    setPageNo(0);
  }, [data]);

  return (
    <div className="pagination-table">
      <Table {...tableProps} dataSource={dataSource} pagination={false}></Table>
      <PaginationComp
        current={pageNo + 1}
        pageSize={limit}
        total={total}
        onChange={handleTableChange}
      ></PaginationComp>
    </div>
  );
}

export { PaginationTableAsync, PaginationTableSync };
