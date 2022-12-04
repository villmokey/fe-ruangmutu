import {
  Col,
  Form as AntdForm,
  Row,
  Select,
  Upload,
  Input,
  DatePicker,
} from "antd";
import { Title } from "../../../../../../atoms/Title/Title";
import { Form } from "../../../../../../molecules/Form/Form";
import { InputText } from "../../../../../../atoms/InputText/InputText";
import { Text } from "../../../../../../atoms/Text/Text";

const { Option } = Select;
const { Item } = AntdForm;
const { TextArea } = Input;
const { Dragger } = Upload;

export const SecondStep = ({
  payload = {
    health_service_id: "",
    program_id: "",
    report: "",
    source: "",
    complaint_date: "",
    reported_by: "",
    attachments: [],
  },
  onFinish,
  payloadSetter,
  programMutuOptions = [],
  serviceOptions = [],
}) => {
  return (
    <>
      <Title level={4}>KELUHAN PELANGGAN</Title>
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
              <TextArea></TextArea>
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
              <InputText />
            </Item>
            <Item
              label="Pelapor"
              name="reported_by"
              initialValue={payload.reported_by}
              onChange={(e) =>
                payloadSetter({ ...payload, reported_by: e.target.value })
              }
              placeholder={"Masukan nama pelapor"}
              rules={[]}
            >
              <InputText />
            </Item>

            <Item
              label="Tanggal Keluhan"
              name="complaint_date"
              initialValue={payload.complaint_date}
              placeholder={"Masukan tanggal keluhan"}
              // onChange={(e) =>
              //   payloadSetter({ ...payload, complaint_date: e.target.value })
              // }
              rules={[
                {
                  required: true,
                  message: "Tanggal keluhan tidak boleh kosong!",
                },
              ]}
            >
              <DatePicker
                value={payload.complaint_date}
                onChange={(e) =>
                  payloadSetter({ ...payload, complaint_date: e })
                }
              ></DatePicker>
            </Item>

            <Item
              label={"Lampiran (Max. 3)"}
              name={"attachment"}
            >
              <Dragger
                onChange={({ fileList }) =>
                  payloadSetter({ ...payload, attachments: fileList })
                }
                fileList={payload.attachments}
                maxCount={3}
                accept={"image/*, application/pdf"}
                multiple
                beforeUpload={() => false}
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
