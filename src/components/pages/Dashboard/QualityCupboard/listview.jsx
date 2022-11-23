import { Box, Stack, Pagination, Skeleton, Grid } from "@mui/material";
import { Popover, Tag, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/id";
import { paths } from "../../../../routing/paths";

const ListView = ({
  documents = [],
  pages = 0,
  activePage = 1,
  onPageChange,
  paginationProps = { from: 0, to: 0, total: 1 },
  sort,
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
              {sort === "ASC" ? (
                <ArrowUpOutlined color="#ABAFB3" />
              ) : (
                <ArrowDownOutlined color="#ABAFB3" />
              )}
            </Stack>
          </th>
          <th>
            <Typography
              style={{
                color: "#95A0AB",
                fontWeight: "500",
                textAlign: "left",
              }}
            >
              Tanggal Publikasi
            </Typography>
          </th>
          <th>
            <Typography
              style={{
                color: "#95A0AB",
                fontWeight: "500",
                textAlign: "left",
              }}
            >
              Tanggal Unggah
            </Typography>
          </th>
        </thead>
        {documents && documents.length > 0 ? (
          documents.map((doc, index) => (
            <TableRow key={index}>
              <TableData>
                <a href={`${doc.id}/${paths.VIEW}`}>
                  <Box width={"100%"}>
                    {doc.related_program && doc.related_program.length > 0 && (
                      <Stack direction={"row"}>
                        <Tag style={{ background: "#6A9695", color: "white" }}>
                          {doc.related_program[0]?.program?.name ?? ""}
                        </Tag>
                        {doc.related_program.length > 1 && (
                          <Popover
                            content={
                              <>
                                {doc.related_program.map((program, index) => (
                                  <Tag
                                    key={index}
                                    style={{
                                      background: "#6A9695",
                                      color: "white",
                                    }}
                                  >
                                    {program &&
                                    program.program &&
                                    program.program.name
                                      ? program.program.name
                                      : ""}
                                  </Tag>
                                ))}
                              </>
                            }
                          >
                            <Tag
                              style={{ background: "#739b9b", color: "white" }}
                            >
                              ...
                            </Tag>
                          </Popover>
                        )}
                      </Stack>
                    )}
                    <Typography
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      {doc.name}
                    </Typography>
                    <Typography style={{ fontSize: "10px" }}>
                      {doc.document_number}
                    </Typography>
                    <Typography style={{ fontSize: "10px", fontWeight: "300" }}>
                      {doc.document_type &&
                      doc.document_type &&
                      doc.document_type.name
                        ? doc.document_type.name
                        : ""}
                    </Typography>
                  </Box>
                </a>
              </TableData>
              <TableData>
                {moment(doc.publish_date).format("dddd, DD MMMM YYYY")}
              </TableData>
              <TableData>
                {moment(doc.created_at).format("dddd, DD MMMM YYYY")}
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
      <Grid container alignItems={"center"} marginTop={"20px"}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography style={{ color: "rgb(168 168 168 / 85%)" }}>
            Menampilkan {paginationProps.from} - {paginationProps.to} dari{" "}
            {paginationProps.total}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
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
        </Grid>
      </Grid>
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

export default ListView;
