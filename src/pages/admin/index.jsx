import { useState } from "react";
import {
  SearchOutlined,
  FundOutlined,
  ShareAltOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import path from "../../utils/path";
const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    "SEARCH",
    "1",
    <NavLink to={path.ADMIN_SEARCH_PAGE} className=" text-black font-semibold">
      <SearchOutlined />
    </NavLink>
  ),
  getItem(
    "VIEW USERS RECIPES",
    "2",
    <NavLink to={path.ADMIN_USERS_RECIPE} className=" text-black font-semibold">
      <ShareAltOutlined />
    </NavLink>
  ),
  getItem(
    "VIEW USER SUGGESTIONS",
    "3",
    <NavLink to={path.ADMIN_SUGGESTION} className=" text-black font-semibold">
      <FundOutlined />
    </NavLink>
  ),
  getItem(
    "ADD NEW RECIPES",
    "4",
    <NavLink to={path.ADMIN_NEW_RECIPE} className=" text-black font-semibold">
      <PlusCircleOutlined />
    </NavLink>
  ),
];
const DashBoardAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <NavLink to={path.ADMIN_SEARCH_PAGE} className="flex justify-center">
          <span className="text-center text-[60px] font-semibold text-white">
            LOGO
          </span>
        </NavLink>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            padding: "5px",
          }}
        >
          Chuối ©2023 Created by ITSOS Team
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DashBoardAdmin;
