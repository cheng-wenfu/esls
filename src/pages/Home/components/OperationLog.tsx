import React, { useState } from 'react';
import { Table } from 'antd';
import { Dispatch, AnyAction } from 'redux';

export interface LogDataType {
  userName: string;
  operation: string;
  ipAddress: string;
  time: number;
}

interface OperationLogProps {
  operationLog: LogDataType[];
  dispatch: Dispatch<AnyAction>;
}

const OperationLog: React.FC<OperationLogProps> = ({ operationLog, dispatch }) => {
  const [current, setCurrent] = useState(1);
  const pagination = {
    total: 200,
    current: current,
    onChange: (page: number) => {
      console.log(page);
      setCurrent(page);
      //
      dispatch({
        type: 'home/fetchOperationLog',
        payload: current - 1,
      });
    },
  };
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

  return <Table dataSource={operationLog} columns={columns} pagination={pagination} />;
};

export default OperationLog;
