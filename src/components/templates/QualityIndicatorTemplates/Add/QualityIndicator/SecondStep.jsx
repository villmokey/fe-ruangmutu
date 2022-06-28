import { Col, Form as AntdForm, InputNumber, Row, Select, Upload } from 'antd';
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
  tujuanChange,
  definisiOperasionalChange,
  sasaranMutuChange,
  judulIndikatorChange,
  profileOptions,
  programMutuOptions,
  subProgramMutuOptions,
  userOptions
}) => {

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
            <Item
              label="Judul Indikator"
              name="judulIndikator"
              rules={[
                { required: true, message: 'Judul Indikator tidak boleh kosong!' }
              ]}
            >
              <Select placeholder="Pilih Judul Indikator" onChange={judulIndikatorChange} showSearch>
                {
                  profileOptions &&
                  profileOptions.map(( item, index ) => (
                    <Option value={item.id} key={index}>{ item.title }</Option>
                  ))
                }
              </Select>
            </Item>
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
                    <Option value={item.value} key={index}>{ item.title }</Option>
                  ))
                }
              </Select>
            </Item>
            <Item
              label="Sub Program Mutu"
              name="subProgramMutu"
              rules={[
                { required: true, message: 'Sub program mutu tidak boleh kosong!' }
              ]}
            >
              <Select placeholder="Pilih sub program mutu" onChange={programMutuChange} disabled>
                {
                  subProgramMutuOptions &&
                  subProgramMutuOptions.map(( item, index ) => (
                    <Option value={item.value} key={index}>{ item.title }</Option>
                  ))
                }
              </Select>
            </Item>
            <InputText 
              label="Manusia"
              name="manusia"
              rules={[
                { required: true, message: 'Manusia tidak boleh kosong!' }
              ]}
            />
            <InputText 
              label="Alat"
              name="alat"
              rules={[
                { required: true, message: 'Alat tidak boleh kosong!' }
              ]}
            />

            <InputText 
              label="Metode"
              name="metode"
              onChange={judulIndikatorChange}
              rules={[
                { required: true, message: 'Metode tidak boleh kosong!' }
              ]}
            />
            
          </Col>
          <Col md={8} sm={24} xs={24}>
            <Item
              label="Bulan"
              name="bulan"
              rules={[
                { required: true, message: 'Bulan tidak boleh kosong!' }
              ]}
            >
              <Select placeholder="Pilih bulan" onChange={programMutuChange}>
                {
                  months.map(( item, index ) => (
                    <Option value={item.value} key={index}>{ item.label }</Option>
                  ))
                }
              </Select>
            </Item>

            <InputText 
              label="Sasaran Mutu"
              name="sasaranMutu"
              onChange={sasaranMutuChange}
              rules={[
                { required: true, message: 'Sasaran mutu tidak boleh kosong!' }
              ]}
            />

            <InputText 
              label="Kebijakan"
              name="kebijakan"
              onChange={tujuanChange}
              rules={[
                { required: true, message: 'Kebijakan tidak boleh kosong!' }
              ]}
            />

            <InputText 
              label="Lingkungan"
              name="lingkungan"
              onChange={definisiOperasionalChange}
              rules={[
                { required: true, message: 'Lingkungan tidak boleh kosong!' }
              ]}
            />

            <InputText 
              label="Rencana Tindak Lanjut"
              name="rencanaTindakLanjut"
              onChange={definisiOperasionalChange}
              rules={[
                { required: true, message: 'Rencana tindak lanjut!' }
              ]}
            />

            
            <InputText 
              label="Dibuat Oleh"
              name="dibuatOleh"
              disabled
              rules={[
                { required: true, message: 'Pembuat tidak boleh kosong!' }
              ]}
            />
          </Col>
          <Col md={8} sm={24} xs={24}>
            <Item
              label="Capaian bulan ini"
              name="capaianBulanIni"
              rules={[
                { required: true, message: 'Pembuat tidak boleh kosong!' }
              ]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }}/>
            </Item>
            
            <Item
              label="Pembuat Dokumen"
              name="pembuatDokumen"
              rules={[
                { required: true, message: 'Pembuat tidak boleh kosong!' }
              ]}
            >
              <Select placeholder="Pilih pembuat dokumen">
                {
                  userOptions &&
                  userOptions.map(( item, index ) => (
                    <Option value={item.id} key={index}>{ item.name }</Option>
                  ))
                }
              </Select>
            </Item>
            <Item
              label="Penanggung jawab 1"
              name="penanggungJawab1"
              rules={[
                { required: true, message: 'Penanggung Jawab 1 tidak boleh kosong!' }
              ]}
            >
              <Select placeholder="Pilih penanggung jawab 1">
                {
                  userOptions &&
                  userOptions.map(( item, index ) => (
                    <Option value={item.id} key={index}>{ item.name }</Option>
                  ))
                }
              </Select>
            </Item>
            <Item
              label="Penanggung jawab 2 (opsional)"
              name="penanggungJawab2"
            >
              <Select placeholder="Pilih penanggung jawab 2">
                {
                  userOptions &&
                  userOptions.map(( item, index ) => (
                    <Option value={item.id} key={index}>{ item.name }</Option>
                  ))
                }
              </Select>
            </Item>
            <Item
              label="Dokumen Telusur"
              name="dokumenTelusur"
              valuePropName="file"
              rules={[
                { required: true, message: 'Dokumen tidak boleh kosong!' }
              ]}
            >
              <Dragger
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
  )
}