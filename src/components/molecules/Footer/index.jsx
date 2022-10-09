import { Col, Row, Space, Typography } from "antd";
import React from "react";
import { SquareLogo } from "../../../assets/images";
import { Text } from "../../atoms/Text/Text";
import styled from "styled-components";

const FooterComponent = () => {
  return (
    <>
      <Footer className="footer">
        <Row gutter={[8, 16]}>
          <Col span={24} style={{ margin: "20px 0 10px 0" }}>
            <hr />
          </Col>
          <Col xs={24} sm={24} md={12} xl={12}>
            <img style={{ width: "70px" }} src={SquareLogo} alt="Ruang Mutu" />
            <br />
            <Text className="logo-text" style={{ margin: "unset" }}>
              RUANG <strong>MUTU</strong>
            </Text>
            <br />
            <Text className="description-text">
              Aplikasi Dokumentasi serta Pemantauan Kegiatan Mutu
            </Text>
            <br />
            <Text className="description-text">Puskesmas Kecamatan Gambir</Text>
          </Col>
          <Col xs={24} sm={24} md={12} xl={12}>
            <Typography.Paragraph className="ft-white ft-bold ft-15">
              Hubungi Kami
            </Typography.Paragraph>
            <Row>
              <Col span={12}>
                <Space direction="vertical">
                  <Space direction="vertical">
                    <Text className="ft-white ft-bold">Website</Text>
                    <Text className="ft-white">www.pkcgambir.co.id</Text>
                  </Space>
                  <Space direction="vertical">
                    <Text className="ft-white ft-bold">Hotline</Text>
                    <Text className="ft-white">www.pkcgambir.co.id</Text>
                  </Space>
                  <Space direction="vertical">
                    <Text className="ft-white ft-bold">WhatsApp</Text>
                    <Text className="ft-white">www.pkcgambir.co.id</Text>
                  </Space>
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical">
                  <Space direction="vertical">
                    <Text className="ft-white ft-bold">Instagram</Text>
                    <Text className="ft-white">@PKCGambir</Text>
                  </Space>
                  <Space direction="vertical">
                    <Text className="ft-white ft-bold">Youtube</Text>
                    <Text className="ft-white">PKMGambir</Text>
                  </Space>
                  <Space direction="vertical">
                    <Text className="ft-white ft-bold">Twitter</Text>
                    <Text className="ft-white">pkcgambir</Text>
                  </Space>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Footer>
      <Copyright>PKC Gambir All Rights Reserved.</Copyright>
    </>
  );
};

const Footer = styled.footer`
  min-height: 300px;
  background-color: #6a9695;
  color: white;

  @media only screen and (max-width: 720px) {
    padding: 10px;
  }
`;

const Copyright = styled.div`
  background: #e5e5e5;
  color: #5e6e89;
  height: 76px;
  padding: 25px 150px;

  @media only screen and (max-width: 720px) {
    padding: 25px 10px;
  }
`;

export default FooterComponent;
