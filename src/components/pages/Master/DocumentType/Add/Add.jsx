import { Button, message } from "antd";
import Textfield from "../../../../molecules/Form/Textfield";
import { Form } from "../../../../molecules/Form/Form";
import React from "react";
import { Stack } from "@mui/material";
import { Title } from "../../../../atoms/Title/Title";
import { useAuthToken } from "../../../../../globals/useAuthToken";
import { fetchApiPost, fetchApiPut } from "../../../../../globals/fetchApi";
import { useState } from "react";

const FormAdd = ({
  onSuccess,
  onClose,
  isCreate = true,
  payload = { id: "", name: "", color: "" },
  payloadSetter,
}) => {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [file, setFile] = useState();

  const handleSubmit = () => {
    if (isCreate) {
      handleCreate();
    } else {
      handleUpdate();
    }
  };

  const handleCreate = async () => {
    if (file && payload.name) {
      let bags = new FormData();
      bags.set("group_name", "type_thumbnail");
      bags.set("file", file);

      await fetchApiPost("/upload/file", accessToken, bags).then(
        async (fileResponse) => {
          if (fileResponse && fileResponse.success) {
            fetchApiPost("/document-type", accessToken, {
              name: payload.name,
              thumbnail: fileResponse.data.id,
            })
              .then((res) => {
                if (res && res.code === 200) {
                  message.success("Berhasil menambahkan tipe dokumen");
                  if (onSuccess) {
                    onSuccess();
                  }
                  if (onClose) {
                    onClose();
                  }
                } else {
                  if (res && res.response && res.response.data) {
                    message.warning(res.response.data.message);
                  }
                }
              })
              .catch();
          }
        }
      );
    } else {
      message.info("Silahkan lengkapi form terlebih dahulu");
    }
  };

  const handleUpdate = async () => {
    if (file) {
      let bags = new FormData();
      bags.set("group_name", "type_thumbnail");
      bags.set("file", file);

      await fetchApiPost("/upload/file", accessToken, bags).then(
        async (fileResponse) => {
          if (fileResponse && fileResponse.success) {
            fetchApiPut("/document-type/" + payload.id, accessToken, {
              name: payload.name,
              thumbnail: fileResponse.data.id,
            })
              .then((res) => {
                if (res && res.code === 200) {
                  message.success("Berhasil mengubah tipe dokumen");
                  if (onSuccess) {
                    onSuccess();
                  }
                  if (onClose) {
                    onClose();
                  }
                } else {
                  if (res && res.response && res.response.data) {
                    message.warning(res.response.data.message);
                  }
                }
              })
              .catch();
          }
        }
      );
    } else {
      fetchApiPut("/document-type/" + payload.id, accessToken, {
        name: payload.name,
      })
        .then((res) => {
          if (res && res.code === 200) {
            message.success("Berhasil mengubah tipe dokumen");
            if (onSuccess) {
              onSuccess();
            }
            if (onClose) {
              onClose();
            }
          } else {
            if (res && res.response && res.response.data) {
              message.warning(res.response.data.message);
            }
          }
        })
        .catch();
    }
  };
  return (
    <div
      style={{
        border: "1px solid #f1f1f1",
        width: "100%",
        padding: "20px 10px",
        marginTop: "20px",
      }}
    >
      <Title level={4}>{isCreate ? "TAMBAH" : "EDIT"} TIPE DOKUMEN</Title>
      <Form layout={"vertical"}>
        <Textfield
          label="Nama"
          required
          value={payload.name}
          onChange={(e) => payloadSetter({ ...payload, name: e.target.value })}
        />
        <Textfield
          label="Ikon"
          type={"file"}
          onChange={(e) => {
            if (e.target && e.target.files && e.target.files.length > 0)
              setFile(e.target.files[0]);
          }}
        />
        <Stack direction={"row"} spacing={1}>
          <Button onClick={onClose} type="ghost">
            Batal
          </Button>
          <Button
            onClick={() => (isCreate ? handleSubmit() : handleUpdate())}
            type="primary"
          >
            Simpan
          </Button>
        </Stack>
      </Form>
    </div>
  );
};

export default FormAdd;
