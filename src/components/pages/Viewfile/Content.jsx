import React from "react";
import { Button, Col, Layout, Row, Space } from "antd";
import { FolderOpenOutlined } from "@ant-design/icons";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useAuthToken } from "../../../globals/useAuthToken";
import { fetchApiGet } from "../../../globals/fetchApi";
import styled from "styled-components";
import DetailLoading from "../Dashboard/QualityCupboard/Detail/shimmer";
import moment from "moment";
import "moment/locale/id";
import { ViewFileSider } from "../../organism/Dashboard/Sider/ViewFileSider/ViewFileSider";
import { Link } from "react-router-dom";

const { Content } = Layout;

const ViewFileContent = ({ id, type }) => {
  const { getAccessToken, getIsAuth } = useAuthToken();
  const accessToken = getAccessToken();
  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState({});

  const requestDetail = () => {
    setLoading(true);
    fetchApiGet(`/document/${id}`, {}, accessToken)
      .then((res) => {
        if (res && res.success) {
          setDocument(res.data ?? {});
          console.log(res.data);
        }
      })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    if (getIsAuth()) requestDetail();
  }, []);

  return (
    <Layout>
      <ViewFileSider />
      <Content className="main-content">
        {getIsAuth() ? (
          <>
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
                </Row>
                <Box className={"detail-information"}>
                  <table>
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
                        {moment(document.created_at).format(
                          "dddd, DD MMMM YYYY"
                        )}
                      </td>
                    </tr>
                  </table>
                  {document.file && document.file.file_link && (
                    <a
                      target={"_blank"}
                      className={"print-button"}
                      href={document.file.file_link}
                      rel="noopener noreferrer"
                    >
                      <Button
                        className="print-button"
                        type="primary"
                        icon={<FolderOpenOutlined />}
                        title={"Buka Dokumen"}
                        size="large"
                        style={{ borderRadius: 8, width: "200px" }}
                      >
                        Buka Dokumen
                      </Button>
                    </a>
                  )}
                </Box>
              </StyledBox>
            ) : (
              <DetailLoading />
            )}
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignCenter: "center",
            }}
          >
            <h3>
              Silahkan <Link to="/login">Login</Link> terlebih dahulu dan scan
              ulang qr code pada dokumen
            </h3>
          </div>
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

export default ViewFileContent;
