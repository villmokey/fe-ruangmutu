import { Button, Col, Layout, Row, Space, Tag } from "antd";
import { Sider } from "../../../organism/Dashboard/Sider/Sider";
import { Card } from '../../../atoms/Card/Card';
import { Title } from "../../../atoms/Title/Title";

import './QualityIndicator.less';
import { InputSearch } from "../../../atoms/InputSearch/InputSearch";
import { FileTextOutlined, PlusOutlined, BarChartOutlined } from "@ant-design/icons";

import { BarChart } from "../../../molecules/Chart/Bar/BarChart";
import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../../../routing/paths";

const { Content } = Layout;


export const QualityIndicator = () => {

  const [ viewType, setViewType ] = useState(1);

  const handleChangeViewType = () => {
    setViewType(viewType === 1 ? 2 : 1);
  }


  const labels = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUNI', 'JULI', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Kepegawaian - Pegawai dengan atribut lengkap',
      },
    },
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Jumlah',
        data: [10, 60, 37, 21, 0, 60, 80, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

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
            <Row align="center" gutter={[8,8]}>
              <Col>
                <Card>
                  <div className="indikator-mutu-thumbnail">

                  </div>
                </Card>
              </Col>
              <Col>
                <Card>
                  <div className="indikator-mutu-thumbnail">
                    
                  </div>
                </Card>
              </Col>
              <Col>
                <Card>
                  <div className="indikator-mutu-thumbnail">
                    
                  </div>
                </Card>
              </Col>
              <Col>
                <Card>
                  <div className="indikator-mutu-thumbnail">
                    
                  </div>
                </Card>
              </Col>
            </Row>
            :
            <>
              <Card className="indikator-mutu">
                <BarChart options={chartOptions} data={chartData} className="chart"/>
              </Card>
              <Card className="indikator-mutu">
                <BarChart options={chartOptions} data={chartData} className="chart"/>
              </Card>
            </>
          }
          
        </div>
      </Content>
    </Layout>
  )
}