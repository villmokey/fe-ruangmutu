import { Button, Col, Layout, Row, Space, Tag } from "antd";
import { Card } from '../../../atoms/Card/Card';
import { Title } from "../../../atoms/Title/Title";

import './QualityIndicator.less';
import { InputSearch } from "../../../atoms/InputSearch/InputSearch";
import { PlusOutlined } from "@ant-design/icons";

import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../../../routing/paths";
// import { QualityIndicatorCard } from "../../../molecules/QualityIndicatorCard/QualityIndicatorCard";
import { QualityIndicatorSider } from "../../../organism/Dashboard/Sider/QualityIndicatorSider/QualityIndicatorSider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { QualityIndicatorChart } from "../../../molecules/QualityIndicatorChart/QualityIndicatorChart";
import { getAllQualityIndicator, qualityIndicatorSelector } from "../../../../redux/modules/qualityIndicator/action";
import { monthLowerWithObjID } from "../../../../globals/monthLabel";


const { Content } = Layout;


export const QualityIndicator = () => {

  // const [ viewType, setViewType ] = useState(1);
  // const [ previewVis, setPreviewVis ] = useState(false);
  const dispatch = useDispatch();
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();

  const {
    data: {
      list
    }
  } = useSelector(qualityIndicatorSelector)

  const [ chartDataSource, setChartDataSource ] = useState(null);

  useEffect(() => {
    dispatch(getAllQualityIndicator({
      accessToken
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!list) return;
    fetchData(list);
  }, [list])

  // const handleChangeViewType = () => {
  //   setViewType(viewType === 1 ? 2 : 1);
  // }

  // const handleOpenPreview = () => {
  //   setPreviewVis(true);
  // }

  // const handleClosePreview = () => {
  //   setPreviewVis(false);
  // }

  const fetchData = (data) => {
    let monthList = monthLowerWithObjID;

    const fetch = data.map((item, index) => {
      if (item.month.length) {

        monthList.forEach((month, index) => {

          // if month does not exist, push the unexisting month
          let thisMonth = item.month.findIndex(obj => obj.month === month.month);
          if (thisMonth === -1) {
            item.month.push({ month: month.month, month_target: 0, order: month.order })
          } else {
            item.month[thisMonth] = {
              ...item.month[thisMonth],
              order: month.order
            }
          }
        });

      }

      let sortedMonth = item.month.sort((a, b) => a.order - b.order)
      let monthsTarget = [];
      sortedMonth.forEach(item => monthsTarget.push(item.month_target ?? 0))

      return {
        id: item.id,
        key: index,
        title: `${item.sub_program.name} - ${item.title}`,
        year: `Tahun Mutu ${item.year}`,
        monthlyData: item.month.length ? item.month : null,
        chartData: monthsTarget
      }
    })

    setChartDataSource(fetch);

  }


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
            {/* <Button 
              type="primary" 
              icon={viewType === 1 ? <FileTextOutlined /> : <BarChartOutlined />} 
              size="large" 
              style={{ borderRadius: 8 }}
              onClick={handleChangeViewType}
            /> */}
          </Col>
        </Row>
        <div className="indikator-mutu-container">
          {
            chartDataSource &&
            chartDataSource.map((item, index) => (
              <QualityIndicatorChart
                key={index}
                chartData={item.chartData}
                title={item.title}
                year={item.year}
                className="indikator-mutu"
                data={item.monthlyData}
              />
            ))
          }
          {/* {
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
              {
                chartDataSource &&
                chartDataSource.map((item, index) => (
                  <QualityIndicatorChart
                    key={index}
                    chartData={item.chartData}
                    title={item.title}
                    year={item.year}
                    className="indikator-mutu"
                    data={item.monthlyData}
                  />
                ))

              }
              
            </>
          }
           */}
        </div>
      </Content>
    </Layout>
  )
}