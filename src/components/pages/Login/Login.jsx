import { Card } from "../../atoms/Card/Card";
import { Form } from "../../molecules/Form/Form";
import { Col, Form as AntdForm, message, Modal, Row } from "antd";
import "./Login.less";
import { InputText } from "../../atoms/InputText/InputText";
import { SubmitButton } from "../../atoms/SubmitButton/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, loginApi } from "../../../redux/modules/auth/action";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoGambir, SquareLogo } from "../../../assets/images";
import { useAuthToken } from "../../../globals/useAuthToken";
import { Text } from "../../atoms/Text/Text";
import styled from "styled-components";
import { Stack } from "@mui/material";

const Copyright = styled.div`
  text-align: center;
  color: #5e6e89;
`;

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getIsAuth } = useAuthToken();

  const { loading, error, called, isAuth } = useSelector(authSelector);

  const [form] = AntdForm.useForm();

  const InfoModal = () => {
    Modal.info({
      title: "Lupa Password?",
      content: (
        <div>
          <p>
            Silahkan hubungi admin Ruang Mutu untuk melakukan perubahan password
          </p>
        </div>
      ),
      onOk() {},
    });
  };

  useEffect(() => {
    if (!getIsAuth()) return;

    navigate("/dashboard");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [called, isAuth]);

  useEffect(() => {
    if (!(called && error)) return;
    message.error("Username atau password salah!");
  }, [called, error]);

  const handleSubmit = (value) => {
    dispatch(loginApi(value));
  };

  return (
    <section className="container">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <Card className="login-container">
        <Row justify="center" align="middle">
          <Col span={14}>
            <div className="header-login-box">
              <Stack direction={"row"} justifyContent={"center"} spacing={1}>
                <img className="login-logo" src={SquareLogo} alt="Ruang Mutu" />
                <img
                  className="login-logo"
                  src={LogoGambir}
                  alt="Logo Puskesmas"
                />
              </Stack>
              <Stack direction="column">
                <Text className="logo-text" style={{ color: "#6A9695" }}>
                  RUANG <strong>MUTU</strong>
                </Text>
                <Text
                  className="description-text"
                  style={{ marginTop: "-10px" }}
                >
                  Aplikasi Dokumentasi serta Pemantauan Kegiatan Mutu Puskesmas
                  Kecamatan Gambir
                </Text>
              </Stack>
            </div>

            <Form
              layout="vertical"
              form={form}
              requiredMark={false}
              size="large"
              className="form"
              onFinish={handleSubmit}
            >
              <InputText
                label="Email"
                name="email"
                type="email"
                requiredMark={false}
                rules={[
                  { required: true, message: "Email tidak boleh kosong!" },
                ]}
              />

              <InputText
                label="Password"
                name="password"
                type="password"
                requiredMark={false}
                rules={[
                  { required: true, message: "Password tidak boleh kosong!" },
                ]}
              />

              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{ margin: "0 0 20px 0" }}
              >
                <div
                  style={{ color: "#2C5282", cursor: "pointer" }}
                  onClick={InfoModal}
                >
                  Lupa Password
                </div>
              </Stack>

              <SubmitButton
                text="Masuk"
                type="primary"
                block={true}
                className="button"
                loading={loading}
              />
            </Form>
          </Col>
        </Row>
        <Copyright className="login-footer">
          &#169; PKC Gambir All Rights Reserved.
        </Copyright>
      </Card>
    </section>
  );
};
