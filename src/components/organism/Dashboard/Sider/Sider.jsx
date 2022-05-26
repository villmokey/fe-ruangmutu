import { Layout, Select } from "antd";
import { Text } from "../../../atoms/Text/Text";
import { Title } from "../../../atoms/Title/Title";

import './Sider.less';

const { Sider: AntdSider } = Layout;

export const Sider = ({
  children,
  title
}) => {

  // const tahunMutuOptions = [2022,2021,2020];

  return (
    <AntdSider className="sider">
      <div className="sider-content">
        <Title level={2}>{ title ?? 'INDIKATOR MUTU' }</Title>
        <Text>Senin, 09 Agustus 2021</Text>
      </div>

      <div className="sider-filter">
        <div className="filter">
          <label>Tahun Mutu</label>
          <Select/>
        </div>
      </div>

    </AntdSider>
  )
}