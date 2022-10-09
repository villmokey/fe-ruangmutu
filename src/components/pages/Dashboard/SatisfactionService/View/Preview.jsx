import React from "react";
import { Col, Modal, Row, Tag } from "antd";
import { LogoIcon } from "../../../../atoms/Icons/LogoIcon";
import { Text } from "../../../../atoms/Text/Text";
import { Title } from "../../../../atoms/Title/Title";
import "./Preview.less";
import { QRCode } from "react-qrcode-logo";
import moment from "moment";
import { SquareLogo } from "../../../../../assets/images";

const Footer = ({ status = null, qrstring = null }) => (
  <Row>
    {status === "DONE" && (
      <Col span={24} style={{ textAlign: "left" }}>
        <QRCode
          value={qrstring}
          logoImage={SquareLogo}
          logoWidth={60}
          logoHeight={30}
          size={100}
        />
      </Col>
    )}
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

export const SatisfactionPreview = ({
  detail,
  visibility = false,
  onClose,
}) => {
  return (
    <Modal
      visible={visibility}
      onCancel={onClose}
      centered
      width={800}
      footer={[<Footer status={detail.status} qrstring={detail.id} />]}
    >
      <Tag color="#6A9695">
        RUANG <span style={{ fontWeight: "bold" }}>MUTU</span>
      </Tag>
      <Row justify="center">
        <Col span={10}>
          <Row justify="center">
            <Col>
              <LogoIcon />
            </Col>
          </Row>
          <div className="preview-title">
            <Title level={4} style={{ color: "#5A7D7C" }}>
              KLARIFIKASI KELUHAN PELANGGAN
            </Title>
          </div>
        </Col>
      </Row>
      <div className="preview-form">
        <Row gutter={[24, 24]}>
          <table width={"100%"}>
            <tr>
              <td className="title">FASKES</td>
              <td>:</td>
              <td className="content">
                {detail && detail.health_service && detail.health_service.name
                  ? detail.health_service.name
                  : "-"}
              </td>
            </tr>
            <tr>
              <td className="title">HARI/TANGGAL</td>
              <td>:</td>
              <td className="content">
                {detail.complaint_date
                  ? moment(detail.complaint_date).format("dddd/DD MMMM YYYY")
                  : "-"}
              </td>
            </tr>
            <tr>
              <td className="title">ID KELUHAN</td>
              <td>:</td>
              <td className="content">{detail.complaint_id ?? "-"}</td>
            </tr>
            <tr>
              <td className="title">PELAPOR</td>
              <td>:</td>
              <td className="content">{detail.reported_by ?? "-"}</td>
            </tr>
            <tr>
              <td className="title">SUMBER</td>
              <td>:</td>
              <td className="content">{detail.source ?? "-"}</td>
            </tr>
            <tr>
              <td className="title">ISI LAPORAN</td>
              <td>:</td>
              <td className="content">{detail.report ?? "-"}</td>
            </tr>
            <tr>
              <td className="title">KOORDINASI</td>
              <td>:</td>
              <td className="content">{detail.coordination ?? "-"}</td>
            </tr>
            <tr>
              <td className="title">TANGGAL KLARIFIKASI</td>
              <td>:</td>
              <td className="content">
                {detail.clarification_date
                  ? moment(detail.clarification_date).format(
                      "dddd, DD MMMM YYYY"
                    )
                  : "-"}
              </td>
            </tr>
            <tr>
              <td className="title">TINDAK LANJUT</td>
              <td>:</td>
              <td className="content">{detail.follow_up ?? "-"}</td>
            </tr>
            <tr>
              <td className="title">STATUS</td>
              <td>:</td>
              <td className="content">
                {detail.status === "PENDING"
                  ? "Pending"
                  : detail.status === "DONE"
                  ? "Selesai dan telah dikonfirmasi"
                  : detail.status}
              </td>
            </tr>
            <tr>
              <td className="title">LAMPIRAN</td>
              <td>:</td>
              <td className="content">Tidak Ada</td>
            </tr>
          </table>
        </Row>
      </div>
    </Modal>
  );
};
