import {
  Col,
  Form as AntdForm,
  Row,
  DatePicker,
  Button,
  Typography
} from 'antd';

import { Title } from '../../../atoms/Title/Title';
import { InputText } from '../../../atoms/InputText/InputText';
import { Form } from '../../../molecules/Form/Form';
import Textfield from '../../../molecules/Form/Textfield';
import TextEditor from '../../../molecules/Form/TextEditor';
import Dragger from 'antd/lib/upload/Dragger';

const { Item } = AntdForm;
const { Text } = Typography

export const ThirdStep = ({ form, setter, histories, historySetter }) => {
  return (
    <>
      <Title level={4} style={{ marginBottom: '1.5rem' }}>
        TINJAU KEMBALI DOKUMEN SOP YANG TELAH DIINPUT
      </Title>

      <Form layout="vertical">
        <Row gutter={[24]}>
          <Col md={24} sm={24} xs={24}>
            <Textfield
              label="Nama SOP"
              name="name"
              required
              value={form.name}
              disabled
            />

            <Textfield
              disabled
              label="No Dokumen"
              name="document_number"
              required
              value={form.document_number}
            />

            <Textfield
              disabled
              label="No Revisi"
              name="revision_number"
              required
              value={form.revision_number}
            />

            <Item
              label="Tanggal Terbit"
              name="released_date"
              initialValue={form.released_date}
            >
              <DatePicker
                disabled
                onChange={(e) => {
                  setter({ ...form, released_date: e })
                }}
                style={{ width: '100%' }} />
            </Item>
          </Col>
        </Row>
        <TextEditor disabled label={'Pengertian'} required value={form.meaning} />
        <TextEditor disabled label={'Tujuan'} required value={form.goal} />
        <TextEditor disabled label={'Kebijakan'} required value={form.policy} />
        <TextEditor disabled label={'Referensi'} required value={form.reference} />
        <TextEditor disabled label={'Alat & Bahan'} required value={form.tools} />
        <TextEditor disabled label={'Prosedur/langkah'} required value={form.procedures} />
        <TextEditor disabled label={'Catatan Mutu'} required value={form.notes} />

        <Title level={5} style={{ fontWeight: 'bold' }}><span style={{ color: 'red' }}>*</span> Flow Diagram</Title>
        <Dragger
          maxCount={1}
          previewFile={false}
          multiple={false}
          accept='image/*'
          disabled
          fileList={form && form.flow_diagram && form.flow_diagram.fileList ? form.flow_diagram.fileList : undefined}
          beforeUpload={(e) => false}>
          <p>Upload Diagram Alir dengan format png/jpeg</p>
        </Dragger>

        <Title level={5} style={{ fontWeight: 'bold', marginTop: '20px' }}>History Perubahan</Title>
        {histories && histories.map((history, index) => (
          <Row gutter={[8, 8]} key={'row-' + index} style={{ marginBottom: '1px solid #757474', marginBottom: '10px' }}>
            <Col span={8}>
              <Textfield label={'Yang Dirubah'} value={history.name} disabled></Textfield>
            </Col>
            <Col span={8}>
              <Textfield label={'Isi Perubahan'} value={history.value} disabled></Textfield>
            </Col>
            <Col span={8}>
              <Item
                label="Tanggal Ditetapkan"
                name={'publish-' + index + 1}
                initialValue={history.publish}
              >
                <DatePicker
                  disabled
                  style={{ width: '100%' }} />
              </Item>
            </Col>
          </Row>
        ))}
      </Form>
    </>
  )
}