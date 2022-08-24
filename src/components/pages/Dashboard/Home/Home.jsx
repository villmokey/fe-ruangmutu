import { Layout } from "antd";
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
import { DocumentApproval } from "../DocumentApproval/DocumentApproval";
import { OperationalStandard } from "../OperationalStandard/OperationalStandard";
import { QualityCupboard } from "../QualityCupboard/QualityCupboard";

import "./Home.less";
import DetailCupboardPage from "../QualityCupboard/Detail/detail.page";
const { Content } = Layout;

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
    </Layout>
  );
};
