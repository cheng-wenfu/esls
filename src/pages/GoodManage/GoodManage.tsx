import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Row } from 'antd';
import { connect } from 'dva';
import { Dispatch, AnyAction } from 'redux';

import GoodsTable from './components/GoodsTable';
import TagsTable from './components/TagsTable';

import { ConnectState, GoodManageModelState } from '@/models/connect';
import { GoodsDataType, TagsDataType } from '@/models/goodManage';

interface GoodManageProps {
  dispatch: Dispatch<AnyAction>;
  pageData: GoodManageModelState;
}

class GoodManage extends Component<GoodManageProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'goodManage/fetchGoodsData',
      payload: 0,
    });
    dispatch({
      type: 'goodManage/fetchTagsData',
      payload: 0,
    });
  }

  /**
   * 获取商品表格所需的字段
   */

  getGoodsTableData(goodsData: Array<GoodsDataType>): Array<GoodsDataType> {
    const goodsTableData = [];
    for (let i = 0; i < goodsData.length; i++) {
      let {
        name, //商品名称
        price, //原价
        stock, //库存
        promotePrice, //促销价格
        isPromote, //是否促销，0否 1是
        shopNumber, //店铺
        shelfNumber, //货号
        status, //绑定状态 1代表绑定
        waitUpdate,
      } = goodsData[i];
      goodsTableData.push({
        name, //商品名称
        price, //原价
        stock, //库存
        promotePrice, //促销价格
        isPromote, //是否促销，0否 1是
        shopNumber, //店铺
        shelfNumber, //货号
        status, //绑定状态 1代表绑定
        waitUpdate,
      });
    }
    return goodsTableData;
  }

  /**
   * 获取标签表格所需的字段
   */
  getTagsTableData(tagsData: Array<TagsDataType>): Array<TagsDataType> {
    const tagsTableData = [];
    for (let i = 0; i < tagsData.length; i++) {
      let {
        barCode, //价签条码
        screenType, //价签屏幕类型
        routerBarCodeAndChannelId, // AP/信道
        power, //电量
        apRssi,
        tagRssi,
        isWorking, //通讯状态， 1 可用
        forbidState, //启用状态，1 启用
        waitUpdate,
      } = tagsData[i];
      tagsTableData.push({
        barCode, //价签条码
        screenType, //价签屏幕类型
        routerBarCodeAndChannelId, // AP/信道
        power, //电量
        apRssi,
        tagRssi,
        isWorking, //通讯状态， 1 可用
        forbidState, //启用状态，1 启用
        waitUpdate,
      });
    }
    return tagsTableData;
  }

  render() {
    const { goodsData, tagsData } = this.props.pageData;
    const { dispatch } = this.props;
    const goodsTableData = this.getGoodsTableData(goodsData);
    const tagsTableData = this.getTagsTableData(tagsData);
    return (
      <PageHeaderWrapper>
        <Row>
          <GoodsTable goodsData={goodsTableData} dispatch={dispatch} />
        </Row>
        <Row>
          <TagsTable tagsData={tagsTableData} dispatch={dispatch} />
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ goodManage }: ConnectState) => ({
  pageData: goodManage,
}))(GoodManage);
