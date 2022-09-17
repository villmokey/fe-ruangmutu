import { Checkbox, Col, Form as AntdForm, Row, Select, Upload, Input } from 'antd';
import { Title } from '../../../../../../atoms/Title/Title';
import { Form } from '../../../../../../molecules/Form/Form';
import { InputText } from '../../../../../../atoms/InputText/InputText';
import { Text } from '../../../../../../atoms/Text/Text';
import { puskesmasList } from '../SatisfactionLevelForm/SecondStep';

const { Option } = Select;
const { Item } = AntdForm;
const { TextArea } = Input;
const { Dragger } = Upload;

export const ThirdStep = ({
  form,
  onFinish,
  programMutuChange,
  targetCapaianChange,
  programMutuOptions,
}) => {

  return (
    <>
      <Title level={4}>KELUHAN PELANGGAN</Title>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={[24]}>
          <Col md={24} sm={24} xs={24}>
            <Item
              label="Fasilitas Kesehatan"
              name="faskes"
              rules={[
                { required: true, message: 'Fasilitas Kesehatan tidak boleh kosong!' }
              ]}
            >
              <Select disabled placeholder="Pilih Fasilitas Kesehatan" onChange={programMutuChange}>
                {
                  puskesmasList &&
                  puskesmasList.map((item, index) => (
                    <Option value={item.value} key={index}>{item.label}</Option>
                  ))
                }
              </Select>
            </Item>
            <Item
              label="Isi Laporan"
              name="report"
              placeholder={'Masukan isi laporan keluharan pelanggan'}
              rules={[
                { required: true, message: 'Isi Laporan tidak boleh kosong!' }
              ]}>
              <TextArea disabled></TextArea>
            </Item>

            <InputText
              label="Sumber"
              name="source"
              disabled
              onChange={targetCapaianChange}
              placeholder={'Masukan sumber keluhan pelanggan'}
              rules={[
                { required: true, message: 'Sumber tidak boleh kosong!' }
              ]}
            />

            <Item label={'Lampiran (Max. 3)'} name={'attachment'}>
              <Dragger maxCount={3} accept={'image/*'} disabled>
                <Text>Upload lampiran dengan format png/jpg/jpeg</Text>
              </Dragger>
            </Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}