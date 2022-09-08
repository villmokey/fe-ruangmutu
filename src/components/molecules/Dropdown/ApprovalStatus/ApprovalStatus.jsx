import { Select, Space } from "antd";
import { Text } from "../../../atoms/Text/Text";

const { Option } = Select;

const documentType = [
  { title: 'SUDAH DITANDATANGANI', value: 'signed' },
  { title: 'BELUM DITANDATANGANI', value: 'unsigned' }
];

export const ApprovalStatus = ({
  onChange,
  value
}) => {
  return (
    <Space direction="vertical">
      <Text>Status Approval </Text>
      <Select 
        placeholder="Pilih status approval" 
        onChange={onChange} 
        allowClear
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