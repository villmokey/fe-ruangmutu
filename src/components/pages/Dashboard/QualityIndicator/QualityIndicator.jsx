import { Button, Col, Layout, Row } from "antd";
import { Sider } from "../../../organism/Dashboard/Sider/Sider";
import { Card } from '../../../atoms/Card/Card';
import { Title } from "../../../atoms/Title/Title";

import './QualityIndicator.less';
import { InputSearch } from "../../../atoms/InputSearch/InputSearch";
import { PlusOutlined } from "@ant-design/icons";


const { Content } = Layout;

export const QualityIndicator = () => {
  return (
    <Layout>
      <Sider />
      <Content className="main-content">
        <Row justify="center" align="middle" gutter={[ 24,16 ]}>
          <Col>
            <Card className="total">
              <p className="card-title">TOTAL INDIKATOR MUTU</p>
              <Title className="card-content">153</Title>
            </Card>
          </Col>
          <Col>
            <Card className="total">
              <p className="card-title">INDIKATOR MUTU TERPILIH</p>
              <Title className="card-content">5</Title>
            </Card>
          </Col>
          <Col>
            <Card className="total">
              <p className="card-title">BELUM TERCAPAI</p>
            <Title className="card-content">3</Title>
            </Card>
          </Col>
        </Row>
        <Row justify="end" style={{ marginTop: 40 }} gutter={[8]}>
          <Col>
            <InputSearch size="large" />
          </Col>
          <Col>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              size="large" 
              style={{ borderRadius: 8 }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}