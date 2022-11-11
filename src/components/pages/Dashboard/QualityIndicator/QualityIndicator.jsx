import {
  Breadcrumb,
  Button,
  Col,
  Layout,
  Row,
  Skeleton,
  Space,
  Tag,
} from "antd";
import { Card } from "../../../atoms/Card/Card";
import { Title } from "../../../atoms/Title/Title";

import "./QualityIndicator.less";
import { InputSearch } from "../../../atoms/InputSearch/InputSearch";
import { PlusOutlined } from "@ant-design/icons";

import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../../../routing/paths";
import { QualityIndicatorSider } from "../../../organism/Dashboard/Sider/QualityIndicatorSider/QualityIndicatorSider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { QualityIndicatorChart } from "../../../molecules/QualityIndicatorChart/QualityIndicatorChart";
import {
  getAllQualityIndicator,
  qualityIndicatorSelector,
} from "../../../../redux/modules/qualityIndicator/action";
import {
  monthLowerWithObjID,
  monthAcronymID,
} from "../../../../globals/monthLabel";
import { FileTextOutlined, BarChartOutlined } from "@ant-design/icons";
import { fetchApiGet } from "../../../../globals/fetchApi";
import QualityIndicatorCardview from "./View/Cardview";
import { HomeFilled } from "@ant-design/icons";
import { Box } from "@mui/material";

const { Content } = Layout;

export const QualityIndicator = () => {
  const [viewType, setViewType] = useState(1);
  const dispatch = useDispatch();
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [programs, setPrograms] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [totalResult, setTotalResult] = useState({
    all: "",
    selected: "",
    unreached: "",
  });
  const [filter, setFilter] = useState({
    year: undefined,
    program_id: undefined,
    document_type: undefined,
  });
  const {
    data: { list },
    loading,
  } = useSelector(qualityIndicatorSelector);

  const [chartDataSource, setChartDataSource] = useState(null);

  const fetchQuality = () => {
    dispatch(
      getAllQualityIndicator({
        accessToken,
        filter: {
          type: "quality",
          year: filter.year !== undefined ? filter.year : "",
          program_id: filter.program_id !== undefined ? filter.program_id : "",
          search: search,
        },
      })
    );
  };

  const fetchPrograms = () => {
    fetchApiGet("/program", { paginate: false }, accessToken).then((res) => {
      if (res && res.success) {
        setPrograms(res.data ?? []);
      }
    });
  };

  useEffect(() => {
    fetchPrograms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchQuality();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, search]);

  useEffect(() => {
    if (!list) return;
    fetchData(list);
  }, [list]);

  const handleChangeViewType = () => {
    setViewType(viewType === 1 ? 2 : 1);
  };

  const fetchData = (data) => {
    let monthList = monthLowerWithObjID;
    setTotalResult({
      all: data.total_all,
      selected: data.total_selected,
      unreached: data.total_unreached,
    });
    const fetch = data.result.map((item, index) => {
      let monthsTarget = [];
      if (item.month.length) {
        monthList.forEach((month, index) => {
          // if month does not exist, push the unexisting month
          let thisMonth = item.month.findIndex(
            (obj) => obj.month === month.month
          );
          if (thisMonth === -1) {
            item.month.push({
              month: month.month,
              month_target: 0,
              order: month.order,
            });
          } else {
            item.month[thisMonth] = {
              ...item.month[thisMonth],
              order: month.order,
            };
          }
        });
        let sortedMonth = item.month.sort((a, b) => a.order - b.order);
        sortedMonth.forEach((item, index) =>
          monthsTarget.push({
            month: monthAcronymID[index],
            capaian: item.month_target ?? 0,
          })
        );
      }

      return {
        id: item.id,
        key: index,
        title: `${item.sub_program.name} - ${item.title}`,
        year: `Tahun Mutu ${item.year}`,
        monthlyData: item.month.length ? item.month : null,
        target: item.achievement_target,
        chartData: monthsTarget,
        created_at: item.created_at,
        status: item.status,
      };
    });
    setChartDataSource(fetch);
  };

  return (
    <Layout>
      <QualityIndicatorSider
        onFilter={(value) => {
          setFilter(value);
        }}
      />
      <Content className="main-content">
        <Breadcrumb separator=">" className="breadcrumb">
          <Breadcrumb.Item href={"/dashboard"} className="breadcrumb__item">
            <HomeFilled className="icon icon--default" />
            <span>Home</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcrumb__item breadcrumb__item--active">
            Indikator Mutu
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row justify="center" align="middle" gutter={[24, 16]}>
          <Col>
            <Card className="total">
              <p className="card-title">TOTAL INDIKATOR</p>
              <p className="card-title">MUTU</p>
              <Title className="card-content">{totalResult.all}</Title>
            </Card>
          </Col>
          <Col>
            <Card className="total">
              <p className="card-title">INDIKATOR MUTU</p>
              <p className="card-title">TERPILIH</p>
              <Title className="card-content">{totalResult.selected}</Title>
            </Card>
          </Col>
          <Col>
            <Card className="total">
              <p className="card-title">BELUM</p>
              <p className="card-title">TERCAPAI</p>
              <Title className="card-content">{totalResult.unreached}</Title>
            </Card>
          </Col>
        </Row>
        <Row justify="end" style={{ marginTop: 40 }} gutter={[8]}>
          <Col>
            <InputSearch size="large" onSearch={(value) => setSearch(value)} />
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
          <Col style={{ marginRight: "auto" }}>
            <Space>
              {filter.program_id ? (
                programs.map(
                  (prog) =>
                    filter.program_id.some((x) => x === prog.id) && (
                      <Tag color="#6A9695">{prog.name}</Tag>
                    )
                )
              ) : (
                <Tag color="#6A9695">SEMUA UNIT</Tag>
              )}

              {filter.year && <Tag color="#6A9695">{filter.year}</Tag>}
              {filter.type && (
                <Tag color="#6A9695">
                  {filter.type === "indicator_profile"
                    ? "PROFIL INDIKATOR"
                    : filter.type === "indicator"
                    ? "INDIKATOR MUTU"
                    : "SEMUA DOKUMEN"}
                </Tag>
              )}
            </Space>
          </Col>
          <Col style={{ marginLeft: "auto" }}>
            <Button
              type="primary"
              icon={
                viewType === 1 ? <FileTextOutlined /> : <BarChartOutlined />
              }
              size="large"
              style={{ borderRadius: 8 }}
              onClick={handleChangeViewType}
            />
          </Col>
        </Row>
        <div className="indikator-mutu-container">
          {!loading ? (
            viewType === 2 ? (
              <QualityIndicatorCardview filter={filter} search={search} />
            ) : (
              <>
                {chartDataSource && chartDataSource.length > 0 ? (
                  chartDataSource.map((item, index) => (
                    <QualityIndicatorChart
                      key={item.title}
                      chartData={item.chartData}
                      title={item.title}
                      average={item.target}
                      year={item.year}
                      className="indikator-mutu"
                      data={item.monthlyData}
                    />
                  ))
                ) : (
                  <Box margin={"40px 0"} textAlign={"center"}>
                    <p>Oops, Belum ada data</p>
                  </Box>
                )}
              </>
            )
          ) : (
            <Skeleton style={{ textAlign: "center" }}>Loading</Skeleton>
          )}
        </div>
      </Content>
    </Layout>
  );
};
