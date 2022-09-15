import React from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Row, Col, Typography } from 'antd';

const { Title } = Typography

const TextEditor = ({ name, label, required = false, onChange, value, disabled = false }) => {
    return (
        <Row style={{ margin: '10px 0' }}>
            <Col span={24}>
                <Title level={5} style={{ fontWeight: 'bold' }}>{required ? (<span style={{ fontWeight: 'bold', color: 'red' }}>* </span>) : ''}{label}</Title>
                <CKEditor
                    name={name}
                    editor={ClassicEditor}
                    data={value}
                    disabled={disabled}
                    onChange={(event, editor) => {
                        let data = editor.getData();
                        return onChange(data)
                    }}
                />
            </Col>
        </Row>
    )
}

export default TextEditor