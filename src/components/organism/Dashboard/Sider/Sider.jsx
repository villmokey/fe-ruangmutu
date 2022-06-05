import { Layout, Select, Row, Col, Space } from "antd";
import { Text } from "../../../atoms/Text/Text";
import { Title } from "../../../atoms/Title/Title";

import './Sider.less';

const { Sider: AntdSider } = Layout;
const { Option } = Select;

export const Sider = ({
  children,
  title
}) => {

  const tahunMutuOptions = [
    { title: '2020', value: '2020' },
    { title: '2021', value: '2021' },
    { title: '2022', value: '2022' }
  ];

  const jenisDokumenOptions = [
    { title: 'PROFIL INDIKATOR MUTU', value: 'profilIndikatorMutu' },
    { title: 'INDIKATOR MUTU', value: 'INDIKATOR MUTU' },
  ];

  return (
    <AntdSider className="sider">
      <div className="sider-content">
        <Title level={2}>{ title ?? 'INDIKATOR MUTU' }</Title>
        <Text>Senin, 09 Agustus 2021</Text>
      </div>

      <div className="sider-filter">
        <Row style={{ margin: '20px 0px' }}>
          <Col>
            <Space direction="vertical">
              <Text>Tahun Mutu</Text>
              <Select placeholder="Pilih tahun mutu">
                {
                  tahunMutuOptions &&
                  tahunMutuOptions.map((item, index) => {
                    return (
                      <Option value={item.value} key={index}>{ item.title }</Option>
                    )
                  })
                }
              </Select>
            </Space>
          </Col>
        </Row>
        <Row style={{ margin: '20px 0px' }}>
          <Col>
            <Space direction="vertical">
              <Text>Jenis Dokumen</Text>
              <Select placeholder="Pilih tahun mutu">
                {
                  jenisDokumenOptions &&
                  jenisDokumenOptions.map((item, index) => {
                    return (
                      <Option value={item.value} key={index}>{ item.title }</Option>
                    )
                  })
                }
              </Select>
            </Space>
          </Col>
        </Row>
        <Row style={{ margin: '20px 0px' }}>
          <Col>
            <Space direction="vertical">
              <Text>Unit Layanan</Text>
              <Select placeholder="Pilih tahun mutu">
                
              </Select>
            </Space>
          </Col>
        </Row>
      </div>

    </AntdSider>
  )
}