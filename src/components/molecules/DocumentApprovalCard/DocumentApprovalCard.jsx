import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Col, message, Popconfirm, Row, Space } from "antd";
import { useRef } from "react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import ChartAnnotation from "chartjs-plugin-annotation";
import { fetchApiGet, fetchApiPost } from "../../../globals/fetchApi";
import {
  monthAcronymID,
  monthLowerWithObjID,
} from "../../../globals/monthLabel";
import { useAuthToken } from "../../../globals/useAuthToken";
import { Card } from "../../atoms/Card/Card";
import { Text } from "../../atoms/Text/Text";
import { Title } from "../../atoms/Title/Title";
import { PerformanceIndicatorPreview } from "../../templates/PerformanceIndicatorTemplates/Preview/PerformanceIndicatorPreview";
import { QualityIndicatorPreview } from "../../templates/QualityIndicatorTemplates/Preview/QualityIndicatorPreview";

export const DocumentApprovalCard = ({
  documentApprovalTitle,
  documentApprovalCreatedAt,
  documentApproval1Date,
  documentApproval2Date,
  documentApproval3Date,
  profileId,
  indicatorID,
  type,
  month,
  // onEdit,
  onSubmit,
  generated = false,
  onGenerateSuccess,
  signature = [],
  user1,
  user2,
  user3,
  module,
  createdBy,
  isApproved,
  onApprove,
  onReject,
  status,
}) => {
  const [previewData, setPreviewData] = useState({}); //eslint-disable-line
  const [tempChartData, setTempChartData] = useState([]);
  const [previewVis, setPreviewVis] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [chartData, setChartData] = useState({});
  const [profileTarget, setProfileTarget] = useState(0);
  const [detail, setDetail] = useState({});
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const chartRef = useRef(null);
  const [previewProfileOnIndicator, setPreviewProfileOnIndicator] =
    useState(false);

  const chartOption = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: "",
      },
      annotation: {
        annotations: [
          {
            id: "slo",
            type: "line",
            mode: "horizontal",
            value: profileTarget,
            scaleID: "y",
            borderWidth: 1,
            borderDash: [10, 1],
            label: {
              enabled: false,
              position: "start",
            },
          },
        ],
      },
      beforeDraw: (chart) => {
        const { ctx } = chart;
        ctx.save();
        ctx.register(ChartAnnotation);
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = "lightGreen";
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 25,
        },
      },
    },
  };

  const fetchChartData = async () => {
    await fetchApiGet(`/indicator-profile/chart/${profileId}`, {}, accessToken)
      .then((res) => {
        if (res) {
          console.log(res.data);
          setProfileTarget(res.data.profile_target);
          setChartData(res.data);
          // setPreviewVis(true);
        }
      })
      .catch((e) => console.log(e.getMessage()));
  };

  const directFetchChartData = async () => {
    await fetchApiGet(`/indicator-profile/chart/${profileId}`, {}, accessToken)
      .then((response) => {
        if (response && response.data && response.data.data) {
          let data = response.data.data;
          let monthList = monthLowerWithObjID;
          let monthsTarget = [];

          monthList.forEach((m) => {
            let finder = data.find((c) => c.month === m.month);
            if (finder) {
              monthsTarget.push({
                month: m.month,
                order: m.order,
                value: finder.value,
              });
            } else {
              monthsTarget.push({
                month: m.month,
                order: m.order,
                value: 0,
              });
            }
          });

          let results = [];
          monthsTarget.forEach((x, key) => {
            results.push({
              month: monthAcronymID[key],
              value: x.value,
            });
          });

          setTempChartData(results);
          setTimeout(async () => {
            let bags = new FormData();
            bags.set("group_name", "indicator_chart");
            bags.set("is_base_64", true);
            bags.set("file", chartRef.current.toBase64Image("image/png"));

            await fetchApiPost("/upload/file", accessToken, {
              group_name: "indicator_chart",
              is_base_64: true,
              file: chartRef.current.toBase64Image("image/png"),
            }).then(async (file) => {
              if (file && file.success) {
                await fetchApiGet(
                  `/indicator/${indicatorID}/${file.data.id}/generate`,
                  null,
                  accessToken
                )
                  .then((res) => {
                    if (res && res.success) {
                      onGenerateSuccess()
                      message.success(res.message);
                    } else {
                      message.warning(
                        res.message ?? "Terjadi kesalahan silahkan coba lagi!"
                      );
                    }
                  })
                  .catch()
                  .finally(() => setLoadingGenerate(false));
              }
            });
          }, 3000);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const fetchIndicatorDetail = async () => {
    await fetchApiGet(`/indicator/${indicatorID}`, {}, accessToken)
      .then((res) => {
        if (res) {
          setDetail(res.data);
          setPreviewVis(true);
        }
      })
      .catch((e) => console.log(e.getMessage()));
  };

  const fetchIndicatorProfileDetail = async () => {
    await fetchApiGet(`/indicator-profile/${indicatorID}`, {}, accessToken)
      .then((res) => {
        if (res) {
          setDetail(res.data);
          setPreviewVis(true);
        }
      })
      .catch((e) => console.log(e.getMessage()));
  };

  const handlePreview = async () => {
    if (type === "indicator") {
      await fetchChartData().then(() => {
        fetchIndicatorDetail();
      });
    } else {
      await fetchIndicatorProfileDetail();
    }
  };

  const renderCardStyle = () => {
    let style = {};
    if (isApproved && status !== -1) {
      style = {
        color: "white",
        backgroundColor: "#6A9695",
        margin: "10px 0px",
      };
    } else if (!isApproved && status === -1) {
      style = {
        color: "white",
        backgroundColor: "#ff7875",
        margin: "10px 0px",
      };
    } else if (!isApproved) {
      style = {
        margin: "10px 0px",
      };
    }

    return style;
  };

  const renderFontStyle = () => {
    let style = {};
    if (isApproved && status !== -1) {
      style = {
        color: "white",
      };
    } else if (!isApproved && status === -1) {
      style = {
        color: "white",
      };
    } else if (!isApproved) {
      style = {};
    }

    return style;
  };

  const handlePreviewProfile = async () => {
    await fetchApiGet(`/indicator-profile/${profileId}`, {}, accessToken)
      .then((res) => {
        if (res) {
          setDetail(res.data);
          setPreviewProfileOnIndicator(true);
        }
      })
      .catch((e) => console.log(e.getMessage()));
  };

  const getBarColor = (value) => {
    if (value > profileTarget) {
      return "#5F5DC8";
    } else if (value === profileTarget) {
      return "#6CC85D";
    } else if (value >= profileTarget / 2 && value < profileTarget) {
      return "#C8BD5D";
    } else {
      return "#C85D5D";
    }
  };

  const handleGenerate = async (id) => {
    setLoadingGenerate(true);
    if (type === "profile") {
      await fetchApiGet(`/indicator-profile/generate/${id}`, {}, accessToken)
        .then((res) => {
          if (res && res.success) {
            onGenerateSuccess()
            message.success(res.message);
          } else {
            message.warning(
              "Terjadi kesalahan, silahkan coba beberapa saat lagi!"
            );
          }
        })
        .catch()
        .finally(() => setLoadingGenerate(false));
    } else {
      await directFetchChartData()
        .then(() => {
          console.log("directFetchChartData", true);
        })
        .catch();
    }
  };

  const ApprovedButton = () => {
    return (
      <Space>
        <Popconfirm
          title="Anda yakin akan menyetujui pengajuan ini?"
          okText="Ya"
          cancelText="Tidak"
          onConfirm={() => onApprove(indicatorID)}
        >
          <Button
            type="primary"
            icon={<CheckOutlined />}
            shape="circle"
            size="large"
          />
        </Popconfirm>
        <Popconfirm
          title="Anda yakin ingin menolak pengajuan ini?"
          okText="Ya"
          cancelText="Tidak"
          onConfirm={() => onReject(indicatorID)}
        >
          <Button
            type="danger"
            icon={<CloseOutlined />}
            shape="circle"
            size="large"
          />
        </Popconfirm>
      </Space>
    );
  };

  return (
    <Card style={renderCardStyle()}>
      <Row style={{ margin: "10px 0px" }} align="middle">
        <Col sm={12} md={6} lg={6}>
          <Space direction="vertical">
            <Text style={renderFontStyle()}>Judul Dokumen Approval </Text>
            <Title level={4} style={renderFontStyle()}>
              {documentApprovalTitle}{" "}
              {type === "indicator"
                ? `(${month ? month.toUpperCase() : ""})`
                : ""}
            </Title>
          </Space>
        </Col>
        <Col sm={12} md={6} lg={5}>
          <Space direction="vertical">
            <Text style={renderFontStyle()}>
              Tanggal Approval Pembuat Dokumen{" "}
            </Text>
            <Text style={renderFontStyle()}>{user1}</Text>
            <Title level={4} style={renderFontStyle()}>
              {documentApproval1Date}
            </Title>
          </Space>
        </Col>
        <Col sm={12} md={6} lg={4}>
          <Space direction="vertical">
            <Text style={renderFontStyle()}>
              Tanggal Approval PenanggungJawab 1{" "}
            </Text>
            <Text style={renderFontStyle()}>{user2}</Text>
            <Title level={4} style={renderFontStyle()}>
              {documentApproval2Date}
            </Title>
          </Space>
        </Col>
        <Col sm={12} md={6} lg={5}>
          <Space direction="vertical">
            <Text style={renderFontStyle()}>
              Tanggal Approval PenanggungJawab 2{" "}
            </Text>
            <Text style={renderFontStyle()}>{user3}</Text>
            <Title level={4} style={renderFontStyle()}>
              {documentApproval3Date}
            </Title>
          </Space>
        </Col>
        <Col sm={12} md={6} lg={3}>
          {isApproved ? (
            <Title level={3} style={{ color: "white" }}>
              Telah Disetujui oleh Anda
            </Title>
          ) : !isApproved && status === -1 ? (
            <Title level={3} style={{ color: "white" }}>
              Ditolak
            </Title>
          ) : (
            <ApprovedButton />
          )}
        </Col>
      </Row>
      <Row style={{ margin: "10px 0px" }}>
        <Col>
          <Text style={renderFontStyle()}>Dibuat Oleh : {createdBy}</Text>
        </Col>
      </Row>
      <Row>
        <Col>
          <Text style={renderFontStyle()}>
            Tanggal dokumen dibuat : {documentApprovalCreatedAt}
          </Text>
        </Col>
      </Row>
      <Row style={{ marginTop: "10px" }} gutter={[8, 8]}>
        <Col>
          <Button type="dashed" size="small" onClick={() => handlePreview()}>
            <Text style={{ color: "black" }}>Preview</Text>
          </Button>
        </Col>
        {type === "indicator" && (
          <Col>
            <Button
              onClick={() => handlePreviewProfile()}
              size="small"
              type="dashed"
            >
              Preview Profil Indikator
            </Button>
          </Col>
        )}
        {signature && !signature.some((sign) => sign.signed === 0) && (
          <Col>
            {!generated ? (
              <Popconfirm
                title="Generate hanya bisa dilakukan sekali, lanjutkan?"
                onConfirm={() => handleGenerate(indicatorID)}
              >
                <Button
                  // onClick={() => handleGenerate(indicatorID)}
                  size="small"
                  type="dashed"
                  loading={loadingGenerate}
                >
                  Generate
                </Button>
              </Popconfirm>
            ) : (
              <p
                style={{
                  border: "1px solid white",
                  fontStyle: "italic",
                  padding: "0 5px",
                }}
              >
                Sudah Digenerate
              </p>
            )}
          </Col>
        )}
      </Row>
      {tempChartData && tempChartData.length > 0 && (
        <Row style={{ contentVisibility: "hidden" }}>
          <Bar
            ref={chartRef}
            options={chartOption}
            data={{
              labels:
                tempChartData && tempChartData.length > 0
                  ? tempChartData.map((x) => {
                      return x.month;
                    })
                  : [],
              datasets: [
                {
                  label: "Quality Indicator",
                  data:
                    tempChartData &&
                    tempChartData.map((x) => {
                      return x.value;
                    }),
                  backgroundColor:
                    tempChartData &&
                    tempChartData.map((x) => {
                      return getBarColor(x.value);
                    }),
                },
              ],
            }}
          />
        </Row>
      )}
      {previewVis &&
        (module === "quality" ? (
          <QualityIndicatorPreview
            chartData={chartData.data}
            isProfile={type === "profile"}
            baseline={chartData.profile_target}
            detail={detail}
            hideQr
            indicator={previewData}
            visibility={previewVis}
            onClose={() => setPreviewVis(false)}
          />
        ) : (
          <PerformanceIndicatorPreview
            chartData={[]}
            isProfile={type === "profile"}
            baseline={chartData.profile_target}
            detail={detail}
            hideQr
            indicator={previewData}
            visibility={previewVis}
            onClose={() => setPreviewVis(false)}
          />
        ))}

      <QualityIndicatorPreview
        chartData={[]}
        isProfile={true}
        baseline={chartData.profile_target}
        detail={detail}
        hideQr
        indicator={previewData}
        visibility={previewProfileOnIndicator}
        onClose={() => setPreviewProfileOnIndicator(false)}
      />
    </Card>
  );
};
