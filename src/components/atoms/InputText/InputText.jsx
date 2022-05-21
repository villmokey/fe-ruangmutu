import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

const { Item } = Form;

const propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  rules: PropTypes.array,
  className: PropTypes.string
}

export const InputText = ({
  label,
  name,
  rules,
  wrapperCol,
  labelCol,
  placeholder,
  disabled,
  prefix,
  value,
  onChange,
  type,
  className,
  style
}) => {
  return (
    <Item
    label={label}
    name={name}
    rules={rules}
    wrapperCol={wrapperCol}
    labelCol={labelCol}
    >
      <Input 
        placeholder={placeholder}
        disabled={disabled} 
        prefix={prefix}
        value={value}
        onChange={onChange}
        type={type}
        className={className}
        style={style}
      />
    </Item>
  )
}

InputText.propTypes = propTypes;