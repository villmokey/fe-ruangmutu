import { Button, Col, Layout, message, Row, Steps } from 'antd';
import { useNavigate } from 'react-router-dom';

import { FirstStep } from './Step/FirstStep';
import { SecondStep as SatisfactionLevelSecondStep } from './Step/SatisfactionLevelForm/SecondStep';
import { SecondStep as SatisfactionSecondStep } from './Step/SatisfactionForm/SecondStep';
import { ThirdStep as SatisfactionLevelThirdStep } from './Step/SatisfactionLevelForm/ThirdStep';
import { ThirdStep as SatisfactionThirdStep } from './Step/SatisfactionForm/ThirdStep';
import { Title } from '../../../../atoms/Title/Title';
import { Text } from '../../../../atoms/Text/Text';
import { Card } from '../../../../atoms/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import './Add.less';
import { useAuthToken } from '../../../../../globals/useAuthToken';
import { useState } from 'react';

const { Sider, Content } = Layout;
const { Step } = Steps;

export const AddSatisfaction = () => {
  const dispatch = useDispatch();
  const { getAccessToken, getName } = useAuthToken();
  const accessToken = getAccessToken();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [formType, setFormType] = useState(1);

  const next = () => {
    if (formType === 1) {
      setCurrent(current + 1);
    } else if (formType === 2) {
      setCurrent(current + 1);
    }

  };

  const prev = () => {
    if (formType === 1) {
      setCurrent(current - 1);
    } else if (formType === 2) {
      setCurrent(current - 1);
    }
  };


  const handleChangeDocumentForm = (event) => {
    setFormType(event.target.value)
  }

  const steps = [
    {
      title: 'Tahap 1',
      content: <FirstStep onChangeForm={handleChangeDocumentForm} />,
    },
    {
      title: 'Tahap 2',
      content: formType === 1 ?
        <SatisfactionLevelSecondStep
        />
        :
        <SatisfactionSecondStep
        />,
    },
    {
      title: 'Tahap 3',
      content: formType === 1 ?
        <SatisfactionLevelThirdStep
        />
        :
        <SatisfactionThirdStep
        />,
    }
  ];

  const handleSave = () => {
    message.success('Berhasil menambahkan ' + formType == 1 ? 'tingkat kepuasan layanan' : 'keluhan pelanggan')
    navigate('/')
  }

  return (
    <Layout>
      <Sider className="sider">
        <div className="sider-content">
          <Title level={2}>KEPUASAN PELANGGAN</Title>
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
          {steps[current].content}
        </Card>
        <Row>
          <Col style={{ marginRight: 'auto' }}>
            {
              current > 0 && (
                <Button
                  onClick={() => prev()}
                >
                  Sebelumnya
                </Button>
              )
            }
          </Col>
          <Col style={{ marginLeft: 'auto' }}>
            {
              current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Selanjutnya
                </Button>
              )
            }
          </Col>
          <Col>
            {
              current === steps.length - 1 && (
                <Button type="primary" onClick={() => handleSave()}>
                  Simpan
                </Button>
              )
            }
          </Col>

        </Row>
      </Content>
    </Layout>
  )
}