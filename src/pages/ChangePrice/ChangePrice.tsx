import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Row, Col, Card, Button } from 'antd';
import { connect } from 'dva';
import { Dispatch, AnyAction } from 'redux';

import TagsTable from './components/TagsTable';
import styles from './ChangePrice.less';


import { ConnectState, ChangePriceModelState } from '@/models/connect';
import { TagsDataType } from '@/models/changePrice';

interface ChangePriceProps {
  dispatch: Dispatch<AnyAction>;
  pageData: ChangePriceModelState;
}

interface TagsDataRequestParams {
  query: "waitUpdate" | "forbidState" | "",
  queryString: 1 | 0 | "",
}

interface ChangePriceState {
  isRequestOvertime: false | true;
  tagsDataRequestParams: TagsDataRequestParams;
}


class ChangePrice extends Component<ChangePriceProps, ChangePriceState> {
  state: ChangePriceState = {
    isRequestOvertime: false,
    tagsDataRequestParams: {
      query: "waitUpdate",
      queryString: 0,
    },
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'changePrice/fetchTagsIndex',
    });
    dispatch({
      type: 'changePrice/fetchTagsData',
      payload: {
        query: "waitUpdate",
        queryString: 0,
        page: 0,
      }
    });
  }

  setTagsRequestParams(tagsDataRequestParams: TagsDataRequestParams) {
    const { dispatch } = this.props;
    console.log("tagsDataRequestParams", tagsDataRequestParams);
    this.setState({
      tagsDataRequestParams: tagsDataRequestParams
    });
    dispatch({
      type: 'changePrice/fetchTagsData',
      payload: {
        ...tagsDataRequestParams,
        page: 0,
      }
    })
  }

  handleOvertimeClick = () => {
    const { dispatch } = this.props;
    this.setState({
      isRequestOvertime: true,
    })
    dispatch({
      type: 'changePrice/fetchOvertimeTagsData',
      payload: 0,
    })
  }

  /**
   * 获取价签表格数据
   */
  getTagsTableData(tagsData: Array<TagsDataType>) {
    const tagsTableData = [];
    for (let i = 0; i < tagsData.length; i++) {
      let {
        id,
        barCode, //价签条码
        screenType, //价签屏幕类型
        shopNameAndShopNumber,
        routerBarCodeAndChannelId, // AP/信道
        goodBarCodeAndName,
        power, //电量
        apRssi,
        tagRssi,
        isWorking, //通讯状态， 1 可用
        forbidState, //启用状态，1 启用
        waitUpdate,
      } = tagsData[i];
      tagsTableData.push({
        id,
        barCode, //价签条码
        screenType, //价签屏幕类型
        shopNameAndShopNumber,
        routerBarCodeAndChannelId, // AP/信道
        goodBarCodeAndName,
        power, //电量
        apRssi,
        tagRssi,
        isWorking, //通讯状态， 1 可用
        forbidState, //启用状态，1 启用
        waitUpdate,
      });
    }
    return tagsTableData;
  };

  render() {
    const { dispatch } = this.props;
    const { tagsIndex, tagsData } = this.props.pageData;
    const { isRequestOvertime, tagsDataRequestParams } = this.state
    const tagsTableData = this.getTagsTableData(tagsData);
    return (
      <PageHeaderWrapper>
        <Row>
          <Card title="变价监控信息">
            <Row gutter={[8, 24]}>
              <Col span={8}>
                所有价签：{tagsIndex.allSize}
                <Button
                  type="primary"
                  size="small"
                  className={styles.checkButton}
                  onClick={(e) => { this.setTagsRequestParams({ query: "", queryString: "" }) }}>查看</Button>
              </Col>
              <Col span={8}>
                启用价签：{tagsIndex.normalTagSize}
                <Button
                  type="primary"
                  size="small"
                  className={styles.checkButton}
                  onClick={(e) => { this.setTagsRequestParams({ query: "forbidState", queryString: 1 }) }}>查看</Button>
              </Col>
              <Col span={8}>
                禁用价签：{tagsIndex.forbidTagSize}
                <Button
                  type="primary"
                  size="small"
                  className={styles.checkButton}
                  onClick={(e) => { this.setTagsRequestParams({ query: "forbidState", queryString: 0 }) }}>查看</Button>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                已经变价/变价总数：{tagsIndex.waitUpdateTagSize - tagsIndex.overTimeTagSize}/{tagsIndex.waitUpdateTagSize}
                <Button
                  type="primary"
                  size="small"
                  className={styles.checkButton}
                  onClick={(e) => { this.setTagsRequestParams({ query: "waitUpdate", queryString: 0 }) }}>查看</Button>
              </Col>
              <Col span={8}>
                变价超时：{tagsIndex.overTimeTagSize}
                <Button
                  type="primary"
                  size="small"
                  className={styles.checkButton}
                  onClick={this.handleOvertimeClick}>查看</Button>
              </Col>
              <Col span={8}>
                成功率：{(tagsIndex.waitUpdateTagSize - tagsIndex.overTimeTagSize) / (tagsIndex.waitUpdateTagSize)}%
              </Col>
            </Row>
          </Card>
        </Row>
        <Row>
          <TagsTable
            isRequestOvertime={isRequestOvertime}
            tagsDataRequestParams={tagsDataRequestParams}
            tagsData={tagsTableData}
            dispatch={dispatch} />
        </Row>
      </PageHeaderWrapper>
    )
  }
}

export default connect(({ changePrice }: ConnectState) => ({
  pageData: changePrice,
}))(ChangePrice);
