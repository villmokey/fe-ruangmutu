import React from 'react'
import { Col, Modal, Row, Tag } from "antd";
import { LogoIcon } from "../../../../atoms/Icons/LogoIcon";
import { Text } from "../../../../atoms/Text/Text";
import { Title } from "../../../../atoms/Title/Title";
import "./Preview.less";
import { QRCode } from 'react-qrcode-logo';
import { LogoRuangMutu } from '../../../../../assets/images';

const Footer = () => (
  <Row>
    <Col span={24} style={{ textAlign: 'left' }}>
      <QRCode value='HALOOO MYGAYS' logoImage={LogoRuangMutu} logoWidth={60} logoHeight={30} size={100} />
    </Col>
    <Col span={12} style={{ textAlign: 'left' }}>
      <Text style={{ fontSize: '12px' }}>
        Dilarang menduplikat dokumen tanpa izin Manajemen Mutu
      </Text>
      <br />
      <Text style={{ fontSize: '12px' }}>
        Puskesmas kecamatan gambir
      </Text>
    </Col>
    <Col span={12}>
      <Tag color="#6A9695">PUSKESMAS KECAMATAN GAMBIR</Tag>
    </Col>
  </Row>
);

export const SatisfactionPreview = ({
  chartData = [],
  baseline,
  indicator,
  detail,
  isProfile,
  visibility = false,
  onClose,
}) => {
  return (
    <Modal
      visible={visibility}
      onCancel={onClose}
      centered
      width={800}
      footer={[<Footer />]}
    >
      <Tag color="#6A9695">RUANG <span style={{ fontWeight: 'bold' }}>MUTU</span></Tag>
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
          <table width={'100%'}>
            <tr>
              <td className='title'>FASKES</td>
              <td>:</td>
              <td className='content'>Puskesmas Kecamatan Gambir</td>
            </tr>
            <tr>
              <td className='title'>HARI/TANGGAL</td>
              <td>:</td>
              <td className='content'>Selasa, 23 Maret 2022</td>
            </tr>
            <tr>
              <td className='title'>ID KELUHAN</td>
              <td>:</td>
              <td className='content'>1000231231205034043</td>
            </tr>
            <tr>
              <td className='title'>PELAPOR</td>
              <td>:</td>
              <td className='content'>Anonim</td>
            </tr>
            <tr>
              <td className='title'>SUMBER</td>
              <td>:</td>
              <td className='content'>Aplikasi JAKI</td>
            </tr>
            <tr>
              <td className='title'>ISI LAPORAN</td>
              <td>:</td>
              <td className='content'>Tolong dibantu kakak ipar saya saat ini sedang isolasi mandiri
                dirumah karena terpapar Covid-19. Tidak ada bantuan vitamin </td>
            </tr>
            <tr>
              <td className='title'>KOORDINASI</td>
              <td>:</td>
              <td className='content'>Dinas Kesehatan Jakarta - Puskesmas Kecamatan Gambir
                - Camat Gambir</td>
            </tr>
            <tr>
              <td className='title'>TANGGAL KLARIFIKASI</td>
              <td>:</td>
              <td className='content'>Rabu, 24 Maret 2022</td>
            </tr>
            <tr>
              <td className='title'>TINDAK LANJUT</td>
              <td>:</td>
              <td className='content'>Menanggapi laporan tersebut sebelumnya kami ucapkan terima
                kasih, dan mohon maaf atas ketidak nyamanannya</td>
            </tr>
            <tr>
              <td className='title'>STATUS</td>
              <td>:</td>
              <td className='content'>Selesai dan telah dikonfirmasi</td>
            </tr>
            <tr>
              <td className='title'>LAMPIRAN</td>
              <td>:</td>
              <td className='content'>Tidak Ada</td>
            </tr>
          </table>
        </Row>
      </div>
    </Modal>
  );
};
