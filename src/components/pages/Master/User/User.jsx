import {
  Button,
  Col,
  Layout,
  Row,
  Skeleton,
  Tag,
  Typography,
  Modal,
  message,
} from "antd";
import { Title } from "../../../atoms/Title/Title";
import {
  TableData,
  TableHead,
  Table,
  TableRow,
} from "../../../atoms/Table/styled";
import { Box, Pagination, Stack } from "@mui/material";
import "./User.less";
import { InputSearch } from "../../../atoms/InputSearch/InputSearch";
import {
  DeleteTwoTone,
  EditTwoTone,
  PlusCircleTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { fetchApiDelete, fetchApiGet } from "../../../../globals/fetchApi";
import { MasterDataSider } from "../../../organism/Dashboard/Sider/MasterData/MasterDataSider";
import FormAdd from "./Add/Add";
import PositionModal from "./Modal/PositionModal";
import { Text } from "../../../atoms/Text/Text";

const { Content } = Layout;
const { confirm } = Modal;

export const UserPage = () => {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [programs, setPrograms] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openPositionModal, setOpenPositionModal] = useState(false);
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
      "/user",
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

  const handleEdit = (
    id,
    email,
    name,
    nip,
    position_id,
    role_id,
    signature_id
  ) => {
    setIsCreate(false);
    setPayload({ id, email, name, nip, position_id, role_id, signature_id });
    setOpenForm(true);
  };

  const handleDelete = (itemId) => {
    confirm({
      title: "Konfirmasi",
      content: "Apakah anda ingin menghapus item ini?",
      cancelText: "Batal",
      okText: "Lanjutkan",
      onOk: () => {
        fetchApiDelete("/user/" + itemId, accessToken).then((res) => {
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
      <MasterDataSider title={"DAFTAR PENGGUNA"}>
        <div
          style={{ marginTop: "20px" }}
          onClick={() => {
            setOpenPositionModal(true);
          }}
        >
          <Text style={{ cursor: "pointer", color: "#5DC8BD" }}>
            Tambah Master Jabatan
          </Text>
        </div>
      </MasterDataSider>
      <Content className="main-content">
        <PositionModal
          open={openPositionModal}
          handleOk={() => setOpenPositionModal(false)}
          handleCancel={() => setOpenPositionModal(false)}
        />
        <Row justify="end" style={{ marginTop: 40 }} gutter={[8]}>
          <Col>
            <InputSearch size="large" onSearch={handleSearch} />
          </Col>
          <Col>
            <Button
              onClick={() => {
                setIsCreate(true);
                setOpenForm(true);
              }}
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
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Dibuat</TableHead>
                  <TableHead>Aksi</TableHead>
                </thead>
                {programs &&
                  programs.map((program) => (
                    <TableRow key={program.id}>
                      <TableData>{program.name}</TableData>
                      <TableData>{program.email}</TableData>
                      <TableData>
                        {program.status === "active" ? "ACTIVE" : "INACTIVE"}
                      </TableData>
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
                                program.email,
                                program.name,
                                program.nip,
                                program.position_id,
                                program.role_id,
                                program.signature_id
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
