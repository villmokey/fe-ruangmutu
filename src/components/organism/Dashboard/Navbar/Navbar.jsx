import { paths } from "../../../../routing/paths";
import { Button, Dropdown, Layout } from "antd";
import { Menu } from "../../../molecules/Menu/Menu";
import './Navbar.less';
import { Text } from "../../../atoms/Text/Text";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

export const Navbar = ({
  onLogout
}) => {

  // for the key, use "_" for submenu
  // e.g submenu_sponsor
  const menuItems = [
    {
      key: 'submenu_document',
      title: 'DOKUMEN',
      url: paths.DASHBOARD,
      children: [
        {  
          key: 'quality_indicator',
          title: 'INDIKATOR MUTU',
          url: paths.QUALITY_INDICATOR,
        },
        // {  
        //   key: 'operational_standard',
        //   title: 'STANDAR OPERASIONAL (SOP)',
        //   url: paths.QUALITY_INDICATOR,
        // },
        // {  
        //   key: 'operational_standard',
        //   title: 'KEPUASAN LAYANAN',
        //   url: paths.QUALITY_INDICATOR,
        // }
      ]
    },
    {
      key: 'calender',
      title: 'KALENDER',
      url: paths.CALENDER
    },
    {
      key: 'submenu_lemarimutu',
      title: 'LEMARI MUTU',
      url: paths.DASHBOARD,
      children: [
        {
          key: 'approval_document',
          title: 'DOKUMEN APPROVAL',
          url: paths.APPROVAL_DOCUMENT,
        }
      ]
    }
  ];

  const userMenuItem = [
    {
      key: 'logout',
      title: 'Logout',
      url: paths.LOGIN,
      content: (
        <Button onClick={onLogout} type="link">Logout</Button>
      )
    },
  ]

  const userMenu = (
    <Menu
      menuItems={userMenuItem}
    />
  )

  return (
    <Header className="navbar-dashboard">
      <div className="dashboard-logo">
        <Text>RUANG <strong>MUTU</strong></Text>
      </div>
      <div className="user-icon">
        <Dropdown overlay={userMenu}>
          <UserOutlined style={{ fontSize: '28px', color: 'white', cursor: 'pointer' }}/>
        </Dropdown>
      </div>
      <Menu
        menuItems={menuItems}
        mode="horizontal"
        className="menu"
      />
      

    </Header>
  )
}