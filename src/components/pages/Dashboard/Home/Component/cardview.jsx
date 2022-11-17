import { Box, Grid, Pagination, Skeleton } from "@mui/material";
import React from "react";
import { DefaultThumbnail } from "../../../../../assets/images";
import FileItem from "./file.item";

const CardView = ({
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
      <Grid container spacing={1}>
        {documents &&
          documents.map((doc, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={2.4}>
              <FileItem
                docId={doc.id}
                name={doc.name}
                programs={doc.related_program}
                type={
                  doc && doc.document_type && doc.document_type.name
                    ? doc.document_type.name
                    : ""
                }
                publish={doc.publish_date}
                created={doc.created_at}
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
      <Box width={"100%"} display={"flex"} justifyContent={"end"}>
        <Pagination
          sx={{ marginTop: "20px" }}
          count={pages > 4 ? 4 : pages}
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
      </Grid>
    </Box>
  );
};

export default CardView;
