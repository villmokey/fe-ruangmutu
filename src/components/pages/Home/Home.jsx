import { Layout } from "antd"
import { Route, Routes } from "react-router-dom";
import { paths } from "../../../routing/paths";
import { Navbar } from "../../organism/Navbar/Navbar"
import { Activity } from "../Activity/Activity";
import { Employee } from "../Employee/Employee";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import './Home.css';

const { Content } = Layout;

export const Home = () => {
  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <Navbar />
      <Content className="content">
        <Routes>
          <Route path={paths.PROFILE} element={<Profile />} />
          <Route path={paths.EMPLOYEE} element={<Employee />} />
          <Route path={paths.ACTIVITY} element={<Activity />} />
          <Route path={paths.LOGIN} element={<Login />} />
        </Routes>
      </Content>
    </Layout>
  )
}