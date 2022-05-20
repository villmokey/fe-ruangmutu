import { Card as AntdCard } from 'antd';

export const Card = ({
  style,
  children,
  className
}) => {
  return (
    <AntdCard
      style={style}
      className={className}
    >
      { children }
    </AntdCard>
  )
}