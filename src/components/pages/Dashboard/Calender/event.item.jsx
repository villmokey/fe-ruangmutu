import React, { useState } from "react";
import styled from "styled-components";
import {
  CollapseCloseIcon,
  CollapseOpenIcon,
  SettingIcon,
} from "../../../../assets/icons";
import { Dropdown, Button, Popconfirm, Tag } from "antd";
import { Stack, Box, Typography, Grid } from "@mui/material";
import moment from "moment";
import "moment/locale/id";
import { useAuthToken } from "../../../../globals/useAuthToken";

const EventItem = ({
  title,
  desc,
  start,
  end,
  programs,
  user,
  realized,
  onRealized,
  onEdit,
  onDelete,
  programOwner,
  programOwnerColor,
  files = [],
  otherFiles = [],
}) => {
  const [open, setOpen] = useState(false);
  const { getRole } = useAuthToken();
  return (
    <EventContainer>
      {getRole() === "Super Admin" && (
        <Dropdown
          overlay={
            <Box sx={{ background: "white" }}>
              <Stack direction={"column"}>
                {!realized && (
                  <Popconfirm
                    title="Anda yakin akan mengubah status kegiatan menjadi terealisasi?"
                    okText="Ya"
                    cancelText="Tidak"
                    onConfirm={onRealized}
                  >
                    <Button style={{ border: "none" }}>Realisasi</Button>
                  </Popconfirm>
                )}
                {/* <Button onClick={onEdit} style={{ border: "none" }}>
                Ubah
              </Button> */}
                <Popconfirm
                  title="Anda yakin akan menghapus kegiatan ini?"
                  okText="Ya"
                  cancelText="Tidak"
                  onConfirm={onDelete}
                >
                  <Button style={{ border: "none" }}>Hapus</Button>
                </Popconfirm>
              </Stack>
            </Box>
          }
        >
          <Icon src={SettingIcon} alt={"ic_setting"} />
        </Dropdown>
      )}
      <Box width={"100%"}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item xs={12} sm={12} md={6}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <ImagePlaceholder>
                {user && user.name ? user.name.substr(0, 2) : "Unkown"}
              </ImagePlaceholder>

              <Stack direction={"column"}>
                <Typography fontWeight={"bold"} fontSize={"18px"}>
                  {user && user.name ? user.name : "Unknown"}
                </Typography>
                <Typography fontWeight={"bold"} color={"#959595"} fontSize={12}>
                  {start !== end
                    ? `${moment(start).format("DD MMMM YYYY")} - ${moment(
                        end
                      ).format("DD MMMM YYYY")}`
                    : moment(start).format("DD MMMM YYYY")}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            {programs && (
              <Box sx={{ float: "right" }}>
                <Stack direction={"row"}>
                  {programs.map((program, index) => (
                    <Tag
                      key={"program-" + index + 1}
                      style={{
                        background: program.program.color,
                        color: "white",
                      }}
                    >
                      {program.program.name}
                    </Tag>
                  ))}
                </Stack>
              </Box>
            )}
          </Grid>
        </Grid>

        <ContentBox>
          {open ? (
            <Collapse src={CollapseCloseIcon} onClick={() => setOpen(false)} />
          ) : (
            <Collapse src={CollapseOpenIcon} onClick={() => setOpen(true)} />
          )}

          {programOwner && (
            <>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  fontWeight={"500"}
                  fontSize={"14px"}
                  marginBottom={"10px"}
                >
                  Unit Layanan
                </Typography>
                <Tag
                  style={{
                    maxWidth: "100px",
                    marginBottom: "10px",
                    background: programOwnerColor,
                    color: "white",
                  }}
                >
                  {programOwner}
                </Tag>
              </Stack>
            </>
          )}
          <Typography
            fontWeight={"bold"}
            fontSize={"18px"}
            marginBottom={"10px"}
          >
            {title}
          </Typography>

          {open && (
            <>
              <Typography
                fontWeight={"500"}
                fontSize={"14px"}
                dangerouslySetInnerHTML={{ __html: desc }}
              ></Typography>
              {files && (
                <>
                  <Typography
                    fontWeight={"500"}
                    fontSize={"12px"}
                    marginTop={"10px"}
                  >
                    Dokumen Terkait:
                  </Typography>
                  {files.map((rel, index) => (
                    <DocumentItem key={"Document- " + index}>
                      <a
                        style={{ color: "white" }}
                        href={rel.related.file.file_link}
                        target={"_blank"}
                        rel="noreferrer"
                      >
                        {rel.related &&
                        rel.related.file &&
                        rel.related.file &&
                        rel.related.file.real_name
                          ? rel.related.file.real_name
                          : "Undefined"}
                      </a>
                    </DocumentItem>
                  ))}
                </>
              )}
              {otherFiles && otherFiles.length > 0 && (
                <>
                  <Typography
                    fontWeight={"500"}
                    fontSize={"12px"}
                    marginTop={"10px"}
                  >
                    Dokumen Pendukung:
                  </Typography>
                  {otherFiles.map((rel, index) => (
                    <DocumentItem key={"support-doc-" + index}>
                      <a
                        style={{ color: "white" }}
                        href={rel.file_link}
                        target={"_blank"}
                        rel="noreferrer"
                      >
                        {rel.real_name ? rel.real_name : "Undefined"}
                      </a>
                    </DocumentItem>
                  ))}
                </>
              )}
            </>
          )}
        </ContentBox>
      </Box>
    </EventContainer>
  );
};

const DocumentItem = styled.div`
  color: white;
  background: #6a9695;
  max-width: 300px;
  padding: 3px 5px 5px 5px;
  border-radius: 5px;
  margin: 10px 0;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const EventContainer = styled.div`
  position: relative;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  padding: 25px;
  margin-bottom: 10px;
  min-width: 500px;

  @media only screen and (max-width: 700px) {
    min-width: unset !important;
    width: 100%;
  }
`;

const Icon = styled.img`
  -webkit-user-drag: none;
  user-select: none;
  transition: ease-in-out 0.3s;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const Collapse = styled.img`
  -webkit-user-drag: none;
  user-select: none;
  transition: ease-in-out 0.3s;
  position: absolute;
  width: 30px;
  bottom: 5px;
  right: 5px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const ImagePlaceholder = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #6a9695;
  color: white;
  font-size: 15px;
  font-weight: bold;
`;

const ContentBox = styled.div`
  transition: ease-in-out 0.5s;
  position: relative;
  border: 1px solid #c4c4c4;
  padding: 13px 22px 30px 22px;
  margin: 10px 0;
`;

export default EventItem;
