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
      beforeDraw: (chart) => {
        const { ctx } = chart;
        ctx.save();
        ctx.register(ChartAnnotation);
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = "lightGreen";
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 25,
        },
      },
    },
  };

  const getBarColor = (value) => {
    if (value > indicatorLineValue) {
      return "#5F5DC8";
    } else if (value === indicatorLineValue) {
      return "#6CC85D";
    } else if (value >= indicatorLineValue / 2 && value < indicatorLineValue) {
      return "#C8BD5D";
    } else {
      return "#C85D5D";
    }
  };

  // ['#C85D5D', '#6CC85D', '#5F5DC8', '#C85D5D', '#C85D5D', '#C85D5D', '#C8BD5D', '#C8BD5D', '#C85D5D', '#C85D5D', '#5F5DC8', '#C85D5D']

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Quality Indicator",
        data: chartData,
        backgroundColor: chartData.map((x) => {
          return getBarColor(x);
        }),
      },
    ],
  };

  return (
    <Bar
      ref={ref}
      options={optionss}
      data={data}
      color={(e) => console.log(e)}
    />
  );
  // return <Line data={data} options={optionss} />;
};

BarChart.propTypes = propTypes;
BarChart.defaultProps = defaultProps;
