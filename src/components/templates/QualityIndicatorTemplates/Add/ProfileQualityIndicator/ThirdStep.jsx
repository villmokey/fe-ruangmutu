import { Checkbox, Col, Form as AntdForm, Radio, Row, Select, Upload } from 'antd';
import { InputText } from '../../../../atoms/InputText/InputText';
import { Text } from '../../../../atoms/Text/Text';
import { Title } from "../../../../atoms/Title/Title";
import { Form } from '../../../../molecules/Form/Form';

const { Option } = Select;
const { Item } = AntdForm;
const { Dragger } = Upload;

export const ThirdStep = ({
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
      <Title level={4}>Tinjau ulang Profil Indikator Mutu</Title>
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
                { required: true, message: 'Program Mutu tidak boleh kosong!' }
              ]}
            >
              <Select placeholder="Pilih program mutu" onChange={programMutuChange} disabled>
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
              <Select placeholder="Pilih Sub program mutu" onChange={subProgramMutuChange} disabled>
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
              disabled
            />
            <InputText 
              label="Dasar Pemilihan Indikator"
              name="dasarPemilihanIndikator"
              onChange={dasarPemilihanIndikatorChange}
              disabled
              rules={[
                { required: true, message: 'Dasar Pemilihan indikator tidak boleh kosong!' }
              ]}
            />

            <Item
              label="Dimensi Mutu"
              name="dimensiMutu"
              rules={[
                { required: true, message: 'Dimensi Mutu tidak boleh kosong!' }
              ]}
            >
              <Checkbox.Group options={dimensiMutuOptions} onChange={dimensiMutuChange} disabled></Checkbox.Group>
            </Item>

            <InputText 
              label="Tujuan"
              name="tujuan"
              onChange={tujuanChange}
              disabled
              rules={[
                { required: true, message: 'Tujuan tidak boleh kosong!' }
              ]}
            />

            <InputText 
              label="Definisi Operasional"
              name="definisiOperasional"
              onChange={definisiOperasionalChange}
              disabled
              rules={[
                { required: true, message: 'Definisi Operasional tidak boleh kosong!' }
              ]}
            />
             <Item
              label="Tipe Indikator"
              name="tipeIndikator"
              rules={[
                { required: true, message: 'Tipe indikator tidak boleh kosong!' }
              ]}
            >
              <Checkbox.Group options={tipeIndikatorOptions} disabled></Checkbox.Group>
            </Item>
          </Col>
          <Col md={8} sm={24} xs={24}>
            <InputText 
              label="Status Pengukuran"
              name="statusPengukuran"
              onChange={statusPengukuranChange}
              disabled
              rules={[
                { required: true, message: 'Status pengukuran tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Numerator"
              name="numerator"
              onChange={numeratorChange}
              disabled
              rules={[
                { required: true, message: 'Numerator tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Denominator"
              name="denominator"
              onChange={denominatorChange}
              disabled
              rules={[
                { required: true, message: 'Denominator tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Target Capaian"
              name="targetCapaian"
              onChange={targetCapaianChange}
              disabled
              rules={[
                { required: true, message: 'Target capaian tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Kriteria Inklusi & Ekslusi"
              name="kriteriaInklusiEkslusi"
              onChange={kriteriaInklusiEkslusiChange}
              disabled
              rules={[
                { required: true, message: 'Kriteria tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Formula Pengukuran"
              name="formulaPengukuran"
              onChange={formulaPengukuranChange}
              disabled
              rules={[
                { required: true, message: 'Formula Pengukuran tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Pengumpulan Data"
              name="pengumpulanData"
              onChange={pengumpulanDataChange}
              disabled
              rules={[
                { required: true, message: 'Pengumpulan data tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Sumber Data"
              name="sumberData"
              onChange={sumberDataChange}
              disabled
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
              disabled
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
              <Checkbox.Group options={frekuensiPengumpulanDataOptions} disabled></Checkbox.Group>
            </Item>
            <Item
              label="Periode Waktu Pelaporan"
              name="periodeWaktuPelaporan"
              rules={[
                { required: true, message: 'Periode waktu pelaporan tidak boleh kosong!' }
              ]}
            >
              <Checkbox.Group options={periodeWaktuPelaporanOptions} disabled></Checkbox.Group>
            </Item>
            <Item
              label="Periode Analisis"
              name="periodeAnalisis"
              rules={[
                { required: true, message: 'Periode analisis tidak boleh kosong!' }
              ]}
            >
              <Checkbox.Group options={periodeWaktuPelaporanOptions} disabled></Checkbox.Group>
            </Item>
            <InputText 
              label="Penyajian Data"
              name="penyajianData"
              onChange={penyajianDataChange}
              disabled
              rules={[
                { required: true, message: 'Penyajian data tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Penanggung Jawab Indikator"
              name="penanggungJawabIndikator"
              onChange={penanggungJawabIndikatorChange}
              disabled
            />
            <InputText 
              label="Dibuat Oleh"
              name="dibuatOleh"
              disabled
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
              valuePropName="fileList"
              rules={[
                { required: true, message: 'Dokumen tidak boleh kosong!' }
              ]}
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