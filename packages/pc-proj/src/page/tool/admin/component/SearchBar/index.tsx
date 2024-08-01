import { Button, Form, Input, Select } from "antd";
import { User } from "proj-service";

import "./index.less";

export interface SearchBarQuery {
  searchTerm?: string;
  role?: User.Role | "";
  platform?: User.Platform | "";
}

interface SearchBarProps {
  query: SearchBarQuery;
  onChaneQuery: (query: SearchBarQuery) => void;
  onClickConfirmButton: () => void;
}

function SearchBar({
  query = {},
  onChaneQuery,
  onClickConfirmButton,
}: SearchBarProps) {
  const userRoleOptions = [
    { label: "全部", value: "" },
    ...User.UserRoleOptions,
  ];

  const platformOptions = [
    { label: "全部", value: "" },
    ...User.PlatformOptions,
  ];

  return (
    <div className="admin-search-bar">
      <Form layout="inline">
        <Form.Item label="平台">
          <Select
            style={{ width: 200 }}
            value={query.platform}
            options={platformOptions}
            onChange={(value) => {
              onChaneQuery({ ...query, platform: value });
            }}
          />
        </Form.Item>

        <Form.Item label="角色">
          <Select
            style={{ width: 200 }}
            value={query.role}
            options={userRoleOptions}
            onChange={(value) => {
              onChaneQuery({ ...query, role: value });
            }}
          />
        </Form.Item>

        <Form.Item label="用户ID/昵称/账号">
          <Input
            value={query.searchTerm}
            onChange={(e) => {
              onChaneQuery({ ...query, searchTerm: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button onClick={onClickConfirmButton}>确定</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SearchBar;
