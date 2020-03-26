import { Reducer } from 'redux';
import { Effect } from 'dva';

import { getCommonIndex, getUserData, getLoginLog } from '@/services/home';

export interface HomeModelState {
  commonIndex?: {};
  loginInfo?: {};
}

export interface HomeModelType {
  namespace: string;
  state: HomeModelState;
  effects: {
    fetchIndex: Effect;
    fetchUserData: Effect;
    getLoginInfo: Effect;
  };
  reducers: {
    saveLoginInfo: Reducer<HomeModelState>;
    saveCommonIndex: Reducer<HomeModelState>;
  };
}

const Model: HomeModelType = {
  namespace: 'home',

  state: {
    commonIndex: {},
    loginInfo: {},
  },

  effects: {
    *fetchIndex(_, { call, put }) {
      const response = yield call(getCommonIndex);
      yield put({
        type: 'saveCommonIndex',
        payload: response,
      });
    },

    *fetchUserData({ payload }, { call, put }) {
      const response = yield call(getUserData, payload);
      yield put({
        type: 'saveUserData',
        payload: response,
      });
    },

    *getLoginInfo({ payload }, { call, put }) {
      const response = yield call(getLoginLog, payload);
      yield put({
        type: 'saveLoginInfo',
        payload: response,
      });
    },
  },

  reducers: {
    saveLoginInfo(state, { payload }) {
      return {
        ...state,
        loginInfo: payload.data,
      };
    },
    saveCommonIndex(state, { payload }) {
      return {
        ...state,
        commonIndex: payload.data,
      };
    },
  },
};

export default Model;
