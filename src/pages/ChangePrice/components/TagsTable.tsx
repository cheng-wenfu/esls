import React, { useState } from 'react';
import { Table } from 'antd';
import { Dispatch, AnyAction } from 'redux';

import { TagsDataType } from '@/models/changePrice';

interface TagsDataRequestParams {
  query: "waitUpdate" | "forbidState" | "",
  queryString: 1 | 0 | "",
}

interface TagsTableProps {
  isRequestOvertime: false | true;
  tagsDataRequestParams: TagsDataRequestParams;
  tagsData: TagsDataType[];
  dispatch: Dispatch<AnyAction>;
}

const TagsTable: React.FC<TagsTableProps> = ({ isRequestOvertime, tagsDataRequestParams, tagsData, dispatch }) => {
  //const [current, setCurrent] = useState(1);
  const pagination = {
    total: 200,
    //current: current,
    onChange: (page: number) => {
      console.log("page", page)
      //setCurrent(page);
      const dispatchProps = isRequestOvertime ? {
        type: 'changePrice/fetchOvertimeTagsData',
        payload: page - 1,
      } : {
          type: 'changePrice/fetchTagsData',
          payload: {
            ...tagsDataRequestParams,
            page: page - 1,
          }
        }
      console.log(isRequestOvertime, dispatchProps)
      dispatch(dispatchProps);
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
      title: '店铺',
      dataIndex: 'shopNameAndShopNumber',
      key: 'shopNameAndShopNumber',

    },
    {
      title: 'AP/信道',
      dataIndex: 'routerBarCodeAndChannelId',
      key: 'routerBarCodeAndChannelId',
    },
    {
      title: '商品条码/名称',
      dataIndex: 'goodBarCodeAndName',
      key: 'goodBarCodeAndName',
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
      title={() => '等待变价列表'}
    />
  );
};

export default TagsTable;



