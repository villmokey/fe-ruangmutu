import { Button, Col, Layout, Row, Space, Tag } from "antd";
import { Card } from '../../../atoms/Card/Card';
import { Title } from "../../../atoms/Title/Title";

import './QualityIndicator.less';
import { InputSearch } from "../../../atoms/InputSearch/InputSearch";
import { FileTextOutlined, PlusOutlined, BarChartOutlined } from "@ant-design/icons";

import { BarChart } from "../../../molecules/Chart/Bar/BarChart";
import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../../../routing/paths";
import { QualityIndicatorCard } from "../../../molecules/QualityIndicatorCard/QualityIndicatorCard";
import { QualityIndicatorSider } from "../../../organism/Dashboard/Sider/QualityIndicatorSider/QualityIndicatorSider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProfileQualityIndicator } from "../../../../redux/modules/profileQualityIndicator/action";
import { useAuthToken } from "../../../../globals/useAuthToken";

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


  const chartData = [
    {
      month: 'JAN',
      value: 52,
    },
    {
      month: 'FEB',
      value: 92,
    },
    {
      month: 'MAR',
      value: 90,
    },
    {
      month: 'APR',
      value: 97,
    },
    {
      month: 'MEI',
      value: 50,
    },
    {
      month: 'JUN',
      value: 99,
    },
    {
      month: 'JUL',
      value: 87,
    },
    {
      month: 'AGU',
      value: 85,
    },
    {
      month: 'SEP',
      value: 0,
    },
    {
      month: 'OKT',
      value: 99,
    },
    {
      month: 'NOV',
      value: 86,
    },
    {
      month: 'DES',
      value: 100,
    }
  ]

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
              <Card className="indikator-mutu">
                <BarChart 
                  data={chartData} 
                  className="chart"
                  XAxisDataKey="month"
                  barColor="#5DC8BDE5"
                  barDataKey="value"
                  width={700}
                  height={300}
                />
              </Card>
              <Card className="indikator-mutu">
                <BarChart 
                  data={chartData} 
                  className="chart"
                  XAxisDataKey="month"
                  barColor="#5DC8BDE5"
                  barDataKey="value"
                  width={700}
                  height={300}
                />
              </Card>
            </>
          }
          
        </div>
      </Content>
    </Layout>
  )
}