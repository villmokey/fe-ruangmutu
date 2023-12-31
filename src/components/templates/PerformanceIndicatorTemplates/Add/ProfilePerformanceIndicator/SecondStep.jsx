import { Checkbox, Col, Form as AntdForm, Row, Select, Upload } from "antd";
import { Title } from "../../../../atoms/Title/Title";
import { Form } from "../../../../molecules/Form/Form";
import { InputText } from "../../../../atoms/InputText/InputText";
import { Text } from "../../../../atoms/Text/Text";

import "./SecondStep.less";

const { Option } = Select;
const { Item } = AntdForm;
const { Dragger } = Upload;

export const dimensiMutuOptions = [
  {
    label: "Kelayakan",
    value: "Kelayakan",
  },
  {
    label: "Ketepatan Waktu",
    value: "Ketepatan Waktu",
  },
  {
    label: "Manfaat",
    value: "Manfaat",
  },
  {
    label: "Ketersiadaan",
    value: "Ketersiadaan",
  },
  {
    label: "Keselamatan",
    value: "Keselamatan",
  },
  {
    label: "Efisiensi",
    value: "Efisiensi",
  },
  {
    label: "Efektivias",
    value: "Efektivias",
  },
  {
    label: "Kesinambungan",
    value: "Kesinambungan",
  },
];

export const frekuensiPengumpulanDataOptions = [
  {
    label: "Harian",
    value: "Harian",
  },
  {
    label: "Mingguan",
    value: "Mingguan",
  },
  {
    label: "Bulan",
    value: "Bulan",
  },
  {
    label: "Tahunan",
    value: "Tahunan",
  },
];

export const periodeWaktuPelaporanOptions = [
  {
    label: "Bulanan",
    value: "Bulanan",
  },
  {
    label: "Triwulan",
    value: "Triwulan",
  },
  {
    label: "Semester",
    value: "Semester",
  },
  {
    label: "Tahunan",
    value: "Tahunan",
  },
];

