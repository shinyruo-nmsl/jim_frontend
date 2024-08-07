import { Menu as _Menu, MenuProps as _MenuProps } from "antd";
import { WebType } from "web-common";

type SubRoute = WebType.Router.SubRoute;

interface MenuProps {
  keys: string[];
  menuItems?: SubRoute[];
  onClickMenu: _MenuProps["onClick"];
}

export default function Menu({ keys, menuItems, onClickMenu }: MenuProps) {
  return (
    <_Menu
      defaultOpenKeys={keys}
      selectedKeys={keys}
      mode="inline"
      items={menuItems}
      onClick={onClickMenu}
    />
  );
}
