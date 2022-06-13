import { Col, Image, Input, Modal, Row, Select, Space } from 'antd';
import { LogoIcon } from '../../../atoms/Icons/LogoIcon';
import { Text } from '../../../atoms/Text/Text';
import { Title } from '../../../atoms/Title/Title';
import TTDKepala from '../../../../assets/images/ttd-kepala.png';
import { BarChart } from '../../../molecules/Chart/Bar/BarChart';

import './QualityIndicatorPreview.less';

const { TextArea } = Input;

const Footer = () => (
  <Row>
    <Col span={12}>
      <Text>Dilarang menduplikat dokumen tanpa izin Manajemen Mutu Puskesmas Kecamatan Gambir</Text>
    </Col>
    <Col span={12}>
      
    </Col>
  </Row>
)

export const QualityIndicatorPreview = ({
  visibility,
  onClose
}) => {

  const programMutuOptions = [
    { value: 'admen', title: 'ADMEN' },
    { value: 'ukp', title: 'UKP' },
    { value: 'ukm', title: 'UKM' },
    { value: 'prioritasPuskesmas', title: 'PRIORITAS PUSKESMAS' },
    { value: 'perilakuPemberiLayanan', title: 'UKM' },
    { value: 'mutuLayanan', title: 'MUTU LAYANAN KLINIS DAN KESELAMATAN PASIEN INSIDEN KESELAMATAN PASIEN' },
    { value: 'qpi', title: 'QPI' }
  ];

  let months = [
    {
      label: 'Januari',
      value: 'januari',
    },
    {
      label: 'Februari',
      value: 'februari',
    },
    {
      label: 'Maret',
      value: 'maret',
    },
    {
      label: 'April',
      value: 'april',
    },
    {
      label: 'Mei',
      value: 'mei',
    },
    {
      label: 'Juni',
      value: 'juni',
    },
    {
      label: 'Juli',
      value: 'juli',
    },
    {
      label: 'Agustus',
      value: 'agustus',
    },
    {
      label: 'September',
      value: 'september',
    },
    {
      label: 'Oktober',
      value: 'oktober',
    },
    {
      label: 'November',
      value: 'november',
    },
    {
      label: 'Desember',
      value: 'desember',
    }
  ];

  const chartData = [
    {
      month: 'JAN',
      value: 52,
    },
    {
      month: 'FEB',
      value: 92,
    },
    {
      month: 'MAR',
      value: 90,
    },
    {
      month: 'APR',
      value: 97,
    },
    {
      month: 'MEI',
      value: 50,
    },
    {
      month: 'JUN',
      value: 99,
    },
    {
      month: 'JUL',
      value: 87,
    },
    {
      month: 'AGU',
      value: 85,
    },
    {
      month: 'SEP',
      value: 0,
    },
    {
      month: 'OKT',
      value: 99,
    },
    {
      month: 'NOV',
      value: 86,
    },
    {
      month: 'DES',
      value: 100,
    }
  ]

  return (
    <Modal
      visible={visibility}
      onCancel={onClose}
      centered
      width={800}
      footer={[
        <Footer />
      ]}
    >
      <Row justify="center">
        <Col span={10}>
          <Row justify="center">
            <Col>
              <LogoIcon />
            </Col>
          </Row>
          <div className="preview-title">
            <Title level={4} style={{ color: '#5A7D7C' }}>PROFIL INDIKATOR MUTU PUSKESMAS KECAMATAN GAMBIR</Title>
          </div>
        </Col>
      </Row>
      <div className="preview-form">
        <Row gutter={[24, 24]} style={{ marginBottom: 20 }}>
          <Col span={12}>
            <Space direction="vertical">
              <Text>PROGRAM MUTU</Text>
              <Select placeholder="Pilih program mutu" style={{ width: '100%' }}>
                {
                  programMutuOptions.map(( item, index ) => (
                    <Select.Option value={item.value} key={index}>{ item.title }</Select.Option>
                  ))
                }
              </Select>
            </Space>
            <Space direction="vertical">
              <Text>SUB PROGRAM</Text>
              <Select placeholder="Pilih Sub program mutu" style={{ width: '100%' }}>
                {
                  programMutuOptions.map(( item, index ) => (
                    <Select.Option value={item.value} key={index}>{ item.title }</Select.Option>
                  ))
                }
              </Select>
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical">
              <Text>BULAN</Text>
              <Select placeholder="Pilih Bulan" style={{ width: '100%' }}>
                {
                  months.map(( item, index ) => (
                    <Select.Option value={item.value} key={index}>{ item.label }</Select.Option>
                  ))
                }
              </Select>
            </Space>
            <Space direction="vertical">
              <Text>Sasaran Mutu</Text>
              <Input />
            </Space>
          </Col>
        </Row>
        <Row justify='center'>
          <Col span={24}>
            <BarChart 
              data={chartData}
              width={700}
              height={300}
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
              <TextArea />
            </Space>
            <Space direction="vertical">
              <Text>ALAT</Text>
              <TextArea />
            </Space>
            <Space direction="vertical">
              <Text>METODE</Text>
              <TextArea />
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical">
              <Text>KEBIJAKAN</Text>
              <TextArea />
            </Space>
            <Space direction="vertical">
              <Text>LINGKUNGAN</Text>
              <TextArea />
            </Space>
            <Space direction="vertical">
              <Text>RENCANA TINDAK LANJUT</Text>
              <TextArea />
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Space direction="vertical" align='center'>
              <Text>Kepala Puskemas Kecamatan Gambir</Text>
              <Image src={TTDKepala} preview={false}/>
              <Text>dr. Ratna Sari, MKM</Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical" align='center' wrap>
              <Text>Penanggung Jawab</Text>
              <Text strong>Kepegawaian Puskesmas Kecamatan Gambir</Text>
              <Image src={TTDKepala} preview={false}/>
              <Text strong>Visi Gita Nurlaini, Psi</Text>
            </Space>
          </Col>
        </Row>
      </div>
    </Modal>
  )
}