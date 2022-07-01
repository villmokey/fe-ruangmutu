import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { Button, Col, Popconfirm, Row, Space } from "antd"
import { Card } from "../../atoms/Card/Card"
import { Text } from "../../atoms/Text/Text"
import { Title } from "../../atoms/Title/Title"

export const DocumentApprovalCard = ({
  documentApprovalTitle,
  documentApprovalCreatedAt,
  documentApproval1Date,
  documentApproval2Date,
  documentApproval3Date,
  indicatorID,
  // onEdit,
  onSubmit,
  createdBy,
  isApproved,
  onApprove,
  onReject,
  status
}) => {

  const renderCardStyle = () => {
    let style = {}
    if (isApproved && status !== -1) {
      style = {
        color: 'white',
        backgroundColor: '#6A9695',
        margin: '10px 0px'
      }
    } else if (!isApproved && status === -1) {
      style = {
        color: 'white',
        backgroundColor: '#ff7875',
        margin: '10px 0px'
      }
    } else if (!isApproved) {
      style = {
        margin: '10px 0px'
      }
    }

    return style;
  }

  const renderFontStyle = () => {
    let style = {}
    if (isApproved && status !== -1) {
      style = {
        color: 'white'
      }
    } else if (!isApproved && status === -1) {
      style = {
        color: 'white'
      }
    } else if (!isApproved) {
      style = {}
    }

    return style;
  }

  const ApprovedButton = () => {
    return (
      <Space>
        {/* <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={onEdit}
          style={{ backgroundColor: '#0057D8', border: 'none' }}
          shape="circle"
          size="large"
        /> */}
        <Popconfirm title="Anda yakin akan menyetujui pengajuan ini?" okText="Ya" cancelText="Tidak" onConfirm={() => onApprove(indicatorID)}>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            shape="circle"
            size="large"
          />
        </Popconfirm>
        <Popconfirm title="Anda yakin ingin menolak pengajuan ini?" okText="Ya" cancelText="Tidak" onConfirm={() => onReject(indicatorID)}>
          <Button
            type="danger"
            icon={<CloseOutlined />}
            shape="circle"
            size="large"
          />
        </Popconfirm>
      </Space>
    )
  }

  return (
    <Card 
      style={renderCardStyle()}
    >
      <Row style={{ margin: '10px 0px' }} align="middle">
        <Col sm={12} md={6} lg={5}>
          <Space direction="vertical">
            <Text style={renderFontStyle()}>Judul Dokumen Approval </Text>
            <Title level={4} style={renderFontStyle()}>{ documentApprovalTitle }</Title>
          </Space>
        </Col>
        <Col sm={12} md={12} lg={5}>
          <Space direction="vertical">
            <Text style={renderFontStyle()}>Tanggal Approval Pembuat Dokumen </Text>
            <Title level={4} style={renderFontStyle()}>{ documentApproval1Date }</Title>
          </Space>
        </Col>
        <Col sm={12} md={6} lg={5}>
          <Space direction="vertical">
            <Text style={renderFontStyle()}>Tanggal Approval PenanggungJawab 1 </Text>
            <Title level={4} style={renderFontStyle()}>{ documentApproval2Date }</Title>
          </Space>
        </Col>
        <Col sm={12} md={6} lg={5}>
          <Space direction="vertical">
            <Text style={renderFontStyle()}>Tanggal Approval PenanggungJawab 2 </Text>
            <Title level={4} style={renderFontStyle()}>{ documentApproval3Date }</Title>
          </Space>
        </Col>
        <Col sm={12} md={6} lg={4}>
          {
            isApproved ?
            <Title level={3} style={{ color: 'white' }}>Telah Disetujui oleh Anda</Title>
            : 
            (!isApproved && status === -1) ?
            <Title level={3} style={{ color: 'white' }}>Ditolak</Title>
            :
            <ApprovedButton />
          }
        </Col>
      </Row>
      <Row style={{ margin: '10px 0px' }}>
        <Col> 
          <Text style={renderFontStyle()}>Dibuat Oleh : { createdBy }</Text>
        </Col>
      </Row>
      <Row>
        <Col> 
          <Text style={renderFontStyle()}>Tanggal dokumen dibuat : { documentApprovalCreatedAt }</Text>
        </Col>
      </Row>
    </Card>
  )
}