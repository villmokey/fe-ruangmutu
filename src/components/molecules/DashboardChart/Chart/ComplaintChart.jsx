import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ComplaintChart = ({ chartData, achievement = 0 }) => {
  const getBarColor = (value) => {
    if (value > achievement) {
      return "#5F5DC8";
    } else if (value === achievement) {
      return "#6CC85D";
    } else if (value >= achievement / 2 && value < achievement) {
      return "#C8BD5D";
    } else {
      return "#C85D5D";
    }
  };

  return (
    <div style={{ width: "100%", height: 250, marginTop: 10 }}>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="month" tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            type={"number"}
            domain={[0, 10]}
          />
          <Tooltip />
          <Bar
            radius={[10, 10, 0, 0]}
            dataKey="done"
            label={"Telah ditangani"}
            fill="#82ca9d"
            style={{ borderRadius: "10px" }}
          ></Bar>
          <Bar
            radius={[10, 10, 0, 0]}
            dataKey="pending"
            label={"Belum Ditangani"}
            fill="#4e4e4e"
            style={{ borderRadius: "10px" }}
          ></Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComplaintChart;
