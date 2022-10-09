import { Image, Space, Tag } from "antd";
import { Card } from "../../../atoms/Card/Card";

import "./SatisficationServiceCard.less";
import Thumbnail from "../../../../assets/images/thumbnail.png";
import { Text } from "../../../atoms/Text/Text";
import moment from "moment";

export const SatisficationServiceCard = ({ onOpenPreview, cardData }) => {
  return (
    <>
      <Card className="quality-indicator-card">
        <div className="thumbnail">
          <Image src={Thumbnail} preview={false} onClick={onOpenPreview} />
        </div>
        <div className="tag" style={{ justifyContent: "start" }}>
          <Tag color="#6A9695" style={{ fontSize: 9 }}>
            {cardData?.program?.name ?? ""}
          </Tag>
        </div>
        <div className="content">
          <span title={cardData.report}>
            <Text className="title" style={{ lineHeight: "10px" }}>
              {cardData.report.substr(0, 20)}
            </Text>
          </span>
          <p className="info">
            {moment(cardData.created_at).format("DD MMM YYYY")}
          </p>
        </div>
      </Card>
    </>
  );
};
