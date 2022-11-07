const Textfield = ({
  value,
  onChange,
  label,
  required,
  disabled = false,
  name,
  type,
  style,
}) => {
  return (
    <div role="row" className="ant-row ant-form-item">
      <div role="cell" className="ant-col ant-form-item-label">
        <label
          for={name}
          className={required ? "ant-form-item-required" : ""}
          title={label}
        >
          {label}
        </label>
      </div>
      <div role="cell" className="ant-col ant-form-item-control">
        <div className="ant-form-item-control-input">
          <div className="ant-form-item-control-input-content">
            <input
              style={style}
              disabled={disabled}
              type={type ?? "text"}
              className="ant-input"
              id={name}
              value={value}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Textfield;
