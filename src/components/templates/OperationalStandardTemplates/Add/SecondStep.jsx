import { 
  Col,
  Form as AntdForm,
  Row,
  DatePicker,
} from 'antd';

import { Title } from '../../../atoms/Title/Title';
import { InputText } from '../../../atoms/InputText/InputText';
import { Form } from '../../../molecules/Form/Form';
 
const { Item } = AntdForm;

export const SecondStep = () => {
  return (
    <>
      <Title level={4} style={{ marginBottom: '1.5rem' }}>
        LENGKAPI ISI DOKUMEN SOP YANG AKAN DIBUAT
      </Title>

      <Form layout="vertical">
        <Row gutter={[24]}>
          <Col md={8} sm={24} xs={24}>
            <InputText 
              label="Nama SOP"
              name="sopName"
              rules={[
                { required: true, message: 'Nama SOP tidak boleh kosong!' }
              ]}
            />

            <InputText 
              label="No Dokumen"
              name="docNumber"
              rules={[
                { required: true, message: 'Nomor dokumen tidak boleh kosong!' }
              ]}
            />

            <InputText 
              label="No Revisi"
              name="revisionNumber"
              rules={[
                { required: true, message: 'No revisi tidak boleh kosong!' }
              ]}
            />

            <Item
              label="Tanggal Terbit"
              name="publishedDate"
              rules={[
                { required: true, message: 'Tanggal terbit tidak boleh kosong!' }
              ]}
            >
              <DatePicker onChange={() => {}} style={{ width: '100%' }} />
            </Item>

            <Row gutter={16}>
              <Col span={12}>
                <InputText 
                  label="Halaman"
                  name="page"
                  rules={[
                    { required: true, message: 'Halaman tidak boleh kosong!' }
                  ]}
                />
              </Col>

              <Col span={12}>
                <InputText 
                  label="Jumlah Halaman"
                  name="totalPage"
                  rules={[
                    { required: true, message: 'Jumlah halaman tidak boleh kosong!' }
                  ]}
                />
              </Col>
            </Row>
          </Col>
          
          <Col md={8} sm={24} xs={24}>
            <InputText 
              label="Pengertian"
              name="definition"
              rules={[
                { required: true, message: 'Pengertian tidak boleh kosong!' }
              ]}
            />

            <InputText 
              label="Tujuan"
              name="objective"
              rules={[
                { required: true, message: 'Tujuan tidak boleh kosong!' }
              ]}
            />

            <InputText 
              label="Kebijakan"
              name="policy"
              rules={[
                { required: true, message: 'Kebijakan tidak boleh kosong!' }
              ]}
            />

            <InputText 
              label="Referensi"
              name="reference"
              rules={[
                { required: true, message: 'Referensi tidak boleh kosong' }
              ]}
            />

            <InputText 
              label="Alat dan Bahan"
              name="tools"
              rules={[
                { required: true, message: 'Alat dan bahan tidak boleh kosong!' }
              ]}
            />
          </Col>

          <Col md={8} sm={24} xs={24}>
            <InputText 
              label="Prosedur/Langkah"
              name="steps"
              rules={[
                { required: true, message: 'Prosedur/langkah tidak boleh kosong!' }
              ]}
            />
            
            <InputText 
              label="Diagram Alir"
              name="flowChart"
              rules={[
                { required: true, message: 'Diagram alir tidak boleh kosong!' }
              ]}
            />

            <InputText
              label="Unit Terkait"
              name="unit"
              rules={[
                { required: true, message: 'Unit terkait tidak boleh kosong!' }
              ]}
            />

            <InputText
              label="Catatan Mutu"
              name="notes"
              rules={[
                { required: true, message: 'Catatan mutu tidak boleh kosong!' }
              ]}
            />
          </Col>
        </Row>
      </Form>
    </>
  )
}