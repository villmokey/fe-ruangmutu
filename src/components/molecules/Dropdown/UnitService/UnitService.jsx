import { Select, Space } from "antd"
import { Text } from "../../../atoms/Text/Text"

const { Option } = Select;

const programMutuOptions = [
  { value: 'admen', title: 'ADMEN' },
  { value: 'ukp', title: 'UKP' },
  { value: 'ukm', title: 'UKM' },
  { value: 'prioritasPuskesmas', title: 'PRIORITAS PUSKESMAS' },
  { value: 'perilakuPemberiLayanan', title: 'UKM' },
  { value: 'mutuLayanan', title: 'MUTU LAYANAN KLINIS DAN KESELAMATAN PASIEN INSIDEN KESELAMATAN PASIEN' },
  { value: 'qpi', title: 'QPI' }
];

export const UnitService = ({
  onChange,
  value
}) => {
  return (
    <Space direction="vertical">
      <Text>Unit Layanan</Text>
      <Select 
        placeholder="Pilih unit layanan" 
        onChange={onChange} 
        value={value}
        style={{ width: 170 }}
      >
        {
          programMutuOptions &&
          programMutuOptions.map((item, index) => {
            return (
              <Option value={item.value} key={index}>{ item.title }</Option>
            )
          })
        }
      </Select>
    </Space>
  )
}