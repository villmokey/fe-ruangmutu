import React from "react";
import { Button, Col, Layout, Row } from "antd";
import { Text } from "../../../../atoms/Text/Text";
import { Title } from "../../../../atoms/Title/Title";
import { DocumentType } from "../../../../molecules/Dropdown/DocumentType/DocumentType";
import { QualityYear } from "../../../../molecules/Dropdown/QualityYear/QualityYear";
import { UnitService } from "../../../../molecules/Dropdown/UnitService/UnitService";
import { MonthDropdown } from "../../../../molecules/Dropdown/Month/MonthDropdown";
import moment from "moment";
import "moment/locale/id";

const { Sider: AntdSider } = Layout;

export const CalendarSider = ({ onFilter }) => {
  const [filter, setFilter] = React.useState({
    year: "",
    month: "",
    program_id: "",
  });

  return (
    <AntdSider className="sider">
      <div className="sider-content">
        <Title level={2}>KALENDER KEGIATAN</Title>
        <Text>{moment().format("dddd, DD MMMM YYYY")}</Text>
      </div>

      <div className="sider-filter">
        <Row style={{ margin: "20px 0px" }}>
          <Col>
            <QualityYear
              onChange={(e) => setFilter({ ...filter, year: e })}
              value={filter.year}
            />
          </Col>
        </Row>
        <Row style={{ margin: "20px 0px" }}>
          <Col>
            <MonthDropdown
              hasAll={true}
              onChange={(e) => setFilter({ ...filter, month: e })}
              value={filter.month}
            />
          </Col>
        </Row>
        <Row style={{ margin: "20px 0px" }}>
          <Col>
            <UnitService
              onChange={(e) => setFilter({ ...filter, program_id: e })}
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
          return onFilter(filter);
        }}
      >
        Cari Kegiatan
      </Button>
    </AntdSider>
  );
};
