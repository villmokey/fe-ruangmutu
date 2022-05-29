import { Button, Col, Layout, Row, Space, Tag } from "antd";
import { Sider } from "../../../organism/Dashboard/Sider/Sider";
import { Card } from '../../../atoms/Card/Card';
import { Title } from "../../../atoms/Title/Title";

import './QualityIndicator.less';
import { InputSearch } from "../../../atoms/InputSearch/InputSearch";
import { FileTextOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const { Content } = Layout;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

export const QualityIndicator = () => {

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
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              size="large" 
              style={{ borderRadius: 8 }}
            />
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
              icon={<FileTextOutlined />} 
              size="large" 
              style={{ borderRadius: 8 }}
            />
          </Col>
        </Row>
        <div className="indikator-mutu-container">
          <Card className="indikator-mutu">
            <Bar options={chartOptions} data={chartData} className="chart"/>
          </Card>
          <Card className="indikator-mutu">
            <Bar options={chartOptions} data={chartData} className="chart"/>
          </Card>
        </div>
      </Content>
    </Layout>
  )
}