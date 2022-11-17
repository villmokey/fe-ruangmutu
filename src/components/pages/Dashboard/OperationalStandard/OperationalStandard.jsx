import { useState } from "react";
import { Breadcrumb, Layout, Steps, Row, Col, Button, message } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { Card } from "../../../atoms/Card/Card";
import { Text } from "../../../atoms/Text/Text";
import { Title } from "../../../atoms/Title/Title";

import { FirstStep as OperationalStandardFirstStep } from "../../../templates/OperationalStandardTemplates/Add/FirstStep";
import { SecondStep as OperationalStandardSecondStep } from "../../../templates/OperationalStandardTemplates/Add/SecondStep";
import { ThirdStep as OperationalStandardThirdStep } from "../../../templates/OperationalStandardTemplates/Add/ThirdStep";

import { fetchApiPost } from "../../../../globals/fetchApi";
import { useAuthToken } from "../../../../globals/useAuthToken";
import "./OperationalStandard.less";
import moment from "moment";
import "moment/locale/id";

const { Content, Sider: AntdSider } = Layout;
const { Step } = Steps;

export const OperationalStandard = () => {
  const [current, setCurrent] = useState(0);
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [relatedPrograms, setRelatedPrograms] = useState([]);
  const [loading, setLoading] = useState(false);

  const [payload, setPayload] = useState({
    name: "",
    document_number: "",
    revision_number: "",
    released_date: "",
    page: "",
    total_page: "",
    meaning: "",
    goal: "",
    policy: "",
    reference: "",
    tools: "",
    procedures: "",
    flow_diagram: "",
    notes: "",
  });

  const [histories, setHistories] = useState([]);

  const handleSubmit = () => {
    if (payload.flow_diagram && payload.flow_diagram.file) {
      setLoading(true);
      let bags = new FormData();
      bags.append("group_name", "sop_diagram");
      bags.append("file", payload.flow_diagram.file);

      fetchApiPost("/upload/file", accessToken, bags)
        .then((file) => {
          if (file && file.success) {
            let history_list = [];
            if (histories.length > 0) {
              history_list = histories.map((history) => {
                return {
                  name: history.name,
                  value: history.value,
                  publish: moment(history.publish).format("YYYY-MM-DD"),
                };
              });
            }

            fetchApiPost("/operational-standard", accessToken, {
              ...payload,
              flow_diagram: file.data.id,
              released_date: moment(payload.released_date).format("YYYY-MM-DD"),
              related_program:
                relatedPrograms.length > 0
                  ? relatedPrograms.map((x) => x).join(",")
                  : "",
              histories: history_list,
            })
              .then((res) => {
                if (res) {
                  console.log(res);
                  if (res.success) {
                    message.success("Berhasil Menambahkan SOP");
                    window.location.reload();
                  } else {
                    message.error("Error: " + res.message);
                  }
                }
              })
              .catch((e) => {
                if (e && e.response && e.response.data) {
                  message.warning(e.response.data.message);
                }
              })
              .finally(() => setLoading(false));
          }
        })
        .catch();
    } else {
      message.warning("Silahkan pilih upload diagram alir terlebih dahulu");
    }
  };

  const steps = [
    {
      title: "Tahap 1",
      content: (
        <OperationalStandardFirstStep
          defaultValues={relatedPrograms}
          onChangeForm={(selected) => setRelatedPrograms(selected)}
        />
      ),
    },
    {
      title: "Tahap 2",
      content: (
        <OperationalStandardSecondStep
          form={payload}
          setter={setPayload}
          histories={histories}
          historySetter={setHistories}
        />
      ),
    },
    {
      title: "Tahap 3",
      content: (
        <OperationalStandardThirdStep
          form={payload}
          histories={histories}
          historySetter={setHistories}
        />
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Layout>
      <AntdSider className="sider">
        <div className="sider-content">
          <Title level={2}>SOP</Title>
          <Text>{moment().format("dddd, DD MMMM YYYY")}</Text>
        </div>
      </AntdSider>

      <Content className="main-content operational-standard">
        <Breadcrumb separator=">" className="breadcrumb">
          <Breadcrumb.Item href={"/dashboard"} className="breadcrumb__item">
            <HomeFilled className="icon icon--default" />
            <span>Home</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="breadcrumb__item breadcrumb__item--active">
            SOP
          </Breadcrumb.Item>
        </Breadcrumb>

        <Steps current={current}>
          {steps.map((item, index) => (
            <Step key={index} title={item.title} />
          ))}
        </Steps>

        <Card style={{ margin: "30px 0px 10px" }}>
          {steps[current].content}
        </Card>

        <Row>
          <Col style={{ marginRight: "auto" }}>
            {current > 0 && <Button onClick={() => prev()}>Sebelumnya</Button>}
          </Col>
          <Col style={{ marginLeft: "auto" }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Selanjutnya
              </Button>
            )}
          </Col>
          <Col>
            {current === steps.length - 1 && (
              <Button
                loading={loading}
                type="primary"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Simpan
              </Button>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
