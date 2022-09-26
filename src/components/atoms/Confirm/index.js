import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import React from 'react';
const { confirm } = Modal;

export const deleteConfirmation = (onConfirm, onCancel) => {
  confirm({
    title: 'Konfirmasi',
    icon: <ExclamationCircleOutlined />,
    content: 'Apakah anda yakin ingin menghapus item ini?',

    onOk() {
      console.log('OK');
    },

    onCancel() {
      console.log('Cancel');
    },
  });
};