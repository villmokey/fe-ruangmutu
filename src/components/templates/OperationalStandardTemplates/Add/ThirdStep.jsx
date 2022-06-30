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

export const ThirdStep = ({}) => {
  return (
    <>
      <Title level={4} style={{ marginBottom: '1.5rem' }}>
        TINJAU KEMBALI DOKUMEN SOP YANG TELAH DIINPUT
      </Title>

      <Form layout="vertical">
        <Row gutter={[24]}>
          <Col md={8} sm={24} xs={24}>
            <InputText 
              label="Nama SOP"
              name="sopName"
              disabled
              rules={[
                { required: true, message: 'Nama SOP tidak boleh kosong!' }
              ]}
            />

            <InputText 
              label="No Dokumen"
              name="docNumber"
              disabled
              rules={[
                { required: true, message: 'Nomor dokumen tidak boleh kosong!' }
              ]}
            />

            <InputText 
              label="No Revisi"
              name="revisionNumber"
              disabled
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
              <DatePicker disabled onChange={() => {}} style={{ width: '100%' }} />
            </Item>

            <Row gutter={16}>
              <Col span={12}>
                <InputText 
                  label="Halaman"
                  name="page"
                  disabled
                  rules={[
                    { required: true, message: 'Halaman tidak boleh kosong!' }
                  ]}
                />
              </Col>

              <Col span={12}>
                <InputText 
                  label="Jumlah Halaman"
                  name="totalPage"
                  disabled
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
              disabled
              rules={[
                { required: true, message: 'Pengertian tidak boleh kosong!' }
              ]}
            />

            <InputText 
              label="Tujuan"
              name="objective"
              disabled
              rules={[
                { required: true, message: 'Tujuan tidak boleh kosong!' }
              ]}
            />

            <InputText 
              label="Kebijakan"
              name="policy"
              disabled
              rules={[
                { required: true, message: 'Kebijakan tidak boleh kosong!' }
              ]}
            />

            <InputText 
              label="Referensi"
              name="reference"
              disabled
              rules={[
                { required: true, message: 'Referensi tidak boleh kosong' }
              ]}
            />

            <InputText 
              label="Alat dan Bahan"
              name="tools"
              disabled
              rules={[
                { required: true, message: 'Alat dan bahan tidak boleh kosong!' }
              ]}
            />
          </Col>

          <Col md={8} sm={24} xs={24}>
            <InputText 
              label="Prosedur/Langkah"
              name="steps"
              disabled
              rules={[
                { required: true, message: 'Prosedur/langkah tidak boleh kosong!' }
              ]}
            />
            
            <InputText 
              label="Diagram Alir"
              name="flowChart"
              disabled
              rules={[
                { required: true, message: 'Diagram alir tidak boleh kosong!' }
              ]}
            />

            <InputText
              label="Unit Terkait"
              name="unit"
              disabled
              rules={[
                { required: true, message: 'Unit terkait tidak boleh kosong!' }
              ]}
            />

            <InputText
              label="Catatan Mutu"
              name="notes"
              disabled
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