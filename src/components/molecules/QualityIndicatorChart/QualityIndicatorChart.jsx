import { Button, Col, message, Row } from "antd";
import { useEffect, useState } from "react";
import { monthFullID } from "../../../globals/monthLabel";
import { Card } from "../../atoms/Card/Card";
import { Text } from "../../atoms/Text/Text";
import { Title } from "../../atoms/Title/Title";
import IndicatorBarChart from "./Chart/IndicatorBarChart";

import PropTypes from "prop-types";

const propTypes = {
  target: PropTypes.number,
  title: PropTypes.string,
};

const defaultProps = {
  target: 75,
};

export const QualityIndicatorChart = ({
  chartData,
  className,
  title,
  year,
  average = 0,
  target,
  data,
  onChangeMonth,
  dataID,
}) => {
  const [isExpand, setIsExpand] = useState(false);
  const [stringData, setStringData] = useState({
    human: "-",
    tools: "-",
    method: "-",
    policy: "-",
    environment: "-",
    next_plan: "-",
  });

  const [monthlyData, setMonthlyData] = useState(null);

  useEffect(() => {
    if (!data) return;
    setMonthlyData(data);
  }, [data]);

  const handleChangeMonth = (month) => {
    let lower = month.toLowerCase();

    if (monthlyData) {
      let filterMonth = monthlyData.filter((item) => item.month === lower)[0];
      if (filterMonth.human) {
        setStringData({
          human: filterMonth.human,
          tools: filterMonth.tools,
          method: filterMonth.method,
          policy: filterMonth.policy,
          environment: filterMonth.environment,
          next_plan: filterMonth.next_plan,
        });
      } else {
        message.warning("Data bulan ini tidak tersedia!");
        setStringData({
          human: "-",
          tools: "-",
          method: "-",
          policy: "-",
          environment: "-",
          next_plan: "-",
        });
      }
    } else {
      message.warning("Data bulanan tidak tersedia!");
      setStringData({
        human: "-",
        tools: "-",
        method: "-",
        policy: "-",
        environment: "-",
        next_plan: "-",
      });
    }
  };

  const months = monthFullID;

  return (
    <Card className={className}>
      <Title level={4}>{title}</Title>
      <Title
        level={5}
        type="secondary"
        style={{ margin: "-10px 0 0 0", fontSize: "13px" }}
      >
        Target Capaian Mutu: {average}
      </Title>
      <Title
        level={5}
        type="secondary"
        style={{ marginTop: "unset", fontSize: "13px" }}
      >
        {year}
      </Title>
      <Button type="text" onClick={() => setIsExpand(!isExpand)}>
        <i>{isExpand ? "Show Less..." : "Show More..."}</i>
      </Button>
      <div style={!isExpand ? { display: "none" } : {}}>
        {months.map((item, index) => (
          <Button
            key={item}
            style={{ margin: "5px" }}
            onClick={() => handleChangeMonth(item)}
          >
            {item}
          </Button>
        ))}
        <Row gutter={[8, 8]} style={{ marginTop: 20 }}>
          <Col span={8}>
            <Card style={{ background: "#f6f6f6" }}>
              <Title level={5}>Manusia</Title>
              <Text>{stringData?.human ?? "-"}</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: "#f6f6f6" }}>
              <Title level={5}>Alat</Title>
              <Text>{stringData?.tools ?? "-"}</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: "#f6f6f6" }}>
              <Title level={5}>Metode</Title>
              <Text>{stringData?.method ?? "-"}</Text>
            </Card>
          </Col>
        </Row>
        <Row gutter={[8, 8]} style={{ marginTop: 20 }}>
          <Col span={8}>
            <Card style={{ background: "#f6f6f6" }}>
              <Title level={5}>Kebijakan</Title>
              <Text>{stringData?.policy ?? "-"}</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: "#f6f6f6" }}>
              <Title level={5}>Lingkungan</Title>
              <Text>{stringData?.environment ?? "-"}</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: "#f6f6f6" }}>
              <Title level={5}>Tindak lanjut</Title>
              <Text>{stringData?.next_plan ?? "-"}</Text>
            </Card>
          </Col>
        </Row>
      </div>
      <IndicatorBarChart chartData={chartData} achievement={average} />
    </Card>
  );
};

QualityIndicatorChart.propTypes = propTypes;
QualityIndicatorChart.defaultProps = defaultProps;
