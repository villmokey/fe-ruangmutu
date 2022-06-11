import { Button, Col, Layout, Row } from 'antd';
import { Text } from '../../../../atoms/Text/Text';
import { Title } from '../../../../atoms/Title/Title';
import { ApprovalStatus } from '../../../../molecules/Dropdown/ApprovalStatus/ApprovalStatus';
import { DocumentType } from '../../../../molecules/Dropdown/DocumentType/DocumentType';
import { QualityYear } from '../../../../molecules/Dropdown/QualityYear/QualityYear';
import { UnitService } from '../../../../molecules/Dropdown/UnitService/UnitService';
import '../Sider.less';

const { Sider: AntdSider } = Layout;

export const DocumentApprovalSider = ({
  onFilter,
  onChangeQualityYear,
  onChangeDocumentType,
  onChangeUnitService,
  onChangeApprovalStatus,
  qualityYearValue,
  documentTypeValue,
  unitServiceValue,
  approvalStatusValue
}) => {
  return (
    <AntdSider className="sider">
      <div className="sider-content">
        <Title level={2}>DOKUMEN APPROVAL</Title>
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
        <Row style={{ margin: '20px 0px' }}>
          <Col>
            <ApprovalStatus 
              onChange={onChangeApprovalStatus}
              value={approvalStatusValue}
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