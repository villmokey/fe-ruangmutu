import React, { useState } from "react";
import { Row, Col, Skeleton } from "antd";
import { SatisficationServiceCard } from "../../../../molecules/SatisfactionService/SatisficationServiceCard/SatisficationServiceCard";
import { SatisfactionPreview } from "./Preview";
import { Box } from "@mui/material";

export const SatisfactionServiceCardView = ({ lists = [], onRefresh }) => {
  const [previewVis, setPreviewVis] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [loading, setLoading] = useState(false); //eslint-disable-line
  return (
    <>
      {!loading ? (
        <>
          {lists && lists.length > 0 ? (
            <Row gutter={[24, 8]}>
              {lists.map((item, index) => (
                <Col key={"complain-" + index}>
                  <SatisficationServiceCard
                    previewVisibility={previewVis}
                    onClosePreviewVisibility={() => setPreviewVis(false)}
                    onOpenPreview={() => {
                      setPreviewData(item);
                      setPreviewVis(true);
                    }}
                    cardData={item}
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
        <SatisfactionPreview
          detail={previewData}
          visibility={previewVis}
          onUpdateSuccess={() => {
            setPreviewVis(true);
            onRefresh();
          }}
          onClose={() => setPreviewVis(false)}
        />
      )}
    </>
  );
};
