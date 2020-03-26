import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import { Dispatch, AnyAction } from 'redux';

import { ConnectState, HomeModelState } from '@/models/connect';
import DataCard from './components/DataCard';
import DataPie from './components/DataPie';
import LoginLog from './components/LoginLog';

interface HomeProps {
  dispatch: Dispatch<AnyAction>;
  statisticData: HomeModelState;
}

interface HomeState {
  indexData: {};
  page: number;
  LoginData: [];
}

class Home extends Component<HomeProps, HomeState> {
  state: HomeState = {
    indexData: {},
    page: 0,
    LoginData: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetchIndex',
    });
    dispatch({
      type: 'home/getLoginInfo',
      payload: this.state.page,
    });
    console.log('----------------');
  }

  getLoginLog(loginInfo) {
    const data = [];
    for (let i = 0; i < 10; i++) {
      console.log(loginInfo[i], '1222134241');
      let { logDescription, userName, ip, creatime } = loginInfo[i];
      data.push({
        userName: userName,
        operation: logDescription,
        ipAddress: ip,
        time: creatime,
      });
    }
    return data;
  }

  render() {
    const { commonIndex } = this.props.statisticData;
    const { loginInfo } = this.props.statisticData;
    const { normalTagSize, noBindTagSize, noIsWorkingTagSize, forbiddenTagSize } = commonIndex;
    const { normalRouterSize, forbiddenRouterSize, noIsWorkingRouterSize } = commonIndex;
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
    console.log(loginInfo, '----------');

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
          <LoginLog loginInfo={loginInfo} />
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ home }: ConnectState) => ({
  statisticData: home,
}))(Home);
