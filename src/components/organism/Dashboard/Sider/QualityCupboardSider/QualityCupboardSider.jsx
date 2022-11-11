import { Button, Col, Layout, Row } from "antd";
import { Text } from "../../../../atoms/Text/Text";
import { Title } from "../../../../atoms/Title/Title";
import { DocumentType } from "../../../../molecules/Dropdown/DocumentType/DocumentType";
import { QualityYear } from "../../../../molecules/Dropdown/QualityYear/QualityYear";
import { UnitService } from "../../../../molecules/Dropdown/UnitService/UnitService";
import moment from "moment";
import "moment/locale/id";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Sider: AntdSider } = Layout;

export const QualityCupboardSider = ({
  onFilter,
  qualityYearValue,
  documentTypeValue,
  unitServiceValue,
  showFilter = true,
}) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    year: "",
    type: "",
    programs: [],
  });
  return (
    <AntdSider className="sider">
      <div className="sider-content">
        <Title level={2}>LEMARI MUTU</Title>
        <Text>{moment().format("dddd, DD MMMM YYYY")}</Text>
      </div>
      {showFilter ? (
        <>
          <div className="sider-filter">
            <Row style={{ margin: "20px 0px" }}>
              <Col>
                <QualityYear
                  onChange={(e) => setFilter({ ...filter, year: e })}
                  value={qualityYearValue}
                />
              </Col>
            </Row>
            <Row style={{ margin: "20px 0px" }}>
              <Col>
                <DocumentType
                  onChange={(e) => setFilter({ ...filter, type: e })}
                  value={documentTypeValue}
                />
              </Col>
            </Row>
            <Row style={{ margin: "20px 0px" }}>
              <Col>
                <UnitService
                  multiple={true}
                  onChange={(e) => setFilter({ ...filter, programs: e })}
                  value={unitServiceValue}
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
            Cari Dokumen
          </Button>
        </>
      ) : (
        <Button
          type="primary"
          className="filter-button"
          style={{ width: 170, marginTop: "20px" }}
          onClick={() => {
            navigate("/dashboard/quality-cupboard");
          }}
        >
          Kembali
        </Button>
      )}
    </AntdSider>
  );
};
