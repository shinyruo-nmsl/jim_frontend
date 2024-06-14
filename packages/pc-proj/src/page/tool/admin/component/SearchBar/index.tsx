import { Button, Form, Input, Select } from "antd";
import { Model } from "proj-type";

import "./index.less";

type SearchType = "userId" | "userName" | "account";

export interface SearchBarQuery {
  type: SearchType;
  value: string;
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
  }
};

const searchTypeOptions: Model.Opiton<SearchType>[] = (
  ["userId", "userName", "account"] as SearchType[]
).map((type) => ({
  label: formatSearchType(type),
  value: type,
}));

function SearchBar({
  query = { type: "userId", value: "" },
  onChange,
  onClickConfirmButton,
}: SearchBarProps) {
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
          <Input
            value={query.value}
            onChange={(e) => onChange({ ...query, value: e.target.value })}
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
