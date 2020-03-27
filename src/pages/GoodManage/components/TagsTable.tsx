import React from 'react';
import { Table } from 'antd';

import { TagsDataType } from '@/models/goodManage';

interface TagsTableProps {
  tagsData: TagsDataType[];
}

const TagsTable: React.FC<TagsTableProps> = ({ tagsData }) => {
  const colums = [
    {
      title: '价签条码',
      dataIndex: 'barCode',
      key: 'barCode',
    },
    {
      title: '价签类型',
      dataIndex: 'screenType',
      key: 'screenType',
    },
    {
      title: 'AP/信道',
      dataIndex: 'routerBarCodeAndChannelId',
      key: 'routerBarCodeAndChannelId',
    },
    {
      title: '电量',
      dataIndex: 'power',
      key: 'power',
    },
    {
      title: 'AP Rssi',
      dataIndex: 'apRssi',
      key: 'apRssi',
    },
    {
      title: 'Tag Rssi',
      dataIndex: 'tagRssi',
      key: 'tagRssi',
    },
    {
      title: '通讯状态',
      dataIndex: 'isWorking',
      key: 'isWorking',
    },
    {
      title: '启用状态',
      dataIndex: 'forbidState',
      key: 'forbidState',
    },
    {
      title: '等待变价',
      dataIndex: 'waitUpdate',
      key: 'waitUpdate',
    },
    // {
    //     title: '操作',
    //     dataIndex: 'name',
    //     key: 'name',
    // },
  ];
  return <Table dataSource={tagsData} columns={colums} />;
};

export default TagsTable;
