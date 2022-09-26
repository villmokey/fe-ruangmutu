import { Layout } from "antd";
import { Text } from "../../../../atoms/Text/Text";
import { Title } from "../../../../atoms/Title/Title";
import moment from "moment";
import "moment/locale/id";

const { Sider: AntdSider } = Layout;

export const MasterDataSider = ({ title, children }) => {
  return (
    <AntdSider className="sider">
      <div className="sider-content">
        <Title level={2}>{title}</Title>
        <Text>{moment().format("dddd, DD MMMM YYYY")}</Text>
        {children}
      </div>
    </AntdSider>
  );
};
