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
  type
}) => {
  return (
    <AntdTitle level={level} className={className} type={type}>{ children }</AntdTitle>
  )
}

Title.propTypes = propTypes;