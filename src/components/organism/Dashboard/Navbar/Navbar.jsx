import { useEffect, useState } from "react";
import { paths } from "../../../../routing/paths";
import { Button, Dropdown, Layout } from "antd";
import { Menu } from "../../../molecules/Menu/Menu";
import "./Navbar.less";
import { Text } from "../../../atoms/Text/Text";
import { UserOutlined } from "@ant-design/icons";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

export const Navbar = ({ onLogout, showMenu = true }) => {
  const { getRole } = useAuthToken();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([
    {
      key: "submenu_document",
      title: "DOKUMEN",
      url: paths.DASHBOARD,
      children: [
        {
          key: "quality_indicator",
          title: "INDIKATOR MUTU",
          url: paths.QUALITY_INDICATOR,
        },
        {
          key: "performance_indicator",
          title: "INDIKATOR KINERJA",
          url: paths.PERFORMANCE_INDICATOR,
        },
        {
          key: "approval_document",
          title: "DOKUMEN APPROVAL",
          url: paths.APPROVAL_DOCUMENT,
        },
        {
          key: "operational_standard",
          title: "STANDAR OPERASIONAL (SOP)",
          url: paths.OPERATIONAL_STANDARD,
        },
        {
          key: "satisfaction-service",
          title: "KEPUASAN LAYANAN",
          url: paths.SATISFACTION_SERVICE,
        },
      ],
    },
    {
      key: "calender",
      title: "KALENDER",
      url: paths.CALENDER,
    },
    {
      key: "lemarimutu",
      title: "LEMARI MUTU",
      url: paths.QUALITY_CUPBOARD,
    },
  ]);

  const adminMenu = [
    {
      key: "master_data_admin",
      title: "MASTER DATA",
      url: paths.DASHBOARD,
      children: [
        {
          key: "pengguna",
          title: "PENGGUNA",
          url: paths.USERS,
        },
        // {
        //   key: "jabatan",
        //   title: "JABATAN",
        //   url: paths.SATISFACTION_SERVICE,
        // },
        {
          key: "program-mutu",
          title: "UNIT/PROGRAM",
          url: paths.INDICATOR_PROGRAM,
        },
        {
          key: "layanan-kesehatan",
          title: "LAYANAN KESEHATAN",
          url: paths.HEALTH_SERVICE,
        },
        {
          key: "doc-type",
          title: "TIPE DOKUMEN",
          url: paths.DOCUMENT_TYPE,
        },
      ],
    },
  ];
  // for the key, use "_" for submenu
  // e.g submenu_sponsor

  const userMenuItem = [
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

  const userMenu = <Menu menuItems={userMenuItem} />;

  useEffect(() => {
    if (getRole() === "admin") {
      if (!menuItems.find((x) => x.key === "master_data_admin")) {
        setMenuItems([...menuItems, ...adminMenu]);
      }
    }
  }, []);

  return (
    <Header className="navbar-dashboard">
      <div
        className="dashboard-logo"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <Text>
          RUANG <strong>MUTU</strong>
        </Text>
      </div>
      {showMenu && (
        <div className="user-icon">
          <Dropdown overlay={userMenu}>
            <UserOutlined
              style={{ fontSize: "28px", color: "white", cursor: "pointer" }}
            />
          </Dropdown>
        </div>
      )}
      <Menu
        menuItems={showMenu ? menuItems : []}
        mode="horizontal"
        className="menu"
      />
    </Header>
  );
};
