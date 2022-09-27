import { Button, Col, Layout, Row, Skeleton, Modal, message } from "antd";
import {
  TableData,
  TableHead,
  Table,
  TableRow,
} from "../../../atoms/Table/styled";
import { Box, Pagination, Stack } from "@mui/material";
import "./DocumentType.less";
import { InputSearch } from "../../../atoms/InputSearch/InputSearch";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { fetchApiDelete, fetchApiGet } from "../../../../globals/fetchApi";
import { MasterDataSider } from "../../../organism/Dashboard/Sider/MasterData/MasterDataSider";
import FormAdd from "../DocumentType/Add/Add";

const { Content } = Layout;
const { confirm } = Modal;

export const DocumentTypePage = () => {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [programs, setPrograms] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [payload, setPayload] = useState({ id: "", name: "" });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [paginationProps, setPaginationProps] = useState({
    count: 0,
    activePage: 1,
  });

  const fetchPrograms = () => {
    setLoading(true);
    fetchApiGet(
      "/document-type",
      {
        page: paginationProps.activePage,
        per_page: 10,
        search: search ?? undefined,
      },
      accessToken
    ).then((res) => {
      if (res && res.success) {
        setPaginationProps({
          activePage: res.data.current_page,
          count: Math.ceil(res.data.total / res.data.per_page),
        });
        setLoading(false);
        setPrograms(res.data.data ?? []);
      }
    });
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handlePageChange = (event, page) => {
    setPaginationProps({ ...paginationProps, activePage: page });
  };

  const handleEdit = (id, name, color) => {
    setIsCreate(false);
    setPayload({ id, name, color });
    setOpenForm(true);
  };

  const handleDelete = (itemId) => {
    confirm({
      title: "Konfirmasi",
      content: "Apakah anda ingin menghapus item ini?",
      cancelText: "Batal",
      okText: "Lanjutkan",
      onOk: () => {
        fetchApiDelete("/document-type/" + itemId, accessToken).then((res) => {
          if (res && res.code === 200) {
            message.success("Berhasil menghapus item");
            fetchPrograms();
          }
        });
      },
    });
  };

  useEffect(() => {
    fetchPrograms();
  }, [paginationProps.activePage, search]);

  return (
    <Layout>
      <MasterDataSider title={"MASTER DATA TIPE DOKUMEN"} />
      <Content className="main-content">
        <Row justify="end" style={{ marginTop: 40 }} gutter={[8]}>
          <Col>
            <InputSearch size="large" onSearch={handleSearch} />
          </Col>
          <Col>
            <Button
              onClick={() => setOpenForm(true)}
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Col>
        </Row>
        <Row>
          {openForm && (
            <FormAdd
              isCreate={isCreate}
              payload={payload}
              payloadSetter={setPayload}
              onSuccess={() => fetchPrograms()}
              onClose={() => setOpenForm(false)}
            />
          )}
        </Row>
        <div className="indikator-mutu-container">
          {!loading ? (
            <>
              <Table>
                <thead style={{ fontWeight: "bold" }}>
                  <TableHead>Nama</TableHead>
                  {/* <TableHead>Icon</TableHead> */}
                  <TableHead>Tanggal Dibuat</TableHead>
                  <TableHead>Aksi</TableHead>
                </thead>
                {programs &&
                  programs.map((program) => (
                    <TableRow key={program.id}>
                      <TableData>{program.name}</TableData>
                      {/* <TableData>
                        {program.sub_programs &&
                          program.sub_programs
                            .map((sub) => sub.name)
                            .join(", ")}
                      </TableData> */}
                      <TableData>
                        {moment(program.created_at).format(
                          "dddd, DD MMMM YYYY"
                        )}
                      </TableData>
                      <TableData width={"10%"}>
                        <Stack direction={"row"} spacing={1}>
                          <Button
                            type="text"
                            onClick={() =>
                              handleEdit(
                                program.id,
                                program.name,
                                program.color
                              )
                            }
                          >
                            <EditTwoTone />
                          </Button>
                          <Button
                            type="text"
                            onClick={() => handleDelete(program.id)}
                          >
                            <DeleteTwoTone />
                          </Button>
                        </Stack>
                      </TableData>
                    </TableRow>
                  ))}
              </Table>
              <Box width={"100%"} display={"flex"} justifyContent={"end"}>
                <Pagination
                  sx={{ marginTop: "20px" }}
                  count={paginationProps.count}
                  color="standard"
                  page={paginationProps.activePage}
                  onChange={handlePageChange}
                />
              </Box>
            </>
          ) : (
            <Skeleton style={{ textAlign: "center" }}>Loading</Skeleton>
          )}
        </div>
      </Content>
    </Layout>
  );
};
