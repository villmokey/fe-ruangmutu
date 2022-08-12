import { Input } from 'antd';

const { Search } = Input;

export const InputSearch = ({
  placeholder,
  onSearch,
  style,
  className,
  allowClear,
  onChange,
  size
}) => {
  return (
    <Search 
      placeholder={placeholder}
      onSearch={onSearch}
      onChange={onChange}
      style={style}
      className={className}
      allowClear={allowClear}
      size={size}
    />
  )
}