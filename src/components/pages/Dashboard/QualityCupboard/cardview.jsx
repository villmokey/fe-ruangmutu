import { Box, Grid, Stack, Pagination, Skeleton } from "@mui/material";
import React from "react";
import FileItem from "./file.item";
import { Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { DefaultThumbnail } from "../../../../assets/images";

const CardView = ({
  documents = [],
  pages = 0,
  activePage = 1,
  onPageChange,
  sort,
  onSort,
  loading,
  handleRemove,
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
      {documents && documents.length > 0 ? (
        <Grid container spacing={1}>
          {documents.map((doc, index) => (
            <Grid key={index} item xs={12} sm={4} md={2.4} lg={2.4}>
              <FileItem
                handleRemove={(f) => {
                  return handleRemove(f);
                }}
                docId={doc.id}
                name={doc.name}
                secret={doc.is_credential}
                programs={doc.related_program}
                type={
                  doc && doc.document_type && doc.document_type.name
                    ? doc.document_type.name
                    : ""
                }
                publish={doc.publish_date}
                created={doc.created_at}
                number={doc.document_number}
                thumbnail={
                  doc &&
                  doc.document_type &&
                  doc.document_type.thumbnail &&
                  doc.document_type.thumbnail.file_link
                    ? doc.document_type.thumbnail.file_link
                    : DefaultThumbnail
                }
                file={
                  doc.file && doc.file.file_link && doc.file.file_link
                    ? doc.file.file_link
                    : ""
                }
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box margin={"40px 0"} textAlign={"center"}>
          <p>Oops, Belum ada data</p>
        </Box>
      )}
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
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4} md={2.4} lg={2.4}>
          <Skeleton
            variant="reactangular"
            height={"237px"}
            sx={{ borderRadius: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2.4} lg={2.4}>
          <Skeleton
            variant="reactangular"
            height={"237px"}
            sx={{ borderRadius: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2.4} lg={2.4}>
          <Skeleton
            variant="reactangular"
            height={"237px"}
            sx={{ borderRadius: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2.4} lg={2.4}>
          <Skeleton
            variant="reactangular"
            height={"237px"}
            sx={{ borderRadius: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2.4} lg={2.4}>
          <Skeleton
            variant="reactangular"
            height={"237px"}
            sx={{ borderRadius: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2.4} lg={2.4}>
          <Skeleton
            variant="reactangular"
            height={"237px"}
            sx={{ borderRadius: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2.4} lg={2.4}>
          <Skeleton
            variant="reactangular"
            height={"237px"}
            sx={{ borderRadius: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2.4} lg={2.4}>
          <Skeleton
            variant="reactangular"
            height={"237px"}
            sx={{ borderRadius: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2.4} lg={2.4}>
          <Skeleton
            variant="reactangular"
            height={"237px"}
            sx={{ borderRadius: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2.4} lg={2.4}>
          <Skeleton
            variant="reactangular"
            height={"237px"}
            sx={{ borderRadius: "10px" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardView;
