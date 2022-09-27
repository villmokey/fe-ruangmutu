import { Layout, Row, Col, Typography, Space } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { removeAccessToken } from "../../../../redux/modules/auth/action";
import { paths } from "../../../../routing/paths";
import { Navbar } from "../../../organism/Dashboard/Navbar/Navbar";
import { Calender } from "../Calender/Calender";
import { QualityIndicator } from "../QualityIndicator/QualityIndicator";
import { Add as AddQualityIndicator } from "../QualityIndicator/Add/Add";
import { Add as AddPerformanceIndicator } from "../PerformanceIndicator/Add/Add";
import { DocumentApproval } from "../DocumentApproval/DocumentApproval";
import { OperationalStandard } from "../OperationalStandard/OperationalStandard";
import { QualityCupboard } from "../QualityCupboard/QualityCupboard";
import "./Home.less";
import DetailCupboardPage from "../QualityCupboard/Detail/detail.page";

import styled from "styled-components";
import { SatisfactionService } from "../SatisfactionService/SatisfactionService";
import { AddSatisfaction } from "../SatisfactionService/Add/Add";
import { IndicatorProgram } from "../../Master/IndicatorProgram/IndicatorProgram";
import { HealthServicePage } from "../../Master/HealthService/HealthService";
import { DocumentTypePage } from "../../Master/DocumentType/DocumentType";
import { UserPage } from "../../Master/User/User";
import { PerformanceIndicator } from "../PerformanceIndicator/PerformanceIndicator";

const { Content } = Layout;
const { Text } = Typography;

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { getIsAuth } = useAuthToken();

  useEffect(() => {
    if (!getIsAuth()) {
      navigate(paths.LOGIN);
      return;
    }
    navigate(paths.QUALITY_INDICATOR);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    dispatch(removeAccessToken());
  };

  return (
    <Layout>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <Navbar onLogout={handleLogout} />
      <Layout className="dashboard-layout">
        <Content className="dashboard-content">
          <Routes>
            <Route
              path={paths.QUALITY_INDICATOR}
              element={<QualityIndicator />}
            />
            <Route
              path={`${paths.QUALITY_INDICATOR}${paths.ADD}`}
              element={<AddQualityIndicator />}
            />
            <Route
              path={paths.PERFORMANCE_INDICATOR}
              element={<PerformanceIndicator />}
            />
            <Route
              path={`${paths.PERFORMANCE_INDICATOR}${paths.ADD}`}
              element={<AddPerformanceIndicator />}
            />
            <Route path={paths.CALENDER} element={<Calender />} />
            <Route
              path={paths.QUALITY_CUPBOARD}
              element={<QualityCupboard />}
            />
            <Route
              path={`${paths.QUALITY_CUPBOARD}:id/${paths.VIEW}`}
              element={<DetailCupboardPage />}
            />
            <Route
              path={paths.APPROVAL_DOCUMENT}
              element={<DocumentApproval />}
            />
            <Route
              path={paths.OPERATIONAL_STANDARD}
              element={<OperationalStandard />}
            />
            <Route
              path={paths.SATISFACTION_SERVICE}
              element={<SatisfactionService />}
            />
            <Route
              path={paths.SATISFACTION_SERVICE + paths.ADD}
              element={<AddSatisfaction />}
            />
            <Route
              path={paths.INDICATOR_PROGRAM}
              element={<IndicatorProgram />}
            />
            <Route
              path={paths.HEALTH_SERVICE}
              element={<HealthServicePage />}
            />
            <Route path={paths.DOCUMENT_TYPE} element={<DocumentTypePage />} />
            <Route path={paths.USERS} element={<UserPage />} />
            <Route
              path="*"
              element={
                <>
                  <h1>404 NOT FOUND!</h1>
                </>
              }
            ></Route>
          </Routes>
        </Content>
      </Layout>
      <Footer className="footer">
        <Row gutter={[8, 16]}>
          <Col span={24} style={{ margin: "20px 0 10px 0" }}>
            <hr />
          </Col>
          <Col xs={24} sm={24} md={12} xl={12}>
            <Text className="logo-text">
              RUANG <strong>MUTU</strong>
            </Text>
            <br />
            <Text className="description-text">
              Aplikasi Dokumentasi serta Pemantauan Kegiatan Mutu
            </Text>
            <br />
            <Text className="description-text">Puskesmas Kecamatan Gambir</Text>
          </Col>
          <Col xs={24} sm={24} md={12} xl={12}>
            <Typography.Paragraph className="ft-white ft-bold ft-15">
              Hubungi Kami
            </Typography.Paragraph>
            <Row>
              <Col span={12}>
                <Space direction="vertical">
                  <Space direction="vertical">
                    <Text className="ft-white ft-bold">Website</Text>
                    <Text className="ft-white">www.pkcgambir.co.id</Text>
                  </Space>
                  <Space direction="vertical">
                    <Text className="ft-white ft-bold">Hotline</Text>
                    <Text className="ft-white">www.pkcgambir.co.id</Text>
                  </Space>
                  <Space direction="vertical">
                    <Text className="ft-white ft-bold">WhatsApp</Text>
                    <Text className="ft-white">www.pkcgambir.co.id</Text>
                  </Space>
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical">
                  <Space direction="vertical">
                    <Text className="ft-white ft-bold">Instagram</Text>
                    <Text className="ft-white">@PKCGambir</Text>
                  </Space>
                  <Space direction="vertical">
                    <Text className="ft-white ft-bold">Youtube</Text>
                    <Text className="ft-white">PKMGambir</Text>
                  </Space>
                  <Space direction="vertical">
                    <Text className="ft-white ft-bold">Twitter</Text>
                    <Text className="ft-white">pkcgambir</Text>
                  </Space>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Footer>
      <Copyright>PKC Gambir All Rights Reserved.</Copyright>
    </Layout>
  );
};

const Copyright = styled.div`
  background: #e5e5e5;
  color: #5e6e89;
  height: 76px;
  padding: 25px 150px;

  @media only screen and (max-width: 720px) {
    padding: 25px 10px;
  }
`;

const Footer = styled.footer`
  min-height: 300px;
  background-color: #6a9695;
  color: white;

  @media only screen and (max-width: 720px) {
    padding: 10px;
  }
`;
