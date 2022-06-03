import { Button, Col, Layout, message, Row, Steps } from 'antd';
import { useState } from 'react';
import { Card } from '../../../../atoms/Card/Card';
import { Text } from '../../../../atoms/Text/Text';
import { Title } from '../../../../atoms/Title/Title';
import { FirstStep } from '../../../../templates/QualityIndicatorTemplates/Add/FirstStep';
import { SecondStep } from '../../../../templates/QualityIndicatorTemplates/Add/SecondStep';
import { ThirdStep } from '../../../../templates/QualityIndicatorTemplates/Add/ThirdStep';

import './Add.less';

const { Sider, Content } = Layout;
const { Step } = Steps;

const handleStepOne = (value) => {
  console.log(value)
}

export const Add = () => {

  const [current, setCurrent] = useState(0);

  const next = (value) => {
    console.log(value);
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: 'Tahap 1',
      content: <FirstStep />,
    },
    {
      title: 'Tahap 2',
      content: <SecondStep onFinish={handleStepOne}/>,
    },
    {
      title: 'Tahap 3',
      content: <ThirdStep />,
    },
    {
      title: 'Tahap 4',
      content: 'Last-content',
    },
  ];

  return (
    <Layout>
      <Sider className="sider">
        <div className="sider-content">
          <Title level={2}>INDIKATOR MUTU</Title>
          <Text>Senin, 09 Agustus 2021</Text>
        </div>
      </Sider>
      <Content className="main-content">
        <Steps current={current}>
          {
            steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))
          }
        </Steps>
        <Card style={{ margin: '30px 0px 10px' }}>
          { steps[current].content }
        </Card>
        <Row>
          <Col style={{ marginRight: 'auto' }}>
          {
            current > 0 && (
              <Button
                onClick={() => prev()}
              >
                Previous
              </Button>
            )
          }
          </Col>
          <Col style={{ marginLeft: 'auto' }}>
          {
            current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )
          }
          </Col>
          <Col>
          {
            current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                Done
              </Button>
            )
          }
          </Col>

        </Row>
      </Content>
    </Layout>
  )
}