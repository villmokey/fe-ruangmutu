import { Title } from "../../../atoms/Title/Title";
import { Form } from "../../../molecules/Form/Form";
import { Checkbox, Col, Form as AntdForm, Radio, Row, Select, Upload } from 'antd';
import { InputText } from '../../../atoms/InputText/InputText';
import { Text } from "../../../atoms/Text/Text";

const { Option } = Select;
const { Item } = AntdForm;
const { Dragger } = Upload;

export const SecondStep = ({
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

  let tipeIndikatorOptions = [
    {
      label: 'Input',
      value: 'Input',
    },
    {
      label: 'Proses',
      value: 'Proses',
    },
    {
      label: 'Output',
      value: 'Output',
    },
    {
      label: 'Outcome',
      value: 'Outcome',
    }
  ]

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
              name="programMutu"
            >
              <Select placeholder="Pilih program mutu">
                {
                  programMutuOptions.map(( item, index ) => (
                    <Option value={item.value} key={index}>{ item.title }</Option>
                  ))
                }
              </Select>
            </Item>
            <Item
              label="Sub Program Mutu"
              name="subProgramMutu"
            >
              <Select placeholder="Pilih Sub program mutu">
                {
                  programMutuOptions.map(( item, index ) => (
                    <Option value={item.value} key={index}>{ item.title }</Option>
                  ))
                }
              </Select>
            </Item>
            <InputText 
              label="Judul Indikator"
              name="judulIndikator"
            />
            <InputText 
              label="Dasar Pemilihan Indikator"
              name="dasarPemilihanIndikator"
            />

            <Item
              label="Dimensi Mutu"
              name="dimensiMutu"
            >
              <Checkbox.Group options={dimensiMutuOptions}></Checkbox.Group>
            </Item>

            <InputText 
              label="Tujuan"
              name="tujuan"
            />

            <InputText 
              label="Definisi Operasional"
              name="definisiOperasional"
            />
             <Item
              label="Tipe Indikator"
              name="tipeIndikator"
            >
              <Radio.Group>
                {
                  tipeIndikatorOptions.map((item, index) => {
                    return (
                      <Radio value={item.value} key={index}>{ item.label }</Radio>
                    )
                  })
                }
              </Radio.Group>
            </Item>
          </Col>
          <Col span={8}>
            <InputText 
              label="Status Pengukuran"
              name="statusPengukuran"
            />
            <InputText 
              label="Numerator"
              name="numerator"
            />
            <InputText 
              label="Denominator"
              name="denominator"
            />
            <InputText 
              label="Target Capaian"
              name="targetCapaian"
            />
            <InputText 
              label="Kriteria Inklusi & Ekslusi"
              name="kriteriaInklusiEkslusi"
            />
            <InputText 
              label="Formula Pengukuran"
              name="formulaPengukuran"
            />
            <InputText 
              label="Pengumpulan Data"
              name="pengumpulanData"
            />
            <InputText 
              label="Sumber Data"
              name="sumberData"
            />
          </Col>
          <Col span={8}>
            <InputText 
              label="Populasi Atau Sampel"
              name="populasiAtauSampel"
            />
            <Item
              label="Frekuensi Pengumpulan Data"
              name="frekuensiPengumpulanData"
            >
              <Radio.Group>
                {
                  frekuensiPengumpulanDataOptions.map((item, index) => {
                    return (
                      <Radio value={item.value} key={index}>{ item.label }</Radio>
                    )
                  })
                }
              </Radio.Group>
            </Item>
            <Item
              label="Periode Waktu Pelaporan"
              name="periodeWaktuPelaporan"
            >
              <Radio.Group>
                {
                  periodeWaktuPelaporanOptions.map((item, index) => {
                    return (
                      <Radio value={item.value} key={index}>{ item.label }</Radio>
                    )
                  })
                }
              </Radio.Group>
            </Item>
            <Item
              label="Periode Analisis"
              name="periodeAnalisis"
            >
              <Radio.Group>
                {
                  periodeWaktuPelaporanOptions.map((item, index) => {
                    return (
                      <Radio value={item.value} key={index}>{ item.label }</Radio>
                    )
                  })
                }
              </Radio.Group>
            </Item>
            <InputText 
              label="Penyajian Data"
              name="penyajianData"
            />
            <InputText 
              label="Penanggung Jawab Indikator"
              name="penanggungJawabIndikator"
            />
            <Item
              label="Dokumen Telusur"
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