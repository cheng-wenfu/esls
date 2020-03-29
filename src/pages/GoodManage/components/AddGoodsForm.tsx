import React from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';

import styles from './AddGoodsForm.less';

import { FormComponentProps } from 'antd/es/form';

interface AddGoodsFormProps extends FormComponentProps {}

class GoodsForm extends React.Component<AddGoodsFormProps> {
  handleSubmit = e => {
    const { getFieldsValue } = this.props.form;
    const { formData } = getFieldsValue();
    console.log('formData', formData);
    // e.preventDefault();
    // this.props.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    //以下Col请加key
    return (
      <Form className={styles.addGoodsForm} onSubmit={this.handleSubmit}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="名称">
              {getFieldDecorator('name', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入商品名称',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="产地">
              {getFieldDecorator('origin', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入商品产地',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="规格">
              {getFieldDecorator('spec', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入商品规格',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="种类">
              {getFieldDecorator('category', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入商品种类',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="供应商">
              {getFieldDecorator('provider', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入商品供应商',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="单位">
              {getFieldDecorator('unit', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入商品单位',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="操作员">
              {getFieldDecorator('operator', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入操作员名称', //TODO: 操作员名称或代码？
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="货号">
              {getFieldDecorator('shelfNumber', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入商品货号',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="原价">
              {getFieldDecorator('price', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入商品原价',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="价格">
              {getFieldDecorator('promotePrice', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入商品价格',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="条形码">
              {getFieldDecorator('barCode', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入商品条形码',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="二维码">
              {getFieldDecorator('qrCode', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入商品二维码',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="促销理由">
              {getFieldDecorator('promotionReason', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入商品促销理由',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="店铺">
              {getFieldDecorator('shopNumber', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入店铺',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="开启计件">
              {getFieldDecorator('isComputeOpen', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '确认是否开启计件',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="图片链接">
              {getFieldDecorator('imageUrl', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入商品图片链接',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="重量规格">
              {getFieldDecorator('weightSpec', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入商品重量规格',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="预警门限">
              {getFieldDecorator('replenishNumber', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '请输入预警门限',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="自定义字段1">
              {getFieldDecorator('rfu01', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '自定义字段',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="自定义字段2">
              {getFieldDecorator('rfu02', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '自定义字段',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="名自定义字段3">
              {getFieldDecorator('rfus01', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '自定义字段',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className={styles.addGoodsFormItem} label="自定义字段4">
              {getFieldDecorator('rfus02', {
                initialValue: 'init',
                rules: [
                  {
                    //required: true,
                    message: '自定义字段',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}
const AddGoodsForm = Form.create<AddGoodsFormProps>({
  name: 'addGoods',
})(GoodsForm);

export default AddGoodsForm;
