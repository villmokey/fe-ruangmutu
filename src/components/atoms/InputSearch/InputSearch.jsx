import { Input } from 'antd';

const { Search } = Input;

export const InputSearch = ({
  placeholder,
  onSearch,
  style,
  className,
  allowClear,
  size
}) => {
  return (
    <Search 
      placeholder={placeholder}
      onSearch={onSearch}
      style={style}
      className={className}
      allowClear={allowClear}
      size={size}
    />
  )
}