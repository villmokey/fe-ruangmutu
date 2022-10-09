import { Col, Form as AntdForm, Row, Select, Upload, Input, DatePicker } from "antd";
import { Title } from "../../../../../../atoms/Title/Title";
import { Form } from "../../../../../../molecules/Form/Form";
import { InputText } from "../../../../../../atoms/InputText/InputText";
import { Text } from "../../../../../../atoms/Text/Text";

const { Option } = Select;
const { Item } = AntdForm;
const { TextArea } = Input;
const { Dragger } = Upload;

export const ThirdStep = ({
  payload = {
    health_service_id: "",
    program_id: "",
    report: "",
    source: "",
    complaint_date: "",
    reported_by: "",
  },
  onFinish,
  payloadSetter,
  programMutuOptions = [],
  serviceOptions = [],
}) => {
  return (
    <>
      <Title level={4}>TINJAU KELUHAN PELANGGAN</Title>
      <Form onFinish={onFinish} layout="vertical">
        <Row gutter={[24]}>
          <Col md={24} sm={24} xs={24}>
            <Item
              label="Fasilitas Kesehatan"
              name="faskes"
              initialValue={payload.health_service_id}
              rules={[
                {
                  required: true,
                  message: "Fasilitas Kesehatan tidak boleh kosong!",
                },
              ]}
            >
              <Select
                disabled
                placeholder="Pilih Fasilitas Kesehatan"
                onChange={(value) =>
                  payloadSetter({ ...payload, health_service_id: value })
                }
              >
                {serviceOptions &&
                  serviceOptions.map((item, index) => (
                    <Option value={item.id} key={index}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Item>
            <Item
              label="Program Mutu"
              name="mutu"
              initialValue={payload.program_id}
              rules={[
                {
                  required: true,
                  message: "Program mutu tidak boleh kosong!",
                },
              ]}
            >
              <Select
                disabled
                placeholder="Pilih Program Mutu"
                onChange={(value) =>
                  payloadSetter({ ...payload, program_id: value })
                }
              >
                {programMutuOptions &&
                  programMutuOptions.map((item, index) => (
                    <Option value={item.id} key={index}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Item>
            <Item
              label="Isi Laporan"
              name="report"
              initialValue={payload.report}
              onChange={(e) =>
                payloadSetter({ ...payload, report: e.target.value })
              }
              placeholder={"Masukan isi laporan keluhan pelanggan"}
              rules={[
                { required: true, message: "Isi Laporan tidak boleh kosong!" },
              ]}
            >
              <TextArea disabled></TextArea>
            </Item>
            <Item
              label="Sumber"
              name="source"
              initialValue={payload.source}
              onChange={(e) =>
                payloadSetter({ ...payload, source: e.target.value })
              }
              placeholder={"Masukan sumber keluhan pelanggan"}
              rules={[
                { required: true, message: "Sumber tidak boleh kosong!" },
              ]}
            >
              <InputText disabled />
            </Item>

            <Item
              label="Pelapor"
              name="reported_by"
              initialValue={payload.reported_by}
              placeholder={"Masukan nama pelapor"}
              rules={[
                { required: true, message: "Nama pelapor tidak boleh kosong!" },
              ]}
            >
              <InputText disabled />
            </Item>

            <Item
              label="Tanggal Keluhan"
              name="complaint_date"
              initialValue={payload.complaint_date}
              placeholder={"Masukan tanggal keluhan"}
              rules={[
                {
                  required: true,
                  message: "Tanggal keluhan tidak boleh kosong!",
                },
              ]}
            >
              <DatePicker
                value={payload.complaint_date}
              ></DatePicker>
            </Item>

            <Item label={"Lampiran (Max. 3)"} name={"attachment"}>
              <Dragger
                disabled
                maxCount={3}
                accept={"image/*"}
                beforeUpload={false}
              >
                <Text>Upload lampiran dengan format png/jpg/jpeg</Text>
              </Dragger>
            </Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
