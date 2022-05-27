import { Image, Layout, Typography } from 'antd';
import { paths } from '../../../routing/paths';
import { Menu } from '../../molecules/Menu/Menu';
import './Navbar.less';
import Logo from '../../../assets/images/logo_gambir.png';

const { Header } = Layout;
const { Text } = Typography;

export const Navbar = () => {

  // for the key, use "_" for submenu
  // e.g submenu_sponsor
  const menuItems = [
    {
      key: 'home',
      title: 'Home',
      url: paths.HOME
    },
    {
      key: 'profile',
      title: 'Profil',
      url: paths.PROFILE
    },
    {
      key: 'employee',
      title: 'Pegawai',
      url: paths.EMPLOYEE
    },
    {
      key: 'activity',
      title: 'Kegiatan',
      url: paths.ACTIVITY
    },
    {
      key: 'login',
      title: 'Login',
      url: paths.LOGIN
    },
  ]

  return (
    <Header className="navbar">
      <div className="logo">
        <Image 
          src={Logo}
          preview={false}
        />
        <Text>Puskesmas Kecamatan Gambir</Text>
      </div>
      <Menu
        menuItems={menuItems}
        mode="horizontal"
        className="menu"
      />
    </Header>
  )
}