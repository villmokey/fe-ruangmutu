import { Checkbox, Col, Input, Modal, Row, Select, Space } from "antd"
import { LogoIcon } from "../../atoms/Icons/LogoIcon"
import { Text } from "../../atoms/Text/Text"
import { Title } from "../../atoms/Title/Title"


import './ProfileQualityIndicatorPreviewCard.less'

const Footer = () => (
  <Row>
    <Col span={12}>
      <Text>Dilarang menduplikat dokumen tanpa izin Manajemen Mutu Puskesmas Kecamatan Gambir</Text>
    </Col>
    <Col span={12}>
      
    </Col>
  </Row>
)

export const ProfileQualityIndicatorPreviewCard = ({
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

  let dimensiMutuOptions = [
    {
      label: 'Kelayakan',
      value: 'Kelayakan',
    },
    {
      label: 'Ketepatan Waktu',
      value: 'Ketepatan Waktu',
    },
    {
      label: 'Manfaat',
      value: 'Manfaat',
    },
    {
      label: 'Ketersiadaan',
      value: 'Ketersiadaan',
    },
    {
      label: 'Keselamatan',
      value: 'Keselamatan',
    },
    {
      label: 'Efisiensi',
      value: 'Efisiensi',
    },
    {
      label: 'Efektivias',
      value: 'Efektivias',
    },
    {
      label: 'Kesinambungan',
      value: 'Kesinambungan',
    }
  ];

  return (
    <Modal
      visible={visibility}
      onCancel={onClose}
      centered
      width={1000}
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
        <Row gutter={[24, 24]}>
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
            <Space direction="vertical">
              <Text>JUDUL INDIKATOR</Text>
              <Input/>
            </Space>
            <Space direction="vertical">
              <Text>DASAR PEMILIHAN INDIKATOR</Text>
              <Input/>
            </Space>
            <Space direction="vertical">
              <Text>DIMENSI MUTU</Text>
              <Checkbox.Group options={dimensiMutuOptions}></Checkbox.Group>
            </Space>
            <Space direction="vertical">
              <Text>TUJUAN</Text>
              <Input/>
            </Space>
            <Space direction="vertical">
              <Text>DEFINISI OPERASIONAL</Text>
              <Input/>
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical">
              <Text>PROGRAM MUTU</Text>
              <Checkbox.Group options={dimensiMutuOptions}></Checkbox.Group>
            </Space>
          </Col>
        </Row>
      </div>
    </Modal>
  )
}