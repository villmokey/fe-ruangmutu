import { Image, Space, Tag } from "antd";
import { Card } from "../../atoms/Card/Card";

import './QualityIndicatorCard.less';
import Thumbnail from '../../../assets/images/thumbnail.png';
import { Text } from "../../atoms/Text/Text";

export const QualityIndicatorCard = () => {
  return (
    <Card className="quality-indicator-card">
      <div className="thumbnail">
        <Image src={Thumbnail}/>
      </div>
      <div className="tag">
        <Space size="small">
          <Tag color="#6A9695" style={{ fontSize: 9 }}>INDIKATOR MUTU</Tag>
          <Tag color="#6A9695" style={{ fontSize: 9 }}>KEPEGAWAIAN</Tag>
          <Tag color="#6A9695" style={{ fontSize: 9 }}>MUTU</Tag>
        </Space>
      </div>
      <div className="content">
        <Text className="title">Pegawai dengan atribut lengkap</Text>
        <p className="info">Bulan Januari</p>
        <p className="info">5,6 MB</p>
        <p className="info">Senin, 17 Agustus 2021</p>
      </div>
       
    </Card>
  )
}