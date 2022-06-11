import { Col, Form as AntdForm, Row, Select, Upload } from 'antd';
import { InputText } from '../../../../atoms/InputText/InputText';
import { Text } from '../../../../atoms/Text/Text';
import { Title } from '../../../../atoms/Title/Title';
import { Form } from '../../../../molecules/Form/Form';

const { Option } = Select;
const { Item } = AntdForm;
const { Dragger } = Upload;

export const ThirdStep = ({
  form,
  onFinish
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
              disabled
            />
            <Item
              label="Program Mutu"
              name="programMutu"
            >
              <Select placeholder="Pilih program mutu" disabled>
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
              disabled
            />
            <InputText 
              label="Alat"
              name="alat"
              disabled
            />
            <InputText 
              label="Metode"
              name="metode"
              disabled
            />
          </Col>
          <Col md={8} sm={24} xs={24}>
            <Item
              label="Bulan"
              name="bulan"
            >
              <Select placeholder="Pilih bulan" disabled>
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
              <Select placeholder="Pilih Sasaran Mutu" disabled>
              </Select>
            </Item>

            <InputText 
              label="Kebijakan"
              name="kebijakan"
              disabled
            />

            <InputText 
              label="Lingkungan"
              name="lingkungan"
              disabled
            />

            <InputText 
              label="Rencana Tindak Lanjut"
              name="rencanaTindakLanjut"
              disabled
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
                disabled
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