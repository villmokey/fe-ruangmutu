import { Input } from "antd";

const { Search } = Input;

export const InputSearch = ({
  placeholder,
  onSearch,
  style,
  className,
  allowClear,
  onChange,
  size,
  onReset,
  loading = false,
}) => {
  return (
    <Search
      placeholder={placeholder}
      onSearch={onSearch}
      onReset={onReset}
      loading={loading}
      onChange={onChange}
      style={style}
      className={className}
      allowClear={allowClear}
      size={size}
    />
  );
};
