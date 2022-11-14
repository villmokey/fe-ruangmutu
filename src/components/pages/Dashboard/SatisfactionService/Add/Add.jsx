import { Button, Col, Layout, message, Row, Steps } from "antd";
import { useNavigate } from "react-router-dom";

import { FirstStep } from "./Step/FirstStep";
import { SecondStep as SatisfactionLevelSecondStep } from "./Step/SatisfactionLevelForm/SecondStep";
import { SecondStep as SatisfactionSecondStep } from "./Step/SatisfactionForm/SecondStep";
import { ThirdStep as SatisfactionLevelThirdStep } from "./Step/SatisfactionLevelForm/ThirdStep";
import { ThirdStep as SatisfactionThirdStep } from "./Step/SatisfactionForm/ThirdStep";
import { Title } from "../../../../atoms/Title/Title";
import { Text } from "../../../../atoms/Text/Text";
import { Card } from "../../../../atoms/Card/Card";
import "./Add.less";
import { useAuthToken } from "../../../../../globals/useAuthToken";
import { useState } from "react";
import { useEffect } from "react";
import { fetchApiGet, fetchApiPost } from "../../../../../globals/fetchApi";
import { monthFullID } from "../../../../../globals/monthLabel";
import moment from "moment";
import "moment/locale/id";

const { Sider, Content } = Layout;
const { Step } = Steps;

export const AddSatisfaction = () => {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [healthServices, setHealthServices] = useState([]);
  const [units, setUnits] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [formType, setFormType] = useState(1);
  const [satisfactionLevelPayload, setSatisfactionLevelPayload] = useState({
    month: "",
    health_service_id: "",
    units: [],
    average: "",
  });
  const [complaintPayload, setComplaintPayload] = useState({
    program_id: "",
    health_service_id: "",
    report: "",
    source: "",
    attachment: "",
    complaint_date: "",
    reported_by: "",
    attachments: [],
  });

  const next = () => {
    if (formType === 1) {
      setCurrent(current + 1);
    } else if (formType === 2) {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    if (formType === 1) {
      setCurrent(current - 1);
    } else if (formType === 2) {
      setCurrent(current - 1);
    }
  };

  const fetchHealthService = async () => {
    await fetchApiGet("/health-service", { paginate: false }, accessToken).then(
      (res) => {
        if (res && res.code === 200) {
          setHealthServices(res.data);
        }
      }
    );
  };
  const fetchPrograms = async () => {
    await fetchApiGet("/program", { paginate: false }, accessToken).then(
      (res) => {
        if (res && res.code === 200) {
          setPrograms(res.data);
        }
      }
    );
  };

  const handleChangeDocumentForm = (event) => {
    setFormType(event.target.value);
  };

  const handleHealthServiceChange = (value) => {
    let selected = healthServices.find((x) => x.id === value);
    if (selected) {
      let selected_units = selected.units;
      if (selected_units.length > 0) {
        let temp = selected_units.map((unit) => {
          return {
            service_name: unit.service.name,
            value: 0,
            total: 0,
            percent: undefined,
          };
        });
        setUnits(temp);
      } else {
        setUnits([]);
      }
    }
    setSatisfactionLevelPayload((prev) => {
      return {
        ...prev,
        health_service_id: value,
      };
    });
  };

  const steps = [
    {
      title: "Tahap 1",
      content: <FirstStep onChangeForm={handleChangeDocumentForm} />,
    },
    {
      title: "Tahap 2",
      content:
        formType === 1 ? (
          <SatisfactionLevelSecondStep
            handleHealthServiceChange={handleHealthServiceChange}
            form={satisfactionLevelPayload}
            payloadSetter={setSatisfactionLevelPayload}
            healthServicesList={healthServices}
            monthList={monthFullID}
            units={units}
            unitSetter={setUnits}
          />
        ) : (
          <SatisfactionSecondStep
            payload={complaintPayload}
            payloadSetter={setComplaintPayload}
            serviceOptions={healthServices}
            programMutuOptions={programs}
          />
        ),
    },
    {
      title: "Tahap 3",
      content:
        formType === 1 ? (
          <SatisfactionLevelThirdStep
            handleHealthServiceChange={handleHealthServiceChange}
            form={satisfactionLevelPayload}
            payloadSetter={setSatisfactionLevelPayload}
            healthServicesList={healthServices}
            monthList={monthFullID}
            units={units}
            unitSetter={setUnits}
          />
        ) : (
          <SatisfactionThirdStep
            payload={complaintPayload}
            payloadSetter={setComplaintPayload}
            serviceOptions={healthServices}
            programMutuOptions={programs}
          />
        ),
    },
  ];

  const uploadFileList = async (fileList = []) => {
    let bags = new FormData();
    bags.append("file", "");
    bags.append("group_name", "complaint_files");
    const uploaded = Promise.all(
      fileList.map(async (file) => {
        bags.set("file", file.originFileObj);
        const res = await fetchApiPost("/upload/file", accessToken, bags);
        if (res && res.code === 200 && res.data.id) {
          return res.data.id;
        }
      })
    );

    return await uploaded;
  };

  const saveComplaint = async (attachments = []) => {
    await fetchApiPost("/complaint", accessToken, {
      ...complaintPayload,
      attachments: attachments,
      complaint_date: moment(complaintPayload.complaint_date).format(
        "YYYY-MM-DD"
      ),
    })
      .then((res) => {
        if (res && res.success) {
          console.log(res);
          message.success("Berhasil menambahkan keluhan pelanggan");
          navigate("/dashboard/satisfaction-service");
        } else if (res && res.code === 422) {
          message.warning(res.message);
        } else {
          if (res && res.response) {
            message.warning(res.response.data.message);
          }
        }
      })
      .catch((err) => {
        if (err.response) {
          message.warning(err.response.data.message);
        }
      });
  };

  const handleSave = async () => {
    if (formType === 1) {
      fetchApiPost("/satisfaction", accessToken, {
        ...satisfactionLevelPayload,
        units: units,
      })
        .then((res) => {
          if (res && res.success) {
            console.log(res);
            message.success("Berhasil menambahkan tingkat kepuasan layanan");
            navigate("/dashboard/satisfaction-service");
          } else {
            message.warning(res.message);
          }
        })
        .catch((err) => {
          if (err.response) {
            message.warning(err.response.data.message);
          }
        });
    } else {
      if (
        complaintPayload &&
        complaintPayload.attachments &&
        complaintPayload.attachments.length > 0
      ) {
        await uploadFileList(complaintPayload.attachments).then(async (ids) => {
          await saveComplaint(ids);
        });
      } else {
        await saveComplaint();
      }
    }
  };

  useEffect(() => {
    fetchHealthService();
    fetchPrograms();
  }, []); //eslint-disable-line

  return (
    <Layout>
      <Sider className="sider">
        <div className="sider-content">
          <Title level={2}>KEPUASAN PELANGGAN</Title>
          <Text>{moment().format("dddd, DD MMMM YYYY")}</Text>
        </div>
      </Sider>
      <Content className="main-content">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
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
              <Button type="primary" onClick={() => handleSave()}>
                Simpan
              </Button>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
