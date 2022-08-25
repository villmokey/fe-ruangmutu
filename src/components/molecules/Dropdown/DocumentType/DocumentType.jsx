import { Select, Space } from "antd";
import { Text } from "../../../atoms/Text/Text";
import { fetchApiGet } from "../../../../globals/fetchApi";
import { useState, useEffect } from "react";

const { Option } = Select;

export const DocumentType = ({ onChange, value }) => {
  const [types, setTypes] = useState([]);
  useEffect(() => {
    fetchApiGet("/document-type?paginate=false")
      .then((res) => {
        if (res && res.data) {
          setTypes(res.data);
        }
      })
      .catch();
  }, []);
  return (
    <Space direction="vertical">
      <Text>Jenis Dokumen </Text>
      <Select
        placeholder="Pilih jenis dokumen"
        onChange={onChange}
        value={value}
        allowClear
        style={{ width: 170 }}
      >
        {types &&
          types.map((item, index) => {
            return (
              <Option value={item.id} key={index}>
                {item.name}
              </Option>
            );
          })}
      </Select>
    </Space>
  );
};
