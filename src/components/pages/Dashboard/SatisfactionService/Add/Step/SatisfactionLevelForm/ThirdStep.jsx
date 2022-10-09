import { Col, Form as AntdForm, Row, Select } from "antd";
import { Title } from "../../../../../../atoms/Title/Title";
import { Form } from "../../../../../../molecules/Form/Form";
import { InputText } from "../../../../../../atoms/InputText/InputText";
import { Text } from "../../../../../../atoms/Text/Text";
import { monthFullID } from "../../../../../../../globals/monthLabel";
import { useState } from "react";
import { useEffect } from "react";
import { fetchApiGet } from "../../../../../../../globals/fetchApi";
import { useAuthToken } from "../../../../../../../globals/useAuthToken";

const { Option } = Select;
const { Item } = AntdForm;

export const puskesmasList = [
  {
    label: "Puskesmas Kecamatan Gambir",
    value: "Puskesmas Kecamatan Gambir",
  },
  {
    label: "Puskesmas Kelurahan Petojo Utara",
    value: "Puskesmas Kelurahan Petojo Utara",
  },
  {
    label: "Puskesmas Kelurahan Petojo Selatan",
    value: "Puskesmas Kelurahan Petojo Selatan",
  },
  {
    label: "Puskesmas Kelurahan Kebon Kelapa",
    value: "Puskesmas Kelurahan Kebon Kelapa",
  },
  {
    label: "Puskesmas Kelurahan Duri Pulo",
    value: "Puskesmas Kelurahan Duri Pulo",
  },
  {
    label: "Puskesmas Kelurahan Cideng",
    value: "Puskesmas Kelurahan Cideng",
  },
];

export const ThirdStep = ({
  onFinish,
  form,
  handleHealthServiceChange,
  payloadSetter,
  monthList,
  healthServicesList,
  units = [],
}) => {
  const countAverage = () => {
    let res = 0;
    units.map((item) => {
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
  }, [units]);

  return (
    <>
      <Title level={4}>TINJAU ULANG TINGKAT KEPUASAN LAYANAN</Title>
      <Form layout="vertical">
        <Row gutter={[24]}>
          <Col md={24} sm={24} xs={24}>
            <Item
              label="Bulan"
              name="month"
              value={form.month}
              initialValue={form.month}
              rules={[{ required: true, message: "Bulan tidak boleh kosong!" }]}
            >
              <Select
                disabled
                placeholder="Pilih Bulan"
                value={form.month}
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
              value={form.health_service_id}
              initialValue={form.health_service_id}
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
                value={form.health_service_id}
                onChange={handleHealthServiceChange}
              >
                {healthServicesList &&
                  healthServicesList.map((item, index) => (
                    <Option value={item.id} key={"service-" + index}>
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
                      <InputText type="number" value={item.value} disabled />
                    </td>
                    <td
                      style={{ verticalAlign: "initial", textAlign: "center" }}
                    >
                      <Text>Dari</Text>
                    </td>
                    <td>
                      <InputText type="number" value={item.total} disabled />
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
