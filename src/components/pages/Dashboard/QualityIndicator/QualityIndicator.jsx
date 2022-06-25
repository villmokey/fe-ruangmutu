import { Button, Col, Layout, Row, Space, Tag } from "antd";
import { Card } from '../../../atoms/Card/Card';
import { Title } from "../../../atoms/Title/Title";

import './QualityIndicator.less';
import { InputSearch } from "../../../atoms/InputSearch/InputSearch";
import { FileTextOutlined, PlusOutlined, BarChartOutlined } from "@ant-design/icons";

import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../../../routing/paths";
import { QualityIndicatorCard } from "../../../molecules/QualityIndicatorCard/QualityIndicatorCard";
import { QualityIndicatorSider } from "../../../organism/Dashboard/Sider/QualityIndicatorSider/QualityIndicatorSider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProfileQualityIndicator } from "../../../../redux/modules/profileQualityIndicator/action";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { QualityIndicatorChart } from "../../../molecules/QualityIndicatorChart/QualityIndicatorChart";


const { Content } = Layout;


export const QualityIndicator = () => {

  const [ viewType, setViewType ] = useState(1);
  const [ previewVis, setPreviewVis ] = useState(false);
  const dispatch = useDispatch();
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();

  const handleChangeViewType = () => {
    setViewType(viewType === 1 ? 2 : 1);
  }

  const handleOpenPreview = () => {
    setPreviewVis(true);
  }

  const handleClosePreview = () => {
    setPreviewVis(false);
  }

  useEffect(() => {
    dispatch(getAllProfileQualityIndicator({
      accessToken
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  let chartData = [ 20, 75, 98, 10, 0, 0, 50, 73, 20, 10, 80, 46 ];

  return (
    <Layout>
      <QualityIndicatorSider />
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
          <Col style={{ marginLeft: 'auto' }}>
            <Button 
              type="primary" 
              icon={viewType === 1 ? <FileTextOutlined /> : <BarChartOutlined />} 
              size="large" 
              style={{ borderRadius: 8 }}
              onClick={handleChangeViewType}
            />
          </Col>
        </Row>
        <div className="indikator-mutu-container">
          {
            viewType === 2 ?
            <Row align="center" gutter={[24,8]}>
              <Col>
                <QualityIndicatorCard 
                  previewVisibility={previewVis}
                  onClosePreviewVisibility={handleClosePreview}
                  onOpenPreview={handleOpenPreview}
                  key={1}
                />
              </Col>
              <Col>
                <QualityIndicatorCard 
                  previewVisibility={previewVis}
                  onClosePreviewVisibility={handleClosePreview}
                  onOpenPreview={handleOpenPreview}
                  key={2}
                />
              </Col>
              <Col>
                <QualityIndicatorCard 
                  previewVisibility={previewVis}
                  onClosePreviewVisibility={handleClosePreview}
                  onOpenPreview={handleOpenPreview}
                  key={3}
                />
              </Col>
              <Col>
                <QualityIndicatorCard 
                  previewVisibility={previewVis}
                  onClosePreviewVisibility={handleClosePreview}
                  onOpenPreview={handleOpenPreview}
                  key={4}
                />
              </Col>
            </Row>
            :
            <>
              <QualityIndicatorChart 
                chartData={chartData} 
                className="indikator-mutu"
              />
              <QualityIndicatorChart 
                chartData={chartData} 
                className="indikator-mutu"
              />
              <QualityIndicatorChart 
                chartData={chartData} 
                className="indikator-mutu"
              />
            </>
          }
          
        </div>
      </Content>
    </Layout>
  )
}