import { Button, Modal, Skeleton, message, Checkbox } from "antd";
import React, { useState } from "react";
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
  fetchApiPost,
} from "../../../../../globals/fetchApi";
import { useAuthToken } from "../../../../../globals/useAuthToken";

const AssignServiceUnitModal = ({
  open = true,
  handleOk,
  handleCancel,
  selecteds,
  setter,
  healthServiceId,
}) => {
  const { getAccessToken } = useAuthToken();
  const token = getAccessToken();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [units, setUnits] = useState([]);
  const [paginationProps, setPaginationProps] = useState({
    count: 0,
    activePage: 1,
  });

  const fetchServices = () => {
    setLoading(true);
    fetchApiGet(
      "/service-unit",
      {
        page: paginationProps.activePage,
        per_page: 10,
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

  const handleSubmit = () => {
    fetchApiPost("/health-service/assign-unit", token, {
      health_service_id: healthServiceId,
      units: selecteds.map((x) => x).join(","),
    }).then((res) => {
      if (res && res.code === 200) {
        message.success("Berhasil meng-assign unit layanan");
        fetchServices();
        handleOk();
      }
    });
  };

  React.useEffect(() => {
    fetchServices();
  }, [paginationProps.activePage, search]); //eslint-disable-line

  return (
    <Modal
      title="ASSIGN UNIT LAYANAN KESEHATAN"
      visible={open}
      destroyOnClos
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button type="primary" onClick={() => handleSubmit()}>
          Simpan
        </Button>,
      ]}
    >
      <Stack direction={"row"} spacing={1}>
        <InputSearch size="large" onSearch={(e) => setSearch(e)} />
      </Stack>
      {!loading ? (
        <>
          <Table>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Pilih</TableHead>
            </TableRow>
            {units &&
              units.map((unit) => (
                <TableRow>
                  <TableData>{unit.name}</TableData>
                  <TableData>
                    <Checkbox
                      checked={selecteds.some((x) => x === unit.id)}
                      value={unit.id}
                      onChange={(e) => {
                        let value = e.target.value;
                        let temp = [...selecteds];
                        if (selecteds.some((x) => x === value)) {
                          let indx = selecteds.findIndex((x) => x === value);
                          temp.splice(indx, 1);
                        } else {
                          temp.push(value);
                        }
                        setter(temp);
                      }}
                    />
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

export default AssignServiceUnitModal;
