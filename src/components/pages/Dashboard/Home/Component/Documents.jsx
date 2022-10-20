import { Col, Row } from "antd";
import React from "react";
import { useState } from "react";
import { fetchApiGet } from "../../../../../globals/fetchApi";
import CardView from "./cardview";

const Documents = () => {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  const fetchDocuments = () => {
    setLoading(true);
    fetchApiGet("/document", {
      per_page: 5,
      page: page,
      sort: "desc",
      visibility: "public",
      sort_by: "created_at",
    })
      .then((res) => {
        if (res && res.success) {
          setTotalPage(res.data.data.last_page);
          setDocuments(res.data.data.data);
        }
      })
      .catch()
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    fetchDocuments();
  }, [page]); //eslint-disable-line

  return (
    <Row>
      <Col span={24}>
        <CardView
          documents={documents}
          pages={totalPage}
          activePage={page}
          onPageChange={(p) => setPage(p)}
          loading={loading}
        />
      </Col>
    </Row>
  );
};

export default Documents;
