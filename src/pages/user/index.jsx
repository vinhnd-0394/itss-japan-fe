import { useState } from "react";
import {
  HomeOutlined,
  SearchOutlined,
  HeartOutlined,
  ShareAltOutlined,
  BugOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { NavLink, Navigate, Outlet } from "react-router-dom";
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

const logout = () => {
  localStorage.removeItem("userLogin");
  window.location.href("/login");
};

const items = [
  getItem(
    "HOME",
    "1",
    <NavLink to={path.HOME} className=" text-black font-semibold">
      <HomeOutlined />
    </NavLink>
  ),
  getItem(
    "SEARCH",
    "2",
    <NavLink to={path.SEARCH_PAGE} className=" text-black font-semibold">
      <SearchOutlined />
    </NavLink>
  ),
  getItem(
    "FAVORITE",
    "3",
    <NavLink to={path.FAVORITE_PAGE} className=" text-black font-semibold">
      <HeartOutlined />
    </NavLink>
  ),
  getItem(
    "SHARE YOUR RECIPE",
    "4",
    <NavLink to={path.SHARE_RECIPE} className=" text-black font-semibold">
      <ShareAltOutlined />
    </NavLink>
  ),
  getItem(
    "CONTACT US",
    "5",
    <NavLink to={path.REPORT_PAGE} className=" text-black font-semibold">
      <BugOutlined />
    </NavLink>
  ),
  getItem(
    "LOGOUT",
    "6",
    <NavLink className=" text-black font-semibold" onClick={logout}>
      <LogoutOutlined />
    </NavLink>
  ),
];
const DashBoardUser = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  if (!userLogin) {
    return <Navigate to="/login" />;
  }

  if (userLogin.isAdmin) {
    return <Navigate to="/admin" />;
  }

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
        <NavLink to={path.HOME} className="flex justify-center">
          <span className="text-center text-[60px] font-semibold text-white">
            LOGO
          </span>
        </NavLink>
        <Menu theme="dark" defaultSelectedKeys={["1"]} items={items} />
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
export default DashBoardUser;
