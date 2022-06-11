import { Typography } from 'antd';
import PropTypes from 'prop-types';

const { Title: AntdTitle } = Typography;

const propTypes = {
  level: PropTypes.number
}

export const Title = ({
  children,
  level,
  className,
  type,
  style
}) => {
  return (
    <AntdTitle level={level} className={className} type={type} style={style}>{ children }</AntdTitle>
  )
}

Title.propTypes = propTypes;