import { useState, useEffect } from "react";
import { paths } from "../../../../routing/paths";
import { Button, Dropdown, Layout, Typography } from "antd";
import { Menu } from "../../../molecules/Menu/Menu";
import "./Navbar.less";
import { Text } from "../../../atoms/Text/Text";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { checkPermission } from "../../../../helper/global";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

export const Navbar = ({ onLogout, showMenu = true }) => {
  const { getRole, getName } = useAuthToken();
  const navigate = useNavigate();
  //eslint-disable-next-line
  const [menuItems, setMenuItems] = useState([
    {
      key: "submenu_document",
      title: "DOKUMEN",
      url: paths.DASHBOARD,
      permission: ["Super Admin"],
      children: [
        {
          key: "performance_indicator",
          title: "INDIKATOR KINERJA",
          url: paths.PERFORMANCE_INDICATOR,
          permission: ["Super Admin", "Admin", "User"],
        },
        {
          key: "quality_indicator",
          title: "INDIKATOR MUTU",
          url: paths.QUALITY_INDICATOR,
          permission: ["Super Admin", "Admin", "User"],
        },
        {
          key: "operational_standard",
          title: "STANDAR OPERASIONAL (SOP)",
          url: paths.OPERATIONAL_STANDARD,
          permission: ["Super Admin", "Admin"],
        },
        {
          key: "satisfaction-service",
          title: "KEPUASAN LAYANAN",
          url: paths.SATISFACTION_SERVICE,
          permission: ["Super Admin", "Admin", "User"],
        },
        {
          key: "approval_document",
          title: "DOKUMEN APPROVAL",
          url: paths.APPROVAL_DOCUMENT,
          permission: ["Super Admin", "Admin"],
        },
      ],
    },
    {
      key: "calender",
      title: "KALENDER",
      url: paths.CALENDER,
      permission: ["Super Admin", "Admin", "User"],
    },
    {
      key: "lemarimutu",
      title: "LEMARI MUTU",
      url: paths.QUALITY_CUPBOARD,
      permission: ["Super Admin", "Admin", "User"],
    },
  ]);

  // for the key, use "_" for submenu
  // e.g submenu_sponsor

  const userMenuItem = [
    {
      key: "username",
      title: () => getName(),
      url: "#",
      content: (
        <Typography
          style={{ ":hover": "unset", ":active": "unset", ":focus": "unset" }}
        >
          {getName()}
        </Typography>
      ),
    },
    {
      key: "logout",
      title: "Logout",
      url: paths.LOGIN,
      content: (
        <Button onClick={onLogout} type="link">
          Logout
        </Button>
      ),
    },
  ];

  const masterDataItem = [
    {
      key: "Pengguna",
      title: "Pengguna",
      url: paths.USERS,
      permission: ["Super Admin", "Admin"],
    },
    {
      key: "Unit/Program",
      title: "Unit/Program",
      url: paths.INDICATOR_PROGRAM,
      permission: ["Super Admin"],
    },
    {
      key: "Layanan-Kesehatan",
      title: "Fasilitas Kesehatan",
      url: paths.HEALTH_SERVICE,
      permission: ["Super Admin", "Admin"],
    },
    {
      key: "tipe-dok",
      title: "Tipe Dokumen",
      url: paths.DOCUMENT_TYPE,
      permission: ["Super Admin"],
    },
  ];

  const userMenu = <Menu menuItems={userMenuItem} />;
  const masterDataMenu = (
    <Menu
      menuItems={masterDataItem.filter((x) =>
        checkPermission(x.permission, getRole())
      )}
    />
  );

  useEffect(() => {
    let menus = [];
    menuItems.forEach((x) => {
      if (checkPermission(x.permission, getRole())) {
        let permis = { ...x };
        if (x.children) {
          permis.children = x.children.filter((c) =>
            checkPermission(c.permission, getRole())
          );
        }
        menus.push(permis);
      }
    });
    setMenuItems(menus);
  }, []); //eslint-disable-line

  return (
    <Header className="navbar-dashboard">
      <div
        className="dashboard-logo"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}
      >
        <Text>
          RUANG <strong>MUTU</strong>
        </Text>
      </div>
      {showMenu && (
        <>
          <div className="user-icon" style={{ marginLeft: "10px" }}>
            <Dropdown overlay={userMenu}>
              <UserOutlined
                style={{ fontSize: "24px", color: "white", cursor: "pointer" }}
              />
            </Dropdown>
          </div>
          {getRole() === "Super Admin" && (
            <div className="user-icon">
              <Dropdown overlay={masterDataMenu}>
                <SettingOutlined
                  style={{
                    fontSize: "24px",
                    color: "white",
                    cursor: "pointer",
                  }}
                />
              </Dropdown>
            </div>
          )}
        </>
      )}
      <Menu
        menuItems={showMenu ? menuItems : []}
        mode="horizontal"
        className="menu"
      />
    </Header>
  );
};
