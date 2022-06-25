import { Button, Col, Row } from "antd"
import { useState } from "react"
import { monthFullID } from "../../../globals/monthLabel"
import { Card } from "../../atoms/Card/Card"
import { Text } from "../../atoms/Text/Text"
import { Title } from "../../atoms/Title/Title"
import { BarChart } from "../Chart/Bar/BarChart"

export const QualityIndicatorChart = ({
  chartData,
  className
}) => {

  const [ isExpand, setIsExpand ] = useState(false);

  const barColor = (data) => {
    let backgroundColor = [];

    data?.forEach(item => {
      let color = '';
      if (item < 50) {
        color = '#C85D5D'
      } else if (item < 75) {
        color = '#C8BD5D'
      } else if (item === 75) {
        color = '#6CC85D'
      } else if (item > 75) {
        color = '#5F5DC8'
      }

      backgroundColor.push(color);
    });

    return backgroundColor;
  }

  const months = monthFullID;

  return (
    <Card className={className}>
      <Title level={4}>Kepegawaian - Pegawai dengan atribut lengkap</Title>
      <Title level={5} type="secondary">Tahun mutu 2022</Title>
      <Button type="text" onClick={() => setIsExpand(!isExpand)}><i>{ isExpand ? 'Show Less...' : 'Show More...' }</i></Button>
      <div style={ !isExpand ? { display: 'none' } : {}}>
        {
          months.map((item, index) => (
            <Button key={index} style={{ margin: '5px' }}>{ item }</Button>
          ))
        }
        <Row gutter={[8,8]} style={{ marginTop: 20 }}>
          <Col span={8}>
            <Card style={{ background: '#f6f6f6' }}>
              <Text>Terdapat petugas yang lalai dikarenakan di era pandemi memakai scrub</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: '#f6f6f6' }}>
              <Text>Alat Rekam Atribut Pegawai Rusak</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: '#f6f6f6' }}>
              <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias corrupti eveniet possimus corporis ipsum assumenda nostrum praesentium neque aut, molestiae fugit dicta, hic ipsa maxime aperiam, vel similique delectus quibusdam!</Text>
            </Card>
          </Col>
        </Row>
        <Row gutter={[8,8]} style={{ marginTop: 20 }}>
          <Col span={8}>
            <Card style={{ background: '#f6f6f6' }}>
              <Text>Permenkes XII/2120 mengenai perubahan pakaian kedinasan</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: '#f6f6f6' }}>
              <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam nemo saepe fugiat maxime. Beatae nemo, officiis voluptatibus obcaecati ipsum consectetur atque quas quod facere perspiciatis blanditiis iste delectus vitae a.</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: '#f6f6f6' }}>
              <Text>Membeli alat baru dalam tahun 2123</Text>
            </Card>
          </Col>
        </Row>
      </div>
      <BarChart chartData={chartData} barColor={barColor(chartData)}/>
    </Card>
  )
}