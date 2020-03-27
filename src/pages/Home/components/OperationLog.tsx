import React from 'react';
import { Table } from 'antd';

export interface LogDataType {
  userName: string;
  operation: string;
  ipAddress: string;
  time: number;
}

interface OperationLogProps {
  operationLog: LogDataType[];
}

const OperationLog: React.FC<OperationLogProps> = ({ operationLog }) => {
  const columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
    },
    {
      title: 'IP',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
    },
    {
      title: '执行时间',
      dataIndex: 'time',
      key: 'time',
    },
  ];

  return <Table dataSource={operationLog} columns={columns} />;
};

export default OperationLog;
