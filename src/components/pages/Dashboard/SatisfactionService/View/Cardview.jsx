import React, { useState } from "react";
import { Row, Col, Skeleton } from "antd";
import { SatisficationServiceCard } from "../../../../molecules/SatisfactionService/SatisficationServiceCard/SatisficationServiceCard";
import { SatisfactionPreview } from "./Preview";

export const SatisfactionServiceCardView = ({ lists = [], onRefresh }) => {
  const [previewVis, setPreviewVis] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [loading, setLoading] = useState(false); //eslint-disable-line
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
