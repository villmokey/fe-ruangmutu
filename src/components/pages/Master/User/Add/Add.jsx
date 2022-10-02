import { Button, message, Row, Col, Space, Select, Upload } from "antd";
import Textfield from "../../../../molecules/Form/Textfield";
import { Form } from "../../../../molecules/Form/Form";
import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { Title } from "../../../../atoms/Title/Title";
import { useAuthToken } from "../../../../../globals/useAuthToken";
import {
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "../../../../../globals/fetchApi";
import { useState } from "react";
import { Text } from "../../../../atoms/Text/Text";

const FormAdd = ({
  onSuccess,
  onClose,
  isCreate = true,
  payload = {
    id: "",
    nip: "",
    name: "",
    position_id: "",
    role_id: "",
    signature_id: "",
  },
  payloadSetter,
}) => {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [positions, setPositions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [file, setFile] = useState({});
  const handleSubmit = () => {
    if (isCreate) {
      handleCreate();
    } else {
      handleUpdate();
    }
  };

  const handleCreate = async () => {
    console.log(payload);
    if (file && file.id) {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("group_name", "user_signature");
      await fetchApiPost("/upload/file", accessToken, formData).then(
        async (f) => {
          if (f && f.code === 200 && f.data.id) {
            await fetchApiPost("/user", accessToken, {
              email: payload.email,
              name: payload.name,
              nip: payload.nip,
              position_id: payload.position_id,
              role_id: payload.role_id,
              signature_id: f.data.id,
              password: payload.password,
              password_confirmation: payload.password_confirmation,
            })
              .then((res) => {
                if (res && res.code === 200) {
                  message.success("Berhasil menambahkan data pengguna");
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
      message.info("Silahkan unggah tanda tangan pengguna");
    }
    return false;
    fetchApiPost("/user", accessToken, {
      name: payload.name,
    })
      .then((res) => {
        if (res && res.code === 200) {
          message.success("Berhasil menambahkan data pengguna");
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
    fetchApiPut("/user/" + payload.id, accessToken, {
      email: payload.email,
      name: payload.name,
      nip: payload.nip,
      position_id: payload.position_id,
      role_id: payload.role_id,
    })
      .then((res) => {
        if (res && res.code === 200) {
          message.success("Berhasil mengubah data pengguna");
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

  const fetchPosition = () => {
    fetchApiGet("/position", { paginate: false }, accessToken).then((res) => {
      if (res) {
        setPositions(res.data);
      }
    });
  };

  const fetchRole = () => {
    fetchApiGet("/role", { paginate: false }, accessToken).then((res) => {
      if (res) {
        setRoles(res.data);
      }
    });
  };

  useEffect(() => {
    fetchRole();
    fetchPosition();
  }, []);

  return (
    <div
      style={{
        border: "1px solid #f1f1f1",
        width: "100%",
        padding: "20px 10px",
        marginTop: "20px",
      }}
    >
      <Title level={4}>{isCreate ? "TAMBAH" : "EDIT"} PENGGUNA</Title>
      <Form layout={"vertical"} onFinish={handleSubmit}>
        <Row gutter={[8]}>
          <Col md={12} xs={24} sm={24}>
            <Textfield
              label="NIP"
              required
              type="number"
              value={payload.nip}
              onChange={(e) =>
                payloadSetter({ ...payload, nip: e.target.value })
              }
            />
            <Textfield
              label="Nama Lengkap"
              required
              value={payload.name}
              onChange={(e) =>
                payloadSetter({ ...payload, name: e.target.value })
              }
            />
            <Space direction="vertical" style={{ width: "100%" }}>
              <div className="ant-form-item-label">
                <label class="ant-form-item-required" title="Jabatan">
                  Jabatan
                </label>
              </div>
              <Select
                placeholder="Pilih Jabatan"
                onChange={(e) => payloadSetter({ ...payload, position_id: e })}
                allowClear
                value={payload.position_id}
                style={{ width: "100%" }}
              >
                {positions &&
                  positions.map((item, index) => {
                    return (
                      <Select.Option value={item.id} key={index}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Space>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div className="ant-form-item-label">
                <label class="ant-form-item-required" title="Role Akses">
                  Role Akses
                </label>
              </div>
              <Select
                placeholder="Pilih Role"
                onChange={(e) => payloadSetter({ ...payload, role_id: e })}
                allowClear
                value={payload.role_id}
                style={{ width: "100%" }}
              >
                {roles &&
                  roles.map((item, index) => {
                    return (
                      <Select.Option value={item.id} key={index}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Space>
          </Col>
          <Col md={12} xs={24} sm={24}>
            <Textfield
              label="Email"
              required
              value={payload.email}
              onChange={(e) =>
                payloadSetter({ ...payload, email: e.target.value })
              }
            />
            <Textfield
              label="Password"
              required
              value={payload.password}
              type="password"
              onChange={(e) =>
                payloadSetter({ ...payload, password: e.target.value })
              }
            />
            <Textfield
              label="Konfirmasi Password"
              required
              value={payload.password_confirmation}
              type="password_confirmation"
              onChange={(e) =>
                payloadSetter({
                  ...payload,
                  password_confirmation: e.target.value,
                })
              }
            />
            <Text>Tanda Tangan</Text>
            <Upload.Dragger
              accept="image/*"
              maxCount={1}
              beforeUpload={true}
              onChange={(f) => setFile(f.file)}
            >
              Silahkan unggah tanda tangan pengguna dengan format jpg/jpeg/png
            </Upload.Dragger>
          </Col>
        </Row>

        <Stack direction={"row"} spacing={1} sx={{ marginTop: "20px" }}>
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
