import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Col, Popconfirm, Row, Space } from "antd"
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
    <Card 
    style={ 
      isApproved ? 
      { margin: '10px 0px', backgroundColor: '#6A9695' } 
      :
      { margin: '10px 0px' }
    }
    >
      <Row style={{ margin: '10px 0px' }} align="middle">
        <Col sm={12} md={6} lg={5}>
          <Space direction="vertical">
            <Text style={ isApproved ? { color: 'white' } : {}}>Judul Dokumen Approval </Text>
            <Title level={4} style={ isApproved ? { color: 'white' } : {}}>{ documentApprovalTitle }</Title>
          </Space>
        </Col>
        <Col sm={12} md={12} lg={5}>
          <Space direction="vertical">
            <Text style={ isApproved ? { color: 'white' } : {}}>Tanggal Approval Pembuat Dokumen </Text>
            <Title level={4} style={ isApproved ? { color: 'white' } : {}}>{ documentApprovalDate }</Title>
          </Space>
        </Col>
        <Col sm={12} md={6} lg={5}>
          <Space direction="vertical">
            <Text style={ isApproved ? { color: 'white' } : {}}>Tanggal Approval PenanggungJawab 1 </Text>
            <Title level={4} style={ isApproved ? { color: 'white' } : {}}>{ documentApprovalDate }</Title>
          </Space>
        </Col>
        <Col sm={12} md={6} lg={5}>
          <Space direction="vertical">
            <Text style={ isApproved ? { color: 'white' } : {}}>Tanggal Approval PenanggungJawab 2 </Text>
            <Title level={4} style={ isApproved ? { color: 'white' } : {}}>{ documentApprovalDate }</Title>
          </Space>
        </Col>
        <Col sm={12} md={6} lg={4}>
          {
            isApproved ?
            <Title level={3} style={{ color: 'white' }}>Approved</Title>
            :
            <Space>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={onEdit}
                style={{ backgroundColor: '#0057D8', border: 'none' }}
                shape="circle"
                size="large"
              />
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={onSubmit}
                shape="circle"
                size="large"
              />
              <Popconfirm title="Anda yakin ingin menolak pengajuan ini?" okText="Ya" cancelText="Tidak">
                <Button
                  type="danger"
                  icon={<CloseOutlined />}
                  onClick={onSubmit}
                  shape="circle"
                  size="large"
                />
              </Popconfirm>
            </Space>
          }
        </Col>
      </Row>
      <Row style={{ margin: '10px 0px' }} gutter={[24,24]}>
        <Col> 
          <Text style={ isApproved ? { color: 'white' } : {}}>Dibuat Oleh : { createdBy }</Text>
        </Col>
      </Row>
      <Row>
        <Col> 
          <Text style={ isApproved ? { color: 'white' } : {}}>Tanggal dokumen dibuat : { documentApprovalCreatedAt }</Text>
        </Col>
      </Row>
    </Card>
  )
}