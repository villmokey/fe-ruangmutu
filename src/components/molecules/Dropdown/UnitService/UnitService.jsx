import React from "react";
import { Select, Space } from "antd";
import { Text } from "../../../atoms/Text/Text";
import { fetchApiGet } from "../../../../globals/fetchApi";

const { Option } = Select;

export const UnitService = ({ onChange, value, multiple = false }) => {
  const [programs, setPrograms] = React.useState([]);
  React.useEffect(() => {
    fetchApiGet("/program?paginate=false")
      .then((res) => {
        if (res && res.data) {
          setPrograms(res.data);
        }
      })
      .catch();
  }, []);
  return (
    <Space direction="vertical">
      <Text>Program/Unit</Text>
      <Select
        placeholder="Pilih program/unit"
        onChange={onChange}
        allowClear
        value={value}
        mode={multiple ? "multiple" : ""}
        style={{ width: 170 }}
      >
        {programs &&
          programs.map((item, index) => {
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
