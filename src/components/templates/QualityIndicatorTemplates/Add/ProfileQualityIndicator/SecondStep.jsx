import { Checkbox, Col, Form as AntdForm, Radio, Row, Select, Upload } from 'antd';
import { Title } from '../../../../atoms/Title/Title';
import { Form } from '../../../../molecules/Form/Form';
import { InputText } from '../../../../atoms/InputText/InputText';
import { Text } from '../../../../atoms/Text/Text';

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
  penanggungJawabIndikatorChange,
  pembuatChange,
  ditugaskanChange,
  programMutuOptions,
  subProgramMutuOptions,
}) => {

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
              rules={[
                { required: true, message: 'Program mutu tidak boleh kosong!' }
              ]}
            >
              <Select placeholder="Pilih program mutu" onChange={programMutuChange}>
                {
                  programMutuOptions &&
                  programMutuOptions.map(( item, index ) => (
                    <Option value={item.id} key={index}>{ item.title }</Option>
                  ))
                }
              </Select>
            </Item>
            <Item
              label="Sub Program Mutu"
              name="subProgramMutu"
              rules={[
                { required: true, message: 'Sub program tidak boleh kosong!' }
              ]}
            >
              <Select placeholder="Pilih Sub program mutu" onChange={subProgramMutuChange}>
                {
                  subProgramMutuOptions &&
                  subProgramMutuOptions.map(( item, index ) => (
                    <Option value={item.id} key={index}>{ item.title }</Option>
                  ))
                }
              </Select>
            </Item>
            <InputText 
              label="Judul Indikator"
              name="judulIndikator"
              onChange={judulIndikatorChange}
              rules={[
                { required: true, message: 'Judul Indikator tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Dasar Pemilihan Indikator"
              name="dasarPemilihanIndikator"
              onChange={dasarPemilihanIndikatorChange}
              rules={[
                { required: true, message: 'Dasar Pemilihan Indikator tidak boleh kosong!' }
              ]}
            />

            <Item
              label="Dimensi Mutu"
              name="dimensiMutu"
              rules={[
                { required: true, message: 'Dimensi Mutu tidak boleh kosong!' }
              ]}
            >
              <Checkbox.Group options={dimensiMutuOptions}></Checkbox.Group>
            </Item>

            <InputText 
              label="Tujuan"
              name="tujuan"
              onChange={tujuanChange}
              rules={[
                { required: true, message: 'Tujuan tidak boleh kosong!' }
              ]}
            />

            <InputText 
              label="Definisi Operasional"
              name="definisiOperasional"
              onChange={definisiOperasionalChange}
              rules={[
                { required: true, message: 'Definisi operasional tidak boleh kosong!' }
              ]}
            />
             <Item
              label="Tipe Indikator"
              name="tipeIndikator"
              rules={[
                { required: true, message: 'Tipe indikator tidak boleh kosong!' }
              ]}
            >
              <Checkbox.Group options={tipeIndikatorOptions}></Checkbox.Group>
            </Item>
          </Col>
          <Col md={8} sm={24} xs={24}>
            <InputText 
              label="Status Pengukuran"
              name="statusPengukuran"
              onChange={statusPengukuranChange}
              rules={[
                { required: true, message: 'Status pengukuran tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Numerator"
              name="numerator"
              onChange={numeratorChange}
              rules={[
                { required: true, message: 'Numerator tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Denominator"
              name="denominator"
              onChange={denominatorChange}
              rules={[
                { required: true, message: 'Denominator tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Target Capaian"
              name="targetCapaian"
              onChange={targetCapaianChange}
              rules={[
                { required: true, message: 'Target capaian tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Kriteria Inklusi & Ekslusi"
              name="kriteriaInklusiEkslusi"
              onChange={kriteriaInklusiEkslusiChange}
              rules={[
                { required: true, message: 'Kriteria tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Formula Pengukuran"
              name="formulaPengukuran"
              onChange={formulaPengukuranChange}
              rules={[
                { required: true, message: 'Formula pengukuran tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Pengumpulan Data"
              name="pengumpulanData"
              onChange={pengumpulanDataChange}
              rules={[
                { required: true, message: 'Pengumpulan data tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Sumber Data"
              name="sumberData"
              onChange={sumberDataChange}
              rules={[
                { required: true, message: 'Sumber data tidak boleh kosong!' }
              ]}
            />
          </Col>
          <Col md={8} sm={24} xs={24}>
            <InputText 
              label="Populasi Atau Sampel"
              name="populasiAtauSampel"
              onChange={populasiAtauSampelChange}
              rules={[
                { required: true, message: 'Populasi tidak boleh kosong!' }
              ]}
            />
            <Item
              label="Frekuensi Pengumpulan Data"
              name="frekuensiPengumpulanData"
              rules={[
                { required: true, message: 'Frekuensi pengumpulan data tidak boleh kosong!' }
              ]}
            >
              <Checkbox.Group options={frekuensiPengumpulanDataOptions}></Checkbox.Group>
            </Item>
            <Item
              label="Periode Waktu Pelaporan"
              name="periodeWaktuPelaporan"
              rules={[
                { required: true, message: 'Periode Waktu pelaporan tidak boleh kosong!' }
              ]}
            >
              <Checkbox.Group options={periodeWaktuPelaporanOptions}></Checkbox.Group>
            </Item>
            <Item
              label="Periode Analisis"
              name="periodeAnalisis"
              rules={[
                { required: true, message: 'Periode analisis tidak boleh kosong!' }
              ]}
            >
              <Checkbox.Group options={periodeWaktuPelaporanOptions}></Checkbox.Group>
            </Item>
            <InputText 
              label="Penyajian Data"
              name="penyajianData"
              onChange={penyajianDataChange}
              rules={[
                { required: true, message: 'Penyajian Data tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Penanggung Jawab Indikator"
              name="penanggungJawabIndikator"
              onChange={penanggungJawabIndikatorChange}
            />
            <InputText 
              label="Dibuat Oleh"
              name="dibuatOleh"
              rules={[
                { required: true, message: 'Pembuat tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Ditugaskan Oleh"
              name="pic"
              disabled
              rules={[
                { required: true, message: 'Penugas tidak boleh kosong!' }
              ]}
            />
            <Item
              label="Dokumen Telusur"
              name="dokumenTelusur"
              valuePropName="file"
              rules={[
                { required: true, message: 'Penugas tidak boleh kosong!' }
              ]}
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