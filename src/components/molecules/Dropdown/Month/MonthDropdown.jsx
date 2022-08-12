import { Select, Space } from "antd";
import { Text } from "../../../atoms/Text/Text";

const { Option } = Select;

const months = [
  { title: "Januari", value: "01" },
  { title: "Februari", value: "02" },
  { title: "Maret", value: "03" },
  { title: "April", value: "04" },
  { title: "Mei", value: "05" },
  { title: "Juni", value: "06" },
  { title: "Juli", value: "07" },
  { title: "Agustus", value: "08" },
  { title: "September", value: "09" },
  { title: "Oktober", value: "10" },
  { title: "November", value: "11" },
  { title: "Desember", value: "12" },
];

export const MonthDropdown = ({ onChange, value, hasAll }) => {
  return (
    <Space direction="vertical">
      <Text>Bulan</Text>
      <Select
        placeholder="Pilih Bulan"
        onChange={onChange}
        value={value}
        style={{ width: 170 }}
      >
        {hasAll && <Option value={"ALL"}>Semua</Option>}
        {months &&
          months.map((item, index) => {
            return (
              <Option value={item.value} key={index}>
                {item.title}
              </Option>
            );
          })}
      </Select>
    </Space>
  );
};
