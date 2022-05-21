import { Typography } from 'antd';
import PropTypes from 'prop-types';

const { Text: AntdText } = Typography;

const propTypes = {
  level: PropTypes.number
}

export const Text = ({
  children,
  type,
  className,
  italic,
  strong,
  underline,
  style
}) => {
  return (
    <AntdText 
      type={type} 
      className={className}
      italic={italic}
      strong={strong}
      underline={underline}
      style={style}
    >
      { children }
    </AntdText>
  )
}

Text.propTypes = propTypes;