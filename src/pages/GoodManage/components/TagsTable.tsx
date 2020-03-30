import React, { useState } from 'react';
import { Table } from 'antd';
import { Dispatch, AnyAction } from 'redux';

import { TagsDataType } from '@/models/goodManage';

interface TagsTableProps {
  tagsData: TagsDataType[];
  dispatch: Dispatch<AnyAction>;
}

const TagsTable: React.FC<TagsTableProps> = ({ tagsData, dispatch }) => {
  const [current, setCurrent] = useState(1);
  const pagination = {
    total: 200,
    current: current,
    onChange: (page: number) => {
      setCurrent(page);
      dispatch({
        type: 'goodManage/fetchTagsData',
        payload: page - 1,
      });
    },
  };
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
  return (
    <Table
      dataSource={tagsData}
      columns={colums}
      pagination={pagination}
      bordered
      title={() => '标签数据管理'}
    />
  );
};

export default TagsTable;
