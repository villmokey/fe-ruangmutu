import React from "react";
import { Breadcrumb, Col, Layout, Row, Space, Tabs, Tag } from "antd";
import { fetchApiGet } from "../../../../globals/fetchApi";
import { Card } from "../../../atoms/Card/Card";
import { InputSearch } from "../../../atoms/InputSearch/InputSearch";
import { Title } from "../../../atoms/Title/Title";
import { DocumentApprovalSider } from "../../../organism/Dashboard/Sider/DocumentApprovalSider/DocumentApprovalSider";
import { QualityIndicatorApproval } from "./QualityIndicatorApproval/QualityIndicatorApproval";
import { QualityIndicatorProfileApproval } from "./QualityIndicatorProfileApproval/QualityIndicatorProfileApproval";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { PerformanceIndicatorApproval } from "./PerformanceIndicatorApproval/PerformanceIndicatorApproval";
import { PerformanceIndicatorProfileApproval } from "./PerformanceIndicatorProfileApproval/PerformanceIndicatorProfileApproval";
import { HomeFilled } from "@ant-design/icons";

const { Content } = Layout;

const { TabPane } = Tabs;

export const DocumentApproval = () => {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [programs, setPrograms] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [information, setInformation] = React.useState({
    approval: 0,
    approved: 0,
    new_approval: 0,
  });

  const [filter, setFilter] = React.useState({
    year: undefined,
    program_id: undefined,
    status: undefined,
  });

  const fetchPrograms = () => {
    fetchApiGet("/program", { paginate: false }, accessToken).then((res) => {
      if (res && res.success) {
        setPrograms(res.data ?? []);
      }
    });
  };

  React.useEffect(() => {
    fetchApiGet("/indicator-aprroval/info", {}, accessToken).then((res) => {
      if (res)
        setInformation({
          approval: res.data.approval,
          approved: res.data.approved,
          new_approval: res.data.new_approval,
        });
    });
    fetchPrograms();
  }, []);

  return (
    <Layout>
      <DocumentApprovalSider onFilter={(f) => setFilter(f)} />
      <Content className="main-content">
        <Breadcrumb separator=">" className="breadcrumb">
          <Breadcrumb.Item href={"/dashboard"} className="breadcrumb__item">
            <HomeFilled className="icon icon--default" />
            <span>Home</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcrumb__item breadcrumb__item--active">
            Dokumen Approval
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row justify="center" align="middle" gutter={[24, 16]}>
          <Col>
            <Card className="total">
              <p className="card-title">TOTAL APPROVAL</p>
              <Title className="card-content">{information.approval}</Title>
            </Card>
          </Col>
          <Col>
            <Card className="total">
              <p className="card-title">DOKUMEN DIAPPROVE</p>
              <Title className="card-content">{information.approved}</Title>
            </Card>
          </Col>
          <Col>
            <Card className="total">
              <p className="card-title">APPROVAL BARU</p>
              <Title className="card-content">{information.new_approval}</Title>
            </Card>
          </Col>
        </Row>
        <Row justify="end" style={{ marginTop: 40 }} gutter={[8]}>
          <Col>
            <InputSearch size="large" onSearch={(val) => setSearch(val)} />
          </Col>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <Col style={{ marginRight: "auto" }}>
            <Space>
              {filter.year && <Tag color="#6A9695">{filter.year}</Tag>}
              {filter.status && filter.status !== 0 && (
                <Tag color="#6A9695">
                  {filter.status === "unsigned"
                    ? "BELUM DITANDATANG"
                    : filter.status === "signed"
                    ? "SUDAH DITANDATANGAN"
                    : "SUDAH & BELUM DITANDATANGAN"}
                </Tag>
              )}
              {filter.program_id &&
                programs.map(
                  (prog) =>
                    filter.program_id.some((x) => x === prog.id) && (
                      <Tag color="#6A9695">{prog.name}</Tag>
                    )
                )}
            </Space>
          </Col>
        </Row>
        {/* <div className="document-approval-container"> */}
        <Tabs defaultActiveKey="1" destroyInactiveTabPane>
          <TabPane tab="Indikator Mutu" key="1">
            <QualityIndicatorApproval filter={filter} search={search} />
          </TabPane>
          <TabPane tab="Profil Indikator Mutu" key="2">
            <QualityIndicatorProfileApproval filter={filter} search={search} />
          </TabPane>
          <TabPane tab="Indikator Kinerja" key="3">
            <PerformanceIndicatorApproval filter={filter} search={search} />
          </TabPane>
          <TabPane tab="Profil Indikator Kinerja" key="4">
            <PerformanceIndicatorProfileApproval
              filter={filter}
              search={search}
            />
          </TabPane>
        </Tabs>
        {/* </div> */}
      </Content>
    </Layout>
  );
};
