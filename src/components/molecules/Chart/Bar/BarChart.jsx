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

import { Bar } from "react-chartjs-2";
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
  indicatorLineValue = 40,
  options,
  ref,
}) => {

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
