import { Button, Col, Layout, Row } from "antd";
import { Text } from "../../../../atoms/Text/Text";
import { Title } from "../../../../atoms/Title/Title";
import { UnitService } from "../../../../molecules/Dropdown/UnitService/UnitService";
import moment from "moment";
import "moment/locale/id";
import { useState } from "react";

const { Sider: AntdSider } = Layout;

export const SatisfactionServiceSider = ({
  onFilter,
}) => {

  const [filter, setFilter] = useState({
    year: undefined,
    program_id: undefined,
    type: undefined,
  });

  return (
    <AntdSider className="sider">
      <div className="sider-content">
        <Title level={2}>KEPUASAN LAYANAN</Title>
        <Text>{moment().format("dddd, DD MMMM YYYY")}</Text>
      </div>

      <div className="sider-filter">
        {/* <Row style={{ margin: "20px 0px" }}>
          <Col>
            <QualityYear
              onChange={(v) => setFilter({ ...filter, year: v })}
              value={filter.year}
            />
          </Col>
        </Row> */}
        <Row style={{ margin: "20px 0px" }}>
          <Col>
            <UnitService
              multiple
              onChange={(v) => setFilter({ ...filter, program_id: v })}
              value={filter.program_id}
            />
          </Col>
        </Row>
      </div>

      <Button
        type="primary"
        className="filter-button"
        style={{ width: 170 }}
        onClick={() => {
          return onFilter(filter)
        }}
      >
        Cari Dokumen
      </Button>
    </AntdSider>
  );
};
