import { TableProps, Space } from "antd";
import { CharacterAvatar } from "../../../../../component/Avatar";
import { PaginationTableAsync } from "../../../../../component/PaginationTable";
import { Pagination } from "../../../../../global-type/model";
import { UserLoginInfo } from "../../../../../global-type/user";
import { formatUserRole } from "../../../../../service/user";

interface UserTableProps {
  data: Pagination<UserLoginInfo>;
  limit: number;
  pageNo: number;
  onChangeTable: (no: number, size: number) => void;
  onClickEditTag: (index: number) => void;
  onClickDeleteTag: (index: number) => void;
}

function UserTable({
  data,
  limit,
  pageNo,
  onChangeTable,
  onClickEditTag,
  onClickDeleteTag,
}: UserTableProps) {
  const tableColumns: TableProps<UserLoginInfo>["columns"] = [
    {
      title: "用户ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "用户头像",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, { userName, avatar }) => (
        <CharacterAvatar characterName={userName} avatar={avatar} />
      ),
    },
    {
      title: "用户昵称",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      render: (role) => <span>{formatUserRole(role)}</span>,
    },
    {
      title: "操作",
      key: "operate",
      render: (_, __, index) => (
        <Space>
          <a onClick={() => onClickEditTag(index)}>编辑</a>
          <a onClick={() => onClickDeleteTag(index)}>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <PaginationTableAsync
      tableProps={{ columns: tableColumns, rowKey: (row) => row.userId }}
      paginationData={data}
      pageNo={pageNo}
      limit={limit}
      onChangeTable={onChangeTable}
    />
  );
}

export default UserTable;
