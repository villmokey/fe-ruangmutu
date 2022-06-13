import { Button, Col, Row, Space, Tag } from "antd"
import { Card } from "../../atoms/Card/Card"
import { Text } from "../../atoms/Text/Text"
import { Title } from "../../atoms/Title/Title"

export const DocumentApprovalCard = ({
  documentApprovalTitle,
  documentApprovalCreatedAt,
  documentApprovalDate,
  onEdit,
  onSubmit,
  createdBy,
  isApproved
}) => {
  return (
    <Card style={{ margin: '10px 0px' }}>
      <Row style={{ margin: '10px 0px' }} align="middle">
        <Col>
          <Space size="small">
            <Tag color="#6A9695" style={{ fontSize: 9 }}>INDIKATOR MUTU</Tag>
            <Tag color="#6A9695" style={{ fontSize: 9 }}>KEPEGAWAIAN</Tag>
            <Tag color="#6A9695" style={{ fontSize: 9 }}>MUTU</Tag>
          </Space>
        </Col>
      </Row>
      <Row style={{ margin: '10px 0px' }} align="middle">
        <Col sm={12} md={6} lg={6}>
          <Space direction="vertical">
            <Text>Judul Dokumen Approval: </Text>
            <Title level={4}>{ documentApprovalTitle }</Title>
          </Space>
        </Col>
        <Col sm={12} md={12} lg={6}>
          <Space direction="vertical">
            <Text>Tanggal Dokumen Dibuat: </Text>
            <Title level={4}>{ documentApprovalCreatedAt }</Title>
          </Space>
        </Col>
        <Col sm={12} md={6} lg={6}>
          <Space direction="vertical">
            <Text>Tanggal Approval: </Text>
            <Title level={4}>{ documentApprovalDate }</Title>
          </Space>
        </Col>
        <Col sm={12} md={6} lg={6}>
          {
            isApproved ?
            <Tag color="#33A64C" style={{ padding: '5px 10px' }}>Approved</Tag>
            :
            <Space>
              <Button
                type="primary"
                onClick={onEdit}
                style={{ backgroundColor: '#0057D8', border: 'none' }}
              >
                Edit
              </Button>
              <Button
                type="primary"
                onClick={onSubmit}
              >
                Submit
              </Button>
            </Space>
          }
        </Col>
      </Row>
      <Row style={{ margin: '10px 0px' }}>
        <Col> 
          <Text>Dibuat Oleh : { createdBy }</Text>
        </Col>
      </Row>
    </Card>
  )
}