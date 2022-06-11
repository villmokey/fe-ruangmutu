import { Col, Form as AntdForm, Row, Select, Upload } from 'antd';
import { InputText } from '../../../../atoms/InputText/InputText';
import { Text } from '../../../../atoms/Text/Text';
import { Title } from '../../../../atoms/Title/Title';
import { Form } from '../../../../molecules/Form/Form';

const { Option } = Select;
const { Item } = AntdForm;
const { Dragger } = Upload;

export const SecondStep = ({
  form,
  onFinish,
  programMutuChange,
  judulIndikatorChange,
  tujuanChange,
  definisiOperasionalChange
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
  ]

  return (
    <>
      <Title level={4}>Form Indikator Mutu</Title>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={[24]}>
          <Col md={8} sm={24} xs={24}>
            <InputText 
              label="Judul Indikator"
              name="judulIndikator"
            />
            <Item
              label="Program Mutu"
              name="programMutu"
            >
              <Select placeholder="Pilih program mutu" onChange={programMutuChange}>
                {
                  programMutuOptions.map(( item, index ) => (
                    <Option value={item.value} key={index}>{ item.title }</Option>
                  ))
                }
              </Select>
            </Item>
            <InputText 
              label="Manusia"
              name="manusia"
            />
            <InputText 
              label="Alat"
              name="alat"
            />
            <InputText 
              label="Metode"
              name="metode"
              onChange={judulIndikatorChange}
            />
          </Col>
          <Col md={8} sm={24} xs={24}>
            <Item
              label="Bulan"
              name="bulan"
            >
              <Select placeholder="Pilih bulan" onChange={programMutuChange}>
                {
                  months.map(( item, index ) => (
                    <Option value={item.value} key={index}>{ item.title }</Option>
                  ))
                }
              </Select>
            </Item>

            <Item
              label="Sasaran Mutu"
              name="sasaranMutu"
            >
              <Select placeholder="Pilih Sasaran Mutu" onChange={programMutuChange}>
              </Select>
            </Item>

            <InputText 
              label="Kebijakan"
              name="kebijakan"
              onChange={tujuanChange}
            />

            <InputText 
              label="Lingkungan"
              name="lingkungan"
              onChange={definisiOperasionalChange}
            />

            <InputText 
              label="Rencana Tindak Lanjut"
              name="rencanaTindakLanjut"
              onChange={definisiOperasionalChange}
            />
          </Col>
          <Col md={8} sm={24} xs={24}>
            <Item
              label="Upload Dokumen Telusur"
              name="dokumenTelusur"
              valuePropName="fileList"
            >
              <Dragger 
                beforeUpload={() => false} 
              >
                <Text>Drag & Drop</Text>
              </Dragger>
            </Item>
          
          </Col>

        </Row>

      </Form>
    </>
  )
}