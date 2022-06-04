import { Button, Col, Layout, message, Row, Steps } from 'antd';
import { useState } from 'react';
import { Card } from '../../../../atoms/Card/Card';
import { Text } from '../../../../atoms/Text/Text';
import { Title } from '../../../../atoms/Title/Title';
import { FirstStep } from '../../../../templates/QualityIndicatorTemplates/Add/FirstStep';
import { SecondStep } from '../../../../templates/QualityIndicatorTemplates/Add/SecondStep';
import { ThirdStep } from '../../../../templates/QualityIndicatorTemplates/Add/ThirdStep';
import { Form } from 'antd';

import './Add.less';

const { Sider, Content } = Layout;
const { Step } = Steps;

export const Add = () => {

  const [secondStepForm] = Form.useForm();
  const [thirdStepForm] = Form.useForm();

  const [current, setCurrent] = useState(0);
  // const [ presetData, setPresetData ] = useState(null);

  const handleStepOne = (value) => {
    // setPresetData(value);
    thirdStepForm.setFieldsValue({
      programMutu: value.programMutu,
      subProgramMutu: value.subProgramMutu,
      judulIndikator: value.judulIndikator,
      dasarPemilihanIndikator: value.dasarPemilihanIndikator,
      dimensiMutu: value.dimensiMutu,
      tujuan: value.tujuan,
      definisiOperasional: value.definisiOperasional,
      tipeIndikator: value.tipeIndikator,
      statusPengukuran: value.statusPengukuran,
      numerator: value.numerator,
      denominator: value.denominator,
      targetCapaian: value.targetCapaian,
      kriteriaInklusiEkslusi: value.kriteriaInklusiEkslusi,
      formulaPengukuran: value.formulaPengukuran,
      pengumpulanData: value.pengumpulanData,
      sumberData: value.sumberData,
      populasiAtauSampel: value.populasiAtauSampel,
      frekuensiPengumpulanData: value.frekuensiPengumpulanData,
      periodeWatkuPelaporan: value.periodeWatkuPelaporan,
      periodeAnalisis: value.periodeAnalisis,
      penyajianData: value.penyajianData,
      penanggungJawabIndikator: value.penanggungJawabIndikator
    });
  }

  const next = () => {

    if (current === 1) {
      secondStepForm.submit();
    }

    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  // const handleSubmit = () => {
    
  // }

  const steps = [
    {
      title: 'Tahap 1',
      content: <FirstStep />,
    },
    {
      title: 'Tahap 2',
      content: <SecondStep onFinish={handleStepOne}  form={secondStepForm}/>,
    },
    {
      title: 'Tahap 3',
      content: <ThirdStep form={thirdStepForm}/>,
    }
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
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
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