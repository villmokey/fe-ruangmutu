import React from "react";
import { Button, Col, Layout, message, Row, Space, Tag } from "antd";
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
import { ToastContainer } from "react-toastify";
import { fetchApiDelete, fetchApiGet } from "../../../../globals/fetchApi";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { checkPermission } from "../../../../helper/global";

const { Content } = Layout;

export const QualityCupboard = () => {
  const [viewType, setViewType] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const { getAccessToken, getRole } = useAuthToken();
  const accessToken = getAccessToken();
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState([]);

  const [total, setTotal] = useState({
    countAll: 0,
    countSelected: 0,
    countNew: 0,
  });

  const [paginationProps, setPaginationProps] = useState({
    total: 0,
    from: 0,
    to: 0,
  });

  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [actionType, setActionType] = useState("create");
  const [detailData, setDetailData] = useState({
    id: "",
    name: "",
    publish_date: "",
    created_at: "",
    document_number: "",
    program_related: [],
    document_related: [],
    document_type_id: "",
    file: {},
    thumbnail: {},
  });
  const [sorting, setSorting] = useState("DESC");
  const [sortBy, setSortBy] = useState("created_at");
  const [documents, setDocuments] = useState([]);
  const [filter, setFilter] = useState({
    year: "",
    type: "",
    programs: [],
  });

  const handleFilter = (filters) => {
    let params = {};

    if (filters.year) {
      params.year = filters.year;
    }

    if (filters.type) {
      params.type = filters.type;
    }

    if (filters.programs && filters.programs.length > 0) {
      params.programs = filters.programs
        .map((item) => {
          return item;
        })
        .join(",");
    }

    fetchApiGet("/document", {
      per_page: 36,
      page: page,
      search: search,
      hide_secret: getRole() === "User" || getRole() === "Admin",
      sort: sorting,
      sort_by: sortBy,
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
      per_page: 36,
      page: page,
      search: search,
      hide_secret: getRole() === "User" || getRole() === "Admin",
      sort: sorting,
      sort_by: sortBy,
    })
      .then((res) => {
        if (res && res.success) {
          setTotal({
            countAll: res.data.countAll,
            countSelected: res.data.countSelected,
            countNew: res.data.countNew,
          });
          setTotalPage(res.data.data.last_page);
          setPaginationProps({
            from: res.data.data.from,
            to: res.data.data.to,
            total: res.data.data.total,
          });
          setDocuments(res.data.data.data);
        }
      })
      .catch()
      .finally(() => setLoading(false));
  };

  const fetchPrograms = () => {
    fetchApiGet("/program", { paginate: false }, accessToken).then((res) => {
      if (res && res.success) {
        setPrograms(res.data ?? []);
      }
    });
  };

  const handleRemove = (docId) => {
    fetchApiDelete(`/document/${docId}`, accessToken).then((res) => {
      if (res.success) {
        message.success("Berhasil menghapus dokumen");
        fetchDocuments();
      } else {
        message.warning(
          "Gagal menghapus dokumen, silahkan coba lagi beberapa saat!"
        );
      }
    });
  };

  const handleUpdate = (docId) => {
    setActionType("update");
    fetchApiGet(`/document/${docId}`, {}, accessToken).then((res) => {
      if (res.success) {
        console.log(res.data);
        let response = res.data;
        let pay = {
          id: response.id,
          name: response.name,
          publish_date: response.publish_date,
          created_at: response.created_at,
          document_number: response.document_number,
          program_related: response.related_program
            ? response.related_program.map((x) => x.program_id)
            : [],
          document_related: response.related_file
            ? response.related_file.map((x) => ({
                id: x.related_document_id,
                name: x.related?.name ?? "-",
              }))
            : [],
          document_type_id: response.document_type_id,
          is_confidential: response.is_credential,
          file: response.file,
          thumbnail: response.document_type?.thumbnail?.file_link ?? null,
        };

        setDetailData(pay);
        setFormOpen(true);
      } else {
        message.warning(
          "Gagal menghapus dokumen, silahkan coba lagi beberapa saat!"
        );
      }
    });
  };

  React.useEffect(() => {
    fetchPrograms();
  }, []); //eslint-disable-line

  React.useEffect(() => {
    fetchDocuments();
  }, [page, search, sorting]); //eslint-disable-line

  return (
    <Layout>
      <ToastContainer />
      <QualityCupboardSider
        onFilter={(filters) => {
          setFilter({ ...filters });
          handleFilter(filters);
        }}
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
          updateData={detailData}
          actionType={actionType}
          updatePreview={{
            file: detailData.file,
            thumbnail: detailData.thumbnail,
          }}
          onClose={() => setFormOpen(false)}
          onSuccessSubmit={() => {
            setFormOpen(false);
            fetchDocuments();
          }}
        />
        <Row justify="end" style={{ marginTop: 40 }} gutter={[8]}>
          <Col>
            <InputSearch
              size="large"
              allowClear
              onSearch={(e) => {
                setPage(1);
                setSearch(e);
              }}
            />
          </Col>
          <Col>
            {checkPermission(["Super Admin", "Admin"], getRole()) && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                style={{ borderRadius: 8 }}
                onClick={() => {
                  setActionType("create");
                  setFormOpen(true);
                }}
              />
            )}
          </Col>
        </Row>
        <Row style={{ marginTop: 40, marginBottom: 20 }}>
          <Col style={{ marginRight: "auto" }}>
            <Space>
              {filter.programs && filter.programs.length > 0 ? (
                programs.map(
                  (prog) =>
                    filter.programs.some((x) => x === prog.id) && (
                      <Tag color="#6A9695">{prog.name}</Tag>
                    )
                )
              ) : (
                <Tag color="#6A9695">SEMUA UNIT</Tag>
              )}

              {filter.year && <Tag color="#6A9695">{filter.year}</Tag>}
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
            handleRemove={handleRemove}
            handleUpdate={handleUpdate}
            pages={totalPage}
            activePage={page}
            onPageChange={(p) => setPage(p)}
            sort={sorting}
            paginationProps={paginationProps}
            loading={loading}
            onSort={() => {
              setSortBy("name");
              setSorting(sorting === "ASC" ? "DESC" : "ASC");
            }}
          />
        ) : (
          <ListView
            documents={documents}
            paginationProps={paginationProps}
            pages={totalPage}
            activePage={page}
            sort={sorting}
            loading={loading}
            onSort={() => {
              setSortBy("name");
              setSorting(sorting === "ASC" ? "DESC" : "ASC");
            }}
            onPageChange={(p) => setPage(p)}
          />
        )}
      </Content>
    </Layout>
  );
};
