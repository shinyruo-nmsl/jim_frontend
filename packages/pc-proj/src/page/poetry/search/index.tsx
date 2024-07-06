import { useCallback } from "react";
import { Input, Button, message } from "antd";
import { PaginationTableAsync } from "@/component/PaginationTable";
import { Poetry } from "proj-service";
import { fetchGetPoetriesByAuthorAndKeyWords } from "./service";

import "./index.less";

function PoetrySearch() {
  const {
    query,
    changeQuery,
    limit,
    pageNo,
    poetryPagination,
    search,
    changePage,
  } = Poetry.usePoetry(fetchGetPoetriesByAuthorAndKeyWords);

  const tableColumns = [
    {
      title: "名字",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      render: useCallback(
        (text: string) => {
          const fragments = Poetry.splitPoetryContentByKeyWords(
            text,
            query.keyword1,
            query.keyword2
          );
          return (
            <div className="poetry-content">
              {fragments.map((frag, index) => (
                <span
                  key={index}
                  className={
                    [query.keyword1, query.keyword2].includes(frag)
                      ? "keyword"
                      : ""
                  }
                >
                  {frag}
                </span>
              ))}
            </div>
          );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [poetryPagination]
      ),
      width: 750,
    },
  ];

  const handleChangeTable = async (no: number, size: number) => {
    changePage(no, size);
  };

  const handleClickSearchButton = async () => {
    try {
      await search();
    } catch (e: any) {
      message.error(e.message);
    }
  };

  return (
    <div className="poetry-search">
      <div className="search">
        <div className="author">
          <span>作者：</span>
          <Input
            placeholder="请输入作者"
            value={query.author}
            maxLength={20}
            onChange={(e) => changeQuery("author", e.target.value)}
          ></Input>
        </div>
        <div className="keyword">
          <span>关键词1：</span>
          <Input
            placeholder="请输入关键词"
            value={query.keyword1}
            maxLength={20}
            onChange={(e) => changeQuery("keyword1", e.target.value)}
          ></Input>
        </div>
        <div className="keyword">
          <span>关键词2：</span>
          <Input
            placeholder="请输入关键词"
            value={query.keyword2}
            maxLength={20}
            onChange={(e) => changeQuery("keyword2", e.target.value)}
          ></Input>
        </div>
        <Button onClick={handleClickSearchButton}>搜索</Button>
      </div>

      <PaginationTableAsync
        tableProps={{
          columns: tableColumns,
          rowKey: (row) => row.id,
          scroll: { y: 500 },
        }}
        paginationData={poetryPagination}
        pageNo={pageNo}
        limit={limit}
        onChangeTable={handleChangeTable}
      />
    </div>
  );
}

export default PoetrySearch;
