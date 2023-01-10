import React from "react";
import styled from "styled-components";
import { Button, Input, Modal, Select, Checkbox, Space, message } from "antd";
import { InputText } from "../../../atoms/InputText/InputText";
import { Form } from "../../../molecules/Form/Form";
import { Grid, Typography, Stack } from "@mui/material";
import { Upload } from "antd";
import moment from "moment";
import "moment/locale/id";
import {
  PlusOutlined,
  CloseOutlined,
  FileOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { DocumentIcon } from "../../../../assets/icons";
import "./QualityCupboard.less";
import {
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "../../../../globals/fetchApi";
import { toast, ToastContainer } from "react-toastify";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { useDebounce } from "../../../../hooks";
import { DefaultThumbnail } from "../../../../assets/images";

const { Option } = Select;
const { Dragger } = Upload;

const QualityCupboardForm = ({
  open,
  onClose,
  onSuccessSubmit,
  actionType = "create",
  updateData = {
    id: "",
    name: "",
    publish_date: "",
    created_at: "",
    document_number: "",
    program_related: [],
    document_related: [],
    document_type_id: "",
  },
  updatePreview = {
    file: {},
    thumbnail: null,
  },
}) => {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [openModal, setOpenModal] = React.useState(false);
  const [documentTypes, setDocumentTypes] = React.useState([]);
  const [docsLoading, setDocsLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [documents, setDocuments] = React.useState([]);
  const [programUnits, setProgramUnits] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  const [payload, setPayload] = React.useState({
    name: "",
    publish_date: "",
    document_number: "",
    program_related: [],
    document_related: [],
    document_type_id: "",
    file_id: "",
  });
  const keyword = useDebounce(search, 1000);

  const uploadFile = async (file) => {
    let bags = new FormData();
    bags.append("file", file.originFileObj);
    bags.append("group_name", "document_files");
    const uploaded = await fetchApiPost("/upload/file", accessToken, bags)
      .then((res) => {
        if (res && res.code === 200 && res.data.id) {
          return res.data.id;
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("FILE UPLOAD ERR:", err);
      });

    return await uploaded;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (selected && selected.length > 0) {
        payload.document_related = selected.map((item) => {
          return item.id;
        });
      }

      // if (payload && payload.program_related.length > 0) {
      //   payload.program_related = payload.program_related.map((item) => {
      //     if (item.id) {
      //       return item.id;
      //     } else {
      //       return item;
      //     }
      //   });
      // }

      if (files && files.length > 0) {
        await uploadFile(files[0])
          .then((callback) => {
            if (callback) {
              payload.file_id = callback;
              fetchApiPost("/document", accessToken, payload)
                .then((res) => {
                  if (res && res.success) {
                    message.success("Berhasil menambahkan dokumen");
                    onSuccessSubmit();
                  } else {
                    if (res.response) {
                      toast.warning(res.response.data.message);
                    } else {
                      toast.error(res.message);
                    }
                  }
                })
                .finally(() => setLoading(false));
            }
          })
          .catch();
      } else {
        toast.warning("Silahkan unggah dokumen terlebih dahulu");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Terjadi kesalahan, silahkan coba lagi");
    }
  };

  const handleUpdate = () => {
    setLoading(true);
    if (selected && selected.length > 0) {
      payload.document_related = selected.map((item) => {
        return item.id;
      });
    }

    let feeder = {
      name: payload.name,
      document_number: payload.document_number,
      publish_date: payload.publish_date,
      document_type_id: payload.document_type_id,
      is_credential: payload.is_confidential,
      program_related: payload.program_related,
      document_related: payload.document_related,
    };

    fetchApiPut(`/document/${payload.id}`, accessToken, feeder)
      .then((res) => {
        if (res && res.success) {
          message.success("Berhasil mengubah data dokumen");
          onSuccessSubmit();
        } else {
          message.error(res.message);
        }
      })
      .catch((e) => {
        message.error(e.getMessage());
      })
      .finally(() => setLoading(false));
  };

  const requestPrograms = () => {
    fetchApiGet("/program", { paginate: false }, accessToken).then((res) => {
      if (res) {
        if (res.data) {
          setProgramUnits(res.data);
        }
      }
    });
  };

  const requestDocumentTypes = () => {
    fetchApiGet("/document-type", { paginate: false }, accessToken).then(
      (res) => {
        if (res) {
          if (res.data) {
            setDocumentTypes(res.data);
          }
        }
      }
    );
  };

  const requestDocument = () => {
    setDocsLoading(true);
    fetchApiGet("/document", { search: keyword }, accessToken).then((res) => {
      if (res) {
        if (res.data && res.data.data && res.data.data.data) {
          setDocuments(res.data.data.data);
          setDocsLoading(false);
        }
      }
    });
  };

  const handleModalOpen = () => {
    if (documents && documents.length === 0) {
      requestDocument();
    }
    setOpenModal(true);
  };

  React.useEffect(() => {
    requestDocument();
  }, [keyword]); //eslint-disable-line

  React.useEffect(() => {
    requestPrograms();
    requestDocumentTypes();
  }, []); //eslint-disable-line

  // Reset State
  React.useEffect(() => {
    setFiles([]);
    setSelected([]);
    setPayload({
      name: "",
      publish_date: "",
      document_number: "",
      program_related: [],
      document_related: [],
      document_type_id: "",
      file_id: "",
      is_confidential: false,
    });
  }, []); //eslint-disable-line

  React.useEffect(() => {
    if (actionType === "update") {
      setSelected(updateData.document_related);
      setPayload(updateData);
    }
  }, [updateData, actionType]);

  return (
    open && (
      <div className="form-event">
        <Modal
          title={`Dokumen Terkait (${selected.length} Dipilih)`}
          visible={openModal}
          onCancel={() => setOpenModal(false)}
          onConfirm={() => setOpenModal(false)}
          onOk={() => setOpenModal(false)}
        >
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Cari dokumen berdasarkan nama..."}
          ></Input>
          <Typography fontSize={"12px"} margin={"20px 0 5px 0"}>
            {keyword ? `Hasil Pencarian "${keyword}"` : "Terbaru"}
          </Typography>
          {docsLoading ? (
            <Typography
              fontSize={"12px"}
              margin={"50px 0"}
              textAlign={"center"}
              color={"grey"}
            >
              Loading...
            </Typography>
          ) : documents && documents.length > 0 ? (
            documents.map((doc, i) => (
              <RelatedItem
                key={i}
                active={selected.some((x) => x.id === doc.id)}
                name={doc.name}
                onClick={() => {
                  let temp = [...selected];
                  if (temp.some((x) => x.id === doc.id)) {
                    let idx = temp.findIndex((x) => x.id === doc.id);
                    temp.splice(idx, 1);
                  } else {
                    temp.push({ id: doc.id, name: doc.name });
                  }
                  setSelected(temp);
                }}
              ></RelatedItem>
            ))
          ) : (
            <Typography
              fontSize={"12px"}
              margin={"50px 0"}
              textAlign={"center"}
              color={"grey"}
            >
              Dokumen tidak ditemukan{" "}
              {keyword ? `dengan kata kunci "${keyword}"` : ""}
            </Typography>
          )}
        </Modal>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography fontWeight={"bold"} color={"#5DC8BD"}>
            {actionType === "create" ? "TAMBAH" : "UBAH DATA"} DOKUMEN
          </Typography>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Button
              loading={loading}
              type={loading ? "ghost" : "primary"}
              size="large"
              style={{ borderRadius: 8 }}
              onClick={async () =>
                loading
                  ? null
                  : actionType === "create"
                  ? await handleSubmit()
                  : handleUpdate()
              }
            >
              {loading
                ? "MOHON TUNGGU"
                : actionType === "create"
                ? "SIMPAN "
                : "SIMPAN PERUBAHAN"}
            </Button>
            <Button
              onClick={onClose}
              type="danger"
              icon={<CloseOutlined />}
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Stack>
        </Stack>
        <ToastContainer />
        <Container>
          <Form
            layout={"vertical"}
            fields={[
              {
                name: "name",
                value: payload.name,
              },
              {
                name: "document_number",
                value: payload.document_number,
              },
              {
                name: "publish_date",
                value: payload.publish_date,
              },
            ]}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={5} xl={4}>
                <InputText
                  label="NAMA DOKUMEN"
                  name="name"
                  onChange={(e) =>
                    setPayload({ ...payload, name: e.target.value })
                  }
                  rules={[
                    {
                      required: true,
                      message: "Nama dokumen tidak boleh kosong!",
                    },
                  ]}
                />
                <InputText
                  label="NO DOKUMEN"
                  name="document_number"
                  onChange={(e) =>
                    setPayload({
                      ...payload,
                      document_number: e.target.value,
                    })
                  }
                  rules={[
                    {
                      required: true,
                      message: "Nomor dokumen tidak boleh kosong!",
                    },
                  ]}
                />
                <Typography fontSize={"14px"} fontWeight={"bold"}>
                  TANGGAL UPLOAD DOKUMEN
                </Typography>
                <Typography
                  fontSize={"12px"}
                  color={"#5A5A5A"}
                  marginBottom={"20px"}
                >
                  {moment(payload.created_at).format("dddd, DD MMMM YYYY")}
                </Typography>
                <InputText
                  label="TANGGAL TERBIT DOKUMEN"
                  name="publish_date"
                  type={"date"}
                  onChange={(e) =>
                    setPayload({ ...payload, publish_date: e.target.value })
                  }
                  rules={[
                    {
                      required: true,
                      message: "Tanggal terbit tidak boleh kosong!",
                    },
                  ]}
                />
                <Typography
                  fontSize={"14px"}
                  fontWeight={"bold"}
                  margin={"20px 0 10px 0"}
                >
                  UNIT/PROGRAM TERKAIT
                </Typography>

                <Select
                  placeholder="Pilih program/unit"
                  onChange={(v) =>
                    setPayload({ ...payload, program_related: v })
                  }
                  allowClear
                  value={payload.program_related}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.children?.toLowerCase() ?? "").includes(
                      input.toLowerCase()
                    )
                  }
                  mode={"multiple"}
                  style={{ width: "100%" }}
                >
                  {programUnits &&
                    programUnits.map((item, index) => {
                      return (
                        <Option value={item.id} key={index}>
                          {item.name}
                        </Option>
                      );
                    })}
                </Select>
                {/* <Autocomplete
                  id="combo-box-demo"
                  multiple
                  options={programUnits ?? []}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) => {
                    setPayload({ ...payload, program_related: value });
                  }}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size={"small"}
                      style={{ fontSize: 12 }}
                      placeholder="Pilih unit layanan"
                    />
                  )}
                /> */}
                <Typography
                  fontSize={"14px"}
                  margin={"20px 0 0 0"}
                  fontWeight={"bold"}
                >
                  DOKUMEN TERKAIT
                </Typography>
                {selected &&
                  selected.map((item, key) => (
                    <Selected key={key}>
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        {item.name}
                        <DeleteOutlined
                          onClick={() => {
                            let temp = [...selected];
                            temp.splice(key, 1);
                            setSelected(temp);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      </Stack>
                    </Selected>
                  ))}
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="middle"
                  style={{ borderRadius: 8, marginTop: 7 }}
                  onClick={() => handleModalOpen()}
                >
                  Pilih Dokumen
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={7} xl={8}>
                <Typography
                  fontSize={"14px"}
                  fontWeight={"bold"}
                  margin={"0 0 10px 0"}
                >
                  PILIH TIPE DOKUMEN
                </Typography>
                <Select
                  value={payload.document_type_id}
                  placeholder="Pilih"
                  onChange={(e) =>
                    setPayload({ ...payload, document_type_id: e })
                  }
                  // value={value}
                  style={{ width: "100%" }}
                >
                  {documentTypes &&
                    documentTypes.map((item, index) => {
                      return (
                        <Option value={item.id} key={index}>
                          {item.name}
                        </Option>
                      );
                    })}
                </Select>
                {actionType === "create" && (
                  <>
                    <Typography
                      fontSize={"14px"}
                      fontWeight={"bold"}
                      margin={"10px 0 10px 0"}
                    >
                      UNGGAH DOKUMEN
                    </Typography>
                    <Dragger
                      beforeUpload={() => false}
                      accept="application/pdf"
                      onChange={({ fileList }) => {
                        setFiles(fileList);
                      }}
                      style={{
                        height: "200px !important",
                        background: "transparent",
                        border: "1px dashed #000000",
                      }}
                    >
                      <img src={DocumentIcon} alt={"ic_document"} />
                      <Typography fontSize={"12px"} color={"#416072"}>
                        Seret dan lepas pilih file untuk mengunggah file anda.
                      </Typography>
                      <Typography fontSize={"12px"} color={"#416072"}>
                        format yang didukung pdf
                      </Typography>
                    </Dragger>
                  </>
                )}
                <Space direction="horizontal">
                  <Checkbox
                    checked={payload.is_confidential}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        is_confidential: e.target.checked,
                      })
                    }
                  />
                  <Typography
                    fontSize={"14px"}
                    fontWeight={"bold"}
                    margin={"10px 0 10px 0"}
                  >
                    Dokumen Rahasia
                  </Typography>
                </Space>
                {actionType === "update" && (
                  <div style={{ textAlign: "center", margin: "10px 0" }}>
                    <img
                      src={updatePreview.thumbnail ?? DefaultThumbnail}
                      style={{ width: "150px", height: "190px" }}
                      alt="document thumnail"
                    />
                    <div>
                      <a
                        href={updatePreview.file.file_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Space direction="horizontal">
                          <Typography
                            fontSize={"12px"}
                            color="black"
                            fontWeight={"bold"}
                          >
                            {payload.name}
                          </Typography>
                          <LinkOutlined />
                        </Space>
                      </a>
                    </div>
                  </div>
                )}
              </Grid>
            </Grid>
          </Form>
        </Container>
      </div>
    )
  );
};

const RelatedItem = ({ name, active, onClick }) => {
  return (
    <DocumentItem active={active} onClick={onClick}>
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        {active ? <CheckCircleOutlined /> : <FileOutlined />}
        <Typography fontWeight={"bold"} color={active ? "white" : "black"}>
          {name}
        </Typography>
      </Stack>
    </DocumentItem>
  );
};

const Container = styled.div`
  background: #e5e5e5;
  width: 100%;
  min-height: 100px;
  padding: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const DocumentItem = styled.div`
  background: ${(props) => (props.active ? "#8dacab" : "#eaeaea")};
  margin: 10px 0;
  cursor: pointer;
  padding: 6px 10px 10px 10px;
  width: 100%;
  font-weight: bold;
  border-radius: 10px;
  color: ${(props) => (props.active ? "white" : "black")};
  transition: ease-in-out 0.3s;
  :hover {
    opacity: 0.8;
  }
`;

const Selected = styled.div`
  background: #8dacab;
  padding: 3px 5px 5px 5px;
  width: 100%;
  margin: 5px 0;
  font-weight: bold;
  border-radius: 10px;
  color: white;
  transition: ease-in-out 0.3s;

  :hover {
    opacity: 0.8;
  }
`;

export default QualityCupboardForm;
