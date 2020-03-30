import { Reducer } from 'redux';
import { Effect } from 'dva';

import { getGoodsData, getTagsData } from '@/services/goodManage';

export interface GoodsDataType {
  name: string; //商品名称
  price: string; //原价
  promotePrice: string; //促销价格
  stock: string; //库存
  isPromote: number | null; //是否促销，0否 1是
  shopNumber: string; //店铺
  shelfNumber: string; //货号
  status: 0 | 1; //绑定状态 1代表绑定
  waitUpdate: 0 | 1; //变价是否成功，0表示等待更新， 1表示更新完成
  [x: string]: number | string | null;
}

export interface TagStyle {
  id?: number;
  styleNumber?: string;
  styleType?: string;
  name: string;
  width?: number;
  height?: number;
  isPromote?: 0 | 1;
  tagIdList?: [];
}

export interface TagsDataType {
  id: number;
  barCode: string; //价签条码
  screenType: string; //价签屏幕类型
  routerBarCodeAndChannelId: string; // AP/信道
  power: string; //电量
  apRssi: string;
  tagRssi: string;
  isWorking: 0 | 1; //通讯状态， 1 可用
  forbidState: 0 | 1; //启用状态，1 启用
  waitUpdate: 0 | 1; //变价是否成功，0表示等待更新， 1表示更新完成
  style?: TagStyle; //价签类型
  styles?: Array<TagStyle>;
  [x: string]: any;
}

export interface GoodManageModelState {
  goodsData?: Array<GoodsDataType>;
  tagsData?: Array<TagsDataType>;
}

export interface GoodManageModelType {
  namespace: string;
  state: GoodManageModelState;
  effects: {
    fetchGoodsData: Effect;
    fetchTagsData: Effect;
  };
  reducers: {
    saveGoodsData: Reducer<GoodManageModelState>;
    saveTagsData: Reducer<GoodManageModelState>;
  };
}

const Model: GoodManageModelType = {
  namespace: 'goodManage',
  state: {
    goodsData: [
      {
        name: '', //商品名称
        price: '', //原价
        stock: '', //库存
        promotePrice: '', //促销价格
        isPromote: 1, //是否促销，0否 1是
        shopNumber: '', //店铺
        shelfNumber: '', //货号
        status: 1, //绑定状态 1代表绑定
        waitUpdate: 0, //变价是否成功，0表示等待更新， 1表示更新完成
      },
    ],
    tagsData: [
      {
        id: 0,
        barCode: '', //价签条码
        screenType: '', //价签屏幕类型
        routerBarCodeAndChannelId: '', // AP/信道
        power: '', //电量
        apRssi: '',
        tagRssi: '',
        isWorking: 1, //通讯状态， 1 可用
        forbidState: 1, //启用状态，1 启用
        waitUpdate: 1, //变价是否成功，0表示等待更新， 1表示更新完成
      },
    ],
  },

  effects: {
    *fetchGoodsData({ payload }, { call, put }) {
      const reponse = yield call(getGoodsData, payload);
      yield put({
        type: 'saveGoodsData',
        payload: reponse,
      });
    },
    *fetchTagsData({ payload }, { call, put }) {
      const reponse = yield call(getTagsData, payload);
      yield put({
        type: 'saveTagsData',
        payload: reponse,
      });
    },
  },

  reducers: {
    saveGoodsData(state, { payload }) {
      return {
        ...state,
        goodsData: payload.data,
      };
    },
    saveTagsData(state, { payload }) {
      return {
        ...state,
        tagsData: payload.data,
      };
    },
  },
};

export default Model;
