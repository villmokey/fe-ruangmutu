import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row, Space, Tag } from "antd"
import { Link } from "react-router-dom";
import { paths } from "../../../../routing/paths";
import { Card } from "../../../atoms/Card/Card";
import { InputSearch } from "../../../atoms/InputSearch/InputSearch";
import { Title } from "../../../atoms/Title/Title";
import { DocumentApprovalCard } from "../../../molecules/DocumentApprovalCard/DocumentApprovalCard";
import { DocumentApprovalSider } from "../../../organism/Dashboard/Sider/DocumentApprovalSider/DocumentApprovalSider";

const { Content } = Layout;

export const DocumentApproval = () => {
  return (
    <Layout>
      <DocumentApprovalSider />
      <Content className="main-content">
        <Row justify="center" align="middle" gutter={[ 24,16 ]}>
          <Col>
            <Card className="total">
              <p className="card-title">TOTAL APPROVAL</p>
              <Title className="card-content">2048</Title>
            </Card>
          </Col>
          <Col>
            <Card className="total">
              <p className="card-title">DOKUMEN DIAPPROVE</p>
              <Title className="card-content">1024</Title>
            </Card>
          </Col>
          <Col>
            <Card className="total">
              <p className="card-title">APPROVAL BARU</p>
            <Title className="card-content">512</Title>
            </Card>
          </Col>
        </Row>
        <Row justify="end" style={{ marginTop: 40 }} gutter={[8]}>
          <Col>
            <InputSearch size="large" />
          </Col>
          <Col>
            <Link to={`${paths.ADD}`}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                size="large" 
                style={{ borderRadius: 8 }}
              />
            </Link>
          </Col>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <Col style={{ marginRight: 'auto' }}>
            <Space>
              <Tag color="#6A9695">#INDIKATOR MUTU</Tag>
              <Tag color="#6A9695">#KEPEGAWAIAN</Tag>
              <Tag color="#6A9695">#MUTU</Tag>
            </Space>
          </Col>
        </Row>
        <div className="document-approval-container">
          <DocumentApprovalCard 
            documentApprovalTitle="Butuh Judul"
            documentApprovalCreatedAt="20/06/2020"
            documentApprovalDate="25/06/2020"
            createdBy="Budi"
          />
          <DocumentApprovalCard 
            documentApprovalTitle="Butuh Judul"
            documentApprovalCreatedAt="20/06/2020"
            documentApprovalDate="25/06/2020"
            createdBy="Budi"
            isApproved={true}
          />
          <DocumentApprovalCard 
            documentApprovalTitle="Butuh Judul"
            documentApprovalCreatedAt="20/06/2020"
            documentApprovalDate="25/06/2020"
            createdBy="Budi"
          />
        </div>
      </Content>
    </Layout>
  )
}