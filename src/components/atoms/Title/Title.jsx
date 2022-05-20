import { Typography } from 'antd';
import PropTypes from 'prop-types';

const { Title: AntdTitle } = Typography;

const propTypes = {
  level: PropTypes.number
}

export const Title = ({
  children,
  level,
  className
}) => {
  return (
    <AntdTitle level={level} className={className}>{ children }</AntdTitle>
  )
}

Title.propTypes = propTypes;