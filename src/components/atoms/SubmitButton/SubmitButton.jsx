import { Button, Form } from 'antd';

const { Item } = Form;

export const SubmitButton = ({
  wrapperCol,
  labelCol,
  type,
  text,
  block,
  style,
  className,
  size,
  loading
}) => {
  return (
    <Item
      wrapperCol={wrapperCol}
      labelCol={labelCol}
    >
      <Button 
        type={type} 
        htmlType="submit"
        block={block}
        style={{
          borderRadius: '5px',
          ...style
        }}
        className={className}
        size={size}
        loading={loading}
      >
        { text }
      </Button>
    </Item>
  )
}