import React from "react";
import {
  Col,
  Form as AntdForm,
  Row,
  DatePicker,
  Collapse,
  Button,
  Select,
} from "antd";

import { Title } from "../../../atoms/Title/Title";
import { Form } from "../../../molecules/Form/Form";
import { Text } from "../../../atoms/Text/Text";
import TextEditor from "../../../molecules/Form/TextEditor";
import Dragger from "antd/lib/upload/Dragger";
import Textfield from "../../../molecules/Form/Textfield";

const { Item } = AntdForm;
const { Panel } = Collapse;
const fields = [
  "Nomor Dokumen",
  "Nomor Revisi",
  "Pengertian",
  "Tujuan",
  "Kebijakan",
  "Referensi",
  "Alat & Bahan",
  "Prosedur/Langkah",
];

export const SecondStep = ({
  onFinish,
  form,
  setter,
  histories = [],
  historySetter,
}) => {
  return (
    <>
      <Title level={4} style={{ marginBottom: "1.5rem" }}>
        LENGKAPI ISI DOKUMEN SOP YANG AKAN DIBUAT
      </Title>

      <Form layout="vertical">
        <Row gutter={[24]}>
          <Col md={24} sm={24} xs={24}>
            <Textfield
              label="Nama SOP"
              name="name"
              required
              value={form.name}
              onChange={(e) => setter({ ...form, name: e.target.value })}
            />

            <Textfield
              label="No Dokumen"
              name="document_number"
              required
              value={form.document_number}
              onChange={(e) =>
                setter({ ...form, document_number: e.target.value })
              }
            />

            <Textfield
              label="No Revisi"
              name="revision_number"
              required
              value={form.revision_number}
              onChange={(e) =>
                setter({ ...form, revision_number: e.target.value })
              }
            />

            <Item
              label="Tanggal Terbit"
              name="released_date"
              initialValue={form.released_date}
              rules={[
                {
                  required: true,
                  message: "Tanggal terbit tidak boleh kosong!",
                },
              ]}
            >
              <DatePicker
                value={form.released_date}
                onChange={(e) => {
                  setter({ ...form, released_date: e });
                }}
                style={{ width: "100%" }}
              />
            </Item>
          </Col>
        </Row>
        <TextEditor
          label={"Pengertian"}
          required
          value={form.meaning}
          onChange={(value) => setter({ ...form, meaning: value })}
        />
        <TextEditor
          label={"Tujuan"}
          required
          value={form.goal}
          onChange={(value) => setter({ ...form, goal: value })}
        />
        <TextEditor
          label={"Kebijakan"}
          required
          value={form.policy}
          onChange={(value) => setter({ ...form, policy: value })}
        />
        <TextEditor
          label={"Referensi"}
          required
          value={form.reference}
          onChange={(value) => setter({ ...form, reference: value })}
        />
        <TextEditor
          label={"Alat & Bahan"}
          required
          value={form.tools}
          onChange={(value) => setter({ ...form, tools: value })}
        />
        <TextEditor
          label={"Prosedur/langkah"}
          required
          value={form.procedures}
          onChange={(value) => setter({ ...form, procedures: value })}
        />
        <TextEditor
          label={"Catatan Mutu"}
          required
          value={form.notes}
          onChange={(value) => setter({ ...form, notes: value })}
        />
        <Title level={5} style={{ fontWeight: "bold" }}>
          Flow Diagram
        </Title>
        <Dragger
          maxCount={1}
          previewFile={false}
          multiple={false}
          accept="image/*"
          fileList={
            form && form.flow_diagram && form.flow_diagram.fileList
              ? form.flow_diagram.fileList
              : undefined
          }
          beforeUpload={(e) => false}
          onChange={(e) => setter({ ...form, flow_diagram: e })}
        >
          <p>Upload Diagram Alir dengan format png/jpeg</p>
        </Dragger>

        <div style={{ marginTop: "20px" }}>
          <Collapse defaultActiveKey={["1"]}>
            <Panel header="Tambah History Perubahan" key="1">
              {histories && histories.length > 0 ? (
                <>
                  {histories.map((history, index) => (
                    <Row gutter={[8, 8]} key={"row-" + index}>
                      <Col span={6}>
                        <Text className={"ant-form-item-label"}>
                          Yang Dirubah
                        </Text>
                        <Select
                          style={{ width: "100%" }}
                          value={history.name}
                          onChange={(value) => {
                            let temp = [...histories];
                            temp[index].name = value;
                            historySetter(temp);
                          }}
                        >
                          {fields &&
                            fields.map((field, itemIndex) => (
                              <Select.Option
                                value={field}
                                key={"feat-" + itemIndex}
                              >
                                {field}
                              </Select.Option>
                            ))}
                        </Select>
                      </Col>
                      <Col span={8}>
                        <Textfield
                          label={"Isi Perubahan"}
                          value={history.value}
                          onChange={(e) => {
                            let temp = [...histories];
                            temp[index].value = e.target.value;
                            historySetter(temp);
                          }}
                        ></Textfield>
                      </Col>
                      <Col span={4}>
                        <Text className={"ant-form-item-label"}>
                          Tanggal Diterapkan
                        </Text>
                        <DatePicker
                          value={history.publish}
                          onChange={(value) => {
                            let temp = [...histories];
                            temp[index].publish = value;
                            historySetter(temp);
                          }}
                        ></DatePicker>
                      </Col>
                      <Col span={6}>
                        <div style={{ marginTop: "30px" }}>
                          <Button
                            type={"primary"}
                            onClick={() => {
                              historySetter([
                                ...histories,
                                { name: "", value: "", publish: "" },
                              ]);
                            }}
                          >
                            +
                          </Button>
                          <Button
                            type={"primary"}
                            style={{
                              background: "#435454",
                              marginLeft: "10px",
                            }}
                            onClick={() => {
                              // if (histories.length > 1) {
                              let temp = [...histories];
                              temp.splice(index, 1);
                              historySetter(temp);
                              // }
                            }}
                          >
                            -
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  ))}
                </>
              ) : (
                <Button
                  type={"primary"}
                  onClick={() => {
                    historySetter([{ name: "", value: "", publish: "" }]);
                  }}
                >
                  Tambah
                </Button>
              )}
            </Panel>
          </Collapse>
        </div>
      </Form>
    </>
  );
};
