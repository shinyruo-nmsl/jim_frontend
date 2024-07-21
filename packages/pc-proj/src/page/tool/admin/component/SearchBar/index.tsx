import { Button, Form, Input, Select } from "antd";
import { Model } from "proj-type";
import { User } from "proj-service";

import "./index.less";

type SearchType = "userId" | "userName" | "account" | "role" | 'platform';

export interface SearchBarQuery {
  type: SearchType;
  value: string | User.Role;
}

interface SearchBarProps {
  query: SearchBarQuery;
  onChange: (query: { type: SearchType; value: string }) => void;
  onClickConfirmButton: () => void;
}

const formatSearchType = (type: SearchType) => {
  switch (type) {
    case "userId":
      return "用户ID";
    case "userName":
      return "用户昵称";
    case "account":
      return "用户账号";
    case "role":
      return "用户角色";
    case "platform":
      return "平台";
  }
};

const searchTypeOptions: Model.Opiton<SearchType>[] = (
  ["userId", "userName", "account", "role", "platform"] as SearchType[]
).map((type) => ({
  label: formatSearchType(type),
  value: type,
}));

function SearchBar({
  query = { type: "userId", value: "" },
  onChange,
  onClickConfirmButton,
}: SearchBarProps) {
  const userRoleOptions = [
    { label: "全部", value: "" },
    ...User.UserRoleOptions,
  ];

  const platformOptions = [
    { label: "全部", value: "" },
    ...User.PlatformOptions
  ];

  return (
    <div className="admin-search-bar">
      <Form layout="inline">
        <Form.Item label="搜索类型">
          <Select
            style={{ width: 200 }}
            value={query.type}
            onChange={(type) => onChange({ type, value: "" })}
          >
            {searchTypeOptions.map(({ label, value }) => (
              <Select.Option key={value} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="搜索值">
          {query.type === "role" ? (
            <Select
              style={{ width: 200 }}
              value={query.value as User.Role}
              onChange={(value) => onChange({ type: "role", value })}
            >
              {userRoleOptions.map(({ label, value }) => (
                <Select.Option key={value} value={value}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          ) : query.type === 'platform' ? (
            <Select
              style={{ width: 200 }}
              value={query.value as User.Platform}
              onChange={(value) => onChange({ type: "platform", value })}
            >
              {platformOptions.map(({ label, value }) => (
                <Select.Option key={value} value={value}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          ) : (
            <Input
              style={{ width: 200 }}
              value={query.value}
              onChange={(e) => onChange({ type: query.type, value: e.target.value })}
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