export const tipeIndikatorOptions = [
  {
    label: "Input",
    value: "Input",
  },
  {
    label: "Proses",
    value: "Proses",
  },
  {
    label: "Output",
    value: "Output",
  },
  {
    label: "Outcome",
    value: "Outcome",
  },
];

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
  userOptions,
  userOptions2,
  userOptions3,
  pembuatDokumenChange,
  penanggungJawab1Change,
  penanggungJawab2Change,
}) => {
  return (
    <>
      <Title level={4}>Form Profil Indikator Kinerja</Title>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[24]}>
          <Col md={8} sm={24} xs={24}>
            <Item
              label="Program Mutu"
              name="programMutu"
              rules={[
                { required: true, message: "Program mutu tidak boleh kosong!" },
              ]}
            >
              <Select
                showSearch
                placeholder="Pilih program mutu"
                onChange={programMutuChange}
                filterOption={(input, option) =>
                  (option?.children?.toLowerCase() ?? "").includes(
                    input.toLowerCase()
                  )
                }
              >
                {programMutuOptions &&
                  programMutuOptions.map((item, index) => (
                    <Option value={item.id} key={index}>
                      {item.title}
                    </Option>
                  ))}
              </Select>
            </Item>
            <Item
              label="Sub Program Mutu"
              name="subProgramMutu"
              rules={[
                { required: true, message: "Sub program tidak boleh kosong!" },
              ]}
            >
              <Select
                showSearch
                placeholder="Pilih Sub program mutu"
                onChange={subProgramMutuChange}
                filterOption={(input, option) =>
                  (option?.children?.toLowerCase() ?? "").includes(
                    input.toLowerCase()
                  )
                }
              >
                {programMutuOptions &&
                  programMutuOptions.map((item, index) => (
                    <Option value={item.id} key={index}>
                      {item.title}
                    </Option>
                  ))}
              </Select>
            </Item>
            <InputText
              label="Judul Indikator"
              name="judulIndikator"
              onChange={judulIndikatorChange}
              rules={[
                {
                  required: true,
                  message: "Judul Indikator tidak boleh kosong!",
                },
              ]}
            />
            <InputText
              label="Dasar Pemilihan Indikator"
              name="dasarPemilihanIndikator"
              onChange={dasarPemilihanIndikatorChange}
              rules={[
                {
                  required: true,
                  message: "Dasar Pemilihan Indikator tidak boleh kosong!",
                },
              ]}
            />

            <Item
              label="Dimensi Mutu"
              name="dimensiMutu"
              rules={[
                { required: true, message: "Dimensi Mutu tidak boleh kosong!" },
              ]}
            >
              <Checkbox.Group options={dimensiMutuOptions}></Checkbox.Group>
            </Item>

            <InputText
              label="Tujuan"
              name="tujuan"
              onChange={tujuanChange}
              rules={[
                { required: true, message: "Tujuan tidak boleh kosong!" },
              ]}
            />

            <InputText
              label="Definisi Operasional"
              name="definisiOperasional"
              onChange={definisiOperasionalChange}
              rules={[
                {
                  required: true,
                  message: "Definisi operasional tidak boleh kosong!",
                },
              ]}
            />
            <Item
              label="Tipe Indikator"
              name="tipeIndikator"
              rules={[
                {
                  required: true,
                  message: "Tipe indikator tidak boleh kosong!",
                },
              ]}
            >
              <Checkbox.Group options={tipeIndikatorOptions}></Checkbox.Group>
            </Item>

            <InputText
              label="Satuan Pengukuran"
              name="statusPengukuran"
              onChange={statusPengukuranChange}
              rules={[
                {
                  required: true,
                  message: "Satuan pengukuran tidak boleh kosong!",
                },
              ]}
            />

            <InputText
              label="Numerator"
              name="numerator"
              onChange={numeratorChange}
              rules={[
                { required: true, message: "Numerator tidak boleh kosong!" },
              ]}
            />
          </Col>
          <Col md={8} sm={24} xs={24}>
            <InputText
              label="Denominator"
              name="denominator"
              onChange={denominatorChange}
              rules={[
                { required: true, message: "Denominator tidak boleh kosong!" },
              ]}
            />
            <InputText
              label="Target Capaian"
              name="achievement_target"
              onChange={targetCapaianChange}
              type="number"
              inputMode="numeric"
              rules={[
                {
                  required: true,
                  message: "Target capaian tidak boleh kosong!",
                },
              ]}
            />
            <InputText
              label="Kriteria Inklusi & Ekslusi"
              name="kriteriaInklusiEkslusi"
              onChange={kriteriaInklusiEkslusiChange}
              rules={[
                { required: true, message: "Kriteria tidak boleh kosong!" },
              ]}
            />
            <InputText
              label="Formula Pengukuran"
              name="formulaPengukuran"
              onChange={formulaPengukuranChange}
              rules={[
                {
                  required: true,
                  message: "Formula pengukuran tidak boleh kosong!",
                },
              ]}
            />
            <InputText
              label="Desain Pengumpulan Data"
              name="pengumpulanData"
              onChange={pengumpulanDataChange}
              rules={[
                {
                  required: true,
                  message: "Desain pengumpulan data tidak boleh kosong!",
                },
              ]}
            />
            <InputText
              label="Sumber Data"
              name="sumberData"
              onChange={sumberDataChange}
              rules={[
                { required: true, message: "Sumber data tidak boleh kosong!" },
              ]}
            />

            <InputText
              label="Populasi Atau Sampel"
              name="populasiAtauSampel"
              onChange={populasiAtauSampelChange}
              rules={[
                { required: true, message: "Populasi tidak boleh kosong!" },
              ]}
            />

            <Item
              label="Frekuensi Pengumpulan Data"
              name="frekuensiPengumpulanData"
              rules={[
                {
                  required: true,
                  message: "Frekuensi pengumpulan data tidak boleh kosong!",
                },
              ]}
            >
              <Checkbox.Group
                options={frekuensiPengumpulanDataOptions}
              ></Checkbox.Group>
            </Item>

            <Item
              label="Periode Waktu Pelaporan"
              name="periodeWaktuPelaporan"
              rules={[
                {
                  required: true,
                  message: "Periode Waktu pelaporan tidak boleh kosong!",
                },
              ]}
            >
              <Checkbox.Group
                options={periodeWaktuPelaporanOptions}
              ></Checkbox.Group>
            </Item>

            <Item
              label="Periode Analisis"
              name="periodeAnalisis"
              rules={[
                {
                  required: true,
                  message: "Periode analisis tidak boleh kosong!",
                },
              ]}
            >
              <Checkbox.Group
                options={periodeWaktuPelaporanOptions}
              ></Checkbox.Group>
            </Item>
          </Col>
          <Col md={8} sm={24} xs={24}>
            <InputText
              label="Penyajian Data"
              name="penyajianData"
              onChange={penyajianDataChange}
              rules={[
                {
                  required: true,
                  message: "Penyajian Data tidak boleh kosong!",
                },
              ]}
            />
            <InputText
              label="Dibuat Oleh"
              name="dibuatOleh"
              disabled
              rules={[
                { required: true, message: "Pembuat tidak boleh kosong!" },
              ]}
            />
            <Item
              label="Pembuat Dokumen"
              name="pembuatDokumen"
              rules={[
                { required: true, message: "Pembuat tidak boleh kosong!" },
              ]}
            >
              <Select
                placeholder="Pilih pembuat dokumen"
                onChange={pembuatDokumenChange}
                showSearch
                filterOption={(input, option) =>
                  (option?.children?.toLowerCase() ?? "").includes(
                    input.toLowerCase()
                  )
                }
              >
                {userOptions &&
                  userOptions.map((item, index) => (
                    <Option value={item.id} key={index}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Item>
            <Item
              label="Penanggung jawab 1"
              name="penanggungJawab1"
              rules={[
                {
                  required: true,
                  message: "Penanggung Jawab 1 tidak boleh kosong!",
                },
              ]}
            >
              <Select
                placeholder="Pilih penanggung jawab 1"
                onChange={penanggungJawab1Change}
                showSearch
                filterOption={(input, option) =>
                  (option?.children?.toLowerCase() ?? "").includes(
                    input.toLowerCase()
                  )
                }
              >
                {userOptions2 &&
                  userOptions2.map((item, index) => (
                    <Option value={item.id} key={index}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Item>
            <Item label="Penanggung jawab 2 (opsional)" name="penanggungJawab2">
              <Select
                placeholder="Pilih penanggung jawab 2"
                onChange={penanggungJawab2Change}
                showSearch
                filterOption={(input, option) =>
                  (option?.children?.toLowerCase() ?? "").includes(
                    input.toLowerCase()
                  )
                }
              >
                {userOptions3 &&
                  userOptions3.map((item, index) => (
                    <Option value={item.id} key={index}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Item>
            <Item label="Dokumen Telusur" name="dokumenTelusur">
              <Dragger
                multiple={false}
                accept="application/pdf, images/*"
                beforeUpload={() => false}
                style={{ height: 200 }}
              >
                <Text>Drag & Drop</Text>
              </Dragger>
            </Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
