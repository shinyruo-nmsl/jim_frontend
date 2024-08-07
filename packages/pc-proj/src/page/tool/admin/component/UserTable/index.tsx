import { TableProps, Space } from "antd";
import { Model } from "proj-type";
import { User } from "proj-service";
import { CharacterAvatar } from "@/component/Avatar";
import { PaginationTableAsync } from "@/component/PaginationTable";

interface UserTableProps {
  data: Model.Pagination<User.UserLoginInfo>;
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
  const tableColumns: TableProps<User.UserLoginInfo>["columns"] = [
    {
      title: "用户ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "用户账号",
      dataIndex: "account",
      key: "account",
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
      title: "平台",
      dataIndex: "platform",
      key: "platform",
      render: (platform) => <span>{User.formatPlatform(platform)}</span>,
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      render: (role) => <span>{User.formatUserRole(role)}</span>,
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
      tableProps={{
        columns: tableColumns,
        rowKey: (row) => row.userId,
        scroll: { y: 500 },
      }}
      paginationData={data}
      pageNo={pageNo}
      limit={limit}
      onChangeTable={onChangeTable}
    />
  );
}

export default UserTable;
