import { Button, Col, Layout, message, Row, Steps } from 'antd';
import { useState, useEffect } from 'react';
import { FirstStep } from '../../../../templates/QualityIndicatorTemplates/Add/FirstStep';
import { SecondStep as ProfileQualityIndicatorSecondStep } from '../../../../templates/QualityIndicatorTemplates/Add/ProfileQualityIndicator/SecondStep';
import { ThirdStep as ProfileQualityIndicatorThirdStep } from '../../../../templates/QualityIndicatorTemplates/Add/ProfileQualityIndicator/ThirdStep';
import { SecondStep as QualityIndicatorSecondStep } from '../../../../templates/QualityIndicatorTemplates/Add/QualityIndicator/SecondStep';
import { ThirdStep as QualityIndicatorThirdStep } from '../../../../templates/QualityIndicatorTemplates/Add/QualityIndicator/ThirdStep';
import { Form } from 'antd';
import { Title } from '../../../../atoms/Title/Title';
import { Text } from '../../../../atoms/Text/Text';
import { Card } from '../../../../atoms/Card/Card';
import { useDispatch, useSelector } from 'react-redux';

import './Add.less';
import { getAllProgram, programSelector } from '../../../../../redux/modules/program/action';
// import { useAuthToken } from '../../../../../globals/useAuthToken';


const { Sider, Content } = Layout;
const { Step } = Steps;

export const Add = () => {

  const {
    called: programCalled,
    data: {
      list: programList
    }
  } = useSelector(programSelector)

  const dispatch = useDispatch();
  // const { getAccessToken } = useAuthToken();
  // const accessToken = getAccessToken();

  const [secondStepProfileQualityIndicatorForm] = Form.useForm();
  const [thirdStepProfileQualityIndicatorForm] = Form.useForm();

  const [secondStepQualityIndicatorForm] = Form.useForm();
  const [thirdStepQualityIndicatorForm] = Form.useForm();
  
  const [current, setCurrent] = useState(0);
  const [documentFormChoosen, setDocumentFormChoosen] = useState(0);

  const [ programOptions, setProgramOptions ] = useState(null);

  useEffect(() => {
    dispatch(getAllProgram());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!(programCalled && programList)) return;
    
  }, [programCalled, programList])
  

  const handleStepThreeProfileQualityIndicator = (value) => {
    thirdStepProfileQualityIndicatorForm.setFieldsValue({
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

  const handleStepThreeQualityIndicator = (value) => {
    thirdStepQualityIndicatorForm.setFieldsValue({
      judulIndikator: value.judulIndikator,
      programMutu: value.programMutu,
      manusia: value.manusia,
      alat: value.alat,
      metode: value.metode,
      bulan: value.bulan,
      sasaranMutu: value.sasaranMutu,
      kebijakan: value.kebijakan,
      lingkungan: value.lingkungan,
      rencanaTindakLanjut: value.rencanaTindakLanjut,
      dokumenTelusur: value.dokumenTelusur
    });
  }

  const next = () => {
    if (documentFormChoosen === 1) {
      if (current === 1) {
        secondStepProfileQualityIndicatorForm.submit();
      }
  
      setCurrent(current + 1);

    } else if (documentFormChoosen === 2) {
      if (current === 1) {
        secondStepQualityIndicatorForm.submit();
      }
  
      setCurrent(current + 1);
    }

  };

  const prev = () => {
    if (documentFormChoosen === 1) {
      if (current === 1) {
        secondStepProfileQualityIndicatorForm.submit();
      }
  
      setCurrent(current - 1);

    } else if (documentFormChoosen === 2) {
      if (current === 1) {
        secondStepQualityIndicatorForm.submit();
      }
  
      setCurrent(current - 1);
    }
  };

  const handleChangeDocumentForm = (e) => {
    setDocumentFormChoosen(e.target.value)
  }

  // const handleSubmit = () => {
    
  // }

  const steps = [
    {
      title: 'Tahap 1',
      content: <FirstStep onChangeForm={handleChangeDocumentForm}/>,
    },
    {
      title: 'Tahap 2',
      content: documentFormChoosen === 1 ? 
      <ProfileQualityIndicatorSecondStep onFinish={handleStepThreeProfileQualityIndicator} form={secondStepProfileQualityIndicatorForm} />
      : <QualityIndicatorSecondStep onFinish={handleStepThreeQualityIndicator} form={secondStepQualityIndicatorForm} />,
    },
    {
      title: 'Tahap 3',
      content: documentFormChoosen === 1 ? 
      <ProfileQualityIndicatorThirdStep form={thirdStepProfileQualityIndicatorForm} />
      : <QualityIndicatorThirdStep form={thirdStepQualityIndicatorForm} />,
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