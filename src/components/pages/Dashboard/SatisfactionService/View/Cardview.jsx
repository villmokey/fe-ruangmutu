import React, { useState } from "react";
import { Row, Col, Skeleton, message } from "antd";
import { SatisficationServiceCard } from "../../../../molecules/SatisfactionService/SatisficationServiceCard/SatisficationServiceCard";
import { SatisfactionPreview } from "./Preview";
import { Box } from "@mui/material";
import { useAuthToken } from "../../../../../globals/useAuthToken";
import { fetchApiDelete } from "../../../../../globals/fetchApi";

export const SatisfactionServiceCardView = ({ lists = [], onRefresh }) => {
  const [previewVis, setPreviewVis] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const { getAccessToken } = useAuthToken();
  const [loading, setLoading] = useState(false); //eslint-disable-line
  const handleRemove = (itemId) => {
    fetchApiDelete(`/complaint/${itemId}`, getAccessToken()).then((res) => {
      if (res.success) {
        onRefresh();
        message.success("Berhasil menghapus keluhan pelanggan");
      } else {
        message.error(res.message);
      }
    });
  };

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
                    onRemove={() => handleRemove(item.id)}
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
