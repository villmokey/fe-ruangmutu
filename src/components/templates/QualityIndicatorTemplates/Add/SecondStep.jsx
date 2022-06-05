import { Title } from "../../../atoms/Title/Title";
import { Form } from "../../../molecules/Form/Form";
import { Checkbox, Col, Form as AntdForm, Radio, Row, Select, Upload } from 'antd';
import { InputText } from '../../../atoms/InputText/InputText';
import { Text } from "../../../atoms/Text/Text";

const { Option } = Select;
const { Item } = AntdForm;
const { Dragger } = Upload;

export const SecondStep = ({
  form,
  onFinish,
  programMutuChange,
  subProgramMutuChange,
  judulIndikatorChange,
  dasarPemilihanIndikatorChange,
  dimensiMutuChange,
  tujuanChange,
  definisiOperasionalChange,
  tipeIndikatorChange,
  statusPengukuranChange,
  numeratorChange,
  denominatorChange,
  targetCapaianChange,
  kriteriaInklusiEkslusiChange,
  formulaPengukuranChange,
  pengumpulanDataChange,
  sumberDataChange,
  populasiAtauSampelChange,
  frekuensiPengumpulanDataChange,
  periodeWatkuPelaporanChange,
  periodeAnalisisChange,
  penyajianDataChange,
  penanggungJawabIndikatorChange
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
          <Col md={8} sm={24} xs={24}>
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
            <Item
              label="Sub Program Mutu"
              name="subProgramMutu"
            >
              <Select placeholder="Pilih Sub program mutu" onChange={subProgramMutuChange}>
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
              onChange={judulIndikatorChange}
            />
            <InputText 
              label="Dasar Pemilihan Indikator"
              name="dasarPemilihanIndikator"
              onChange={dasarPemilihanIndikatorChange}
            />

            <Item
              label="Dimensi Mutu"
              name="dimensiMutu"
            >
              <Checkbox.Group options={dimensiMutuOptions} onChange={dimensiMutuChange}></Checkbox.Group>
            </Item>

            <InputText 
              label="Tujuan"
              name="tujuan"
              onChange={tujuanChange}
            />

            <InputText 
              label="Definisi Operasional"
              name="definisiOperasional"
              onChange={definisiOperasionalChange}
            />
             <Item
              label="Tipe Indikator"
              name="tipeIndikator"
            >
              <Radio.Group onChange={tipeIndikatorChange}>
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
          <Col md={8} sm={24} xs={24}>
            <InputText 
              label="Status Pengukuran"
              name="statusPengukuran"
              onChange={statusPengukuranChange}
            />
            <InputText 
              label="Numerator"
              name="numerator"
              onChange={numeratorChange}
            />
            <InputText 
              label="Denominator"
              name="denominator"
              onChange={denominatorChange}
            />
            <InputText 
              label="Target Capaian"
              name="targetCapaian"
              onChange={targetCapaianChange}
            />
            <InputText 
              label="Kriteria Inklusi & Ekslusi"
              name="kriteriaInklusiEkslusi"
              onChange={kriteriaInklusiEkslusiChange}
            />
            <InputText 
              label="Formula Pengukuran"
              name="formulaPengukuran"
              onChange={formulaPengukuranChange}
            />
            <InputText 
              label="Pengumpulan Data"
              name="pengumpulanData"
              onChange={pengumpulanDataChange}
            />
            <InputText 
              label="Sumber Data"
              name="sumberData"
              onChange={sumberDataChange}
            />
          </Col>
          <Col md={8} sm={24} xs={24}>
            <InputText 
              label="Populasi Atau Sampel"
              name="populasiAtauSampel"
              onChange={populasiAtauSampelChange}
            />
            <Item
              label="Frekuensi Pengumpulan Data"
              name="frekuensiPengumpulanData"
            >
              <Radio.Group onChange={frekuensiPengumpulanDataChange}>
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
              <Radio.Group onChange={periodeWatkuPelaporanChange}>
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
              <Radio.Group onChange={periodeAnalisisChange}>
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
              onChange={penyajianDataChange}
            />
            <InputText 
              label="Penanggung Jawab Indikator"
              name="penanggungJawabIndikator"
              onChange={penanggungJawabIndikatorChange}
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