import { Box, Stack, Pagination, Skeleton } from "@mui/material";
import { Tag, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/id";

const ListView = ({
  documents = [],
  pages = 0,
  activePage = 1,
  onPageChange,
  sort,
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
        {documents &&
          documents.map((doc, index) => (
            <TableRow key={index}>
              <TableData>
                <Box width={"100%"}>
                  {doc.related_program && doc.related_program.length > 0 && (
                    <Stack direction={"row"}>
                      {doc.related_program.map((program, index) => (
                        <Tag
                          key={index}
                          style={{ color: "white", background: "#6A9695" }}
                        >
                          {program && program.program && program.program.name
                            ? program.program.name
                            : ""}
                        </Tag>
                      ))}
                    </Stack>
                  )}
                  <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {doc.name}
                  </Typography>
                  <Typography style={{ fontSize: "10px", fontWeight: "300" }}>
                    {doc.document_type &&
                    doc.document_type &&
                    doc.document_type.name
                      ? doc.document_type.name
                      : ""}
                  </Typography>
                </Box>
              </TableData>
              <TableData>
                {moment(doc.publish_date).format("dddd, DD MMMM YYYY")}
              </TableData>
              <TableData>
                {moment(doc.created_at).format("dddd, DD MMMM YYYY")}
              </TableData>
            </TableRow>
          ))}
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

export default ListView;
