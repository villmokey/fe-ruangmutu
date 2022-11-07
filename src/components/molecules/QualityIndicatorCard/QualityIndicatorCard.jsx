import { Image, Tag } from "antd";
import { Card } from "../../atoms/Card/Card";

import "./QualityIndicatorCard.less";
import Thumbnail from "../../../assets/images/thumbnail.png";
import { Text } from "../../atoms/Text/Text";

export const QualityIndicatorCard = ({
  onOpenPreview,
  indicatorData,
  isPerformance = false,
}) => {
  return (
    <>
      <Card className="quality-indicator-card">
        <div className="thumbnail">
          <Image src={Thumbnail} preview={false} onClick={onOpenPreview} />
        </div>
        <div className="tag" style={{ justifyContent: "start" }}>
          <Tag color="#6A9695" style={{ fontSize: 9 }}>
            {indicatorData.is_profile_indicator
              ? `PROFILE INDIKATOR ${isPerformance ? "KINERJA" : "MUTU"}`
              : `INDIKATOR ${isPerformance ? "KINERJA" : "MUTU"}`}
          </Tag>
        </div>
        <div className="content">
          <span title={indicatorData.title}>
            <Text className="title" style={{ lineHeight: "10px" }}>
              {indicatorData.title && indicatorData.title.length > 35
                ? indicatorData.title.substr(0, 35) + "..."
                : indicatorData.title}
            </Text>
          </span>
          {indicatorData.month && (
            <p className="info">
              <Text
                className="title"
                style={{ lineHeight: "10px", fontWeight: "bold" }}
              >
                BULAN {indicatorData.month.substr().toUpperCase()}
              </Text>
            </p>
          )}
          {/* <p className="info">{indicatorData.year}</p> */}
          <p className="info">
            {new Date(indicatorData.created_at).toLocaleDateString()}
          </p>
        </div>
      </Card>
    </>
  );
};
