import { Button, Col, message, Row } from "antd";
import { useEffect, useState } from "react";
import { monthAcronymID, monthFullID } from "../../../globals/monthLabel";
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
}) => {
  const [isExpand, setIsExpand] = useState(false);
  const [detailData, setDetailData] = useState([]);

  const handleChangeMonth = (detail) => {
    if (detail !== null) {
      setDetailData(detail);
    } else {
      message.warning("Belum ada data pada bulan yang dipilih");
      setDetailData([]);
    }
  };

  const rates = [
    {
      unit: "Admen",
      value: "80",
      max: "100",
    },
    {
      unit: "Gizi",
      value: "60",
      max: "100",
    },
    {
      unit: "UKP",
      value: "40",
      max: "100",
    },
    {
      unit: "UKM",
      value: "70",
      max: "100",
    },
    {
      unit: "FARMASI",
      value: "70",
      max: "100",
    },
    {
      unit: "LABORATIORIUM",
      value: "70",
      max: "100",
    },
    {
      unit: "BPJS",
      value: "70",
      max: "100",
    },
  ];

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
        {chartData.map((item, index) => (
          <Button
            key={index}
            style={{ margin: "5px" }}
            onClick={() => handleChangeMonth(item.detail)}
          >
            {monthFullID[index]}
          </Button>
        ))}
        <Row gutter={[8, 8]} style={{ marginTop: 20 }}>
          <Col span={24}>
            {detailData.length > 0 ? (
              <Card style={{ background: "#f6f6f6" }}>
                <Row gutter={[100, 8]}>
                  {detailData &&
                    detailData.map((rate, index) => (
                      <Col span={8} key={"rate-" + index + 1}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text>{rate.service_name}</Text>
                          <Text>
                            <strong>{`${rate.value}/${rate.total}`}</strong>
                          </Text>
                        </div>
                      </Col>
                    ))}
                </Row>
              </Card>
            ) : null}
          </Col>
        </Row>
      </div>
      <SatisfactionBarChart chartData={chartData} achievement={average} />
    </Card>
  );
};

SatisfactionServiceChart.propTypes = propTypes;
SatisfactionServiceChart.defaultProps = defaultProps;
