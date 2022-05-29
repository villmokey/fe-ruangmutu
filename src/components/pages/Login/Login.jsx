import { Card } from "../../atoms/Card/Card"
import { Form } from "../../molecules/Form/Form";
import { Col, Form as AntdForm, message, Row } from 'antd';
import './Login.less';
import { InputText } from "../../atoms/InputText/InputText";
import { SubmitButton } from "../../atoms/SubmitButton/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, loginApi } from "../../../redux/modules/auth/action";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../routing/paths";

const { Item } = AntdForm;

export const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    error,
    called,
    isAuth
  } = useSelector(authSelector)

  const [form] = AntdForm.useForm();

  useEffect(() => {

    if (!isAuth) return;

    navigate(paths.DASHBOARD);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [called, isAuth])

  useEffect(() => {
    if (!(called && error)) return;
    message.error('Username atau password salah!');
  }, [called, error])

  const handleSubmit = (value) => {
    dispatch(loginApi(value));
  }

  return (
    <section className="container">
      <Card className="login-container">
        <Row justify="center" align="middle">
          <Col span={14}>
            <span>Welcome back</span>
            <h1 className="form-title">Login to your account</h1>

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
                  { required: true, message: 'Email tidak boleh kosong!' }
                ]}
              />

              <InputText
                label="Password"
                name="password"
                type="password"
                requiredMark={false}
                rules={[
                  { required: true, message: 'Password tidak boleh kosong!' }
                ]}
              />

              <Item>
                <a href="/" style={{ color: '#2C5282' }}>Forgot Password</a>
              </Item>

              <SubmitButton 
                text="Login now"
                type="primary"
                block={true}
                className="button"
                loading={loading}
              />

            </Form>
          </Col>
        </Row>
       
      </Card>
    </section>
  )
}