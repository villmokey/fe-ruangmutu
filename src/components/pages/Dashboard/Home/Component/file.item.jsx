import { Stack } from "@mui/material";
import { Typography, Tag } from "antd";
import React from "react";
import styled from "styled-components";
import { CloudUploadOutlined } from "@ant-design/icons";
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
} from "../../../../../assets/images/docs_logo";
import { paths } from "../../../../../routing/paths";

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
  docId,
}) => {
  return (
    <Link to={`/dashboard/quality-cupboard/${docId}/${paths.VIEW}`}>
      <Container>
        <ExtensionLogo src={thumbnail} alt={"icon"} />
        <DetailContainer>
          {programs && programs.length > 0 && (
            <Stack direction={"row"}>
              {programs.map((program, index) => (
                <Tag key={index} style={{ background: "#6A9695" }}>
                  {program && program.program && program.program.name
                    ? program.program.name
                    : ""}
                </Tag>
              ))}
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
            {type}
          </Typography>
          <Typography
            style={{ fontSize: "12px", fontWeight: "300", color: "#7E7E7E" }}
          >
            <CloudUploadOutlined /> {moment(created).format("DD MMM YYYY")}
          </Typography>
        </DetailContainer>
      </Container>
    </Link>
  );
};

const Container = styled.div`
  width: 100%;
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
  min-height: 130px;

  .ant-tag {
    color: white !important;
    border: none !important;
  }
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
