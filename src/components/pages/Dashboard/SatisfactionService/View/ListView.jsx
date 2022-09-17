import { Box, Stack, Pagination, Skeleton } from "@mui/material";
import { Tag, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/id";

export const SatisfactionServiceListView = ({
  documents = [],
  pages = 10,
  activePage = 1,
  onPageChange,
  sort = 'ASC',
  onSort,
  loading,
}) => {
  return !loading ? (
    <Box width={"100%"}>
      <Stack
        direction={"row"}
        spacing={0.5}
        alignItems={"center"}
        margin={"0 0 10px 0"}
      >
        <Typography
          style={{ color: "#95A0AB", fontWeight: "500", cursor: "pointer" }}
          onClick={onSort}
        >
          Nama
        </Typography>
        {sort === "ASC" ? (
          <ArrowUpOutlined color="#ABAFB3" />
        ) : (
          <ArrowDownOutlined color="#ABAFB3" />
        )}
      </Stack>
      <Table>
        <TableRow>
          <TableData>
            <Box width={"100%"}>

              <Stack direction={"row"}>
                <Tag
                  style={{ color: "white", background: "#6A9695" }}
                >
                  KELUHAN PELANGGAN
                </Tag>
              </Stack>
              <Typography
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Keluhan Pertama
              </Typography>
            </Box>
          </TableData>
          <TableData>
            {moment('2022-12-12').format("dddd, DD MMMM YYYY")}
          </TableData>
          <TableData>
            {moment('2022-12-12').format("dddd, DD MMMM YYYY")}
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <Box width={"100%"}>

              <Stack direction={"row"}>
                <Tag
                  style={{ color: "white", background: "#6A9695" }}
                >
                  KELUHAN PELANGGAN
                </Tag>
              </Stack>
              <Typography
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Keluhan Pertama
              </Typography>
            </Box>
          </TableData>
          <TableData>
            {moment('2022-12-12').format("dddd, DD MMMM YYYY")}
          </TableData>
          <TableData>
            {moment('2022-12-12').format("dddd, DD MMMM YYYY")}
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <Box width={"100%"}>

              <Stack direction={"row"}>
                <Tag
                  style={{ color: "white", background: "#6A9695" }}
                >
                  KELUHAN PELANGGAN
                </Tag>
              </Stack>
              <Typography
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Keluhan Pertama
              </Typography>
            </Box>
          </TableData>
          <TableData>
            {moment('2022-12-12').format("dddd, DD MMMM YYYY")}
          </TableData>
          <TableData>
            {moment('2022-12-12').format("dddd, DD MMMM YYYY")}
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <Box width={"100%"}>

              <Stack direction={"row"}>
                <Tag
                  style={{ color: "white", background: "#6A9695" }}
                >
                  KELUHAN PELANGGAN
                </Tag>
              </Stack>
              <Typography
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Keluhan Pertama
              </Typography>
            </Box>
          </TableData>
          <TableData>
            {moment('2022-12-12').format("dddd, DD MMMM YYYY")}
          </TableData>
          <TableData>
            {moment('2022-12-12').format("dddd, DD MMMM YYYY")}
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <Box width={"100%"}>

              <Stack direction={"row"}>
                <Tag
                  style={{ color: "white", background: "#6A9695" }}
                >
                  KELUHAN PELANGGAN
                </Tag>
              </Stack>
              <Typography
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Keluhan Pertama
              </Typography>
            </Box>
          </TableData>
          <TableData>
            {moment('2022-12-12').format("dddd, DD MMMM YYYY")}
          </TableData>
          <TableData>
            {moment('2022-12-12').format("dddd, DD MMMM YYYY")}
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <Box width={"100%"}>

              <Stack direction={"row"}>
                <Tag
                  style={{ color: "white", background: "#6A9695" }}
                >
                  KELUHAN PELANGGAN
                </Tag>
              </Stack>
              <Typography
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                Keluhan Pertama
              </Typography>
            </Box>
          </TableData>
          <TableData>
            {moment('2022-12-12').format("dddd, DD MMMM YYYY")}
          </TableData>
          <TableData>
            {moment('2022-12-12').format("dddd, DD MMMM YYYY")}
          </TableData>
        </TableRow>
      </Table>
      <Box width={"100%"} display={"flex"} justifyContent={"end"}>
        <Pagination
          sx={{ marginTop: "20px" }}
          count={pages}
          color="standard"
          page={activePage}
          onChange={(e, p) => {
            return onPageChange(p);
          }}
        />
      </Box>
    </Box>
  ) : (
    <Box width={"100%"}>
      <Stack direction={"column"} spacing={1}>
        <Skeleton height={"60px"} />
        <Skeleton height={"60px"} />
        <Skeleton height={"60px"} />
        <Skeleton height={"60px"} />
        <Skeleton height={"60px"} />
        <Skeleton height={"60px"} />
      </Stack>
    </Box>
  );
};

const Table = styled.table`
  width: 100%;
`;

const TableRow = styled.tr`
  padding: 10px 5px;

  :nth-child(even) {
    background-color: #f1f1f1;
  }
`;

const TableData = styled.td`
  padding: 10px 5px;

  :nth-child(2),
  :nth-child(3) {
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 21px;
  }
`;
