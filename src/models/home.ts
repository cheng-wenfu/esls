import { Reducer } from 'redux';
import { Effect } from 'dva';

import { getCommonIndex, getOperationLog } from '@/services/home';

export interface commonIndexType {
  goodSize?: number;
  tagSize?: number;
  routerSize?: number;
  styleSzie?: number;
  shopSize?: number;
  userSize?: number;
  normalTagSize?: number;
  noBindTagSize?: number;
  noIsWorkingTagSize?: number;
  forbiddenTagSize?: number;
  normalRouterSize?: number;
  forbiddenRouterSize?: number;
  noIsWorkingRouterSize?: number;
}

export interface LogType {
  logDescription: string;
  userName: string;
  ip: string;
  createTime: number;
  id?: number;
  actionArgs?: string;
  className?: string;
  methodName?: string;
  modelName?: string;
  action?: string;
  succeed?: string;
  message?: string;
  execIime?: string;
}

export interface HomeModelState {
  commonIndex?: commonIndexType;
  operationLog?: LogType[];
}

export interface HomeModelType {
  namespace: string;
  state: HomeModelState;
  effects: {
    fetchCommonIndex: Effect;
    fetchOperationLog: Effect;
  };
  reducers: {
    saveOperationLog: Reducer<HomeModelState>;
    saveCommonIndex: Reducer<HomeModelState>;
  };
}

const Model: HomeModelType = {
  namespace: 'home',

  state: {
    commonIndex: {},
    operationLog: [],
  },

  effects: {
    *fetchCommonIndex(_, { call, put }) {
      const response = yield call(getCommonIndex);
      yield put({
        type: 'saveCommonIndex',
        payload: response,
      });
    },

    *fetchOperationLog({ payload }, { call, put }) {
      const response = yield call(getOperationLog, payload);
      yield put({
        type: 'saveOperationLog',
        payload: response,
      });
    },
  },

  reducers: {
    saveOperationLog(state, { payload }) {
      return {
        ...state,
        operationLog: payload.data,
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
