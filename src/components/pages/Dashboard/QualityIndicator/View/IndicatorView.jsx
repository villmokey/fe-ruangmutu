import React, { useState } from "react";
import { Row, Col, Skeleton, Typography } from "antd";
import { QualityIndicatorCard } from "../../../../molecules/QualityIndicatorCard/QualityIndicatorCard";
import { fetchApiGet } from "../../../../../globals/fetchApi";
import { useAuthToken } from "../../../../../globals/useAuthToken";
import { QualityIndicatorPreview } from "../../../../templates/QualityIndicatorTemplates/Preview/QualityIndicatorPreview";
import { Box, Grid, Pagination } from "@mui/material";

const IndicatorView = ({ filter, search }) => {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [previewVis, setPreviewVis] = useState(false);
  const [indicatorList, setIndicatorList] = useState([]);
  const [previewData, setPreviewData] = useState({});
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [chartData, setChartData] = useState({
    profile_target: 0,
    data: [],
  });
  const [paginationProps, setPaginationProps] = useState({
    count: 0,
    activePage: 1,
    total: 0,
    from: 0,
    to: 0,
  });

  const fetchIndicator = () => {
    setLoading(true);
    fetchApiGet(
      "/dashboard/indicator/cardlist",
      {
        ...filter,
        type: "quality",
        search: search,
        per_page: 20,
        page: page,
        variant: "indicator",
      },
      accessToken
    )
      .then((res) => {
        if (res) {
          setPaginationProps({
            activePage: res.data.current_page,
            count: Math.ceil(res.data.total / res.data.per_page),
            total: res.data.total,
            from: res.data.from,
            to: res.data.to,
          });
          setIndicatorList(res.data.data);
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
  }, [filter, search, page]); //eslint-disable-line

  return (
    <>
      {!loading ? (
        <>
          {indicatorList && indicatorList.length > 0 ? (
            <>
              <Row gutter={[24, 8]}>
                {indicatorList &&
                  indicatorList.map((item, index) => (
                    <Col key={index}>
                      <QualityIndicatorCard
                        previewVisibility={previewVis}
                        onClosePreviewVisibility={() => null}
                        onOpenPreview={() => {
                          fetchDetail(item.title,item.id, false);
                          setPreviewData(item);
                        }}
                        indicatorData={{
                          ...item,
                          title: item.profile_indicator.title,
                          is_profile_indicator: false,
                        }}
                        key={index}
                      />
                    </Col>
                  ))}
              </Row>
            </>
          ) : (
            <Box margin={"40px 0"} textAlign={"center"}>
              <p>Oops, Belum ada data</p>
            </Box>
          )}
          <Grid container alignItems={"center"} marginTop={"10px"}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography style={{ color: "rgb(168 168 168 / 85%)" }}>
                Menampilkan {paginationProps.from} - {paginationProps.to} dari{" "}
                {paginationProps.total}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box width={"100%"} display={"flex"} justifyContent={"end"}>
                <Pagination
                  sx={{ marginTop: "20px" }}
                  count={paginationProps.count}
                  color="standard"
                  page={paginationProps.activePage}
                  onChange={(e, p) => setPage(p)}
                />
              </Box>
            </Grid>
          </Grid>
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

export default IndicatorView;
