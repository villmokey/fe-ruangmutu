import { Button, Modal, Skeleton, message } from "antd";
import React, { useState } from "react";
import { PlusOutlined, DeleteTwoTone } from "@ant-design/icons";
import { InputSearch } from "../../../../atoms/InputSearch/InputSearch";
import {
  TableRow,
  Table,
  TableData,
  TableHead,
} from "../../../../atoms/Table/styled";
import { Box, Pagination, Stack } from "@mui/material";
import {
  fetchApiGet,
  fetchApiDelete,
  fetchApiPost,
} from "../../../../../globals/fetchApi";
import { Form } from "../../../../molecules/Form/Form";
import Textfield from "../../../../molecules/Form/Textfield";
import { useAuthToken } from "../../../../../globals/useAuthToken";
import { Title } from "../../../../atoms/Title/Title";

const { confirm } = Modal;

const AddSubProgramModal = ({
  open = true,
  handleOk,
  handleCancel,
  programId,
  programName,
}) => {
  const { getAccessToken } = useAuthToken();
  const token = getAccessToken();
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [search, setSearch] = useState("");
  const [units, setUnits] = useState([]);
  const [subPayload, setSubPayload] = useState({ name: "" });
  const [paginationProps, setPaginationProps] = useState({
    count: 0,
    activePage: 1,
  });

  const fetchServices = () => {
    setLoading(true);
    fetchApiGet(
      "/sub-program",
      {
        page: paginationProps.activePage,
        per_page: 10,
        search: search ?? undefined,
        filter: programId,
      },
      token
    ).then((res) => {
      if (res && res.success) {
        setPaginationProps({
          activePage: res.data.current_page,
          count: Math.ceil(res.data.total / res.data.per_page),
        });
        setLoading(false);
        setUnits(res.data.data ?? []);
      }
    });
  };

  const handleSaveNew = () => {
    fetchApiPost("/sub-program", token, {
      name: subPayload.name,
      program_id: programId,
    }).then((res) => {
      if (res && res.code === 200) {
        message.success("Berhasil menambahkan sub program");
        fetchServices();
        handleOk();
      }
    });
  };

  const handleDelete = (itemId) => {
    confirm({
      title: "Konfirmasi",
      content: "Apakah anda ingin menghapus item ini?",
      cancelText: "Batal",
      okText: "Lanjutkan",
      onOk: () => {
        fetchApiDelete("/sub-program/" + itemId, token).then((res) => {
          if (res && res.code === 200) {
            message.success("Berhasil menghapus item");
            fetchServices();
          }
        });
      },
    });
  };

  React.useEffect(() => {
    fetchServices();
  }, [paginationProps.activePage, search, programId]); //eslint-disable-line
  return (
    <Modal
      title={"TAMBAH SUB-PROGRAM UNTUK " + programName}
      visible={open}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <Stack direction={"row"} spacing={1}>
        <InputSearch size="large" onSearch={(e) => setSearch(e)} />
        <Button
          onClick={() => {
            setOpenForm(!openForm);
          }}
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          style={{ borderRadius: 8 }}
        />
      </Stack>
      {openForm && (
        <Box
          width={"100%"}
          sx={{ border: "1px solid #f1f1f1", padding: "20px 10px" }}
        >
          <Title level={5}>TAMBAH SUB PROGRAM</Title>
          <Form layout={"vertical"}>
            <Textfield
              label="Nama Sub Program"
              required
              value={subPayload.name}
              onChange={(e) => setSubPayload({ name: e.target.value })}
            />
            <Stack direction={"row"} spacing={1}>
              <Button
                onClick={() => {
                  setOpenForm(false);
                }}
                type="ghost"
              >
                Batal
              </Button>
              <Button onClick={() => handleSaveNew()} type="primary">
                Simpan
              </Button>
            </Stack>
          </Form>
        </Box>
      )}

      {!loading ? (
        <>
          <Table>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
            {units &&
              units.map((unit) => (
                <TableRow>
                  <TableData>{unit.name}</TableData>
                  <TableData>
                    <Button type={"text"} onClick={() => handleDelete(unit.id)}>
                      <DeleteTwoTone />
                    </Button>
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
              onChange={(e, p) =>
                setPaginationProps({ ...paginationProps, activePage: p })
              }
            />
          </Box>
        </>
      ) : (
        <Skeleton />
      )}
    </Modal>
  );
};

export default AddSubProgramModal;
