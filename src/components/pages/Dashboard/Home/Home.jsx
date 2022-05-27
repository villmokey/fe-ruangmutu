import { Layout } from "antd";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { paths } from "../../../../routing/paths";
import { Navbar } from "../../../organism/Dashboard/Navbar/Navbar";
import { Calender } from "../Calender/Calender";
import { QualityIndicator } from "../QualityIndicator/QualityIndicator";

import './Home.less';

const { Content } = Layout;

export const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    navigate(paths.QUALITY_INDICATOR);
  }, [navigate])

  return (
    <Layout>
      <Navbar />
      <Layout className="dashboard-layout">
        <Content className="dashboard-content">
          <Routes>
            <Route path={paths.QUALITY_INDICATOR} element={<QualityIndicator />} />
            <Route path={paths.CALENDER} element={<Calender />} />
            <Route path={paths.QUALITY_CUPBOARD} element={<QualityIndicator />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}