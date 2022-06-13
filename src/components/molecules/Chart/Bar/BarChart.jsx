import { 
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  // Legend
} from 'recharts';

export const BarChart = ({
  XAxisDataKey,
  YAxisDataKey,
  barDataKey,
  barColor,
  data,
  className,
  width,
  height
}) => {
  return (
    <RechartsBarChart
      width={width}
      height={height}
      data={data}
      className={className}
    >
      <XAxis dataKey={XAxisDataKey} />
      <YAxis dataKey={YAxisDataKey}/>
      <Tooltip />
      {/* <Legend /> */}
      <Bar dataKey={barDataKey} fill={barColor} />
    </RechartsBarChart>
  )
}