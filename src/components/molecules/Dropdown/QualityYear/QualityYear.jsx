import { Select, Space } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { Text } from "../../../atoms/Text/Text";

const { Option } = Select;

const qualityYear = [
  { title: "2020", value: "2020" },
  { title: "2021", value: "2021" },
  { title: "2022", value: "2022" },
];

export const QualityYear = ({ onChange, value }) => {
  const [years, setYears] = useState([]);

  useEffect(() => {
    const initial = 2022;
    const now = parseInt(moment().format("Y"));
    let yearList = [];

    if (now > initial) {
      for (let index = initial; index <= now; index++) {
        yearList.push({ title: index, value: index });
      }
    } else {
      yearList.push({ title: initial, value: initial });
    }

    setYears(yearList);
  }, []);
  return (
    <Space direction="vertical">
      <Text>Tahun Mutu</Text>
      <Select
        placeholder="Pilih tahun mutu"
        onChange={onChange}
        value={value}
        allowClear
        style={{ width: 170 }}
      >
        {years &&
          years.map((item, index) => {
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
