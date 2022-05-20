import { Card } from "../../atoms/Card/Card"
import { Title } from "../../atoms/Title/Title";
import './Login.css';

export const Login = () => {
  return (
    <Card className="login-container">
      <div className="login-title">
        <div className="title">
          <Title>RUANG MUTU</Title>
        </div>
      </div>
    </Card>
  )
}