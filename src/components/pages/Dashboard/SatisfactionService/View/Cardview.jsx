import React, { useState } from "react";
import { Row, Col, Skeleton } from "antd";
import { useAuthToken } from "../../../../../globals/useAuthToken";
import { SatisficationServiceCard } from "../../../../molecules/SatisfactionService/SatisficationServiceCard/SatisficationServiceCard";
import { SatisfactionPreview } from "./Preview";

export const SatisfactionServiceCardView = ({ filter }) => {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [previewVis, setPreviewVis] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      {!loading ? (
        <Row gutter={[24, 8]}>
          <Col>
            <SatisficationServiceCard
              previewVisibility={previewVis}
              onClosePreviewVisibility={() => setPreviewVis(false)}
              onOpenPreview={() => setPreviewVis(true)}
              indicatorData={{}}
            />
          </Col>
          <Col>
            <SatisficationServiceCard
              previewVisibility={previewVis}
              onClosePreviewVisibility={() => null}
              onOpenPreview={() => { }}
              indicatorData={{}}
            />
          </Col>
          <Col>
            <SatisficationServiceCard
              previewVisibility={previewVis}
              onClosePreviewVisibility={() => null}
              onOpenPreview={() => { }}
              indicatorData={{}}
            />
          </Col>
          <Col>
            <SatisficationServiceCard
              previewVisibility={previewVis}
              onClosePreviewVisibility={() => null}
              onOpenPreview={() => { }}
              indicatorData={{}}
            />
          </Col>
        </Row>
      ) : (
        <Skeleton />
      )}

      {previewVis && (
        <SatisfactionPreview
          chartData={[]}
          isProfile={false}
          baseline={90}
          detail={{}}
          indicator={{}}
          visibility={previewVis}
          onClose={() => setPreviewVis(false)}
        />
      )}
    </>
  );
};