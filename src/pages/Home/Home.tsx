import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import { Dispatch, AnyAction } from 'redux';

import { ConnectState, HomeModelState } from '@/models/connect';
import { commonIndexType, LogType } from '@/models/home';
import { LogDataType } from './components/OperationLog';
import { PieDataType } from './components/DataPie';

import DataCard from './components/DataCard';
import DataPie from './components/DataPie';
import OperationLog from './components/OperationLog';

interface HomeProps {
  dispatch: Dispatch<AnyAction>;
  statisticData: HomeModelState;
}


class Home extends Component<HomeProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    //下面是页面请求
    dispatch({
      type: 'home/fetchCommonIndex',
    });
    dispatch({
      type: 'home/fetchOperationLog',
      payload: 0,
    });
    console.log('2222222222222222');
  }

  /**
   *
   * @param commonIndex 初始化数据
   * @param type 路由器或者是价签
   */
  getPieData(commonIndex: commonIndexType, type: 'tag' | 'router'): PieDataType | undefined {
    if (type === 'tag') {
      const { normalTagSize, noBindTagSize, noIsWorkingTagSize, forbiddenTagSize } = commonIndex;
      const tagData = {
        value: [
          {
            type: '正常',
            value: normalTagSize,
          },
          {
            type: '未绑定',
            value: noBindTagSize,
          },
          {
            type: '离线',
            value: noIsWorkingTagSize,
          },
          {
            type: '禁用',
            value: forbiddenTagSize,
          },
        ],
        title: '价签信息',
        elementId: 'canvas1',
      };
      return tagData;
    }
    if (type === 'router') {
      const { normalRouterSize, forbiddenRouterSize, noIsWorkingRouterSize } = commonIndex;
      const routerData = {
        value: [
          {
            type: '正常',
            value: normalRouterSize,
          },
          {
            type: '离线',
            value: noIsWorkingRouterSize,
          },
          {
            type: '禁用',
            value: forbiddenRouterSize,
          },
        ],
        title: '路由器信息',
        elementId: 'canvas2',
      };
      return routerData;
    }
    return undefined;
  }

  /**
   * 获取用户操作日志
   * @param operationLog 详细操作日志
   */
  getOperationLog(operationLog: LogType[]): Array<LogDataType> {
    //为什么是先调用这个函数，再调用componentDidMount
    console.log('11111111111');
    const operationLogs = [];
    for (let i = 0; i < operationLog.length; i++) {
      let { logDescription, userName, ip, createTime } = operationLog[i];
      console.log('logDescription', logDescription);
      operationLogs.push({
        userName: userName,
        operation: logDescription,
        ipAddress: ip,
        time: createTime,
      });
    }
    return operationLogs;
  }

  render() {
    const { commonIndex, operationLog } = this.props.statisticData;
    const { dispatch } = this.props;
    console.log(commonIndex, operationLog);
    const tagData = this.getPieData(commonIndex, 'tag');
    const routerData = this.getPieData(commonIndex, 'router');
    const operationLogs = this.getOperationLog(operationLog);
    console.log(operationLogs);

    return (
      <PageHeaderWrapper>
        <Row gutter={16}>
          <Col span={4}>
            <DataCard icon="user" title="商品数量" number={commonIndex.goodSize} />
          </Col>
          <Col span={4}>
            <DataCard icon="user" title="价签数量" number={commonIndex.tagSize} />
          </Col>
          <Col span={4}>
            <DataCard icon="user" title="样式数量" number={commonIndex.styleSize} />
          </Col>
          <Col span={4}>
            <DataCard icon="user" title="店铺数量" number={commonIndex.shopSize} />
          </Col>
          <Col span={4}>
            <DataCard icon="user" title="路由器数量" number={commonIndex.routerSize} />
          </Col>
          <Col span={4}>
            <DataCard icon="user" title="用户数量" number={commonIndex.userSize} />
          </Col>
        </Row>

        <Row gutter={16}>
          <DataPie data={tagData} />
          <DataPie data={routerData} />
        </Row>
        <Row>
          <OperationLog operationLog={operationLogs} dispatch={dispatch} />
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ home }: ConnectState) => ({
  statisticData: home,
}))(Home);
