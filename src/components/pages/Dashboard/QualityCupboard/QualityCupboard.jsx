import React from "react";
import { Button, Col, Layout, Row, Space, Tag } from "antd";
import { Card } from "../../../atoms/Card/Card";
import { Title } from "../../../atoms/Title/Title";
import { InputSearch } from "../../../atoms/InputSearch/InputSearch";
import {
  PlusOutlined,
  FileTextOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Skeleton } from "@mui/material";
import { useState } from "react";
import { paths } from "../../../../routing/paths";
import { QualityCupboardSider } from "../../../organism/Dashboard/Sider/QualityCupboardSider/QualityCupboardSider";
import CardView from "./cardview";
import ListView from "./listview";
import QualityCupboardForm from "./cupboard.form";
import Navigation from "../../../organism/Dashboard/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import { fetchApiGet } from "../../../../globals/fetchApi";

const { Content } = Layout;

export const QualityCupboard = () => {

  const [viewType, setViewType] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState({
    countAll: 0,
    countSelected: 0,
    countNew: 0,
  });
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState("ASC");
  const [documents, setDocuments] = useState([]);
  const [filter, setFilter] = useState({
    year: "",
    type: "",
    programs: [],
  });

  const handleFilter = () => {
    let params = {};

    if (filter.year) {
      params.year = filter.year;
    }

    if (filter.type) {
      params.type = filter.type;
    }

    if (filter.programs && filter.programs.length > 0) {
      params.programs = filter.programs
        .map((item) => {
          return item;
        })
        .join(",");
    }

    fetchApiGet("/document", {
      per_page: 10,
      page: 1,
      search: search,
      sort: sorting,
      sort_by: "name",
      ...params,
    }).then((res) => {
      if (res && res.success) {
        setTotal({
          countAll: res.data.countAll,
          countSelected: res.data.countSelected,
          countNew: res.data.countNew,
        });
        setTotalPage(res.data.data.last_page);
        setDocuments(res.data.data.data);
      }
    });
  };

  const fetchDocuments = () => {
    setLoading(true);
    fetchApiGet("/document", {
      per_page: 10,
      page: page,
      search: search,
      sort: sorting,
      sort_by: "name",
    })
      .then((res) => {
        if (res && res.success) {
          setTotal({
            countAll: res.data.countAll,
            countSelected: res.data.countSelected,
            countNew: res.data.countNew,
          });
          setTotalPage(res.data.data.last_page);
          setDocuments(res.data.data.data);
        }
      })
      .catch()
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    fetchDocuments();
  }, [page, search, sorting]); //eslint-disable-line

  return (
    <Layout>
      <ToastContainer />
      <QualityCupboardSider
        onChangeQualityYear={(e) => setFilter({ ...filter, year: e })}
        onChangeDocumentType={(e) => setFilter({ ...filter, type: e })}
        onChangeUnitService={(e) => setFilter({ ...filter, programs: e })}
        onFilter={() => handleFilter()}
      />
      <Content className="main-content">
        <Navigation
          items={[
            {
              path: "/dashboard/" + paths.QUALITY_CUPBOARD,
              label: "Lemari Mutu",
            },
          ]}
        />

        {!formOpen && (
          <Row justify="center" align="middle" gutter={[24, 16]}>
            <Col>
              <Card className="total">
                <p className="card-title">TOTAL DOKUMEN</p>
                {loading ? (
                  <Skeleton height={"60px"} />
                ) : (
                  <Title className="card-content">{total.countAll}</Title>
                )}
              </Card>
            </Col>
            <Col>
              <Card className="total">
                <p className="card-title">DOKUMEN TERPILIH</p>
                {loading ? (
                  <Skeleton height={"60px"} />
                ) : (
                  <Title className="card-content">{total.countSelected}</Title>
                )}
              </Card>
            </Col>
            <Col>
              <Card className="total">
                <p className="card-title">DOKUMEN BARU</p>
                {loading ? (
                  <Skeleton height={"60px"} />
                ) : (
                  <Title className="card-content">{total.countNew}</Title>
                )}
              </Card>
            </Col>
          </Row>
        )}
        {/* Form */}
        <QualityCupboardForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSuccessSubmit={() => {
            setFormOpen(false);
            toast.success("Berhasil menambahkan dokumen");
          }}
        />
        <Row justify="end" style={{ marginTop: 40 }} gutter={[8]}>
          <Col>
            <InputSearch
              size="large"
              allowClear
              onReset={(e) => console.log("RESET", e)}
              onSearch={(e) => {
                setPage(1);
                setSearch(e);
              }}
            />
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              style={{ borderRadius: 8 }}
              onClick={() => setFormOpen(true)}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 40, marginBottom: 20 }}>
          <Col style={{ marginRight: "auto" }}>
            <Space>
              <Tag color="#6A9695">SOP</Tag>
              <Tag color="#6A9695">PPI</Tag>
              <Tag color="#6A9695">MUTU</Tag>
            </Space>
          </Col>
          <Col style={{ marginLeft: "auto" }}>
            <Button
              type="primary"
              icon={
                viewType === 1 ? <FileTextOutlined /> : <OrderedListOutlined />
              }
              size="large"
              style={{ borderRadius: 8 }}
              onClick={() => setViewType(viewType === 1 ? 2 : 1)}
            />
          </Col>
        </Row>
        {viewType === 1 ? (
          <CardView
            documents={documents}
            pages={totalPage}
            activePage={page}
            onPageChange={(p) => setPage(p)}
            sort={sorting}
            loading={loading}
            onSort={() => setSorting(sorting === "ASC" ? "DESC" : "ASC")}
          />
        ) : (
          <ListView
            documents={documents}
            pages={totalPage}
            activePage={page}
            sort={sorting}
            loading={loading}
            onSort={() => setSorting(sorting === "ASC" ? "DESC" : "ASC")}
            onPageChange={(p) => setPage(p)}
          />
        )}
      </Content>
    </Layout>
  );
};
