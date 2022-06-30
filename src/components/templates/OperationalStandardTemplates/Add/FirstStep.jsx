import { Radio, Row, Col } from "antd"

import { Title } from "../../../atoms/Title/Title"

import "./FirstStep.less";

export const FirstStep = ({
  onChangeForm
}) => {
  const options = [
    {
      text: 'ADMEN',
      value: 'admen',
    },
    {
      text: 'MUTU',
      value: 'mutu',
    },
    {
      text: 'UKM',
      value: 'ukm',
    },
    {
      text: 'UKS',
      value: 'uks',
    },
    {
      text: 'UKP',
      value: 'ukp',
    },
    {
      text: 'UP GIGI DAN MULUT',
      value: 'up',
    },
    {
      text: 'PERENCANAAN',
      value: 'perencanaan',
    },
    {
      text: 'PENGADAAN',
      value: 'pengadaan',
    },
    {
      text: 'KEUANGAN',
      value: 'keuangan',
    },
    {
      text: 'SARPRAS',
      value: 'sarpras',
    },
    {
      text: 'UKGS',
      value: 'ukgs',
    },
    {
      text: 'PROGRAM GIZI',
      value: 'gizi',
    },
    {
      text: 'GERIATRI',
      value: 'geriatri',
    },
    {
      text: 'UP PKPR',
      value: 'pkpr',
    },
    {
      text: 'UP MTBS',
      value: 'mtbs',
    },
    {
      text: 'LABORATORIUM',
      value: 'lab',
    },
  ];  

  return (
    <div className="first-step">
      <Title level={4} className="first-step__title">
        TENTUKAN KETERKAITAN UNIT  SOP YANG AKAN DIBUAT
        <span className="text text--hint">*dapat pilih lebih dari satu</span>
      </Title>

      <Radio.Group onChange={() => {}} defaultValue="admen" buttonStyle="solid">
        <Row gutter={[16, 16]}>
          {
            options.map((option, index) => (
              <Col span={6} key={index}>
                <Radio.Button value={option.value} className="radio radio--primary">
                  {option.text}
                </Radio.Button>
              </Col>
            ))
          }
        </Row>
      </Radio.Group>
    </div>
  )
}
