import { Reducer } from 'redux';
import { Effect } from 'dva';

import { getTagsIndex, getTagsData, getchangePriceOvertime } from '@/services/changePrice';

export interface TagsIndex {
  overTimeTagSize: number;
  allSize: number;
  forbidTagSize: number;
  waitUpdateTagSize: number;
  normalTagSize: number;
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
  shopNameAndShopNumber: string;
  routerBarCodeAndChannelId: string; // AP/信道
  goodBarCodeAndName: string;
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

export interface ChangePriceModelState {
  tagsIndex?: TagsIndex;
  tagsData?: Array<TagsDataType>;
}

export interface ChangePriceModelType {
  namespace: string;
  state: ChangePriceModelState;
  effects: {
    fetchOvertimeTagsData: Effect;
    fetchTagsIndex: Effect;
    fetchTagsData: Effect;
  };
  reducers: {
    saveTagsIndex: Reducer<ChangePriceModelState>;
    saveTagsData: Reducer<ChangePriceModelState>;
  };
}

const Model: ChangePriceModelType = {
  namespace: 'changePrice',
  state: {
    tagsIndex: {
      overTimeTagSize: 0,
      allSize: 0,
      forbidTagSize: 0,
      waitUpdateTagSize: 0,
      normalTagSize: 0,
    },
    tagsData: [
      {
        id: 0,
        barCode: '', //价签条码
        screenType: '', //价签屏幕类型
        routerBarCodeAndChannelId: '', // AP/信道
        goodBarCodeAndName: '',
        shopNameAndShopNumber: '',
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
    *fetchOvertimeTagsData({ payload }, { call, put }) {
      const response = yield call(getchangePriceOvertime, payload);
      yield put({
        type: 'saveTagsData',
        payload: response,
      });
    },
    *fetchTagsIndex(_, { call, put }) {
      const response = yield call(getTagsIndex);
      yield put({
        type: 'saveTagsIndex',
        payload: response,
      });
    },
    *fetchTagsData({ payload }, { call, put }) {
      const response = yield call(getTagsData, payload);
      yield put({
        type: 'saveTagsData',
        payload: response,
      });
    },
  },

  reducers: {
    saveTagsIndex(state, { payload }) {
      console.log('saveTagsIndex');
      return {
        ...state,
        tagsIndex: payload.data,
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
