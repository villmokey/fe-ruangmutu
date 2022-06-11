import { Button, Col, Layout, Row } from 'antd';
import { Text } from '../../../../atoms/Text/Text';
import { Title } from '../../../../atoms/Title/Title';
import { DocumentType } from '../../../../molecules/Dropdown/DocumentType/DocumentType';
import { QualityYear } from '../../../../molecules/Dropdown/QualityYear/QualityYear';
import { UnitService } from '../../../../molecules/Dropdown/UnitService/UnitService';

const { Sider: AntdSider } = Layout;

export const QualityIndicatorSider = ({
  onFilter,
  onChangeQualityYear,
  onChangeDocumentType,
  onChangeUnitService,
  qualityYearValue,
  documentTypeValue,
  unitServiceValue,
}) => {
  return (
    <AntdSider className="sider">
      <div className="sider-content">
        <Title level={2}>INDIKATOR MUTU</Title>
        <Text>Senin, 09 Agustus 2021</Text>
      </div>

      <div className="sider-filter">
        <Row style={{ margin: '20px 0px' }}>
          <Col>
            <QualityYear 
              onChange={onChangeQualityYear}
              value={qualityYearValue}
            />
          </Col>
        </Row>
        <Row style={{ margin: '20px 0px' }}>
          <Col>
            <DocumentType 
              onChange={onChangeDocumentType}
              value={documentTypeValue}
            />
          </Col>
        </Row>
        <Row style={{ margin: '20px 0px' }}>
          <Col>
            <UnitService 
              onChange={onChangeUnitService}
              value={unitServiceValue}
            />
          </Col>
        </Row>
      </div>

      <Button 
        type="primary" 
        className="filter-button"
        style={{ width: 170 }}
        onClick={onFilter}
      >
        Cari Dokumen
      </Button>

    </AntdSider>
  )
}