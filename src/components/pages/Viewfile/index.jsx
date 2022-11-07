import { Layout } from "antd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { removeAccessToken } from "../../../redux/modules/auth/action";
import { Navbar } from "../../organism/Dashboard/Navbar/Navbar";
import ViewFileContent from "./Content";
import FooterComponent from "../../molecules/Footer";

const { Content } = Layout;

export const ViewFilePage = () => {
  const dispatch = useDispatch();
  const { id, type } = useParams();

  const handleLogout = () => {
    dispatch(removeAccessToken());
  };

  return (
    <Layout>
      {/* eslint-disable-next-line */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <Navbar onLogout={handleLogout} showMenu={false} />
      <Layout className="dashboard-layout">
        <Content className="dashboard-content">
          <ViewFileContent id={id} type={type} />
        </Content>
      </Layout>
      <FooterComponent />
    </Layout>
  );
};
