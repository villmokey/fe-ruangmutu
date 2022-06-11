import { Select, Space } from "antd"
import { Text } from "../../../atoms/Text/Text"

const { Option } = Select;

const documentType = [
  { title: 'PROFIL INDIKATOR MUTU', value: 'qualityIndicatorProfile' },
  { title: 'INDIKATOR MUTU', value: 'indicatorProfile' },
];

export const DocumentType = ({
  onChange,
  value
}) => {
  return (
    <Space direction="vertical">
      <Text>Jenis Dokumen </Text>
      <Select 
        placeholder="Pilih jenis dokumen" 
        onChange={onChange} 
        value={value}
        style={{ width: 170 }}
      >
        {
          documentType &&
          documentType.map((item, index) => {
            return (
              <Option value={item.value} key={index}>{ item.title }</Option>
            )
          })
        }
      </Select>
    </Space>
  )
}