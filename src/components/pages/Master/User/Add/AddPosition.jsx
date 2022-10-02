import { Button, Checkbox, message } from "antd";
import Textfield from "../../../../molecules/Form/Textfield";
import { Form } from "../../../../molecules/Form/Form";
import React from "react";
import { Stack } from "@mui/material";
import { Title } from "../../../../atoms/Title/Title";
import { useAuthToken } from "../../../../../globals/useAuthToken";
import { fetchApiPost, fetchApiPut } from "../../../../../globals/fetchApi";
import { Text } from "../../../../atoms/Text/Text";

const FormAddPosition = ({
  onSuccess,
  onClose,
  isCreate = true,
  payload = { id: "", name: "", is_leader: false },
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
    fetchApiPost("/position", accessToken, {
      name: payload.name,
      is_leader: payload.is_leader,
    })
      .then((res) => {
        if (res && res.code === 200) {
          message.success("Berhasil menambahkan data jabatan");
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
    fetchApiPut("/position/" + payload.id, accessToken, {
      name: payload.name,
      is_leader: payload.is_leader,
    })
      .then((res) => {
        if (res && res.code === 200) {
          message.success("Berhasil mengubah data jabatan");
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
      <Title level={4}>{isCreate ? "TAMBAH" : "EDIT"} JABATAN</Title>
      <Form layout={"vertical"}>
        <Textfield
          label="Nama"
          required
          value={payload.name}
          onChange={(e) => payloadSetter({ ...payload, name: e.target.value })}
        />
        <div style={{ marginBottom: "20px" }}>
          <Text style={{ marginRight: "10px" }}>Kepala Puskesmas?</Text>
          <Checkbox
            value={payload.is_leader}
            onChange={(e) =>
              payloadSetter({ ...payload, is_leader: e.target.checked })
            }
          />
        </div>
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

export default FormAddPosition;
