import { Image, Space, Tag } from "antd";
import { Card } from "../../../atoms/Card/Card";

import "./SatisficationServiceCard.less";
import Thumbnail from "../../../../assets/images/thumbnail.png";
import { Text } from "../../../atoms/Text/Text";

export const SatisficationServiceCard = ({
  onOpenPreview,
  indicatorData,
}) => {
  return (
    <>
      <Card className="quality-indicator-card">
        <div className="thumbnail">
          <Image src={Thumbnail} preview={false} onClick={onOpenPreview} />
        </div>
        <div className="tag" style={{ justifyContent: "start" }}>
          <Tag color="#6A9695" style={{ fontSize: 9 }}>
            {'KELUHAN PELANGGAN'}

          </Tag>
        </div>
        <div className="content">
          <span title={indicatorData.title}>
            <Text className="title" style={{ lineHeight: "10px" }}>
              Keluhan Pertama
            </Text>
          </span>
          <p className="info">
            16 September 2022
          </p>
        </div>
      </Card>
    </>
  );
};
