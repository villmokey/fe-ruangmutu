import { Button, Col, Layout, Row } from "antd";
import { Text } from "../../../../atoms/Text/Text";
import { Title } from "../../../../atoms/Title/Title";
import { ApprovalStatus } from "../../../../molecules/Dropdown/ApprovalStatus/ApprovalStatus";
import { QualityYear } from "../../../../molecules/Dropdown/QualityYear/QualityYear";
import { UnitService } from "../../../../molecules/Dropdown/UnitService/UnitService";
import "../Sider.less";
import moment from "moment";
import "moment/locale/id";
import { useState } from "react";

const { Sider: AntdSider } = Layout;

export const DocumentApprovalSider = ({
  onFilter
}) => {
  const [filter, setFilter] = useState({
    year: undefined,
    program_id: undefined,
    status: undefined,
  });
  return (
    <AntdSider className="sider">
      <div className="sider-content">
        <Title level={2}>PENGESAHAN DOKUMEN</Title>
        <Text>{moment().format("dddd, DD MMMM YYYY")}</Text>
      </div>

      <div className="sider-filter">
        <Row style={{ margin: "20px 0px" }}>
          <Col>
            <QualityYear onChange={(e) => setFilter({ ...filter, year: e })} />
          </Col>
        </Row>
        <Row style={{ margin: "20px 0px" }}>
          <Col>
            <UnitService
              multiple
              onChange={(e) => setFilter({ ...filter, program_id: e })}
            />
          </Col>
        </Row>
        <Row style={{ margin: "20px 0px" }}>
          <Col>
            <ApprovalStatus
              onChange={(e) => setFilter({ ...filter, status: e })}
            />
          </Col>
        </Row>
      </div>

      <Button
        type="primary"
        className="filter-button"
        style={{ width: 170 }}
        onClick={() => {
          return onFilter({ ...filter });
        }}
      >
        Cari Dokumen
      </Button>
    </AntdSider>
  );
};
