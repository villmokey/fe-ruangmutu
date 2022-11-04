import React, { useState } from "react";
import { Row, Col, Skeleton } from "antd";
import { QualityIndicatorCard } from "../../../../molecules/QualityIndicatorCard/QualityIndicatorCard";
import { fetchApiGet } from "../../../../../globals/fetchApi";
import { useAuthToken } from "../../../../../globals/useAuthToken";
import { QualityIndicatorPreview } from "../../../../templates/QualityIndicatorTemplates/Preview/QualityIndicatorPreview";
import { Box } from "@mui/material";

const QualityIndicatorCardview = ({ filter, search }) => {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [previewVis, setPreviewVis] = useState(false);
  const [indicatorList, setIndicatorList] = useState([]);
  const [previewData, setPreviewData] = useState({});
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({
    profile_target: 0,
    data: [],
  });

  const fetchIndicator = () => {
    setLoading(true);
    fetchApiGet(
      "/dashboard/indicator/cardlist",
      { ...filter, type: "quality", search: search },
      accessToken
    )
      .then((res) => {
        if (res) {
          setIndicatorList(res.data);
        }
      })
      .finally(() => setLoading(false));
  };

  const fetchChartData = (id) => {
    fetchApiGet(`/indicator-profile/chart/${id}`, {}, accessToken)
      .then((res) => {
        if (res) {
          setChartData(res.data);
          setPreviewVis(true);
        }
      })
      .catch((e) => console.log(e.getMessage()));
  };

  const fetchIndicatorDetail = (id) => {
    fetchApiGet(`/indicator/${id}`, {}, accessToken)
      .then((res) => {
        if (res) {
          setDetail(res.data);
          setPreviewVis(true);
        }
      })
      .catch((e) => console.log(e.getMessage()));
  };

  const fetchIndicatorProfileDetail = (id) => {
    fetchApiGet(`/indicator-profile/${id}`, {}, accessToken)
      .then((res) => {
        if (res) {
          setDetail(res.data);
          setPreviewVis(true);
        }
      })
      .catch((e) => console.log(e.getMessage()));
  };

  const fetchDetail = (id, indicatorId, isProfile) => {
    if (isProfile) {
      fetchIndicatorProfileDetail(id);
    } else {
      fetchIndicatorDetail(indicatorId);
    }

    fetchChartData(id);
  };

  React.useEffect(() => {
    fetchIndicator();
  }, [filter, search]);

  return (
    <>
      {!loading ? (
        <>
          {indicatorList && indicatorList.length > 0 ? (
            <Row gutter={[24, 8]}>
              {indicatorList &&
                indicatorList.map((item, index) => (
                  <Col key={index}>
                    <QualityIndicatorCard
                      previewVisibility={previewVis}
                      onClosePreviewVisibility={() => null}
                      onOpenPreview={() => {
                        fetchDetail(
                          item.id,
                          item.indicator_id,
                          item.is_profile_indicator
                        );
                        setPreviewData(item);
                      }}
                      indicatorData={item}
                      key={index}
                    />
                  </Col>
                ))}
            </Row>
          ) : (
            <Box margin={"40px 0"} textAlign={"center"}>
              <p>Oops, Belum ada data</p>
            </Box>
          )}
        </>
      ) : (
        <Skeleton />
      )}

      {previewVis && (
        <QualityIndicatorPreview
          chartData={chartData.data}
          isProfile={previewData.is_profile_indicator}
          baseline={chartData.profile_target}
          detail={detail}
          indicator={previewData}
          visibility={previewVis}
          onClose={() => setPreviewVis(false)}
        />
      )}
    </>
  );
};

export default QualityIndicatorCardview;
