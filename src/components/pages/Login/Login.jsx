import { Card } from "../../atoms/Card/Card"
import { Form } from "../../molecules/Form/Form";
import { Col, Form as AntdForm, Row } from 'antd';
import './Login.less';
import { InputText } from "../../atoms/InputText/InputText";
import { SubmitButton } from "../../atoms/SubmitButton/SubmitButton";


const { Item } = AntdForm;

export const Login = () => {

  const [form] = AntdForm.useForm();

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
            />

            </Form>
          </Col>
        </Row>
       
      </Card>
    </section>
  )
}