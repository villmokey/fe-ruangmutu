import {
  Button,
  Col,
  Layout,
  Row,
  Skeleton,
  Tag,
  Modal,
  message,
} from "antd";
import {
  TableData,
  TableHead,
  Table,
  TableRow,
} from "../../../atoms/Table/styled";
import { Box, Pagination, Stack } from "@mui/material";
import "./IndicatorProgram.less";
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
import AddSubProgramModal from "./Add/AddSubProgramModal";

const { Content } = Layout;
const { confirm } = Modal;

export const IndicatorProgram = () => {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [programs, setPrograms] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [subModal, setSubModal] = useState(false);
  const [payload, setPayload] = useState({ id: "", name: "" });
  const [search, setSearch] = useState("");
  const [subPayload, setSubPayload] = useState({
    program_id: "",
    name: "",
  });
  const [loading, setLoading] = useState(true);
  const [paginationProps, setPaginationProps] = useState({
    count: 0,
    activePage: 1,
  });

  const fetchPrograms = () => {
    setLoading(true);
    fetchApiGet(
      "/program",
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

  const handleAddChildren = (id, name) => {
    setSubPayload({
      program_id: id,
      name: name,
    });
    setSubModal(true);
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
        fetchApiDelete("/program/" + itemId, accessToken).then((res) => {
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
  }, [paginationProps.activePage, search]); //eslint-disable-line

  return (
    <Layout>
      <MasterDataSider title={"MASTER DATA UNIT/PROGRAM"} />
      <Content className="main-content">
        <AddSubProgramModal
          open={subModal}
          programName={subPayload.name}
          programId={subPayload.program_id}
          handleOk={() => {
            fetchPrograms();
          }}
          handleCancel={() => {
            fetchPrograms();
            setSubModal(false);
          }}
        />
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
                  <TableHead>Tanggal Dibuat</TableHead>
                  <TableHead>Sub Program</TableHead>
                  <TableHead>Aksi</TableHead>
                </thead>
                {programs &&
                  programs.map((program) => (
                    <TableRow key={program.id}>
                      <TableData>
                        <Tag
                          style={{
                            color: "white",
                            background: program.color,
                            fontWeight: "bold",
                          }}
                        >
                          {program.name}
                        </Tag>
                      </TableData>
                      <TableData>
                        {moment(program.created_at).format(
                          "dddd, DD MMMM YYYY"
                        )}
                      </TableData>
                      <TableData>
                        {program.sub_programs &&
                          program.sub_programs
                            .map((sub) => sub.name)
                            .join(", ")}
                      </TableData>
                      <TableData width={"10%"}>
                        <Stack direction={"row"} spacing={1}>
                          <Button
                            type="text"
                            onClick={() =>
                              handleAddChildren(program.id, program.name)
                            }
                          >
                            <PlusCircleTwoTone />
                          </Button>
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
