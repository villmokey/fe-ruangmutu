import { Col, Form as AntdForm, Row, Select } from 'antd';
import { Title } from '../../../../../../atoms/Title/Title';
import { Form } from '../../../../../../molecules/Form/Form';
import { InputText } from '../../../../../../atoms/InputText/InputText';
import { Text } from '../../../../../../atoms/Text/Text';
import { monthFullID } from '../../../../../../../globals/monthLabel';
import { useState } from 'react';
import { useEffect } from 'react';

const { Option } = Select;
const { Item } = AntdForm;

export const puskesmasList = [
  {
    label: 'Puskesmas Kecamatan Gambir',
    value: 'Puskesmas Kecamatan Gambir',
  },
  {
    label: 'Puskesmas Kelurahan Petojo Utara',
    value: 'Puskesmas Kelurahan Petojo Utara',
  },
  {
    label: 'Puskesmas Kelurahan Petojo Selatan',
    value: 'Puskesmas Kelurahan Petojo Selatan',
  },
  {
    label: 'Puskesmas Kelurahan Kebon Kelapa',
    value: 'Puskesmas Kelurahan Kebon Kelapa',
  },
  {
    label: 'Puskesmas Kelurahan Duri Pulo',
    value: 'Puskesmas Kelurahan Duri Pulo',
  },
  {
    label: 'Puskesmas Kelurahan Cideng',
    value: 'Puskesmas Kelurahan Cideng',
  },
]

export const programs = ['Geriatri', 'Ruang Bersalin', 'Gizi', 'Psikolog', 'Imunisasi', 'BPJS', 'Farmasi']

export const SecondStep = ({
  form,
  onFinish,
  programMutuChange,
}) => {
  const [lists, setLists] = useState([])
  const [avg, setAvg] = useState(0)

  useEffect(() => {
    let temp = programs.map((program) => {
      return {
        program: program,
        value: 0,
        total: 0,
        percent: undefined
      }
    })
    setLists(temp)
  }, [])

  const countAverage = () => {
    let res = 0
    lists.map((item) => {
      res += item.percent ? Number(item.percent) : 0
    })

    let final = res / lists.length
    console.log(final)
    setAvg(final)
  }

  useEffect(() => {
    countAverage()
  }, [lists])

  return (
    <>
      <Title level={4}>TINGKAT KEPUASAN LAYANAN</Title>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={[24]}>
          <Col md={24} sm={24} xs={24}>
            <Item
              label="Bulan"
              name="month"
              rules={[
                { required: true, message: 'Bulan tidak boleh kosong!' }
              ]}
            >
              <Select placeholder="Pilih Bulan" onChange={programMutuChange}>
                {
                  monthFullID &&
                  monthFullID.map((item, index) => (
                    <Option value={item} key={index}>{item}</Option>
                  ))
                }
              </Select>
            </Item>
            <Item
              label="Puskesmas"
              name="puskesmas"
              rules={[
                { required: true, message: 'Puskesmas tidak boleh kosong!' }
              ]}
            >
              <Select placeholder="Pilih Puskesmas" onChange={programMutuChange}>
                {
                  puskesmasList &&
                  puskesmasList.map((item, index) => (
                    <Option value={item.value} key={index}>{item.label}</Option>
                  ))
                }
              </Select>
            </Item>
          </Col>
          <Col span={24}>
            <table width={'100%'}>
              <thead style={{ textAlign: 'left' }}>
                <th style={{ padding: '20px 0' }}>Unit Layanan</th>
                <th>Kepuasan</th>
                <th></th>
                <th>Total</th>
                <th>Presentase</th>
              </thead>
              {lists && lists.map((item, index) => (
                <tr>
                  <td style={{ verticalAlign: 'initial' }}>
                    <Text>{item.program}</Text>
                  </td>
                  <td>
                    <InputText value={item.value} onChange={(e) => {
                      let t = [...lists];
                      t[index].value = e.target.value
                      setLists(t)
                    }} />
                  </td>
                  <td style={{ verticalAlign: 'initial', textAlign: 'center' }}>
                    <Text>Dari</Text>
                  </td>
                  <td>
                    <InputText value={item.total} onChange={(e) => {
                      let t = [...lists];
                      t[index].total = e.target.value
                      t[index].percent = ((Number(t[index].value) / Number(e.target.value)) * 100)
                      setLists(t)
                    }} />
                  </td>
                  <td>
                    <InputText disabled value={item.percent} placeholder={'%'} />
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={'4'} style={{ verticalAlign: 'initial' }}>
                  <Text>Rata-Rata</Text>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <InputText disabled value={avg} />
                </td>
              </tr>
            </table>
          </Col>
        </Row>
      </Form>
    </>
  )
}