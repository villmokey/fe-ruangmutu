import React from "react";
import styled from "styled-components";
import { Button, Input, Modal, Select, Checkbox, Space } from "antd";
import { InputText } from "../../../atoms/InputText/InputText";
import { Form } from "../../../molecules/Form/Form";
import {
  Grid,
  Typography,
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Upload } from "antd";
import moment from "moment";
import "moment/locale/id";
import {
  PlusOutlined,
  CloseOutlined,
  FileOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { DocumentIcon } from "../../../../assets/icons";
import "./QualityCupboard.less";
import { fetchApiGet, fetchApiPost } from "../../../../globals/fetchApi";
import { toast, ToastContainer } from "react-toastify";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { useDebounce } from "../../../../hooks";

const { Option } = Select;
const { Dragger } = Upload;

const QualityCupboardForm = ({ open, onClose, onSuccessSubmit }) => {
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
    const uploaded = await fetchApiPost("/upload/file", accessToken, bags).then(
      (res) => {
        if (res && res.code === 200 && res.data.id) {
          return res.data.id;
        }
      }
    );

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

      if (payload && payload.program_related.length > 0) {
        payload.program_related = payload.program_related.map((item) => {
          if (item.id) {
            return item.id;
          } else {
            return item;
          }
        });
      }

      if (files && files.length > 0) {
        await uploadFile(files[0])
          .then((callback) => {
            if (callback) {
              payload.file_id = callback;
              fetchApiPost("/document", accessToken, payload)
                .then((res) => {
                  if (res && res.success) {
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
            TAMBAH DOKUMEN
          </Typography>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Button
              type={loading ? "ghost" : "primary"}
              size="large"
              style={{ borderRadius: 8 }}
              onClick={async () => (loading ? null : await handleSubmit())}
            >
              {loading ? "MOHON TUNGGU" : "TAMBAHKAN"}
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
          <Form layout={"vertical"}>
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
                  name="no_dokumen"
                  onChange={(e) =>
                    setPayload({ ...payload, document_number: e.target.value })
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
                  {moment().format("dddd, DD MMMM YYYY")}
                </Typography>
                <InputText
                  label="TANGGAL TERBIT DOKUMEN"
                  name="end_date"
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
                  margin={"20px 0 -10px 0"}
                >
                  UNIT/PROGRAM TERKAIT
                </Typography>

                <Autocomplete
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
                />
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
                <Space direction="horizontal">
                  <Checkbox
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
