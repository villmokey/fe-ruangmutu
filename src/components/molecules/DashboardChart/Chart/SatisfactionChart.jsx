import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const SatisfactionChart = ({ chartData, legends }) => {
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
            domain={[0, 100]}
          />
          <Tooltip />
          <Legend />
          {legends.map((item) => (
            <Bar
              style={{ borderRadius: "10px" }}
              dataKey={item.name}
              fill={item.color}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SatisfactionChart;
