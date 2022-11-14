import React from "react";
import { Button, Col, Input, message, Modal, Row, Select, Tag } from "antd";
import { Text } from "../../../../atoms/Text/Text";
import { Title } from "../../../../atoms/Title/Title";
import "./Preview.less";
import moment from "moment";
import { LogoGambir } from "../../../../../assets/images";
import { useState } from "react";
import { fetchApiPost, fetchApiPut } from "../../../../../globals/fetchApi";
import { useAuthToken } from "../../../../../globals/useAuthToken";

const Footer = () => (
  <Row>
    <Col span={12} style={{ textAlign: "left" }}>
      <Text style={{ fontSize: "12px" }}>
        Dilarang menduplikat dokumen tanpa izin Manajemen Mutu
      </Text>
      <br />
      <Text style={{ fontSize: "12px" }}>Puskesmas kecamatan gambir</Text>
    </Col>
    <Col span={12}>
      <Tag color="#6A9695">PUSKESMAS KECAMATAN GAMBIR</Tag>
    </Col>
  </Row>
);

export const SatisfactionPreview = ({
  detail,
  visibility = false,
  onClose,
  onUpdateSuccess,
}) => {
  const { getAccessToken, getRole } = useAuthToken();
  const accessToken = getAccessToken();
  const [isEdit, setIsEdit] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [proofFiles, setProofFiles] = useState([]);
  const [editPayload, setEditPayload] = useState({
    coordination: "",
    status: "",
    follow_up: "",
  });

  const uploadFileList = async (fileList = []) => {
    let bags = new FormData();
    bags.append("file", "");
    bags.append("group_name", "proof_complaint_files");
    const uploaded = Promise.all(
      fileList.map(async (file) => {
        bags.set("file", file);
        const res = await fetchApiPost("/upload/file", accessToken, bags);
        if (res && res.code === 200 && res.data.id) {
          return res.data.id;
        }
      })
    );

    return await uploaded;
  };

  const handleSubmit = async (type = "normal") => {
    setStatusLoading(true);
    console.log(proofFiles);
    if (proofFiles && proofFiles.length > 0) {
      await uploadFileList(proofFiles).then((ids) => {
        fetchApiPut(`/complaint/update-info/${detail.id}`, accessToken, {
          ...editPayload,
          type: type,
          attachments: ids,
        }).then((res) => {
          if (res) {
            setStatusLoading(false);
            message.success("Berhasil");
            onUpdateSuccess();
          }
        });
      });
    } else {
      await fetchApiPut(`/complaint/update-info/${detail.id}`, accessToken, {
        ...editPayload,
        type: type,
      }).then((res) => {
        if (res) {
          setStatusLoading(false);
          message.success("Berhasil");
          onUpdateSuccess();
        }
      });
    }
  };

  return (
    <Modal
      visible={visibility}
      onCancel={onClose}
      centered
      width={800}
      footer={[<Footer status={detail.status} qrstring={detail.id} />]}
    >
      <Tag color="#6A9695">
        RUANG <span style={{ fontWeight: "bold" }}>MUTU</span>
      </Tag>
      <Row justify="center">
        <Col span={12}>
          <Row justify="center">
            <Col>
              <img src={LogoGambir} alt="logo puskesmas gambir"/>
            </Col>
          </Row>
          <div className="preview-title">
            <Title level={4} style={{ color: "#5A7D7C" }}>
              KLARIFIKASI KELUHAN PELANGGAN
            </Title>
          </div>
        </Col>
      </Row>
      <div className="preview-form">
        <Row gutter={[24, 24]}>
          <table width={"100%"}>
            <tr>
              <td className="title">FASKES</td>
              <td>:</td>
              <td className="content">
                {detail && detail.health_service && detail.health_service.name
                  ? detail.health_service.name
                  : "-"}
              </td>
            </tr>
            <tr>
              <td className="title">HARI/TANGGAL</td>
              <td>:</td>
              <td className="content">
                {detail.complaint_date
                  ? moment(detail.complaint_date).format("dddd/DD MMMM YYYY")
                  : "-"}
              </td>
            </tr>
            <tr>
              <td className="title">ID KELUHAN</td>
              <td>:</td>
              <td className="content">{detail.complaint_id ?? "-"}</td>
            </tr>
            <tr>
              <td className="title">PELAPOR</td>
              <td>:</td>
              <td className="content">{detail.reported_by ?? "-"}</td>
            </tr>
            <tr>
              <td className="title">SUMBER</td>
              <td>:</td>
              <td className="content">{detail.source ?? "-"}</td>
            </tr>
            <tr>
              <td className="title">ISI LAPORAN</td>
              <td>:</td>
              <td className="content">{detail.report ?? "-"}</td>
            </tr>
            <tr>
              <td className="title">KOORDINASI</td>
              <td>:</td>
              <td className="content">
                {isEdit ? (
                  <Input
                    placeholder="Masukan koordinasi"
                    value={editPayload.coordination}
                    onChange={(e) => {
                      setEditPayload({
                        ...editPayload,
                        coordination: e.target.value,
                      });
                    }}
                  />
                ) : (
                  detail.coordination ?? "-"
                )}
              </td>
            </tr>
            <tr>
              <td className="title">TANGGAL KLARIFIKASI</td>
              <td>:</td>
              <td className="content">
                {isEdit
                  ? "Akan terupdate pada saat disimpan"
                  : detail.clarification_date
                  ? moment(detail.clarification_date).format(
                      "dddd, DD MMMM YYYY"
                    )
                  : "-"}
              </td>
            </tr>
            <tr>
              <td className="title">TINDAK LANJUT</td>
              <td>:</td>
              <td className="content">
                {isEdit ? (
                  <Input
                    placeholder="Masukan tindak lanjut"
                    value={editPayload.follow_up}
                    onChange={(e) => {
                      setEditPayload({
                        ...editPayload,
                        follow_up: e.target.value,
                      });
                    }}
                  />
                ) : (
                  detail.follow_up ?? "-"
                )}
              </td>
            </tr>
            <tr>
              <td className="title">STATUS</td>
              <td>:</td>
              <td className="content">
                {isEdit ? (
                  <>
                    <Select
                      style={{ width: "100px" }}
                      placeholder="Pilih Judul Indikator"
                      showSearch
                      value={editPayload.status}
                      onChange={(e) => {
                        setEditPayload({ ...editPayload, status: e });
                      }}
                    >
                      <Select.Option value={"CANCELLED"}>
                        Batalkan
                      </Select.Option>
                      <Select.Option value={"DONE"}>Selesai</Select.Option>
                    </Select>
                  </>
                ) : (
                  <>
                    {detail.status === "PENDING"
                      ? "Pending"
                      : detail.status === "DONE"
                      ? "Selesai dan telah dikonfirmasi"
                      : detail.status}
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td className="title">BUKTI KLARIFIKASI</td>
              <td>:</td>
              <td className="content">
                {isEdit ? (
                  <>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        setProofFiles(Array.from(e.target.files));
                      }}
                      accept={"image/*"}
                    />
                  </>
                ) : (
                  <>
                    {detail && detail.proof && detail.proof.length > 0 ? (
                      <>
                        {detail.proof.map((item) => (
                          <div className="file-item">
                            <a
                              href={item.file_link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {item.real_name}
                            </a>
                          </div>
                        ))}
                      </>
                    ) : (
                      "Tidak Ada"
                    )}
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td className="title">LAMPIRAN</td>
              <td>:</td>
              <td className="content">
                {detail &&
                detail.attachments &&
                detail.attachments.length > 0 ? (
                  <>
                    {detail.attachments.map((item) => (
                      <div className="file-item">
                        <a
                          href={item.file_link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.real_name}
                        </a>
                      </div>
                    ))}
                  </>
                ) : (
                  "Tidak Ada"
                )}
              </td>
            </tr>
          </table>
          {getRole() !== "User" && detail.status === "PENDING" && (
            <Button
              type={isEdit ? "default" : "primary"}
              style={{ marginRight: "10px" }}
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? "Batal" : "Tanggapi Keluhan"}
            </Button>
          )}
          {isEdit && (
            <>
              <Button
                loading={statusLoading}
                type="primary"
                style={{ marginRight: "10px" }}
                onClick={() => handleSubmit("publish")}
              >
                Simpan & Publikasikan
              </Button>
              <Button
                type="primary"
                loading={statusLoading}
                onClick={() => handleSubmit("normal")}
              >
                Simpan
              </Button>
            </>
          )}
        </Row>
      </div>
    </Modal>
  );
};
