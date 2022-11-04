import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import PropTypes from "prop-types";

import { Bar, Line } from "react-chartjs-2";
import { monthAcronymID } from "../../../../globals/monthLabel";
import ChartAnnotation from "chartjs-plugin-annotation";

ChartJS.register(
  ChartAnnotation,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const propTypes = {
  chartData: PropTypes.array,
  labels: PropTypes.array,
};

const defaultProps = {
  labels: monthAcronymID,
  barColor: "#5DC8BDE5",
};

export const BarChart = ({
  chartData = [],
  labels,
  barColor,
  indicatorLineValue = 0,
  options,
  ref,
}) => {
  const chartOptions = {
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
      },
      annotation: {
        annotations: [
          {
            id: "slo",
            type: "line",
            mode: "horizontal",
            value: indicatorLineValue,
            scaleID: "y",
            borderWidth: 1,
            borderDash: [10, 1],
            label: {
              enabled: false,
              position: "start",
            },
          },
        ],
      },
    },
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 25,
        },
      },
    },
  };

  const optionss = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
        },
      },
    },
  };

  // ['#C85D5D', '#6CC85D', '#5F5DC8', '#C85D5D', '#C85D5D', '#C85D5D', '#C8BD5D', '#C8BD5D', '#C85D5D', '#C85D5D', '#5F5DC8', '#C85D5D']

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Quality Indicator",
        data: chartData,
        backgroundColor: barColor,
      },
    ],
  };

  return <Bar ref={ref} options={optionss} data={data} />;
  // return <Line data={data} options={optionss} />;
};

BarChart.propTypes = propTypes;
BarChart.defaultProps = defaultProps;
