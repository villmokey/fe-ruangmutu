import { Col, Layout, Row, Skeleton } from "antd";
import { Card } from "../../../atoms/Card/Card";
import { Title } from "../../../atoms/Title/Title";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { monthAcronymID } from "../../../../globals/monthLabel";
import { fetchApiGet } from "../../../../globals/fetchApi";
import { DashboardSider } from "../../../organism/Dashboard/Sider/DashboardSider/QualityIndicatorSider";
import { DashboardChart } from "../../../molecules/DashboardChart/DashboardChart";
import moment from "moment";
import "moment/locale/id";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";
import { Text } from "../../../atoms/Text/Text";
import Documents from "./Component/Documents";
const { Content } = Layout;

export const DashboardPage = () => {
  const { getAccessToken } = useAuthToken();
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const [totalResult, setTotalResult] = useState({
    all: "",
    selected: "",
    unreached: "",
  });
  const [filter, setFilter] = useState({
    year: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [indicators, setIndicators] = useState([]);
  const [performances, setPerformances] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [satisfactions, setSatisfactions] = useState([]);
  const [legends, setLegends] = useState([]);
  const [realized, setRealised] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [documentInfo, setDocumentInfo] = useState({
    this_year: 0,
    total: 0,
  });

  const fetchIndicator = () => {
    fetchApiGet(
      "/dashboard/recap/indicator",
      { year: filter.year ?? undefined },
      accessToken
    ).then((res) => {
      if (res && res.success) {
        const temporary = res.data.results;
        const results = [];
        monthAcronymID.forEach((month, index) => {
          let finder = temporary.find((x) => x.month_number === index + 1);
          if (finder) {
            results.push({ ...finder, month: month });
          } else {
            results.push({
              average: 0,
              indicator_total: 0,
              month_number: index + 1,
              month: month,
            });
          }
        });
        setIndicators(results);
      }
    });
  };

  const fetchPerformance = () => {
    fetchApiGet(
      "/dashboard/recap/performance",
      { year: filter.year ?? undefined },
      accessToken
    ).then((res) => {
      if (res && res.success) {
        const temporary = res.data.results;
        const results = [];
        monthAcronymID.forEach((month, index) => {
          let finder = temporary.find((x) => x.month_number === index + 1);
          if (finder) {
            results.push({ ...finder, month: month });
          } else {
            results.push({
              average: 0,
              indicator_total: 0,
              month_number: index + 1,
              month: month,
            });
          }
        });
        setPerformances(results);
      }
    });
  };

  const fetchComplaint = () => {
    fetchApiGet(
      "/dashboard/recap/complaint",
      { year: filter.year ?? undefined },
      accessToken
    ).then((res) => {
      if (res && res.success) {
        console.log(res.data.results);
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
        setComplaints(results);
      }
    });
  };

  const fetchSatisfaction = () => {
    fetchApiGet(
      "/dashboard/recap/satisfaction",
      { year: filter.year ?? undefined },
      accessToken
    ).then((res) => {
      if (res && res.success) {
        const temporary = res.data;
        console.log("res.data.results", res.data);
        let results = [];
        let names = temporary.map((item) => {
          return {
            name: item.health_service,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          };
        });
        setLegends(names);
        monthAcronymID.forEach((month, index) => {
          let temp = [];
          temporary.forEach((item, key) => {
            let finder = item.result.find((x) => Number(x.month) === index + 1);
            if (finder) {
              temp = {
                ...temp,
                [names[key].name]: finder.average,
              };
            } else {
              temp = {
                ...temp,
                [names[key].name]: 0,
              };
            }
          });
          results.push({ ...temp, month: month });
        });
        console.log("satisfactions", results);
        setSatisfactions(results);
      }
    });
  };

  const fetchEvents = () => {
    fetchApiGet("/dashboard/event/information", {}, accessToken).then((res) => {
      if (res) {
        if (res && res.success) {
          setRealised(res.data.realized);
          setUpcoming(res.data.upcoming);
        }
      }
    });
  };

  const fetchDocumentInfo = () => {
    fetchApiGet("/dashboard/document/information", {}, accessToken).then(
      (res) => {
        if (res) {
          if (res && res.success) {
            setDocumentInfo({
              this_year: res.data.this_year,
              total: res.data.total,
            });
          }
        }
      }
    );
  };

  useEffect(() => {
    fetchEvents();
    fetchDocumentInfo();
  }, []);

  useEffect(() => {
    fetchIndicator();
    fetchPerformance();
    fetchComplaint();
    fetchSatisfaction();
  }, [filter]);

  return (
    <Layout>
      <DashboardSider
        onFilter={(value) => {
          setFilter(value);
        }}
      />
      <Content className="main-content">
        <Row justify="center" align="middle" gutter={[24, 16]}>
          {realized && realized.length > 0 && (
            <Col>
              <div className="total-bg">
                <Link className="link-to" to={"/dashboard/calender/"}>
                  Kegiatan Terealisasi
                </Link>
                <Card className="total">
                  <Swiper
                    pagination={true}
                    modules={[Pagination]}
                    className="mySwiper"
                  >
                    {realized &&
                      realized.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div
                            style={{
                              height: "140px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div>
                              <p className="card-title">{item.name}</p>
                              <p className="card-date">
                                {moment(item.start_date).format("DD MMMM YYYY")}
                              </p>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </Card>
              </div>
            </Col>
          )}
          <Col>
            <div className="total-bg">
              <Link className="link-to" to={"/dashboard/quality-cupboard/"}>
                Dokumen Terverifikasi
              </Link>
              <Card className="total">
                <Swiper
                  pagination={true}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <div
                      style={{
                        height: "140px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        <p className="card-typograph">DOKUMEN</p>
                        <p className="card-amount">{documentInfo.total}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div
                      style={{
                        height: "140px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        <p className="card-typograph">DOKUMEN TAHUN INI</p>
                        <p className="card-amount">{documentInfo.this_year}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </Card>
            </div>
          </Col>
          {upcoming && upcoming.length > 0 && (
            <Col>
              <div className="total-bg">
                <Link className="link-to" to={"/dashboard/calender/"}>
                  Kegiatan Akan Datang
                </Link>
                <Card className="total">
                  <Swiper
                    pagination={true}
                    modules={[Pagination]}
                    className="mySwiper"
                  >
                    {upcoming &&
                      upcoming.map((up, index) => (
                        <SwiperSlide key={"upcoming-" + index}>
                          <div
                            style={{
                              height: "140px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div>
                              <p className="card-title">{up.name}</p>
                              <p className="card-date">
                                {moment(up.start_date).format("DD MMMM YYYY")}
                              </p>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </Card>
              </div>
            </Col>
          )}
        </Row>
        <Row style={{ marginTop: "50px" }}>
          <Col>
            <Title level={4}>Dokumen Terbaru</Title>
          </Col>
          <Col span={24}>
            <Documents />
          </Col>
        </Row>
        <Row style={{ marginTop: "50px", marginBottom: "-20px" }}>
          <Col>
            <Title level={4}>Grafik Capaian</Title>
          </Col>
        </Row>
        <div className="indikator-mutu-container">
          {!loading ? (
            <>
              <DashboardChart
                chartData={performances}
                title={"Capaian Indikator Kinerja"}
                moduleName={"performance"}
                description={"Rekap Hasil Pencapaian Indikator Kinerja Bulanan"}
                className="indikator-mutu"
              />

              <DashboardChart
                chartData={indicators}
                moduleName={"indicator"}
                description={"Rekap Hasil Pencapaian Indikator Mutu Bulanan"}
                title={"Capaian Indikator Mutu"}
                className="indikator-mutu"
              />

              <DashboardChart
                chartData={complaints}
                title={"Keluhan Pelanggan"}
                moduleName={"complaint"}
                description={"Rekap Hasil Keluhan Pelanggan Bulanan"}
                className="indikator-mutu"
              />

              <DashboardChart
                chartData={satisfactions}
                title={"Tingkat Kepuasan Layanan"}
                moduleName={"satisfaction"}
                description={"Rekap Hasil Tingkat Kepuasan Layanan Bulanan"}
                legends={legends}
                className="indikator-mutu"
              />
            </>
          ) : (
            <Skeleton style={{ textAlign: "center" }}>Loading</Skeleton>
          )}
        </div>
      </Content>
    </Layout>
  );
};
