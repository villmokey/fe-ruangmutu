import React, { useState } from "react";
import { Row, Col, Skeleton } from "antd";
import { useAuthToken } from "../../../../../globals/useAuthToken";
import { SatisficationServiceCard } from "../../../../molecules/SatisfactionService/SatisficationServiceCard/SatisficationServiceCard";
import { SatisfactionPreview } from "./Preview";

export const SatisfactionServiceCardView = ({ lists = [] }) => {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [previewVis, setPreviewVis] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [loading, setLoading] = useState(false);
  return (
    <>
      {!loading ? (
        <Row gutter={[24, 8]}>
          {lists && lists.length > 0 ? (
            lists.map((item, index) => (
              <Col key={"complain-" + index}>
                <SatisficationServiceCard
                  previewVisibility={previewVis}
                  onClosePreviewVisibility={() => setPreviewVis(false)}
                  onOpenPreview={() => {
                    console.log(item);
                    setPreviewData(item);
                    setPreviewVis(true);
                  }}
                  cardData={item}
                />
              </Col>
            ))
          ) : (
            <p>Belum ada keluhan pelanggan</p>
          )}
        </Row>
      ) : (
        <Skeleton />
      )}

      {previewVis && (
        <SatisfactionPreview
          detail={previewData}
          visibility={previewVis}
          onClose={() => setPreviewVis(false)}
        />
      )}
    </>
  );
};
