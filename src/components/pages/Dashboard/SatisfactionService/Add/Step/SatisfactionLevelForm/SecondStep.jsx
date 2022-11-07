import { Col, Form as AntdForm, Row, Select } from "antd";
import { Title } from "../../../../../../atoms/Title/Title";
import { Form } from "../../../../../../molecules/Form/Form";
import { InputText } from "../../../../../../atoms/InputText/InputText";
import { Text } from "../../../../../../atoms/Text/Text";
import { useEffect } from "react";

const { Option } = Select;
const { Item } = AntdForm;

export const SecondStep = ({
  onFinish,
  form,
  handleHealthServiceChange,
  payloadSetter,
  monthList,
  healthServicesList,
  units = [],
  unitSetter,
}) => {
  const countAverage = () => {
    let res = 0;
    units.forEach((item) => {
      res += item.percent ? Number(item.percent) : 0;
    });

    let final = (res / units.length).toFixed(1);
    payloadSetter((prev) => {
      return {
        ...prev,
        average: final,
      };
    });
  };

  useEffect(() => {
    countAverage();
  }, [units]); //eslint-disable-line

  return (
    <>
      <Title level={4}>TINGKAT KEPUASAN LAYANAN</Title>
      <Form layout="vertical">
        <Row gutter={[24]}>
          <Col md={24} sm={24} xs={24}>
            <Item
              label="Bulan"
              name="month"
              initialValue={form.month}
              rules={[{ required: true, message: "Bulan tidak boleh kosong!" }]}
              >
              <Select
                placeholder="Pilih Bulan"
                onChange={(e) => {
                  payloadSetter((prev) => {
                    return {
                      ...prev,
                      month: e,
                    };
                  });
                }}
              >
                {monthList &&
                  monthList.map((item, index) => (
                    <Option key={"month-" + index} value={index + 1}>
                      {item}
                    </Option>
                  ))}
              </Select>
            </Item>
            <Item
              label="Fasilitas Kesehatan"
              name="health_service_id"
              initialValue={form.health_service_id}
              rules={[
                { required: true, message: "Fasilitas Kesehatan tidak boleh kosong!" },
              ]}
            >
              <Select
                placeholder="Pilih Fasilitas Kesehatan"
                onChange={handleHealthServiceChange}
              >
                {healthServicesList &&
                  healthServicesList.map((item, index) => (
                    <Option value={item.id} key={index}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Item>
          </Col>
          <Col span={24}>
            <table width={"100%"}>
              <thead style={{ textAlign: "left" }}>
                <th style={{ padding: "20px 0" }}>Unit Layanan</th>
                <th>Kepuasan</th>
                <th></th>
                <th>Total</th>
                <th>Presentase</th>
              </thead>
              {units && units.length > 0 ? (
                units.map((item, index) => (
                  <tr>
                    <td style={{ verticalAlign: "initial" }}>
                      <Text>{item.service_name}</Text>
                    </td>
                    <td>
                      <InputText
                        type="number"
                        value={item.value}
                        onChange={(e) => {
                          let t = [...units];
                          t[index].value = e.target.value;
                          unitSetter(t);
                        }}
                      />
                    </td>
                    <td
                      style={{ verticalAlign: "initial", textAlign: "center" }}
                    >
                      <Text>Dari</Text>
                    </td>
                    <td>
                      <InputText
                        type="number"
                        value={item.total}
                        onChange={(e) => {
                          let t = [...units];
                          t[index].total = e.target.value;
                          t[index].percent = (
                            (Number(t[index].value) / Number(e.target.value)) *
                            100
                          ).toFixed(1);
                          unitSetter(t);
                        }}
                      />
                    </td>
                    <td>
                      <InputText
                        disabled
                        value={item.percent}
                        placeholder={"%"}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <p style={{ textAlign: "center", margin: "30px 0" }}>
                      {form.health_service_id !== "" && units.length === 0
                        ? "Unit masih kosong untuk puskesmas yang dipilih, silahkan tambahkan pada master data atau ubah layanan kesehatan yang dipilih"
                        : "Silahkan pilih layanan kesehatan terlebih dahulu"}
                    </p>
                  </td>
                </tr>
              )}
              {units.length > 0 && (
                <tr>
                  <td colSpan={"4"} style={{ verticalAlign: "initial" }}>
                    <Text>Rata-Rata</Text>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <InputText disabled value={form.average} />
                  </td>
                </tr>
              )}
            </table>
          </Col>
        </Row>
      </Form>
    </>
  );
};
