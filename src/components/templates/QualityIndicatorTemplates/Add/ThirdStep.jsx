import { Title } from "../../../atoms/Title/Title";
import { Form } from "../../../molecules/Form/Form";
import { Checkbox, Col, Form as AntdForm, Row, Select, Upload } from 'antd';
import { InputText } from '../../../atoms/InputText/InputText';
import { Text } from "../../../atoms/Text/Text";

const { Option } = Select;
const { Item } = AntdForm;
const { Dragger } = Upload;

export const ThirdStep = ({
  onFinish
}) => {

  const [form] = AntdForm.useForm();

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

  let frekuensiPengumpulanDataOptions = [
    {
      label: 'Harian',
      value: 'Harian',
    },
    {
      label: 'Mingguan',
      value: 'Mingguan',
    },
    {
      label: 'Bulan',
      value: 'Bulan',
    },
    {
      label: 'Tahunan',
      value: 'Tahunan',
    }
  ];

  let periodeWaktuPelaporanOptions = [
    {
      label: 'Bulanan',
      value: 'Bulanan',
    },
    {
      label: 'Triwulan',
      value: 'Triwulan',
    },
    {
      label: 'Semester',
      value: 'Semester',
    },
    {
      label: 'Tahunan',
      value: 'Tahunan',
    }
  ];

  return (
    <>
      <Title level={4}>Form Profil Indikator Mutu</Title>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={[24]}>
          <Col span={8}>
            <Item
              label="Program Mutu"
            >
              <Select placeholder="Pilih program mutu" disabled>
                {
                  programMutuOptions.map(( item, index ) => (
                    <Option value={item.value} key={index}>{ item.value }</Option>
                  ))
                }
              </Select>
            </Item>
            <Item
              label="Sub Program Mutu"
            >
              <Select placeholder="Pilih Sub program mutu" disabled>
                {
                  programMutuOptions.map(( item, index ) => (
                    <Option value={item.value} key={index}>{ item.value }</Option>
                  ))
                }
              </Select>
            </Item>
            <InputText 
              label="Judul Indikator"
              disabled
            />
            <InputText 
              label="Dasar Pemilihan Indikator"
              disabled
            />

            <Item
              label="Dimensi Mutu"
            >
              <Checkbox.Group options={dimensiMutuOptions} disabled></Checkbox.Group>
            </Item>

            <InputText 
              label="Tujuan"
              disabled
            />

            <InputText 
              label="Definisi Operasional"
              disabled
            />

          </Col>
          <Col span={8}>
            <InputText 
              label="Kriteria Inklusi & Ekslusi"
              disabled
            />
            <InputText 
              label="Formula Pengukuran"
              disabled
            />
            <InputText 
              label="Pengumpulan Data"
              disabled
            />
            <InputText 
              label="Sumber Data"
              disabled
            />
            <InputText 
              label="Populasi Atau Sampel"
              disabled
            />
            <Item
              label="Frekuensi Pengumpulan Data"
            >
              <Checkbox.Group options={frekuensiPengumpulanDataOptions} disabled></Checkbox.Group>
            </Item>
            <Item
              label="Periode Waktu Pelaporan"
            >
              <Checkbox.Group options={periodeWaktuPelaporanOptions} disabled></Checkbox.Group>
            </Item>
          </Col>
          <Col span={8}>
            <Item
              label="Periode Analisis"
            >
              <Checkbox.Group options={periodeWaktuPelaporanOptions} disabled></Checkbox.Group>
            </Item>
            <InputText 
              label="Penyajian Data"
              disabled
            />
            <InputText 
              label="Penanggung Jawab Indikator"
              disabled
            />
            <Item
              label="Dokumen Telusur"
            >
              <Dragger style={{ height: 100 }} disabled>
                <Text>Drag & Drop</Text>
              </Dragger>
            </Item>
          </Col>
        </Row>

      </Form>
    </>
  )
}