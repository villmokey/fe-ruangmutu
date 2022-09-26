import { Button, message } from "antd";
import Textfield from "../../../../molecules/Form/Textfield";
import { Form } from "../../../../molecules/Form/Form";
import React from "react";
import { Stack } from "@mui/material";
import { Title } from "../../../../atoms/Title/Title";
import { useAuthToken } from "../../../../../globals/useAuthToken";
import { fetchApiPost, fetchApiPut } from "../../../../../globals/fetchApi";

const FormAdd = ({
  onSuccess,
  onClose,
  isCreate = true,
  payload = { id: "", name: "" },
  payloadSetter,
}) => {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();

  const handleSubmit = () => {
    if (isCreate) {
      handleCreate();
    } else {
      handleUpdate();
    }
  };

  const handleCreate = () => {
    fetchApiPost("/health-service", accessToken, {
      name: payload.name,
    })
      .then((res) => {
        if (res && res.code === 200) {
          message.success("Berhasil menambahkan layanan kesehatan");
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
  };

  const handleUpdate = () => {
    console.log(payload.color);
    fetchApiPut("/health-service/" + payload.id, accessToken, {
      name: payload.name,
    })
      .then((res) => {
        if (res && res.code === 200) {
          message.success("Berhasil mengubah layanan kesehatan");
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
      <Title level={4}>{isCreate ? "TAMBAH" : "EDIT"} LAYANAN KESEHATAN</Title>
      <Form layout={"vertical"}>
        <Textfield
          label="Nama"
          required
          value={payload.name}
          onChange={(e) => payloadSetter({ ...payload, name: e.target.value })}
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
