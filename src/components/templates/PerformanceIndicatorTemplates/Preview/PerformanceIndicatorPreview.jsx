import React from "react";
import { Col, Image, Input, Modal, Row, Tag, Space, Checkbox } from "antd";
import { Text } from "../../../atoms/Text/Text";
import { Title } from "../../../atoms/Title/Title";
import { BarChart } from "../../../molecules/Chart/Bar/BarChart";
import {
  dimensiMutuOptions,
  frekuensiPengumpulanDataOptions,
  periodeWaktuPelaporanOptions,
  tipeIndikatorOptions,
} from "../Add/ProfilePerformanceIndicator/SecondStep";
import {
  monthLowerWithObjID,
  monthAcronymID,
} from "../../../../globals/monthLabel";
import "./PerformanceIndicatorPreview.less";
import { LogoGambir, SquareLogo } from "../../../../assets/images";
import { Stack } from "@mui/material";

const Footer = ({ hideQr = false }) => (
  <Row>
    {/* {!hideQr && (
      <Col span={24} style={{ textAlign: "left" }}>
        <QRCode
          value="7a390d5f-09db-497e-95d9-6adff76cc224"
          logoImage={SquareLogo}
          logoWidth={40}
          logoHeight={40}
          size={100}
        />
      </Col>
    )} */}
    <Col span={12} style={{ textAlign: "left" }}>
      <Text style={{ fontSize: "12px" }}>
        Dilarang menduplikat dokumen tanpa izin Manajemen Mutu
      </Text>
      <br />
      <Text style={{ fontSize: "12px" }}>Puskesmas kecamatan gambir</Text>
    </Col>
    <Col span={12}>
      <Tag color="#6A9695">PUSKESMAS KECAMATAN GAMBIR</Tag>
    </Col>
  </Row>
);

