import { Box, Stack, Skeleton } from "@mui/material";
import { Tag, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/id";

export const SatisfactionServiceListView = ({
  satisafactions = [],
  pages = 1,
  activePage = 1,
  onPageChange,
  sort = "asc",
  onSort,
  loading,
}) => {
  return !loading ? (
    <Box width={"100%"}>
      <Table>
        <thead>
          <th>
            <Stack
              direction={"row"}
              spacing={0.5}
              alignItems={"center"}
              margin={"0 0 10px 0"}
            >
              <Typography
                style={{
                  color: "#95A0AB",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
                onClick={onSort}
              >
                Nama
              </Typography>
              {sort === "asc" ? (
                <ArrowUpOutlined color="#ABAFB3" />
              ) : (
                <ArrowDownOutlined color="#ABAFB3" />
              )}
            </Stack>
          </th>
          <th style={{ textAlign: "left" }}>
            <Typography
              style={{
                color: "#95A0AB",
                fontWeight: "500",
              }}
            >
              Tanggal Keluhan
            </Typography>
          </th>
          <th style={{ textAlign: "left" }}>
            <Typography
              style={{
                color: "#95A0AB",
                fontWeight: "500",
              }}
            >
              Tanggal Klarifikasi
            </Typography>
          </th>
        </thead>
        {satisafactions && satisafactions.length > 0 ? (
          satisafactions.map((item, index) => (
            <TableRow key={index}>
              <TableData>
                <Box width={"100%"}>
                  <Stack direction={"row"}>
                    <Tag style={{ color: "white", background: "#6A9695" }}>
                      {item.program && item.program.name
                        ? item.program.name
                        : ""}
                    </Tag>
                  </Stack>
                  <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {item.report}
                  </Typography>
                  <Typography style={{ fontSize: "11px" }}>
                    {item.reported_by}
                  </Typography>
                </Box>
              </TableData>
              <TableData>
                {moment(item.complaint_date).format("dddd, DD MMMM YYYY")}
              </TableData>
              <TableData>
                {item.clarification_date
                  ? moment(item.clarification_date).format("dddd, DD MMMM YYYY")
                  : "-"}
              </TableData>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableData colSpan={3}>
              <Box margin={"40px 0"} textAlign={"center"}>
                <p>Oops, Belum ada data</p>
              </Box>
            </TableData>
          </TableRow>
        )}
      </Table>
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
