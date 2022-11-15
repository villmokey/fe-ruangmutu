import React from "react";
import { Button, Col, Layout, Row, Space, Tag } from "antd";
import { PrinterOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { paths } from "../../../../../routing/paths";
import { QualityCupboardSider } from "../../../../organism/Dashboard/Sider/QualityCupboardSider/QualityCupboardSider";
import { useAuthToken } from "../../../../../globals/useAuthToken";
import Navigation from "../../../../organism/Dashboard/Breadcrumb";
import { ToastContainer } from "react-toastify";
import { fetchApiGet } from "../../../../../globals/fetchApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DetailLoading from "./shimmer";
import "./detail.cupboard.less";
import { LogoRuangMutu, SquareLogo } from "../../../../../assets/images";
import { QRCode } from "react-qrcode-logo";
import { EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/id";
import { useRef } from "react";

const { Content } = Layout;

const DetailQualityCupboard = () => {
  const { id } = useParams();
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState({});
  const printRef = useRef(null);

  const requestDetail = () => {
    setLoading(true);
    fetchApiGet(`/document/${id}`, {}, accessToken)
      .then((res) => {
        if (res && res.success) {
          setDocument(res.data);
        }
      })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    requestDetail();
  }, []); //eslint-disable-line

  return (
    <Layout>
      <ToastContainer />
      <QualityCupboardSider showFilter={false} />
      <Content className="main-content">
        <Navigation
          items={[
            {
              path: "/dashboard/" + paths.QUALITY_CUPBOARD,
              label: "Lemari Mutu",
            },
            {
              path: "",
              label: "Detail " + document && document.name ? document.name : "",
            },
          ]}
        />

        <img className="print-ruang-mutu" alt="ruang-mutu" src={LogoRuangMutu} />
        {!loading ? (
          <StyledBox className="printable">
            <Row>
              <Col style={{ marginRight: "auto" }}>
                <Space>
                  <Typography
                    fontSize={"25px"}
                    color={"#6A9695"}
                    fontWeight={"bold"}
                  >
                    {document.name}
                  </Typography>
                </Space>
              </Col>
              <Col style={{ marginLeft: "auto" }} className="print-button">
                <Space className="print-button">
                  <Button
                    className="print-button"
                    type="primary"
                    icon={<PrinterOutlined />}
                    size="large"
                    style={{ borderRadius: 8 }}
                    onClick={() => window.print({ innerHeight: 300 })}
                  />
                  {document.file && document.file.file_link && (
                    <a
                      target={"_blank"}
                      className={"print-button"}
                      href={document.file.file_link}
                      rel="noopener noreferrer"
                    >
                      <Button
                        className="print-button"
                        type="default"
                        icon={<FolderOpenOutlined />}
                        title={"Buka Dokumen"}
                        size="large"
                        style={{ borderRadius: 8 }}
                      />
                    </a>
                  )}
                </Space>
              </Col>
            </Row>
            <Box className={"detail-information"} id="printable" ref={printRef}>
              <table>
                <tbody>
                  <tr>
                    <td>Nomor Dokumen</td>
                    <td>:</td>
                    <td>{document.document_number}</td>
                  </tr>
                  <tr>
                    <td>Tipe Dokumen</td>
                    <td>:</td>
                    <td>
                      {document.document_type && document.document_type.name
                        ? document.document_type.name
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>Program/Unit Terkait</td>
                    <td>:</td>
                    <td>
                      {document.related_program &&
                      document.related_program.length
                        ? document.related_program.map(
                            (rel) =>
                              rel.program && (
                                <Tag key={rel.id}>{rel.program.name}</Tag>
                              )
                          )
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>Tanggal Dipublikasi</td>
                    <td>:</td>
                    <td>
                      {moment(document.publish_date).format(
                        "dddd, DD MMMM YYYY"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Diunggah Pada</td>
                    <td>:</td>
                    <td>
                      {moment(document.created_at).format("dddd, DD MMMM YYYY")}
                    </td>
                  </tr>
                  <tr>
                    <td>Dokumen Terkait</td>
                    <td>:</td>
                    <td>
                      {document.related_file &&
                      document.related_file.length > 0 ? (
                        document.related_file.map((rel) => (
                          <div
                            key={rel.id}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            {rel.related.name}
                            <div style={{ marginLeft: "10px" }}>
                              <a
                                rel="noreferrer"
                                target={"_blank"}
                                href={rel.related.file.file_link}
                              >
                                <EyeOutlined />
                              </a>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>-</p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>
            {document && document.qr_url && (
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"start"}
                margin={"20px 0 0 0"}
              >
                <QRCode
                  value={document.qr_url}
                  ecLevel={"H"}
                  logoImage={SquareLogo}
                  logoWidth={40}
                  logoHeight={40}
                />
              </Box>
            )}
          </StyledBox>
        ) : (
          <DetailLoading />
        )}
      </Content>
    </Layout>
  );
};

const StyledBox = styled(Box)`
  border: 1px solid #c2c2c2;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
`;

export default DetailQualityCupboard;
