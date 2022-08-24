import { Select, Space } from "antd"
import { Text } from "../../../atoms/Text/Text"

const { Option } = Select;

const qualityYear = [
  { title: '2020', value: '2020' },
  { title: '2021', value: '2021' },
  { title: '2022', value: '2022' }
];

export const QualityYear = ({
  onChange,
  value
}) => {
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
        {
          qualityYear &&
          qualityYear.map((item, index) => {
            return (
              <Option value={item.value} key={index}>{ item.title }</Option>
            )
          })
        }
      </Select>
    </Space>
  )
}