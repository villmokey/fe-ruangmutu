import {
  Breadcrumb,
  Button,
  Col,
  Layout,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
} from "antd";
import { Card } from "../../../atoms/Card/Card";
import { Title } from "../../../atoms/Title/Title";
import { InputSearch } from "../../../atoms/InputSearch/InputSearch";
import { OrderedListOutlined, PlusOutlined } from "@ant-design/icons";

import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../../../routing/paths";
import { SatisfactionServiceSider } from "../../../organism/Dashboard/Sider/SatisfactionServiceSider/SatisfactionServiceSider";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { SatisfactionServiceChart } from "../../../molecules/SatisfactionService/SatisfactionServiceChart";
import { qualityIndicatorSelector } from "../../../../redux/modules/qualityIndicator/action";
import { FileTextOutlined } from "@ant-design/icons";
import { fetchApiGet } from "../../../../globals/fetchApi";
import { SatisfactionServiceCardView } from "./View/Cardview";
import { SatisfactionServiceListView } from "./View/ListView";
import { monthAcronymID } from "../../../../globals/monthLabel";
import { HomeFilled } from "@ant-design/icons";
import { Box, Pagination, Grid } from "@mui/material";
import ComplaintChart from "../../../molecules/DashboardChart/Chart/ComplaintChart";
import moment from "moment";

const { Content } = Layout;

