import { Button, Col, message, Row } from "antd";
import { useEffect, useState } from "react";
import { monthFullID } from "../../../globals/monthLabel";
import { Card } from "../../atoms/Card/Card";
import { Text } from "../../atoms/Text/Text";
import { Title } from "../../atoms/Title/Title";
import SatisfactionBarChart from "./Chart/SatisfactionBarChart";

import PropTypes from "prop-types";

const propTypes = {
  target: PropTypes.number,
  title: PropTypes.string,
};

const defaultProps = {
  target: 75,
};

export const SatisfactionServiceChart = ({
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
  console.log("chartData", chartData);
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

  const rates = [
    {
      unit: 'Admen',
      value: '80',
      max: '100'
    },
    {
      unit: 'Gizi',
      value: '60',
      max: '100'
    },
    {
      unit: 'UKP',
      value: '40',
      max: '100'
    },
    {
      unit: 'UKM',
      value: '70',
      max: '100'
    },
    {
      unit: 'FARMASI',
      value: '70',
      max: '100'
    },
    {
      unit: 'LABORATIORIUM',
      value: '70',
      max: '100'
    },
    {
      unit: 'BPJS',
      value: '70',
      max: '100'
    },
  ]

  const months = monthFullID;

  return (
    <Card className={className}>
      <Title level={4}>{title}</Title>
      <Title level={5} type="secondary">
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
          <Col span={24}>
            <Card style={{ background: "#f6f6f6" }}>
              <Row gutter={[100, 8]}>
                {rates && rates.map((rate, index) => (
                  <Col span={8} key={'rate-' + index + 1}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text>{rate.unit}</Text>
                      <Text><strong>{`${rate.value}/${rate.max}`}</strong></Text>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
      <SatisfactionBarChart chartData={chartData} achievement={average} />
    </Card>
  );
};

SatisfactionServiceChart.propTypes = propTypes;
SatisfactionServiceChart.defaultProps = defaultProps;
