import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../calls/users";
import { useNavigate } from "react-router-dom";
import { message, Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { setUser } from "../redux/userSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  const navItems = [
    {
      key: "home",
      label: "Home",
      icon: <HomeOutlined />,
    },
    {
      key: "profile",
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          key: "myProfile",
          label: (
            <span
              onClick={() => {
                setSelectedKeys(["myProfile"]);
                if (user.role === "admin") {
                  navigate("/profile");
                } else if (user.role === "partner") {
                  navigate("/profile");
                } else {
                  navigate("/profile");
                }
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          key: "logout",
          label: (
            <Link
              to="/login"
              onClick={() => {
                setSelectedKeys(["logout"]);
                dispatch(setUser, null)
                localStorage.removeItem("token");
              }}
            >
              Log Out
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await GetCurrentUser();
      dispatch(setUser(response.data));
      dispatch(hideLoading());
    } catch (error) {
      dispatch(setUser(null));
      message.error(error.message);
    }
  };

  return (
    user && (
      <>
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My ShowDown
            </h3>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={selectedKeys}
              onSelect={({ key }) => {
                if(key === 'home') {
                  if (user.role === "admin") {
                    navigate("/admin");
                  } else if (user.role === "partner") {
                    navigate("/partner");
                  } else {
                    navigate("/");
                  }
                }
                console.log(key)
                setSelectedKeys([key])
              }}
            >
              {navItems.map((item) =>
                item.children ? (
                  <Menu.SubMenu
                    key={item.key}
                    icon={item.icon}
                    title={item.label}
                  >
                    {item.children.map((child) => (
                      <Menu.Item key={child.key} icon={child.icon}>
                        {child.label}
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item key={item.key} icon={item.icon}>
                    {item.label}
                  </Menu.Item>
                )
              )}
            </Menu>
          </Header>
          <div onClick={()=> {setSelectedKeys([''])}} style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </div>
        </Layout>
      </>
    )
  );
}

export default ProtectedRoute;
