import React from "react";
import styled from "styled-components";
import { Button, Input, Modal } from "antd";
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./Calendar.less";
import { fetchApiGet, fetchApiPost } from "../../../../globals/fetchApi";
import { toast } from "react-toastify";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { useDebounce } from "../../../../hooks";

import { Select, Space } from "antd";

const { Option } = Select;
const { Dragger } = Upload;

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "|",
      "bulletedList",
      "numberedList",
      "|",
      "insertTable",
      "|",
      "media",
      "|",
      "undo",
      "redo",
    ],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  language: "en",
};

const FormCalendar = ({ open, onClose, onSuccessSubmit }) => {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [openModal, setOpenModal] = React.useState(false);
  const [docsLoading, setDocsLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [documents, setDocuments] = React.useState([]);
  const [programUnits, setProgramUnits] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  const [payload, setPayload] = React.useState({
    name: "",
    start_date: "",
    end_date: "",
    program_id: "",
  });
  const keyword = useDebounce(search, 1000);

  const [desc, setDesc] = React.useState("");

  const uploadFileList = async (fileList = []) => {
    let bags = new FormData();
    bags.append("file", "");
    bags.append("group_name", "event_files");
    const uploaded = Promise.all(
      fileList.map(async (file) => {
        bags.set("file", file.originFileObj);
        const res = await fetchApiPost("/upload/file", accessToken, bags);
        if (res && res.code === 200 && res.data.id) {
          return res.data.id;
        }
      })
    );

    return await uploaded;
  };

  const handleSubmit = async () => {
    setLoading(true);

    let formdata = {
      ...payload,
      description: desc,
    };

    if (selected && selected.length > 0) {
      let docs = selected.map((item) => {
        return item.id;
      });
      formdata.document_related = docs;
    }

    if (payload.related_program && payload.related_program.length > 0) {
      let mapped = payload.related_program.map((rel) => {
        return rel.id;
      });

      formdata.related_program = mapped;
    }

    if (files && files.length > 0) {
      await uploadFileList(files)
        .then((success) => {
          if (success) {
            console.log("success", success);
            formdata.event_files = success;
          }
        })
        .then(() => {
          fetchApiPost("/event", accessToken, formdata)
            .then((res) => {
              if (res && res.code === 200) {
                toast.success("Berhasil menambahkan kegiatan");
                setLoading(false);
                if (onSuccessSubmit) {
                  onSuccessSubmit();
                }
              } else if (res && res.code === 422) {
                toast.error(res.message);
              } else {
                if (res.response.data) {
                  console.log(res.response.data);
                  toast.error(res.response.data.message);
                }
              }
            })
            .finally(() => setLoading(false));
        });
    } else {
      fetchApiPost("/event", accessToken, formdata)
        .then((res) => {
          if (res && res.code === 200) {
            toast.success("Berhasil menambahkan kegiatan");
            setLoading(false);
            if (onSuccessSubmit) {
              onSuccessSubmit();
            }
          } else if (res && res.code === 422) {
            toast.error(res.message);
          } else {
            if (res.response.data) {
              console.log(res.response.data);
              toast.error(res.response.data.message);
            }
          }
        })
        .finally(() => setLoading(false));
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
            TAMBAH KEGIATAN
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
        <Container>
          <Form layout={"vertical"}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={5} xl={4}>
                <InputText
                  label="NAMA KEGIATAN"
                  name="name"
                  onChange={(e) =>
                    setPayload({ ...payload, name: e.target.value })
                  }
                  rules={[
                    {
                      required: true,
                      message: "Nama kegiatan tidak boleh kosong!",
                    },
                  ]}
                />
                <Typography fontSize={"14px"} fontWeight={"bold"}>
                  TANGGAL PUBLIKASI
                </Typography>
                <Typography
                  fontSize={"12px"}
                  color={"#5A5A5A"}
                  marginBottom={"20px"}
                >
                  {moment().format("dddd, DD MMMM YYYY")}
                </Typography>
                <InputText
                  label="TANGGAL MULAI"
                  style={{ label: { fontSize: "20px" } }}
                  name="start_date"
                  type={"date"}
                  onChange={(e) =>
                    setPayload({ ...payload, start_date: e.target.value })
                  }
                  rules={[
                    {
                      required: true,
                      message: "Tanggal mulai tidak boleh kosong!",
                    },
                  ]}
                />
                <InputText
                  label="TANGGAL SELESAI"
                  name="end_date"
                  type={"date"}
                  onChange={(e) =>
                    setPayload({ ...payload, end_date: e.target.value })
                  }
                  rules={[
                    {
                      required: true,
                      message: "Tanggal selesai tidak boleh kosong!",
                    },
                  ]}
                />
                <Typography fontSize={"14px"} fontWeight={"bold"}>
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
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Typography
                    fontSize={"14px"}
                    fontWeight={"bold"}
                    margin={"0 0 0 0"}
                  >
                    UNIT LAYANAN
                  </Typography>
                  <Select
                    placeholder="Pilih Bulan"
                    onChange={(e) => setPayload({ ...payload, program_id: e })}
                    value={payload.program_id}
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
                </Space>
                <Typography
                  fontSize={"14px"}
                  fontWeight={"bold"}
                  margin={"20px 0 10px 0"}
                >
                  UNIT LAYANAN TERKAIT
                </Typography>
                <Autocomplete
                  id="combo-box-demo"
                  multiple
                  options={programUnits ?? []}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) => {
                    setPayload({ ...payload, related_program: value });
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
                  fontWeight={"bold"}
                  margin={"20px 0 10px 0"}
                >
                  DESKRIPSI
                </Typography>
                <CKEditor
                  name={"description"}
                  editor={ClassicEditor}
                  data=""
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDesc(data);
                  }}
                />
                <Typography
                  fontSize={"14px"}
                  fontWeight={"bold"}
                  margin={"20px 0 10px 0"}
                >
                  UNGGAH DOKUMEN PENDUKUNG KEGIATAN
                </Typography>
                <Dragger
                  beforeUpload={() => false}
                  accept="application/pdf, image/*"
                  multiple
                  onChange={({ file, fileList }) => {
                    setFiles(fileList);
                  }}
                  style={{
                    minHeight: "367px !important",
                    background: "transparent",
                    border: "1px dashed #000000",
                  }}
                >
                  <img src={DocumentIcon} alt={"ic_document"} />
                  <Typography fontSize={"12px"} color={"#416072"}>
                    Drag and drop choose file to upload your files.
                  </Typography>
                  <Typography fontSize={"12px"} color={"#416072"}>
                    pdf, jpeg, jpg, png types are supported
                  </Typography>
                </Dragger>
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
  font-weight: bold;
  border-radius: 10px;
  color: white;
  transition: ease-in-out 0.3s;

  :hover {
    opacity: 0.8;
  }
`;

export default FormCalendar;
