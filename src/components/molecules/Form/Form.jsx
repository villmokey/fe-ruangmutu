import { Form as AntdForm } from 'antd';
import PropTypes from 'prop-types';

const propTypes = {
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object,
  initialValues: PropTypes.object,
  className: PropTypes.string,
  onFinish: PropTypes.func
}

export const Form = ({
  labelCol,
  wrapperCol,
  initialValues,
  className,
  onFinish,
  form,
  style,
  children,
  layout,
  requiredMark,
  size
}) => {

  return (
    <AntdForm
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      initialValues={initialValues}
      className={className}
      onFinish={onFinish}
      form={form}
      style={style}
      layout={layout}
      requiredMark={requiredMark}
      size={size}
    >
      { children }
    </AntdForm>
  )
}

Form.propTypes = propTypes;