export const SatisfactionService = () => {
  const [viewType, setViewType] = useState(1);
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [programs, setPrograms] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [complaintChart, setComplaintChart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState("asc");
  const [paginationProps, setPaginationProps] = useState({
    total: 0,
    from: 0,
    to: 0,
  });
  const [totalResult, setTotalResult] = useState({
    in: "0",
    complete: "0",
  });
  const [filter, setFilter] = useState({
    year: undefined,
    program_id: undefined,
    type: undefined,
  });
  const {
    data: { list },
  } = useSelector(qualityIndicatorSelector);

  const fetchComplaintChart = async () => {
    fetchApiGet(
      "/dashboard/recap/complaint",
      { year: undefined },
      accessToken
    ).then((res) => {
      if (res && res.success) {
        const temporary = res.data.results;
        const results = [];
        monthAcronymID.forEach((month, index) => {
          let finder = temporary.find((x) => x.month === index + 1);
          if (finder) {
            results.push({ ...finder, month: month });
          } else {
            results.push({
              done: 0,
              month: month,
              pending: 0,
            });
          }
        });
        setComplaintChart(results);
      }
    });
  };

  const fetchComplaints = () => {
    setLoading(true);
    fetchApiGet(
      "/complaint",
      {
        per_page: 12,
        page: page,
        search: search,
        sort_by: "report",
        sort: sorting,
      },
      accessToken
    ).then((res) => {
      if (res && res.success) {
        setLoading(false);
        setTotalPage(res.data.last_page);
        setPaginationProps({
          from: res.data.from,
          to: res.data.to,
          total: res.data.total,
        });
        setComplaints(res.data.data);
      }
    });
  };

  const fetchInformation = () => {
    setLoading(true);
    fetchApiGet("/satisfaction/info", {}, accessToken).then((res) => {
      if (res && res.success) {
        if (res && res.data) {
          setTotalResult({
            in: res.data.complaint_in,
            complete: res.data.complaint_done,
          });
        }
      }
    });
  };

  const fetchPrograms = () => {
    fetchApiGet("/program", { paginate: false }, accessToken).then((res) => {
      if (res && res.success) {
        setPrograms(res.data);
      }
    });
  };

  const handleChangeViewType = () => {
    setViewType(viewType === 1 ? 2 : 1);
  };

  const fetchData = async (data) => {
    await fetchApiGet("/satisfaction/chart", {}, accessToken).then((res) => {
      if (res && res.code === 200) {
        let response = res.data;
        let results = [];
        if (response && response.length > 0) {
          response.forEach((data) => {
            let temp = {
              health_service: data.health_service,
              year: data.year,
            };
            let perMonth = [];
            data.result.forEach((item) => {
              monthAcronymID.forEach((month, index) => {
                if (index + 1 === Number(item.month)) {
                  perMonth.push({
                    month: month,
                    average: item.average,
                    detail: item.satisfaction_detail,
                  });
                }
              });
            });
            let finals = [];
            monthAcronymID.forEach((item) => {
              let findMe = perMonth.find((x) => x.month === item);
              if (findMe) {
                finals.push(findMe);
              } else {
                finals.push({
                  month: item,
                  average: 0,
                  detail: null,
                });
              }
            });
            let avg = 0;
            finals.forEach((item) => {
              avg += item.average;
            });
            temp.chart = finals;
            temp.accumulative = avg;
            results.push(temp);
          });
        }
        setChartData(results);
      }
    });
  };

  useEffect(() => {
    fetchInformation();
    fetchComplaintChart();
    fetchPrograms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchComplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, page, search, sorting]);

  useEffect(() => {
    fetchData();
  }, [list]); //eslint-disable-line

  return (
    <Layout>
      <SatisfactionServiceSider
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
            Kepuasan Layanan
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row justify="center" align="middle" gutter={[24, 16]}>
          <Col>
            <Card className="total">
              <p className="card-title">KELUHAN MASUK</p>
              <Title className="card-content">{totalResult.in}</Title>
            </Card>
          </Col>
          <Col>
            <Card className="total">
              <p className="card-title">KELUHAN TERTANGANI</p>
              <Title className="card-content">{totalResult.complete}</Title>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: "30px" }}>
          {chartData &&
            chartData.length > 0 &&
            chartData.map((item, index) => (
              <Col span={24} key={index}>
                <SatisfactionServiceChart
                  chartData={item.chart ?? []}
                  title={`Tingkat Kepuasan Layanan ${item.health_service}`}
                  average={item.accumulative}
                  year={`Tahun Mutu ${item.year}`}
                  className="indikator-mutu"
                />
              </Col>
            ))}
          <Col span={24}>
            <Card>
              <Title level={5}>Keluhan Pelanggan</Title>
              <p
                className="ant-typography"
                style={{ marginBottom: "7px", fontStyle: "italic" }}
              >
                Tahun Mutu {moment().format("YYYY")}
              </p>
              <ComplaintChart chartData={complaintChart ?? []} />
            </Card>
          </Col>
        </Row>
        <Row justify="end" style={{ marginTop: 40 }} gutter={[8]}>
          <Col>
            <InputSearch size="large" onSearch={(e) => setSearch(e)} />
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
                viewType === 1 ? <OrderedListOutlined /> : <FileTextOutlined />
              }
              size="large"
              style={{ borderRadius: 8 }}
              onClick={handleChangeViewType}
            />
          </Col>
        </Row>
        <div className="indikator-mutu-container">
          {!loading ? (
            viewType === 1 ? (
              <SatisfactionServiceCardView
                lists={complaints}
                onRefresh={() => fetchComplaints()}
              />
            ) : (
              <SatisfactionServiceListView
                onSort={() => setSorting(sorting === "asc" ? "desc" : "asc")}
                sort={sorting}
                pages={totalPage}
                satisafactions={complaints}
                onPageChange={(p) => console.log(p)}
              />
            )
          ) : (
            <Skeleton style={{ textAlign: "center" }}>Loading</Skeleton>
          )}
        </div>
        <Grid container alignItems={"center"} marginTop={"20px"}>
          <Grid item xs={12} sm={12} md={6}>
            <Typography style={{ color: "rgb(168 168 168 / 85%)" }}>
              Menampilkan {paginationProps.from} - {paginationProps.to} dari{" "}
              {paginationProps.total}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box width={"100%"} display={"flex"} justifyContent={"end"}>
              <Pagination
                sx={{ marginTop: "20px" }}
                count={totalPage}
                color="standard"
                page={page}
                onChange={(e, p) => {
                  setPage(p);
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Content>
    </Layout>
  );
};
