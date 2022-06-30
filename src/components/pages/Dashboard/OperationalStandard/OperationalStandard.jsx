import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Layout, Steps, Row, Col, Button } from "antd";
import { HomeFilled, UserOutlined } from '@ant-design/icons';

import { Card } from '../../../atoms/Card/Card';
import { Text } from "../../../atoms/Text/Text";
import { Title } from "../../../atoms/Title/Title";

import { InputSearch } from "../../../atoms/InputSearch/InputSearch";

import { FirstStep as OperationalStandardFirstStep } from "../../../templates/OperationalStandardTemplates/Add/FirstStep";
import { SecondStep as OperationalStandardSecondStep } from "../../../templates/OperationalStandardTemplates/Add/SecondStep";
import { ThirdStep as OperationalStandardThirdStep } from "../../../templates/OperationalStandardTemplates/Add/ThirdStep";

import { paths } from "../../../../routing/paths";
import { QualityIndicatorCard } from "../../../molecules/QualityIndicatorCard/QualityIndicatorCard";
import { Sider } from "../../../organism/Dashboard/Sider/Sider";
import { getAllProfileQualityIndicator } from "../../../../redux/modules/profileQualityIndicator/action";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { QualityIndicatorChart } from "../../../molecules/QualityIndicatorChart/QualityIndicatorChart";
import { getAllQualityIndicator, qualityIndicatorSelector } from "../../../../redux/modules/qualityIndicator/action";

import './OperationalStandard.less';


const { Content, Sider: AntdSider } = Layout;
const { Step } = Steps;


export const OperationalStandard = () => {

  const [ viewType, setViewType ] = useState(1);
  const [ previewVis, setPreviewVis ] = useState(false);
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();

  const {
    called,
    data: {
      list
    }
  } = useSelector(qualityIndicatorSelector)

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
    dispatch(getAllQualityIndicator({
      accessToken
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!list) return;
    console.log(list);
  }, [list])


  let chartData = [ 20, 75, 98, 10, 0, 0, 50, 73, 20, 10, 80, 46 ];

  const steps = [
    {
      title: 'Tahap 1',
      content: <OperationalStandardFirstStep onChangeForm={() => {}}/>,
    },
    {
      title: 'Tahap 2',
      content: <OperationalStandardSecondStep />,
    },
    {
      title: 'Tahap 3',
      content: <OperationalStandardThirdStep />,
    }
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Layout>
      <AntdSider className="sider">
        <div className="sider-content">
          <Title level={2}>SOP</Title>
          <Text>Senin, 09 Agustus 2021</Text>
        </div>
      </AntdSider>

      <Content className="main-content operational-standard">
        <Breadcrumb separator=">" className="breadcrumb">
          <Breadcrumb.Item href={paths.QUALITY_INDICATOR} className="breadcrumb__item">
            <HomeFilled className="icon icon--default" />
            <span>Home</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href={paths.QUALITY_INDICATOR} className="breadcrumb__item">
            <span>Dokumen</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcrumb__item breadcrumb__item--active">
            SOP
          </Breadcrumb.Item>
        </Breadcrumb>
        
        <Steps current={current}>
          {
            steps.map((item, index) => (
              <Step key={index} title={item.title} />
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
              <Button type="primary" onClick={() => {}}>
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