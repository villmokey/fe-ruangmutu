import { Stack } from "@mui/material";
import { Typography, Tag, Button, Popconfirm, Popover } from "antd";
import React from "react";
import styled from "styled-components";
import {
  CloudUploadOutlined,
  CheckCircleOutlined,
  LockOutlined,
  FileExcelOutlined,
  EditOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "moment/locale/id";
import { Link } from "react-router-dom";

import {
  LogoIndikatorKinerja,
  LogoIndikatorMutu,
  LogoKAK,
  LogoPanduan,
  LogoPedoman,
  LogoPergub,
  LogoRPK,
  LogoRenstra,
  LogoRUK,
  LogoSK,
  LogoSOP,
  LogoSOTK,
} from "../../../../assets/images/docs_logo";
import { paths } from "../../../../routing/paths";
import { checkPermission } from "../../../../helper/global";
import { useAuthToken } from "../../../../globals/useAuthToken";

export const documentTypeLogos = [
  {
    key: "Indikator Mutu",
    image: LogoIndikatorMutu,
  },
  {
    key: "Indikator Kinerja",
    image: LogoIndikatorKinerja,
  },
  {
    key: "KAK",
    image: LogoKAK,
  },
  {
    key: "Panduan",
    image: LogoPanduan,
  },
  {
    key: "Pedoman",
    image: LogoPedoman,
  },
  {
    key: "Pergub",
    image: LogoPergub,
  },
  {
    key: "RPK",
    image: LogoRPK,
  },
  {
    key: "Renstra",
    image: LogoRenstra,
  },
  {
    key: "RUK",
    image: LogoRUK,
  },
  {
    key: "SK",
    image: LogoSK,
  },
  {
    key: "SOP",
    image: LogoSOP,
  },
  {
    key: "SOTK",
    image: LogoSOTK,
  },
];

export const titleSplitter = (text) => {
  let title = text;
  if (text && text.length >= 15) {
    title = text.slice(0, 15) + "...";
  }

  return title;
};

const FileItem = ({
  name,
  programs = [],
  type,
  publish,
  created,
  file,
  thumbnail,
  number,
  docId,
  secret,
  handleRemove,
  handleUpdate,
}) => {
  const { getRole } = useAuthToken();
  return (
    <div style={{ position: "relative" }}>
      {checkPermission(["Super Admin"], getRole()) && (
        <AbsoluteBox>
          <Popconfirm
            title="Anda yakin akan menghapus dokumen?"
            okText="Ya"
            cancelText="Tidak"
            onConfirm={() => {
              return handleRemove(docId);
            }}
          >
            <Button title="Hapus Dokumen" type="text" color="red" style={{ padding: "1px" }}>
              <FileExcelOutlined style={{ color: "#cf2f2f" }} />
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Anda yakin akan mengubah data dokumen?"
            okText="Ya"
            cancelText="Tidak"
            onConfirm={() => {
              return handleUpdate(docId);
            }}
          >
            <Button title="Ubah Dokumen" type="text" color="red" style={{ padding: "1px" }}>
              <EditOutlined style={{ color: "#412dd3" }} />
            </Button>
          </Popconfirm>
        </AbsoluteBox>
      )}
      <Link to={`${docId}/${paths.VIEW}`}>
        <Container>
          <ExtensionLogo src={thumbnail} alt={"icon"} />
          <DetailContainer>
            {programs && programs.length > 0 && (
              <Stack direction={"row"}>
                <Tag style={{ background: "#6A9695", color: "white" }}>
                  {programs[0]?.program?.name ?? ""}
                </Tag>
                {programs.length > 1 && (
                  <Popover
                    content={
                      <>
                        {programs.map((program, index) => (
                          <Tag
                            key={index}
                            style={{ background: "#6A9695", color: "white" }}
                          >
                            {program && program.program && program.program.name
                              ? program.program.name
                              : ""}
                          </Tag>
                        ))}
                      </>
                    }
                  >
                    <Tag style={{ background: "#739b9b" }}>...</Tag>
                  </Popover>
                )}
              </Stack>
            )}
            <Typography
              style={{
                color: "black",
                fontSize: "14px",
              }}
            >
              <span title={name}>{titleSplitter(name)}</span>
            </Typography>
            <Typography
              style={{ fontSize: "12px", fontWeight: "400", color: "#7E7E7E" }}
            >
              {number}
            </Typography>
            <Typography
              style={{ fontSize: "12px", fontWeight: "400", color: "#7E7E7E" }}
            >
              {type}
            </Typography>
            <Typography
              style={{ fontSize: "12px", fontWeight: "300", color: "#7E7E7E" }}
            >
              <CheckCircleOutlined /> {moment(publish).format("DD MMM YYYY")}
            </Typography>
            <Typography
              style={{ fontSize: "12px", fontWeight: "300", color: "#7E7E7E" }}
            >
              <CloudUploadOutlined /> {moment(created).format("DD MMM YYYY")}
            </Typography>
            <Typography
              style={{
                fontSize: "12px",
                fontWeight: "300",
                color: secret ? "red" : "green",
              }}
            >
              <LockOutlined /> {secret > 0 ? "Rahasia" : "Publik"}
            </Typography>
          </DetailContainer>
        </Container>
      </Link>
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
  background: #6a9695;
  min-height: 237px;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  cursor: pointer;
`;

const DetailContainer = styled.div`
  background: white;
  border-radius: 0 0 10px 10px;
  text-align: left;
  padding: 10px 7px;
  min-height: 156px;

  .ant-tag {
    color: white !important;
    border: none !important;
  }
`;

const AbsoluteBox = styled.div`
  position: absolute;
  bottom: 5px;
  right: 3px;
  z-index: 5;
`;

const ExtensionLogo = styled.img`
  width: 150px;
  height: 190px;
  margin: 10px 0;
  border-radius: 10px;
  padding: 15px;
  user-select: none;
  -webkit-user-drag: none;
`;

export default FileItem;