export const PerformanceIndicatorPreview = ({
  chartData = [],
  baseline,
  indicator,
  detail,
  hideQr,
  isProfile,
  visibility = false,
  onClose,
}) => {
  const [indicatorChart, setIndicatorChart] = React.useState([]);
  React.useEffect(() => {
    if (chartData) {
      let monthList = monthLowerWithObjID;
      let monthsTarget = [];

      monthList.forEach((m) => {
        let finder = chartData.find((c) => c.month === m.month);
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

      setIndicatorChart(results);
    }
  }, [chartData]);

  return (
    <Modal
      visible={visibility}
      onCancel={onClose}
      centered
      width={800}
      footer={[<Footer hideQr={hideQr} />]}
    >
      <Tag color="#6A9695">
        RUANG <span style={{ fontWeight: "bold" }}>MUTU</span>
      </Tag>
      <Row justify="center">
        <Col span={12}>
          <Row justify="center">
            <Col>
              <img width={"65px"} src={LogoGambir} alt="logo-gambir" />
            </Col>
          </Row>
          <div className="preview-title">
            <Title level={4} style={{ color: "#5A7D7C" }}>
              {isProfile ? "PROFIL " : ""}INDIKATOR KINERJA
            </Title>
            <Title
              level={4}
              style={{
                color: "#5A7D7C",
                marginTop: "-10px",
              }}
            >
              PUSKESMAS KECAMATAN GAMBIR
            </Title>
          </div>
        </Col>
      </Row>
      <div className="preview-form">
        {!isProfile ? (
          <>
            <Row gutter={[24, 24]} style={{ marginBottom: 20 }}>
              <Col span={12}>
                <Space direction="vertical">
                  <Text>PROFIL INDIKATOR</Text>
                  <Input
                    value={
                      indicator &&
                      detail &&
                      detail.profile_indicator &&
                      detail.profile_indicator.title
                        ? detail.profile_indicator.title
                        : "-"
                    }
                  />
                </Space>
                <Space direction="vertical">
                  <Text>PROGRAM MUTU</Text>
                  <Input
                    value={
                      indicator && detail.program && detail.program.name
                        ? detail.program.name
                        : "-"
                    }
                  />
                </Space>
                <Space direction="vertical">
                  <Text>SUB PROGRAM</Text>
                  <Input
                    value={
                      indicator && detail.sub_program && detail.sub_program.name
                        ? detail.sub_program.name
                        : "-"
                    }
                  />
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical">
                  <Text>BULAN</Text>
                  <Input
                    value={detail?.month ? detail.month.toUpperCase() : ""}
                  />
                </Space>
                <Space direction="vertical">
                  <Text>Sasaran Mutu</Text>
                  <Input value={detail?.quality_goal} />
                </Space>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={24}>
                <BarChart
                  chartData={
                    indicatorChart &&
                    indicatorChart.map((x) => {
                      return x.value;
                    })
                  }
                  labels={
                    indicatorChart &&
                    indicatorChart.map((x) => {
                      return x.month;
                    })
                  }
                  height={500}
                  indicatorLineValue={baseline}
                  className="chart"
                  XAxisDataKey="month"
                  barColor="#5DC8BDE5"
                  barDataKey="value"
                />
              </Col>
            </Row>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Space direction="vertical">
                  <Text>MANUSIA</Text>
                  <Input value={detail?.human} />
                </Space>
                <Space direction="vertical">
                  <Text>ALAT</Text>
                  <Input value={detail?.tools} />
                </Space>
                <Space direction="vertical">
                  <Text>METODE</Text>
                  <Input value={detail?.method} />
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical">
                  <Text>KEBIJAKAN</Text>
                  <Input value={detail?.policy} />
                </Space>
                <Space direction="vertical">
                  <Text>LINGKUNGAN</Text>
                  <Input value={detail?.environment} />
                </Space>
                <Space direction="vertical">
                  <Text>RENCANA TINDAK LANJUT</Text>
                  <Input value={detail?.next_plan} />
                </Space>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Space direction="vertical">
                  <Text>PROGRAM MUTU</Text>
                  <Input value={detail?.program?.name} />
                </Space>
                <Space direction="vertical">
                  <Text>SUB PROGRAM</Text>
                  <Input value={detail?.sub_program?.name} />
                </Space>
                <Space direction="vertical">
                  <Text>JUDUL INDIKATOR</Text>
                  <Input value={detail?.title} />
                </Space>
                <Space direction="vertical">
                  <Text>DASAR PEMILIHAN INDIKATOR</Text>
                  <Input value={detail?.indicator_selection_based} />
                </Space>
                <Space direction="vertical">
                  <Text>DIMENSI MUTU</Text>
                  <div style={{ border: "1px solid #d9d9d9", padding: "5px" }}>
                    <Row>
                      {dimensiMutuOptions.map((item, index) => (
                        <Col span={8} key={index}>
                          <Checkbox
                            style={{ fontSize: "10px" }}
                            checked={detail?.quality_dimension?.some(
                              (x) => x.name === item.label
                            )}
                          >
                            {item.label}
                          </Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Space>
                <Space direction="vertical">
                  <Text>TUJUAN</Text>
                  <Input value={detail?.objective} />
                </Space>
                <Space direction="vertical">
                  <Text>DEFINISI OPERASIONAL</Text>
                  <Input value={detail?.operational_definition} />
                </Space>
                <Space direction="vertical">
                  <Text>TIPE INDIKATOR</Text>
                  <div style={{ border: "1px solid #d9d9d9", padding: "5px" }}>
                    <Row>
                      {tipeIndikatorOptions.map((item, index) => (
                        <Col span={8} key={index}>
                          <Checkbox
                            style={{ fontSize: "10px" }}
                            checked={detail?.indicator_type?.some(
                              (x) => x.name === item.label
                            )}
                          >
                            {item.label}
                          </Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Space>
                <Space direction="vertical">
                  <Text>SATUAN PENGUKURAN</Text>
                  <Input value={detail?.measurement_status} />
                </Space>
                <Space direction="vertical">
                  <Text>NUMERATOR</Text>
                  <Input value={detail?.numerator} />
                </Space>
                <Space direction="vertical">
                  <Text>DENOMINATOR</Text>
                  <Input value={detail?.denominator} />
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical">
                  <Text>TARGET CAPAIAN</Text>
                  <Input value={detail?.achievement_target} />
                </Space>
                <Space direction="vertical">
                  <Text>KRITERIA INKLUSI & EKSKLUSI</Text>
                  <Input value={detail?.criteria} />
                </Space>
                <Space direction="vertical">
                  <Text>FORMULA PENGUKURAN</Text>
                  <Input value={detail?.measurement_formula} />
                </Space>
                <Space direction="vertical">
                  <Text>DESAIN PENGUMPULAN DATA</Text>
                  <Input value={detail?.data_collection_design} />
                </Space>
                <Space direction="vertical">
                  <Text>SUMBER DATA</Text>
                  <Input value={detail?.data_source} />
                </Space>
                <Space direction="vertical">
                  <Text>POPULASI ATAU SAMPEL</Text>
                  <Input value={detail?.population} />
                </Space>
                <Space direction="vertical">
                  <Text>FREKUENSI PENGUMPULAN DATA</Text>
                  <div style={{ border: "1px solid #d9d9d9", padding: "5px" }}>
                    <Row>
                      {frekuensiPengumpulanDataOptions.map((item, index) => (
                        <Col span={8} key={index}>
                          <Checkbox
                            style={{ fontSize: "10px" }}
                            checked={detail?.data_frequency?.some(
                              (x) => x.name === item.label
                            )}
                          >
                            {item.label}
                          </Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Space>
                <Space direction="vertical">
                  <Text>PERIODE WAKTU PELAPORAN</Text>
                  <div style={{ border: "1px solid #d9d9d9", padding: "5px" }}>
                    <Row>
                      {periodeWaktuPelaporanOptions.map((item, index) => (
                        <Col span={8} key={index}>
                          <Checkbox
                            style={{ fontSize: "10px" }}
                            checked={detail?.data_period?.some(
                              (x) => x.name === item.label
                            )}
                          >
                            {item.label}
                          </Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Space>
                <Space direction="vertical">
                  <Text>PERIODE ANALISIS</Text>
                  <div style={{ border: "1px solid #d9d9d9", padding: "5px" }}>
                    <Row>
                      {periodeWaktuPelaporanOptions.map((item, index) => (
                        <Col span={8} key={index}>
                          <Checkbox
                            style={{ fontSize: "10px" }}
                            checked={detail?.analyst_period?.some(
                              (x) => x.name === item.label
                            )}
                          >
                            {item.label}
                          </Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Space>
                <Space direction="vertical">
                  <Text>PENYAJIAN DATA</Text>
                  <Input value={detail?.data_presentation} />
                </Space>
                <Space direction="vertical">
                  <Text>PENANGGUNG JAWAB INDIKATOR</Text>
                  <Input value={detail?.first_pic?.name} />
                </Space>
              </Col>
            </Row>
          </>
        )}

        {detail && detail.file && (
          <Row>
            <Col md={12}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text style={{ color: "#5A7D7C", marginBottom: "10px" }}>
                  DOKUMEN TELUSUR
                </Text>
                <a
                  href={detail.file.file_link}
                  target={"_blank"}
                  className="file-telusur"
                  rel="noreferrer"
                >
                  {detail.file.real_name}
                </a>
              </Space>
            </Col>
          </Row>
        )}

        {/* Signatures */}
        <Row style={{ marginTop: "30px", justifyContent: "center" }}>
          {detail &&
            detail.signature &&
            detail.signature.map((sign, index) => (
              <Col span={8} key={index}>
                <Stack direction="column" align="center">
                  <Text style={{ margin: "20px 0 0 0" }}>
                    {sign.level === 1
                      ? "Pembuat Dokumen"
                      : sign.level === 2
                      ? "Penanggung Jawab 1"
                      : "Penanggung Jawab 2"}
                  </Text>
                  <Text
                    style={{ fontWeight: "bold", marginBottom: "10px" }}
                    strong
                  >
                    {sign.user && sign.user.position && sign.user.position.name
                      ? sign.user.position.name
                      : ""}
                  </Text>
                  {sign.signed ? (
                    <Image
                      src={
                        sign.user &&
                        sign.user.signature &&
                        sign.user.signature.file_link
                          ? sign.user.signature.file_link
                          : SquareLogo
                      }
                      alt={`${
                        sign.user && sign.user.name ? sign.user.name : ""
                      } Sign`}
                      preview={false}
                      style={{ width: "77px" }}
                    />
                  ) : (
                    <div
                      style={{
                        margin: "30px 0",
                        fontSize: "10px",
                        color: "grey",
                      }}
                    >
                      <Text>Belum Ditanda Tangani</Text>
                    </div>
                  )}
                  <Text>{sign.user.name}</Text>
                </Stack>
              </Col>
            ))}
        </Row>
      </div>
    </Modal>
  );
};
