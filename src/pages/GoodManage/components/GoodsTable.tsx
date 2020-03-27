import React from 'react';
import { Table } from 'antd';

import { GoodsDataType } from '@/models/goodManage';

interface GoodsTableProps {
  goodsData: GoodsDataType[];
}

const GoodsTable: React.FC<GoodsTableProps> = ({ goodsData }) => {
  const colums = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '原价',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: '促销价格',
      dataIndex: 'promotePrice',
      key: 'promotePrice',
    },
    {
      title: '是否促销',
      dataIndex: 'isPromote',
      key: 'isPromote',
    },
    {
      title: '店铺',
      dataIndex: 'shopNumber',
      key: 'shopNumber',
    },
    {
      title: '货号',
      dataIndex: 'shelfNumber',
      key: 'shelfNumber',
    },
    {
      title: '是否绑定',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '更新状态',
      dataIndex: 'waitUpdate',
      key: 'waitUpdate',
    },
    // {
    //     title: '操作',
    //     dataIndex: 'name',
    //     key: 'name',
    // },
  ];
  return <Table dataSource={goodsData} columns={colums} />;
};

export default GoodsTable;
