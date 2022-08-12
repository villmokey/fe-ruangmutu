import React, { useState } from "react";
import styled from "styled-components";
import {
  CollapseCloseIcon,
  CollapseOpenIcon,
  SettingIcon,
} from "../../../../assets/icons";

import { Menu } from "../../../molecules/Menu/Menu";
import { Dropdown, Button, Popconfirm } from "antd";
import { Stack, Box, Typography } from "@mui/material";
import moment from "moment";
import "moment/locale/id";

const EventItem = ({
  title,
  desc,
  date,
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
  return (
    <EventContainer>
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
              <Button onClick={onEdit} style={{ border: "none" }}>
                Ubah
              </Button>
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
      <Box width={"100%"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"end"}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <ImageBox
              src={
                "https://via.placeholder.com/100/6A9695/FFFFFF?text=" +
                (user.name ? user.name[0] : "Unkown")
              }
              alt={"placeholder"}
            />

            <Stack direction={"column"}>
              <Typography fontWeight={"bold"} fontSize={"18px"}>
                {user && user.name ? user.name : "Unknown"}
              </Typography>
              <Typography fontWeight={"bold"} color={"#959595"} fontSize={12}>
                {moment(date).format("DD MMMM YYYY, HH:mm")}
              </Typography>
            </Stack>
          </Stack>
          {programs && (
            <Box>
              <Stack direction={"row"}>
                {programs.map((program, index) => (
                  <Badge
                    key={"program-" + index + 1}
                    style={{ background: program.program.color }}
                  >
                    {program.program.name}
                  </Badge>
                ))}
              </Stack>
            </Box>
          )}
        </Stack>

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
                <Badge
                  style={{
                    maxWidth: "100px",
                    marginBottom: "10px",
                    background: programOwnerColor,
                  }}
                >
                  {programOwner}
                </Badge>
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
          <Typography
            fontWeight={"500"}
            fontSize={"14px"}
            dangerouslySetInnerHTML={{ __html: desc }}
          ></Typography>

          {open && (
            <>
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
                        href={
                          process.env.REACT_APP_API_URL +
                          "/" +
                          rel.related.file.file_path
                        }
                        target={"_blank"}
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
                        href={
                          process.env.REACT_APP_API_URL + "/" + rel.file_path
                        }
                        target={"_blank"}
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
`;

const DocumentPlaceholder = styled.div`
  width: 100px;
  height: 150px;
  background: #a1a0a0;
`;

const Badge = styled.div`
  background: #6a9695;
  border-radius: 65px;
  height: fit-content;
  padding: 4px 10px;
  min-width: 100px;
  text-align: center;
  font-size: 12px;
  color: white;
  margin: 0 5px;
  text-transform: uppercase;
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

const ImageBox = styled.img`
  width: 74px;
  height: 74px;
  border-radius: 50px;
`;

const ContentBox = styled.div`
  transition: ease-in-out 0.5s;
  position: relative;
  border: 1px solid #c4c4c4;
  padding: 13px 22px 30px 22px;
  margin: 10px 0;
`;

export default EventItem;
