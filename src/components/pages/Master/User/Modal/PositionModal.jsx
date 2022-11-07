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
import { fetchApiGet, fetchApiDelete } from "../../../../../globals/fetchApi";
import { useAuthToken } from "../../../../../globals/useAuthToken";
import FormAddPosition from "../Add/AddPosition";

const { confirm } = Modal;

const PositionModal = ({ open = false, handleOk, handleCancel }) => {
  const { getAccessToken } = useAuthToken();
  const token = getAccessToken();
  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState({ name: "", is_leader: false });
  const [openForm, setOpenForm] = useState(false);
  const [search, setSearch] = useState("");
  const [units, setUnits] = useState([]);
  const [paginationProps, setPaginationProps] = useState({
    count: 0,
    activePage: 1,
  });

  const fetchServices = () => {
    setLoading(true);
    fetchApiGet(
      "/position",
      {
        page: paginationProps.activePage,
        per_page: 5,
        search: search ?? undefined,
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

  const handleDelete = (itemId) => {
    confirm({
      title: "Konfirmasi",
      content: "Apakah anda ingin menghapus item ini?",
      cancelText: "Batal",
      okText: "Lanjutkan",
      onOk: () => {
        fetchApiDelete("/position/" + itemId, token).then((res) => {
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
  }, [paginationProps.activePage, search]); //eslint-disable-line

  return (
    <Modal
      title="MASTER DATA JABATAN"
      visible={open}
      destroyOnClos
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <Stack direction={"row"} spacing={1}>
        <InputSearch size="large" onSearch={(e) => setSearch(e)} />
        <Button
          onClick={() => {
            setOpenForm(!openForm);
            console.log(openForm);
          }}
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          style={{ borderRadius: 8 }}
        />
      </Stack>
      {openForm && (
        <FormAddPosition
          payload={payload}
          payloadSetter={setPayload}
          isCreate={true}
          onSuccess={() => {
            setOpenForm(false);
            fetchServices();
          }}
          onClose={() => setOpenForm(false)}
        />
      )}
      {!loading ? (
        <>
          <Table>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Kepala Puskesmas</TableHead>
            </TableRow>
            {units &&
              units.map((unit) => (
                <TableRow>
                  <TableData>{unit.name}</TableData>
                  <TableData>{unit.is_leader ? "Ya" : "-"}</TableData>
                  <TableData>
                    <Button type="text" onClick={() => handleDelete(unit.id)}>
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

export default PositionModal;
