import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { Dispatch, AnyAction } from 'redux';

import AddGoodsForm from './AddGoodsForm';

import { GoodsDataType } from '@/models/goodManage';
//import styles from './GoodsTable.less';

interface GoodsTableProps {
  goodsData: GoodsDataType[];
  dispatch: Dispatch<AnyAction>;
}

const GoodsTable: React.FC<GoodsTableProps> = ({ goodsData, dispatch }) => {
  const [current, setCurrent] = useState(1);
  const [visible, setVisible] = useState(false);

  function handleRefresh() {
    dispatch({
      type: 'goodManage/fetchGoodsData',
      payload: current - 1,
    });
  }

  function showModal() {
    setVisible(true);
  }
  function handleModalOk(e) {
    console.log(e);
    setVisible(false);
  }

  function handleModalCancel(e) {
    console.log(e);
    setVisible(false);
  }

  const pagination = {
    total: 200,
    current: current,
    onChange: (page: number) => {
      setCurrent(page);
      dispatch({
        type: 'goodManage/fetchGoodsData',
        payload: current - 1,
      });
    },
  };
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
    {
      title: '操作',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  return (
    <div>
      <div className="tableOperations">
        <Button onClick={handleRefresh}>刷新</Button>
        <Button>筛选预警商品</Button>
        <Button onClick={showModal}>添加商品</Button>
        <Modal
          title="添加商品"
          visible={visible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          width={900}
        >
          <AddGoodsForm />
        </Modal>
      </div>
      <Table
        dataSource={goodsData}
        columns={colums}
        pagination={pagination}
        bordered
        title={() => '商品数据管理'}
      />
    </div>
  );
};

export default GoodsTable;
